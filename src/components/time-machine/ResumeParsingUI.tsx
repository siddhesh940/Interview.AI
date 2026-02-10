"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ResumeQualityCheck } from "@/lib/resume-parser-v3";
import { AlertCircle, AlertTriangle, CheckCircle, FileText, Info, Lightbulb, XCircle } from "lucide-react";

/**
 * Pre-upload Guidelines Component
 * Shows best practices for resume formatting before upload
 */
export function ResumeUploadGuidelines() {
  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800">Resume Tips for Best Results</AlertTitle>
      <AlertDescription className="text-blue-700">
        <ul className="mt-2 space-y-1 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Use <strong>single-column</strong> layout (no tables or multi-column)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Use clear section headings: <strong>Skills, Experience, Education, Projects</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Avoid graphics, icons, or complex formatting</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>Use a <strong>text-based PDF</strong> (not a scanned image)</span>
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}

/**
 * Resume Quality Warning Component
 * Displays warnings and suggestions based on quality check
 */
interface ResumeQualityWarningProps {
  qualityCheck: ResumeQualityCheck;
}

export function ResumeQualityWarning({ qualityCheck }: ResumeQualityWarningProps) {
  if (qualityCheck.qualityScore >= 70 && qualityCheck.warnings.length === 0) {
    return null;
  }

  const severity = qualityCheck.qualityScore < 40 ? 'error' : 
                   qualityCheck.qualityScore < 70 ? 'warning' : 'info';

  return (
    <Alert 
      className={`mt-4 ${
        severity === 'error' ? 'border-red-200 bg-red-50' :
        severity === 'warning' ? 'border-amber-200 bg-amber-50' :
        'border-blue-200 bg-blue-50'
      }`}
    >
      {severity === 'error' ? (
        <XCircle className="h-4 w-4 text-red-600" />
      ) : severity === 'warning' ? (
        <AlertTriangle className="h-4 w-4 text-amber-600" />
      ) : (
        <Info className="h-4 w-4 text-blue-600" />
      )}
      <AlertTitle className={
        severity === 'error' ? 'text-red-800' :
        severity === 'warning' ? 'text-amber-800' :
        'text-blue-800'
      }>
        {severity === 'error' ? 'Resume Quality Issues Detected' :
         severity === 'warning' ? 'Resume Structure Could Be Improved' :
         'Parsing Notes'}
      </AlertTitle>
      <AlertDescription>
        <div className="mt-2 space-y-2">
          {qualityCheck.warnings.map((warning) => (
            <p key={`warning-${warning.slice(0, 20).replace(/\s/g, '-')}`} className="text-sm flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {warning}
            </p>
          ))}
          
          {qualityCheck.suggestions.length > 0 && (
            <div className="mt-3 pt-2 border-t border-current/10">
              <p className="text-sm font-medium flex items-center gap-1">
                <Lightbulb className="h-4 w-4" />
                Suggestions:
              </p>
              <ul className="mt-1 space-y-1">
                {qualityCheck.suggestions.map((suggestion) => (
                  <li key={`suggestion-${suggestion.slice(0, 20).replace(/\s/g, '-')}`} className="text-sm ml-5">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

/**
 * Parsing Accuracy Display Component
 * Shows the weighted parsing accuracy with section breakdown
 * 
 * STRICT ACCURACY RULES:
 * - If section EXISTS → 100% confidence (show green)
 * - If section MISSING → 0% confidence (show warning)
 * - NO intermediate states - either found or not found
 */
interface ParsingAccuracyDisplayProps {
  sectionConfidence: {
    skills: number;
    experience: number;
    education: number;
    projects: number;
    certifications?: number;
  };
  overallConfidence: number;
  messages: {
    skills: string;
    experience: string;
    education: string;
    projects: string;
    overall: string;
  };
}

export function ParsingAccuracyDisplay({ 
  sectionConfidence, 
  overallConfidence, 
  messages 
}: ParsingAccuracyDisplayProps) {
  // STRICT: Convert confidence to percentage (should be 0 or 1 from strict parser)
  const accuracyPercent = Math.round(overallConfidence * 100);
  
  // STRICT: Section is either found (green) or not found (red)
  // Threshold of 0.5 for legacy parsers, but strict parser sends 0 or 1
  const getSectionColor = (confidence: number) => {
    if (confidence >= 0.5) {
      return 'text-green-600 bg-green-100'; // Section found
    }
    
    return 'text-red-600 bg-red-100'; // Section not found
  };
  
  const getOverallColorClass = (confidence: number) => {
    if (confidence >= 0.8) {
      return 'text-green-600 bg-green-100'; // 80%+ accuracy (3-4 sections found)
    }
    if (confidence >= 0.5) {
      return 'text-amber-600 bg-amber-100'; // 50-79% (2 sections)
    }
    
    return 'text-red-600 bg-red-100';
  };
  
  // Check if message is a success message (starts with ✅)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Parsing Accuracy
          </span>
          <Badge className={`${getOverallColorClass(overallConfidence)} text-lg px-3 py-1`}>
            {accuracyPercent}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <Progress 
            value={accuracyPercent} 
            className="h-3"
          />
          <p className="text-sm text-gray-600">{messages.overall}</p>
        </div>

        {/* Section Breakdown - STRICT: Show found/not found status */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          {/* Skills - 30% weight */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Skills (30%)</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getSectionColor(sectionConfidence.skills)}`}>
                {sectionConfidence.skills >= 0.5 ? '✓ Found' : '✗ Not Found'}
              </span>
            </div>
            <Progress 
              value={sectionConfidence.skills >= 0.5 ? 100 : 0} 
              className="h-1.5"
            />
          </div>

          {/* Experience - 30% weight */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Experience (30%)</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getSectionColor(sectionConfidence.experience)}`}>
                {sectionConfidence.experience >= 0.5 ? '✓ Found' : '✗ Not Found'}
              </span>
            </div>
            <Progress 
              value={sectionConfidence.experience >= 0.5 ? 100 : 0} 
              className="h-1.5"
            />
          </div>

          {/* Education - 20% weight */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Education (20%)</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getSectionColor(sectionConfidence.education)}`}>
                {sectionConfidence.education >= 0.5 ? '✓ Found' : '✗ Not Found'}
              </span>
            </div>
            <Progress 
              value={sectionConfidence.education >= 0.5 ? 100 : 0} 
              className="h-1.5"
            />
          </div>

          {/* Projects - 20% weight */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">Projects (20%)</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${getSectionColor(sectionConfidence.projects)}`}>
                {sectionConfidence.projects >= 0.5 ? '✓ Found' : '✗ Not Found'}
              </span>
            </div>
            <Progress 
              value={sectionConfidence.projects >= 0.5 ? 100 : 0} 
              className="h-1.5"
            />
          </div>
        </div>

        {/* Confidence Messages - STRICT: Only show warnings for NOT FOUND sections */}
        <div className="pt-3 border-t space-y-2 text-xs">
          {/* Only show message if section was NOT found (warning) */}
          {sectionConfidence.skills < 0.5 && (
            <p className="text-red-700 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {messages.skills}
            </p>
          )}
          {sectionConfidence.experience < 0.5 && (
            <p className="text-red-700 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {messages.experience}
            </p>
          )}
          {sectionConfidence.education < 0.5 && (
            <p className="text-red-700 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {messages.education}
            </p>
          )}
          {sectionConfidence.projects < 0.5 && (
            <p className="text-red-700 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {messages.projects}
            </p>
          )}
          
          {/* Show success message if ALL sections found */}
          {sectionConfidence.skills >= 0.5 && 
           sectionConfidence.experience >= 0.5 && 
           sectionConfidence.education >= 0.5 && 
           sectionConfidence.projects >= 0.5 && (
            <p className="text-green-700 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              All sections successfully extracted from your resume!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
