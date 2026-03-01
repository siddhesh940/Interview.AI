"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTechPrep } from '@/contexts/TechPrepContext';
import { SAMPLE_CODING_QUESTIONS } from '@/data/technical-practice-data';
import { TechnicalDomain, TestCase } from '@/types/technical-practice';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    Clock,
    Code,
    Copy,
    Eye, EyeOff,
    Lightbulb,
    Play, RotateCcw,
    Terminal,
    XCircle,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CodingPracticeModeProps {
  domain: string;
  onComplete: () => void;
}

interface CodeEvaluation {
  score: number;
  correctness: number;
  efficiency: number;
  codeQuality: number;
  feedback: string;
  testResults: { passed: boolean; testCase: TestCase; actual?: string }[];
  timeComplexity: string;
  spaceComplexity: string;
}

export default function CodingPracticeMode({ domain, onComplete }: CodingPracticeModeProps) {
  useTechPrep();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [evaluation, setEvaluation] = useState<CodeEvaluation | null>(null);
  const [output, setOutput] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('problem');
  const [lastTestResults, setLastTestResults] = useState<{ passed: boolean; testCase: TestCase; actual?: string }[]>([]);

  // Get problems for this domain
  const domainProblems = SAMPLE_CODING_QUESTIONS.filter(
    q => q.domain === (domain as TechnicalDomain)
  );
  const problems = domainProblems.length > 0 ? domainProblems : 
    SAMPLE_CODING_QUESTIONS.filter(q => q.domain === 'dsa');
  const currentProblem = problems[currentProblemIndex];
  const totalProblems = Math.min(problems.length, 3);

  // Initialize with template code
  useEffect(() => {
    if (currentProblem) {
      setCode(currentProblem.templateCode);
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

    // Check if user has written actual code (not just template)
    const hasWrittenCode = code.trim().length > currentProblem.templateCode.trim().length + 20;
    
    // Generate test results based on code written
    const testResults = currentProblem.testCases.map(tc => {
      const passed = hasWrittenCode ? Math.random() > 0.15 : Math.random() > 0.6;
      // Generate a wrong output for failed tests
      let actualOutput = tc.expectedOutput;
      if (!passed) {
        // Generate a plausible wrong answer
        if (typeof tc.expectedOutput === 'number' || !isNaN(Number(tc.expectedOutput))) {
          actualOutput = String(Number(tc.expectedOutput) + Math.floor(Math.random() * 5) - 2);
        } else if (tc.expectedOutput === 'true' || tc.expectedOutput === 'false') {
          actualOutput = tc.expectedOutput === 'true' ? 'false' : 'true';
        } else {
          actualOutput = 'undefined';
        }
      }
      
return {
        passed,
        testCase: tc,
        actual: actualOutput
      };
    });
    
    // Store test results for submit
    setLastTestResults(testResults);
    
    const passed = testResults.filter(r => r.passed).length;
    const total = testResults.length;

    if (passed === total) {
      setOutput({
        type: 'success',
        message: `✅ All ${total} test cases passed!`
      });
    } else {
      setOutput({
        type: 'error',
        message: `❌ ${passed}/${total} test cases passed. Check your solution.`
      });
    }

    setIsRunning(false);
  };

  const submitSolution = async () => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Use stored test results from last run, or generate new ones if not run yet
    let testResults = lastTestResults;
    if (testResults.length === 0) {
      // User submitted without running first - generate results
      const hasWrittenCode = code.trim().length > currentProblem.templateCode.trim().length + 20;
      testResults = currentProblem.testCases.map(tc => ({
        passed: hasWrittenCode ? Math.random() > 0.2 : Math.random() > 0.7,
        testCase: tc,
        actual: 'simulated output'
      }));
    }

    const passedCount = testResults.filter(r => r.passed).length;
    const correctness = Math.round((passedCount / testResults.length) * 100);
    
    // Check code quality
    const codeLength = code.length;
    const solutionLength = currentProblem.solution.length;
    const efficiency = Math.min(100, Math.round((solutionLength / codeLength) * 80) + 20);
    
    const codeQuality = Math.round(
      (code.includes('//') || code.includes('/*') ? 10 : 0) +
      (code.split('\n').length > 5 ? 20 : 10) +
      70
    );

    const overallScore = Math.round(correctness * 0.5 + efficiency * 0.25 + codeQuality * 0.25);

    const mockEvaluation: CodeEvaluation = {
      score: overallScore,
      correctness,
      efficiency,
      codeQuality,
      feedback: overallScore >= 80 
        ? "Excellent solution! Clean code with good efficiency."
        : overallScore >= 60 
          ? "Good attempt! Consider optimizing your solution."
          : "Keep practicing! Focus on correctness first, then efficiency.",
      testResults,
      timeComplexity: currentProblem.timeComplexity,
      spaceComplexity: currentProblem.spaceComplexity
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
      setHintsRevealed(0);
      setShowSolution(false);
      setLastTestResults([]);
      setActiveTab('problem');
    } else {
      onComplete();
    }
  };

  const resetCode = () => {
    if (currentProblem) {
      setCode(currentProblem.templateCode);
    }
    setOutput(null);
  };

  const revealNextHint = () => {
    const hints = currentProblem.hints || [];
    if (hintsRevealed < hints.length) {
      setHintsRevealed(prev => prev + 1);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Code copied to clipboard!');
    }
  };

  if (!currentProblem) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500 dark:text-slate-400">No coding problems available for this domain.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-250px)] min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-green-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Coding Practice Mode</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Solve coding problems with AI evaluation</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeSpent)}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-green-600">
            Problem {currentProblemIndex + 1} / {totalProblems}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentProblemIndex + 1) / totalProblems) * 100} className="h-2" />

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-120px)]">
        {/* Left Panel - Problem Description */}
        <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900 dark:text-white">{currentProblem.topic}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`
                    ${currentProblem.difficulty === 'easy' ? 'bg-green-600' : 
                      currentProblem.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}
                  `}>
                    {currentProblem.difficulty}
                  </Badge>
                  <Badge variant="secondary">{currentProblem.estimatedTime} min</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto">
            <Tabs className="h-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 dark:bg-gray-900">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="output" className={output ? (output.type === 'success' ? 'text-green-400' : 'text-red-400') : ''}>Output {output && '●'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problem" className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Description</h4>
                  <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{currentProblem.question}</p>
                </div>

                {/* Constraints */}
                {currentProblem.constraints && currentProblem.constraints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Constraints</h4>
                    <ul className="space-y-1">
                      {currentProblem.constraints.map((constraint, idx) => (
                        <li key={`constraint-${idx}`} className="text-slate-600 dark:text-slate-400 text-sm">
                          • {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Test Cases Preview */}
                <div>
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Test Cases</h4>
                  {currentProblem.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
                    <div key={`tc-${tc.id}-${idx}`} className="bg-slate-100 dark:bg-gray-900 p-3 rounded-lg mb-2 font-mono text-sm">
                      <p className="text-slate-600 dark:text-slate-400">Input: <span className="text-slate-900 dark:text-white">{tc.input}</span></p>
                      <p className="text-slate-600 dark:text-slate-400">Expected: <span className="text-green-600 dark:text-green-400">{tc.expectedOutput}</span></p>
                      {tc.description && (
                        <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">{tc.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Complexity Requirements */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    <span className="font-medium">Expected Complexity:</span> Time: {currentProblem.timeComplexity}, Space: {currentProblem.spaceComplexity}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="hints" className="mt-4 space-y-4">
                {!showHints ? (
                  <div className="text-center py-8">
                    <Lightbulb className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Need help with the solution?</p>
                    <p className="text-yellow-600 dark:text-yellow-500 text-sm mb-4">Using hints may affect your score</p>
                    <Button 
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => setShowHints(true)}
                    >
                      Show Hints
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentProblem.hints?.slice(0, hintsRevealed).map((hint, idx) => (
                      <motion.div
                        key={`hint-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                      >
                        <p className="text-yellow-400">{hint}</p>
                      </motion.div>
                    ))}
                    {hintsRevealed < (currentProblem.hints?.length || 0) && (
                      <Button 
                        variant="outline" 
                        className="w-full border-yellow-500 text-yellow-500"
                        onClick={revealNextHint}
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Reveal Next Hint
                      </Button>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className={`w-full ${showSolution ? 'border-green-500 text-green-600 dark:text-green-500' : 'border-slate-400 dark:border-gray-500 text-slate-500 dark:text-gray-500'}`}
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </Button>
                  
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Reference Solution:</h4>
                        <pre className="p-4 bg-slate-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-sm text-green-600 dark:text-green-400">
                          {currentProblem.solution}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>
              
              <TabsContent value="output" className="mt-4">
                {output ? (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      output.type === 'success' ? 'bg-green-900 border border-green-600' : 'bg-red-900 border border-red-600'
                    }`}>
                      <p className={output.type === 'success' ? 'text-green-300 font-medium' : 'text-red-300 font-medium'}>
                        {output.message}
                      </p>
                    </div>
                    
                    {/* Show detailed test results */}
                    {lastTestResults.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-900 dark:text-white">Test Results:</h4>
                        {lastTestResults.map((result, idx) => (
                          <div 
                            key={`output-test-${result.testCase.id}-${idx}`}
                            className={`p-4 rounded-lg ${
                              result.passed 
                                ? 'bg-green-900/80 border border-green-600' 
                                : 'bg-red-900/80 border border-red-600'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              {result.passed ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                              <span className={`font-medium ${result.passed ? 'text-green-300' : 'text-red-300'}`}>
                                Test Case {idx + 1}: {result.testCase.description || 'Test'}
                              </span>
                            </div>
                            <div className="font-mono text-sm space-y-2 ml-7 bg-slate-100 dark:bg-gray-900 p-3 rounded">
                              <p className="text-slate-700 dark:text-slate-300">
                                Input: <span className="text-cyan-600 dark:text-cyan-400">{result.testCase.input}</span>
                              </p>
                              <p className="text-slate-700 dark:text-slate-300">
                                Expected: <span className="text-green-600 dark:text-green-400">{result.testCase.expectedOutput}</span>
                              </p>
                              {!result.passed && (
                                <p className="text-slate-700 dark:text-slate-300">
                                  Your Output: <span className="text-red-600 dark:text-red-400">{result.actual || 'undefined'}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Run your code to see output</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Panel - Code Editor & Results */}
        <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Editor
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32 bg-slate-100 dark:bg-gray-700 border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600">
                    {currentProblem.languageSupport.map(lang => (
                      <SelectItem key={lang} value={lang} className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-700">{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="icon" variant="outline" onClick={copyCode}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={resetCode}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            {!evaluation ? (
              <>
                {/* Code Editor */}
                <textarea
                  value={code}
                  className="flex-1 w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-300 resize-none"
                  spellCheck={false}
                  onChange={(e) => setCode(e.target.value)}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {code.split('\n').length} lines
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      disabled={isRunning || isSubmitting}
                      onClick={runCode}
                    >
                      {isRunning ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      Run Code
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
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
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Evaluation Results */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 overflow-y-auto"
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
                  <p className="text-slate-600 dark:text-slate-400">{evaluation.feedback}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-100 dark:bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {evaluation.correctness}%
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">Correctness</p>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {evaluation.efficiency}%
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">Efficiency</p>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-gray-900 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {evaluation.codeQuality}%
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">Code Quality</p>
                  </div>
                </div>

                {/* Test Results */}
                <div className="p-4 bg-slate-100 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Test Results</h4>
                  <div className="space-y-2">
                    {evaluation.testResults.map((result, idx) => (
                      <div 
                        key={`result-${idx}`}
                        className={`flex items-center gap-2 p-2 rounded ${
                          result.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Test Case {idx + 1}: {result.testCase.description || `Input: ${result.testCase.input}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    <span className="font-medium">Expected:</span> Time: {evaluation.timeComplexity}, Space: {evaluation.spaceComplexity}
                  </p>
                </div>

                {/* Next Button */}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
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
        <Card className="bg-white/60 dark:bg-gray-800/50 border-slate-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400">Problem Scores:</span>
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
                <span className="font-bold text-slate-900 dark:text-white">
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
