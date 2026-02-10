"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTechPrep } from '@/contexts/TechPrepContext';
import { SAMPLE_DEBUGGING_QUESTIONS } from '@/data/technical-practice-data';
import { BugInfo } from '@/types/technical-practice';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Bug,
    CheckCircle,
    Clock,
    Code,
    Eye,
    EyeOff,
    Lightbulb,
    Play,
    RotateCcw,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DebuggingModeProps {
  domain: string;
  onComplete: () => void;
}

interface BugEvaluation {
  score: number;
  bugsFound: number;
  totalBugs: number;
  fixAccuracy: number;
  problemSolving: number;
  feedback: string;
  foundBugs: BugInfo[];
  missedBugs: BugInfo[];
}

export default function DebuggingMode({ domain, onComplete }: DebuggingModeProps) {
  useTechPrep();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [evaluation, setEvaluation] = useState<BugEvaluation | null>(null);
  const [output, setOutput] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [identifiedBugs, setIdentifiedBugs] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('problem');

  // Get problems for this domain
  const domainProblems = SAMPLE_DEBUGGING_QUESTIONS.filter(q => q.domain === domain);
  const problems = domainProblems.length > 0 ? domainProblems : 
    SAMPLE_DEBUGGING_QUESTIONS.filter(q => q.domain === 'dsa');
  const currentProblem = problems[currentProblemIndex];
  const totalProblems = Math.min(problems.length, 3);

  // Initialize with buggy code
  useEffect(() => {
    if (currentProblem) {
      setCode(currentProblem.buggyCode);
      setIdentifiedBugs([]);
    }
  }, [currentProblem]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = async () => {
    setIsRunning(true);
    setActiveTab('output'); // Switch to output tab
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if code matches fixed solution (simplified check)
    const normalizedCode = code.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedSolution = currentProblem.fixedCode.replace(/\s+/g, ' ').trim().toLowerCase();
    
    // Simple similarity check - count matching segments
    const codeParts = normalizedCode.split(' ');
    const solutionParts = normalizedSolution.split(' ');
    const matchCount = codeParts.filter(part => solutionParts.includes(part)).length;
    const similarity = matchCount / solutionParts.length;

    if (similarity > 0.8) {
      setOutput({
        type: 'success',
        message: '✅ Code looks correct! All test cases passed.'
      });
    } else {
      setOutput({
        type: 'error',
        message: '❌ Some test cases failed. Check your fixes and try again.'
      });
    }

    setIsRunning(false);
  };

  const toggleBugIdentification = (lineNumber: number) => {
    setIdentifiedBugs(prev => 
      prev.includes(lineNumber) 
        ? prev.filter(l => l !== lineNumber)
        : [...prev, lineNumber]
    );
  };

  const submitSolution = async () => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Evaluate the debugging attempt
    const actualBugLines = currentProblem.bugs.map(b => b.lineNumber);
    const correctlyIdentified = identifiedBugs.filter(line => actualBugLines.includes(line));
    const bugsFound = correctlyIdentified.length;
    const totalBugs = currentProblem.bugs.length;
    
    // Check if code was fixed
    const normalizedCode = code.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedSolution = currentProblem.fixedCode.replace(/\s+/g, ' ').trim().toLowerCase();
    const codeParts = normalizedCode.split(' ');
    const solutionParts = normalizedSolution.split(' ');
    const matchCount = codeParts.filter(part => solutionParts.includes(part)).length;
    const similarity = matchCount / solutionParts.length;
    
    const fixAccuracy = Math.round(similarity * 100);
    
    // Penalty for hints used
    const hintPenalty = hintsUsed * 5;
    const solutionPenalty = showSolution ? 30 : 0;
    const problemSolving = Math.max(0, 100 - hintPenalty - solutionPenalty);
    
    const bugIdentificationScore = totalBugs > 0 ? Math.round((bugsFound / totalBugs) * 100) : 0;
    const overallScore = Math.round((fixAccuracy * 0.4 + bugIdentificationScore * 0.3 + problemSolving * 0.3));

    const foundBugs = currentProblem.bugs.filter(b => correctlyIdentified.includes(b.lineNumber));
    const missedBugs = currentProblem.bugs.filter(b => !correctlyIdentified.includes(b.lineNumber));

    const mockEvaluation: BugEvaluation = {
      score: overallScore,
      bugsFound,
      totalBugs,
      fixAccuracy,
      problemSolving,
      feedback: overallScore >= 80 
        ? "Excellent debugging skills! You identified and fixed most bugs correctly."
        : overallScore >= 60
          ? "Good attempt! You found some bugs but missed a few."
          : "Keep practicing! Focus on understanding error patterns.",
      foundBugs,
      missedBugs
    };

    setEvaluation(mockEvaluation);
    setSessionScores(prev => [...prev, overallScore]);
    setIsSubmitting(false);
  };

  const nextProblem = () => {
    if (currentProblemIndex < totalProblems - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setCode('');
      setEvaluation(null);
      setOutput(null);
      setShowHints(false);
      setShowSolution(false);
      setHintsUsed(0);
      setIdentifiedBugs([]);
    } else {
      onComplete();
    }
  };

  const resetCode = () => {
    if (currentProblem) {
      setCode(currentProblem.buggyCode);
      setIdentifiedBugs([]);
    }
    setOutput(null);
  };

  const revealNextHint = () => {
    const hints = currentProblem.hints || [];
    if (hintsUsed < hints.length) {
      setHintsUsed(prev => prev + 1);
    }
  };

  if (!currentProblem) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">No debugging problems available for this domain.</p>
      </div>
    );
  }

  const codeLines = code.split('\n');

  return (
    <div className="space-y-4 h-[calc(100vh-250px)] min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bug className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Debugging Mode</h2>
          </div>
          <p className="text-gray-400 mt-1">Find and fix the bugs in the code</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeSpent)}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-red-600">
            Problem {currentProblemIndex + 1} / {totalProblems}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentProblemIndex + 1) / totalProblems) * 100} className="h-2" />

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-120px)]">
        {/* Left Panel - Problem & Hints */}
        <Card className="bg-gray-800/70 border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white">{currentProblem.topic}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    {currentProblem.bugs.length} Bug{currentProblem.bugs.length > 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="secondary">{currentProblem.errorType}</Badge>
                  <Badge variant="secondary">{currentProblem.language}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto">
            <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="output" className={output ? (output.type === 'success' ? 'text-green-400' : 'text-red-400') : ''}>Output {output && '●'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problem" className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Description</h4>
                  <p className="text-gray-400">{currentProblem.question}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Bug Information</h4>
                  <div className="space-y-2">
                    {currentProblem.bugs.map((bug, idx) => (
                      <div 
                        key={`bug-${bug.lineNumber}-${idx}`}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-600">Line {bug.lineNumber}</Badge>
                          <Badge variant="outline">{bug.bugType}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">{bug.hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="hints" className="mt-4 space-y-4">
                {!showHints ? (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                    <p className="text-gray-400 mb-4">Need help finding the bugs?</p>
                    <p className="text-yellow-500 text-sm mb-4">Using hints will reduce your score by 5% each</p>
                    <Button 
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => setShowHints(true)}
                    >
                      Show Hints
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentProblem.hints?.slice(0, hintsUsed).map((hint, idx) => (
                      <motion.div
                        key={`hint-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                      >
                        <p className="text-yellow-400">{hint}</p>
                      </motion.div>
                    ))}
                    {hintsUsed < (currentProblem.hints?.length || 0) && (
                      <Button 
                        variant="outline" 
                        className="w-full border-yellow-500 text-yellow-500"
                        onClick={revealNextHint}
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Reveal Next Hint (-5% score)
                      </Button>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    className={`w-full ${showSolution ? 'border-green-500 text-green-500' : 'border-gray-500 text-gray-500'}`}
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showSolution ? 'Hide Solution' : 'Show Solution (-30% score)'}
                  </Button>
                  
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <h4 className="font-medium text-gray-300 mb-2">Correct Solution:</h4>
                        <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto text-sm text-green-400">
                          {currentProblem.fixedCode}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="mt-4">
                {output ? (
                  <div className={`p-4 rounded-lg ${
                    output.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                  }`}>
                    <p className={output.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                      {output.message}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Run your code to see output</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Panel - Code Editor & Results */}
        <Card className="bg-gray-800/70 border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Editor
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={isRunning || isSubmitting}
                  onClick={resetCode}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                <Button 
                  size="sm" 
                  disabled={isRunning || isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                  onClick={runCode}
                >
                  {isRunning ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                  ) : (
                    <Play className="w-4 h-4 mr-1" />
                  )}
                  Run
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            {!evaluation ? (
              <>
                {/* Code Lines with Line Numbers */}
                <div className="flex-1 overflow-y-auto bg-gray-900 rounded-lg p-2">
                  <div className="font-mono text-sm">
                    {codeLines.map((line, idx) => {
                      const lineNum = idx + 1;
                      const isIdentified = identifiedBugs.includes(lineNum);
                      
                      return (
                        <div 
                          key={`line-${lineNum}`}
                          className={`flex items-start hover:bg-gray-800/50 cursor-pointer ${
                            isIdentified ? 'bg-red-500/20' : ''
                          }`}
                          onClick={() => toggleBugIdentification(lineNum)}
                        >
                          <span className={`w-8 text-right pr-2 select-none ${
                            isIdentified ? 'text-red-500 font-bold' : 'text-gray-500'
                          }`}>
                            {lineNum}
                          </span>
                          <span className="flex-1 text-gray-300 whitespace-pre">{line || ' '}</span>
                          {isIdentified && (
                            <Bug className="w-4 h-4 text-red-500 mr-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="text-yellow-500">Click on lines</span> to mark them as buggy. 
                    Identified bugs: <span className="text-red-500 font-bold">{identifiedBugs.length}</span>
                  </p>
                  <textarea
                    value={code}
                    className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300 resize-none"
                    placeholder="Edit the code here to fix the bugs..."
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    disabled={isSubmitting}
                    onClick={submitSolution}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Submit Solution
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              /* Evaluation Results */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Score Card */}
                <div className={`p-6 rounded-xl text-center ${
                  evaluation.score >= 80 ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30' :
                  evaluation.score >= 60 ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30' :
                  'bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30'
                }`}>
                  <div className="text-5xl font-bold mb-2">
                    {evaluation.score}%
                  </div>
                  <p className="text-gray-400">{evaluation.feedback}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {evaluation.bugsFound}/{evaluation.totalBugs}
                    </div>
                    <p className="text-xs text-gray-500">Bugs Found</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {evaluation.fixAccuracy}%
                    </div>
                    <p className="text-xs text-gray-500">Fix Accuracy</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {evaluation.problemSolving}%
                    </div>
                    <p className="text-xs text-gray-500">Problem Solving</p>
                  </div>
                </div>

                {/* Missed Bugs */}
                {evaluation.missedBugs.length > 0 && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Missed Bugs
                    </h4>
                    <ul className="space-y-2">
                      {evaluation.missedBugs.map((bug, idx) => (
                        <li key={`missed-${bug.lineNumber}-${idx}`} className="text-sm text-gray-300">
                          <span className="text-red-400">Line {bug.lineNumber}:</span> {bug.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Found Bugs */}
                {evaluation.foundBugs.length > 0 && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Correctly Identified
                    </h4>
                    <ul className="space-y-2">
                      {evaluation.foundBugs.map((bug, idx) => (
                        <li key={`found-${bug.lineNumber}-${idx}`} className="text-sm text-gray-300">
                          <span className="text-green-400">Line {bug.lineNumber}:</span> {bug.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Next Button */}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={nextProblem}
                >
                  {currentProblemIndex < totalProblems - 1 ? (
                    <>
                      Next Problem
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      View Results
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Session Progress */}
      {sessionScores.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Problem Scores:</span>
                {sessionScores.map((score, idx) => (
                  <Badge 
                    key={`score-${idx}`}
                    className={`${
                      score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                  >
                    P{idx + 1}: {score}%
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-white">
                  Average: {Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
