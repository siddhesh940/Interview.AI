"use client";

import { ResumeUploadGuidelines } from "@/components/time-machine/ResumeParsingUI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useTimeMachine } from "@/hooks/useTimeMachine";
import { useTimeMachineStore } from "@/stores/timeMachineStore";
import { TARGET_ROLES, TargetRole, TimeMachineData } from "@/types/time-machine";
import { ArrowLeft, ArrowRight, CheckCircle, FileText, Loader2, Sparkles, Target, Upload, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function TimeMachineDataPage() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    resumeData,
    setResumeData,
    goalData,
    setGoalData,
    setAnalysisData,
    currentStep,
    setCurrentStep,
    setIsUploading,
    isAnalyzing,
    setIsAnalyzing
  } = useTimeMachineStore();

  const { uploadResume, analyzeFuture, isLoading } = useTimeMachine();

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Extract individual values for easier use
  const targetRole = goalData.targetRole;
  const timeGoal = goalData.timeGoal;
  
  // VALIDATION: Reset state if resumeData exists but is invalid (e.g., from stale storage)
  useEffect(() => {
    if (resumeData) {
      // Check if resumeData has valid content
      const hasValidText = resumeData.text && resumeData.text.trim().length > 50;
      const hasValidFile = resumeData.file && resumeData.file.name;
      
      if (!hasValidText || !hasValidFile) {
        console.log('⚠️ Invalid/stale resume data detected, clearing...');
        setResumeData(null);
        setAnalysisData(null);
        setCurrentStep(1);
      }
    }
  }, [resumeData, setResumeData, setAnalysisData, setCurrentStep]);

  // Platform data fetching function - only use if available
  const getPlatformData = async () => {
    try {
      // In real implementation, fetch from actual platform APIs
      const response = await fetch('/api/platform-data');
      if (response.ok) {
        return await response.json();
      }
      
return null;
    } catch (error) {
      console.log('Platform data not available, using resume-only analysis');
      
return null;
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (!file) {return;}

      // Reset any previous data before new upload
      setResumeData(null);
      setAnalysisData(null); // Clear previous analysis
      setUploadProgress(0);
      setCurrentStep(1); // Reset to step 1
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive",
        });
        
return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        
return;
      }

      try {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 100);

        const resumeUploadResult = await uploadResume(file);
        
        clearInterval(interval);
        setUploadProgress(100);
        
        // Validate parsing results
        const hasValidData = resumeUploadResult.text && resumeUploadResult.text.trim().length > 10;
        const hasExtractedData = resumeUploadResult.extractedData && (
          resumeUploadResult.extractedData.skills.length > 0 ||
          resumeUploadResult.extractedData.experience.length > 0 ||
          resumeUploadResult.extractedData.projects.length > 0
        );

        if (!hasValidData) {
          toast({
            title: "Resume could not be parsed",
            description: "Please upload a clearer PDF or DOCX file. The text could not be extracted properly.",
            variant: "destructive",
          });
          setUploadProgress(0);
          
return;
        }

        setResumeData(resumeUploadResult);

        toast({
          title: "Resume uploaded successfully!",
          description: hasExtractedData 
            ? "Your resume has been parsed and analyzed."
            : "Resume uploaded. Some data may need manual review.",
        });

        // Only auto-advance if we have valid data
        if (hasValidData) {
          setTimeout(() => setCurrentStep(2), 1000);
        }
      } catch (error) {
        console.error('Resume upload error:', error);
        toast({
          title: "Upload failed",
          description: "Failed to upload and parse resume. Please try again.",
          variant: "destructive",
        });
        setUploadProgress(0);
      } finally {
        setIsUploading(false);
      }
    }
  }, [setResumeData, setAnalysisData, setUploadProgress, setIsUploading, setCurrentStep, uploadResume, toast]);

  const resetResumeUpload = useCallback(() => {
    // FULL RESET - Clear ALL resume and analysis data
    console.log('🔄 Resetting resume upload - clearing all data');
    
    // Clear resume data from store
    setResumeData(null);
    
    // Clear analysis data from store
    setAnalysisData(null);
    
    // Reset upload progress
    setUploadProgress(0);
    
    // Reset to step 1
    setCurrentStep(1);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    console.log('✅ Reset complete - all data cleared');
  }, [setResumeData, setAnalysisData, setCurrentStep]);

  const handleFileUpload = async (file: File) => {
    if (!file) {return;}

    // Reset any previous data before new upload
    resetResumeUpload();

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
      });
      
return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      
return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const resumeUploadResult = await uploadResume(file);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Validate parsing results
      const hasValidData = resumeUploadResult.text && resumeUploadResult.text.trim().length > 10;
      const hasExtractedData = resumeUploadResult.extractedData && (
        resumeUploadResult.extractedData.skills.length > 0 ||
        resumeUploadResult.extractedData.experience.length > 0 ||
        resumeUploadResult.extractedData.projects.length > 0
      );

      if (!hasValidData) {
        toast({
          title: "Resume could not be parsed",
          description: "Please upload a clearer PDF or DOCX file. The text could not be extracted properly.",
          variant: "destructive",
        });
        setUploadProgress(0);
        
return;
      }

      setResumeData(resumeUploadResult);

      toast({
        title: "Resume uploaded successfully!",
        description: hasExtractedData 
          ? "Your resume has been parsed and analyzed."
          : "Resume uploaded. Some data may need manual review.",
      });

      // Only auto-advance if we have valid data
      if (hasValidData) {
        setTimeout(() => setCurrentStep(2), 1000);
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload and parse resume. Please try again.",
        variant: "destructive",
      });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    // Prevent double-click: if already analyzing, ignore
    if (isAnalyzing || isLoading) {
      console.log('⚠️ Analysis already in progress, ignoring duplicate click');
      // eslint-disable-next-line newline-before-return
      return;
    }

    // Validate required data
    if (!resumeData) {
      toast({
        title: "Resume missing",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
      
return;
    }

    if (!targetRole) {
      toast({
        title: "Target role missing",
        description: "Please select a target role.",
        variant: "destructive",
      });
      
return;
    }

    // Validate resume has valid content
    if (!resumeData.text || resumeData.text.trim().length < 10) {
      toast({
        title: "Resume content issue",
        description: "Resume text could not be extracted properly. Please upload a clearer file.",
        variant: "destructive",
      });
      
return;
    }

    try {
      // Set loading state immediately to prevent double-clicks
      setIsAnalyzing(true);
      
      // Try to get platform data, but proceed without it if unavailable
      const platformData = await getPlatformData();
      
      const timeMachineData: TimeMachineData = {
        resumeText: resumeData.text,
        targetRole,
        timeGoal,
        ...(platformData && {
          interviewScores: platformData.interviewScores,
          strengths: platformData.strengths,
          weaknesses: platformData.weaknesses,
          technicalPatterns: platformData.technicalPatterns,
          communicationPatterns: platformData.communicationPatterns
        })
      };

      console.log('🚀 Starting AI analysis with data:', {
        resumeLength: resumeData.text.length,
        targetRole,
        timeGoal,
        hasPlatformData: !!platformData
      });
      
      const prediction = await analyzeFuture(timeMachineData);
      
      // Save analysis result to persistent store
      setAnalysisData(prediction);
      
      toast({
        title: "Analysis complete!",
        description: "Your future prediction is ready. Redirecting to results...",
      });

      // Redirect to results page (NOT back to data page)
      setTimeout(() => {
        router.push("/time-machine/result");
      }, 1000);
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const steps = [
    { id: 1, title: "Upload Resume", icon: Upload },
    { id: 2, title: "Select Goals & Analyze", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => router.push("/time-machine")}
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Time Machine Data Collection</h1>
              <p className="text-gray-600 mt-1">
                Upload your resume and let AI analyze your future potential
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`ml-4 h-0.5 w-16 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Resume Upload */}
        {currentStep === 1 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-purple-600" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Upload your resume (PDF or DOCX) for AI analysis. We&#39;ll extract your skills, experience, and achievements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Pre-upload Guidelines - Show when no resume uploaded */}
              {!resumeData && <ResumeUploadGuidelines />}
              
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-purple-400 bg-purple-50'
                    : resumeData
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadProgress > 0 && uploadProgress < 100 ? (
                  <div>
                    <Loader2 className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-spin" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Uploading and parsing...</p>
                    <Progress value={uploadProgress} className="h-2 mb-4" />
                    <p className="text-sm text-gray-600">{uploadProgress}% complete</p>
                  </div>
                ) : resumeData ? (
                  <div className="py-6">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-gray-900 mb-2">Resume Uploaded Successfully!</p>
                    <p className="text-sm text-gray-600 mb-6">
                      <span className="font-medium">{resumeData.file.name}</span>
                      <span className="text-gray-400 ml-2">({resumeData.file.size ? (resumeData.file.size / 1024 / 1024).toFixed(2) : '0.00'} MB)</span>
                    </p>
                    
                    {/* Simple confirmation - no parsing details */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto mb-6">
                      <p className="text-green-700 text-sm">
                        ✓ Your resume has been processed and is ready for AI analysis
                      </p>
                    </div>
                    
                    {/* Clear & Upload New Resume Button */}
                    <Button
                      variant="outline"
                      className="text-purple-600 border-purple-600 hover:bg-purple-50"
                      onClick={resetResumeUpload}
                    >
                      Upload Different Resume
                    </Button>
                  </div>
                ) : (
                  <div>
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Supported formats: PDF, DOCX (Max size: 10MB)
                    </p>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {handleFileUpload(file);}
                  }}
                />
              </div>

              {resumeData && (
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setCurrentStep(2)}
                  >
                    Next: Select Goals
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goal Selection */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Target Job Role
                </CardTitle>
                <CardDescription>
                  Select the job role you&#39;re targeting to get personalized predictions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="target-role">Target Job Role</Label>
                  <Select value={targetRole || ""} onValueChange={(value: TargetRole) => 
                    setGoalData({ ...goalData, targetRole: value })
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your target job role" />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-6 space-y-4">
                  <Label>Time Goal</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[30, 60, 90].map((days) => (
                      <button
                        key={days}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          timeGoal === days
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                        onClick={() => setGoalData({ ...goalData, timeGoal: days as 30 | 60 | 90 })}
                      >
                        <div className="text-2xl font-bold">{days}</div>
                        <div className="text-sm">Days</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    disabled={!targetRole || isAnalyzing || isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleSubmit}
                  >
                    {isAnalyzing || isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
