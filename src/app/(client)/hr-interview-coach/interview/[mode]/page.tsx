"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { InterviewSession, useHRCoach } from '@/contexts/HRCoachContext';
import { evaluationParameters, hrQuestions, interviewModes } from '@/data/hr-coach-data';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Lightbulb,
  Play,
  Send,
  SkipForward,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

// Improved AI evaluation with better NLP logic
function evaluateResponse(response: string, question: typeof hrQuestions[0]) {
  const wordCount = response.split(' ').filter(w => w).length;
  const lowerResponse = response.toLowerCase();
  const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Red flags detection
  const redFlagsDetected: string[] = [];
  
  // Negativity patterns
  const negativityWords = ['terrible', 'worst', 'hate', 'awful', 'horrible', 'bad company', 'toxic', 'stupid', 'idiot', 'useless'];
  if (negativityWords.some(word => lowerResponse.includes(word))) {
    redFlagsDetected.push('negativity');
  }
  
  // Badmouthing previous employer
  const badmouthPatterns = ['my boss was', 'my manager was bad', 'they treated', 'unfair', 'blamed me', 'their fault', 'they never'];
  if (badmouthPatterns.some(pattern => lowerResponse.includes(pattern))) {
    redFlagsDetected.push('badmouthing_employer');
  }
  
  // Rigidity patterns
  const rigidityWords = ['never', 'impossible', 'cannot', 'won\'t', 'refuse', 'only if', 'no way'];
  if (rigidityWords.some(word => lowerResponse.includes(word))) {
    redFlagsDetected.push('rigidity');
  }
  
  // Unrealistic expectations
  const unrealisticPatterns = ['double salary', 'triple', '100% hike', '200%', 'at least 50%', 'minimum 2x'];
  if (unrealisticPatterns.some(pattern => lowerResponse.includes(pattern))) {
    redFlagsDetected.push('unrealistic_expectations');
  }
  
  // Over-confidence / arrogance
  const arrogancePatterns = ['i am the best', 'nobody can', 'i never fail', 'i never make mistakes', 'i am perfect', 'always right'];
  if (arrogancePatterns.some(pattern => lowerResponse.includes(pattern))) {
    redFlagsDetected.push('arrogance');
  }
  
  // Vague/lazy response detection
  const vaguePatterns = ['i don\'t know', 'not sure', 'maybe', 'i guess', 'whatever', 'anything is fine', 'no idea'];
  const isVague = vaguePatterns.some(pattern => lowerResponse.includes(pattern));
  
  // Check for generic/copy-paste answers
  const genericPhrases = ['i am a hard worker', 'team player', 'quick learner', 'passionate about'];
  const genericCount = genericPhrases.filter(phrase => lowerResponse.includes(phrase)).length;
  const isGeneric = genericCount >= 2 && wordCount < 50;
  
  // STAR method detection (for behavioral questions)
  const starKeywords = {
    situation: ['situation', 'when i', 'there was', 'at my previous', 'during my', 'one time'],
    task: ['task was', 'responsible for', 'my role', 'had to', 'needed to', 'assigned'],
    action: ['i did', 'i took', 'i decided', 'i implemented', 'i spoke', 'i analyzed', 'i created', 'i solved'],
    result: ['result', 'outcome', 'led to', 'achieved', 'improved', 'successfully', 'learned', 'increased', 'decreased']
  };
  
  const hasSTAR = question.category === 'behavioral' ? {
    situation: starKeywords.situation.some(k => lowerResponse.includes(k)),
    task: starKeywords.task.some(k => lowerResponse.includes(k)),
    action: starKeywords.action.some(k => lowerResponse.includes(k)),
    result: starKeywords.result.some(k => lowerResponse.includes(k))
  } : null;
  
  const starScore = hasSTAR ? 
    (Object.values(hasSTAR).filter(Boolean).length / 4) * 100 : 100;
  
  // Check for ideal points mentioned
  const idealPointsMatched = question.idealPoints.filter(point => {
    const pointWords = point.toLowerCase().split(' ').filter(w => w.length > 3);

    return pointWords.some(word => lowerResponse.includes(word));
  }).length;
  const idealPointsScore = (idealPointsMatched / question.idealPoints.length) * 100;
  
  // Specificity check - does answer have specific examples?
  const specificityIndicators = ['for example', 'specifically', 'such as', 'instance', 'percent', '%', 'months', 'years', 'project', 'team of'];
  const hasSpecifics = specificityIndicators.some(ind => lowerResponse.includes(ind));
  
  // Calculate penalties
  const redFlagPenalty = redFlagsDetected.length * 15;
  const vaguePenalty = isVague ? 25 : 0;
  const genericPenalty = isGeneric ? 20 : 0;
  const tooShortPenalty = wordCount < 20 ? 30 : (wordCount < 40 ? 15 : 0);
  const tooLongPenalty = wordCount > 300 ? 10 : 0;
  
  // Calculate bonuses
  const specificityBonus = hasSpecifics ? 10 : 0;
  const structureBonus = sentences.length >= 3 && sentences.length <= 8 ? 10 : 0;
  const starBonus = question.category === 'behavioral' && starScore >= 75 ? 15 : 0;
  
  // Base score calculation
  let baseScore = 50; // Start from 50, not word count
  baseScore += Math.min(20, wordCount * 0.3); // Small word count bonus, max 20
  baseScore += idealPointsScore * 0.25; // Ideal points contribution
  baseScore += specificityBonus;
  baseScore += structureBonus;
  baseScore += starBonus;
  baseScore -= redFlagPenalty;
  baseScore -= vaguePenalty;
  baseScore -= genericPenalty;
  baseScore -= tooShortPenalty;
  baseScore -= tooLongPenalty;
  
  // Clamp base score
  baseScore = Math.min(95, Math.max(15, baseScore));
  
  // Calculate individual scores with some variance
  const variance = () => (Math.random() - 0.5) * 10;
  
  const scores = {
    confidence: Math.min(100, Math.max(10, baseScore + (isVague ? -20 : 5) + variance())),
    communication: Math.min(100, Math.max(10, baseScore + (sentences.length >= 2 ? 5 : -10) + variance())),
    professionalTone: Math.min(100, Math.max(10, baseScore - redFlagPenalty + variance())),
    attitude: Math.min(100, Math.max(10, baseScore - (redFlagsDetected.includes('negativity') ? 25 : 0) + variance())),
    authenticity: Math.min(100, Math.max(10, baseScore + specificityBonus - genericPenalty + variance())),
    redFlagCheck: Math.max(0, 100 - (redFlagPenalty * 2))
  };
  
  // Round scores
  Object.keys(scores).forEach(key => {
    scores[key as keyof typeof scores] = Math.round(scores[key as keyof typeof scores]);
  });

  // Generate detailed feedback
  let feedback = '';
  const feedbackParts: string[] = [];
  
  if (wordCount < 20) {
    feedbackParts.push('Your answer is too brief. Elaborate with specific examples and details.');
  } else if (wordCount < 40) {
    feedbackParts.push('Consider adding more detail to strengthen your response.');
  }
  
  if (wordCount > 300) {
    feedbackParts.push('Your answer is lengthy. Be more concise while keeping key points.');
  }
  
  if (redFlagsDetected.length > 0) {
    if (redFlagsDetected.includes('negativity')) {
      feedbackParts.push('Avoid negative language. Focus on positives and learnings.');
    }
    if (redFlagsDetected.includes('badmouthing_employer')) {
      feedbackParts.push('Never badmouth previous employers. Focus on what you learned.');
    }
    if (redFlagsDetected.includes('rigidity')) {
      feedbackParts.push('Show flexibility. Avoid absolute terms like "never" or "cannot".');
    }
    if (redFlagsDetected.includes('arrogance')) {
      feedbackParts.push('Balance confidence with humility. Avoid over-confident statements.');
    }
    if (redFlagsDetected.includes('unrealistic_expectations')) {
      feedbackParts.push('Keep salary expectations realistic and research industry standards.');
    }
  }
  
  if (isVague) {
    feedbackParts.push('Be more specific and confident. Avoid vague phrases like "maybe" or "I guess".');
  }
  
  if (isGeneric) {
    feedbackParts.push('Avoid generic buzzwords. Use specific examples from your experience.');
  }
  
  if (question.category === 'behavioral' && hasSTAR && starScore < 75) {
    const missing: string[] = [];
    if (!hasSTAR.situation) {
      missing.push('Situation');
    }
    if (!hasSTAR.task) {
      missing.push('Task');
    }
    if (!hasSTAR.action) {
      missing.push('Action');
    }
    if (!hasSTAR.result) {
      missing.push('Result');
    }
    feedbackParts.push(`Use STAR method. Missing: ${missing.join(', ')}.`);
  }
  
  if (!hasSpecifics && wordCount >= 40) {
    feedbackParts.push('Add specific examples with numbers or concrete outcomes.');
  }
  
  if (feedbackParts.length === 0) {
    if (baseScore >= 80) {
      feedback = 'Excellent response! Well-structured with good examples.';
    } else if (baseScore >= 65) {
      feedback = 'Good response. Consider adding more specific examples to strengthen it.';
    } else {
      feedback = 'Decent attempt. Add more relevant details and structure your answer better.';
    }
  } else {
    feedback = feedbackParts.slice(0, 3).join(' '); // Max 3 feedback points
  }

  return { scores, feedback, redFlagsDetected };
}

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const { startSession, submitResponse, completeSession, currentSession, abandonSession } = useHRCoach();
  
  const mode = (params?.mode as string) || 'general';
  const modeConfig = interviewModes.find(m => m.id === mode) || interviewModes[0];
  
  const [stage, setStage] = useState<'intro' | 'interview' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<{
    scores: ReturnType<typeof evaluateResponse>['scores'];
    feedback: string;
    redFlagsDetected: string[];
  } | null>(null);
  const [questions, setQuestions] = useState<typeof hrQuestions>([]);

  // Initialize session
  const initSession = useCallback(() => {
    startSession(mode as 'quick' | 'standard' | 'full' | 'stress');
  }, [mode, startSession]);

  // Get random questions based on mode
  useEffect(() => {
    if (stage === 'interview' && currentSession) {
      const shuffled = [...hrQuestions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, modeConfig.questionCount));
    }
  }, [stage, currentSession, modeConfig.questionCount]);

  const handleStart = () => {
    initSession();
    setStage('interview');
    setCurrentQuestionIndex(0);
  };

  const handleSubmitResponse = () => {
    if (!response.trim() || !questions[currentQuestionIndex]) {return;}
    
    const question = questions[currentQuestionIndex];
    const evaluation = evaluateResponse(response, question);
    
    submitResponse(
      question.id,
      response,
      evaluation.scores,
      evaluation.feedback,
      evaluation.redFlagsDetected
    );
    
    setCurrentFeedback(evaluation);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentFeedback(null);
    setResponse('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeSession();
      setStage('result');
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setResponse('');
    } else {
      completeSession();
      setStage('result');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setResponse('');
      setShowFeedback(false);
      setCurrentFeedback(null);
    }
  };

  const handleAbandon = () => {
    abandonSession();
    router.push('/hr-interview-coach');
  };


  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Stage */}
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Link href="/hr-interview-coach" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-8 justify-center">
              <ArrowLeft className="w-4 h-4" />
              Back to HR Coach
            </Link>
            
            <Card className="max-w-lg mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{modeConfig.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600">{modeConfig.description}</p>
                
                <div className="flex justify-center">
                  <div className="p-4 bg-purple-50 rounded-lg text-center min-w-[150px]">
                    <div className="text-2xl font-bold text-purple-600">{modeConfig.questionCount}</div>
                    <div className="text-sm text-gray-500">Questions</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-left">
                  <h4 className="font-medium text-yellow-800 flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    Tips for Success
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Answer clearly and concisely</li>
                    <li>• Use the STAR method for behavioral questions</li>
                    <li>• Avoid negative language about past employers</li>
                    <li>• Be honest but positive</li>
                  </ul>
                </div>

                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  onClick={handleStart}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Interview
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Interview Stage */}
        {stage === 'interview' && currentQuestion && (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                className="flex items-center gap-2 text-gray-500 hover:text-red-600"
                onClick={handleAbandon}
              >
                <XCircle className="w-4 h-4" />
                Exit Interview
              </button>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>

            {/* Progress */}
            <Progress value={progress} className="mb-6 h-2" />

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        currentQuestion.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                        currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                      <span className="text-xs text-gray-400">
                        {currentQuestion.category.replace('_', ' ')}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!showFeedback ? (
                      <div className="space-y-4">
                        {/* Answer input with voice support */}
                        <div className="relative">
                          <Textarea
                            placeholder="Type your answer here... or use 🎤 voice input"
                            value={response}
                            className="min-h-[200px] pr-12"
                            disabled={showFeedback}
                            onChange={(e) => setResponse(e.target.value)}
                          />
                          <div className="absolute top-2 right-2">
                            <VoiceInputButton
                              currentValue={response}
                              disabled={showFeedback}
                              onValueChange={setResponse}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {currentQuestionIndex > 0 && (
                              <Button
                                variant="outline"
                                onClick={handlePreviousQuestion}
                              >
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Previous
                              </Button>
                            )}
                            <span className="text-sm text-gray-500">
                              {response.split(' ').filter((w: string) => w).length} words
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              onClick={handleSkipQuestion}
                            >
                              <SkipForward className="w-4 h-4 mr-2" />
                              Skip
                            </Button>
                            <Button
                              disabled={!response.trim()}
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={handleSubmitResponse}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Feedback Display */
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {/* Overall Feedback */}
                        <div className="bg-indigo-50 p-4 rounded-lg">
                          <h4 className="font-medium text-indigo-800 mb-2">Feedback</h4>
                          <p className="text-indigo-700">{currentFeedback?.feedback}</p>
                        </div>

                        {/* Scores */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {currentFeedback && Object.entries(currentFeedback.scores).map(([key, value]) => {
                            const param = evaluationParameters.find(p => p.id === key);
                            
return (
                              <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className={`text-xl font-bold ${
                                  value >= 80 ? 'text-green-600' :
                                  value >= 60 ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {Math.round(value)}%
                                </div>
                                <div className="text-xs text-gray-500">{param?.name || key}</div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Red Flags */}
                        {currentFeedback && currentFeedback.redFlagsDetected.length > 0 && (
                          <div className="bg-red-50 p-4 rounded-lg">
                            <h4 className="font-medium text-red-800 mb-2">Red Flags Detected</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {currentFeedback.redFlagsDetected.map((flag) => (
                                <li key={flag}>• {flag.replace('_', ' ')}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Sample Answer */}
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Sample Answer</h4>
                          <p className="text-sm text-green-700 italic">{currentQuestion.sampleAnswer}</p>
                        </div>

                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={handleNextQuestion}
                        >
                          {currentQuestionIndex < questions.length - 1 ? (
                            <>
                              Next Question
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          ) : (
                            <>
                              View Results
                              <CheckCircle className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Result Stage */}
        {stage === 'result' && currentSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Interview Complete!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {currentSession.responses.length}
                    </div>
                    <div className="text-sm text-gray-500">Questions Answered</div>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-600">
                      {currentSession.responses.length > 0 
                        ? Math.round(currentSession.responses.reduce((acc: number, r: InterviewSession['responses'][0]) => acc + r.overallScore, 0) / currentSession.responses.length)
                        : 0}%
                    </div>
                    <div className="text-sm text-gray-500">Average Score</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {currentSession.responses.filter((r: InterviewSession['responses'][0]) => r.redFlagsDetected.length === 0).length}
                    </div>
                    <div className="text-sm text-gray-500">Clean Answers</div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link href="/hr-interview-coach">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Link href="/hr-interview-coach/history">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      View Detailed Report
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
