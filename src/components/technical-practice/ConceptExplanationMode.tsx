"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { useTechPrep } from '@/contexts/TechPrepContext';
import { SAMPLE_CONCEPTUAL_QUESTIONS } from '@/data/technical-practice-data';
import { TechnicalDomain } from '@/types/technical-practice';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    CheckCircle,
    Clock,
    Lightbulb,
    RotateCcw,
    Send,
    Target, TrendingUp, Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface ConceptExplanationModeProps {
  domain: string;
  onComplete: () => void;
}

interface Evaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  missingPoints: string[];
}

export default function ConceptExplanationMode({ domain, onComplete }: ConceptExplanationModeProps) {
  useTechPrep();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);

  // Get questions for this domain
  const questions = SAMPLE_CONCEPTUAL_QUESTIONS.filter(
    q => q.domain === (domain as TechnicalDomain)
  );
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = Math.min(questions.length, 5);

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

  const evaluateAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) {
      return;
    }

    setIsEvaluating(true);
    
    // Simulate AI evaluation (would integrate with actual AI)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock evaluation based on key points matching
    const keyPoints = currentQuestion.keyPoints || [];
    const answerLower = userAnswer.toLowerCase();
    const keywordMatches = keyPoints.filter((kw: string) => 
      answerLower.includes(kw.toLowerCase())
    );
    
    const matchPercentage = keyPoints.length > 0 
      ? (keywordMatches.length / keyPoints.length) * 100 
      : 50;
    const score = Math.min(100, Math.max(0, Math.round(matchPercentage + (userAnswer.length > 100 ? 15 : 0))));
    
    const mockEvaluation: Evaluation = {
      score,
      feedback: score >= 80 
        ? "Excellent explanation! You covered most key concepts clearly."
        : score >= 60 
          ? "Good attempt! Consider adding more specific details."
          : "Keep practicing! Focus on covering the main concepts.",
      strengths: keywordMatches.slice(0, 3).map((kw: string) => `Covered: ${kw}`),
      improvements: [
        "Add more real-world examples",
        "Explain time/space complexity when relevant",
        "Use proper technical terminology"
      ].slice(0, score < 70 ? 3 : 1),
      missingPoints: keyPoints.filter((kw: string) => 
        !answerLower.includes(kw.toLowerCase())
      ).slice(0, 3)
    };

    setEvaluation(mockEvaluation);
    setSessionScores(prev => [...prev, score]);
    setIsEvaluating(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setEvaluation(null);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  const resetAnswer = () => {
    setUserAnswer('');
    setEvaluation(null);
    setShowHint(false);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400">No questions available for this domain.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-250px)] min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Concept Explanation Mode</h2>
          </div>
          <p className="text-gray-400 mt-1">Explain technical concepts as you would in a real interview</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeSpent)}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-blue-600">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="h-2" />

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-120px)]">
        {/* Left Panel - Question */}
        <Card className="bg-gray-800/70 border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Question
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{currentQuestion.topic}</Badge>
                <Badge className={`
                  ${currentQuestion.difficulty === 'easy' ? 'bg-green-600' : 
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}
                `}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-900 rounded-lg"
                >
                  <p className="text-xl text-white leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </motion.div>

                {/* Hints Section */}
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHint ? 'Hide Hints' : 'Show Hints'}
                  </Button>
                  
                  <AnimatePresence>
                    {showHint && currentQuestion.hints && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        {currentQuestion.hints.map((hint: string, idx: number) => (
                          <div key={`hint-${idx}`} className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <p className="text-yellow-400 text-sm">{hint}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Key Points to Cover */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm mb-2 font-medium">Key Points to Cover:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQuestion.keyPoints?.map((point: string, idx: number) => (
                      <Badge key={`point-${idx}`} variant="outline" className="border-blue-500/50 text-blue-400">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel - Answer & Evaluation */}
        <Card className="bg-gray-800/70 border-gray-700 overflow-hidden flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Your Answer
              </span>
              <div className="flex items-center gap-2">
                {/* Voice input button */}
                <VoiceInputButton
                  currentValue={userAnswer}
                  onValueChange={setUserAnswer}
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={resetAnswer}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {!evaluation ? (
              <>
                <Textarea
                  value={userAnswer}
                  placeholder="Type your explanation here... or use 🎤 voice input. Be detailed and cover the key concepts."
                  className="flex-1 min-h-[300px] bg-gray-900 border-gray-700 text-white resize-none"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)}
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-400">
                    {userAnswer.length} characters
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!userAnswer.trim() || isEvaluating}
                    onClick={evaluateAnswer}
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Answer
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <ScrollArea className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Score */}
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

                  {/* Strengths */}
                  {evaluation.strengths.length > 0 && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.strengths.map((strength: string, idx: number) => (
                          <li key={`strength-${idx}`} className="text-sm text-gray-300">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {evaluation.improvements.length > 0 && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.improvements.map((improvement: string, idx: number) => (
                          <li key={`improvement-${idx}`} className="text-sm text-gray-300">• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Missing Points */}
                  {evaluation.missingPoints.length > 0 && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <h4 className="font-medium text-red-400 mb-2">Missing Key Points</h4>
                      <div className="flex flex-wrap gap-2">
                        {evaluation.missingPoints.map((point: string, idx: number) => (
                          <Badge key={`missing-${idx}`} variant="outline" className="border-red-500/50 text-red-400">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={nextQuestion}
                  >
                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <>
                        Next Question
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
              </ScrollArea>
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
                <span className="text-gray-400">Session Scores:</span>
                {sessionScores.map((score, idx) => (
                  <Badge 
                    key={`score-${idx}`}
                    className={`${
                      score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                  >
                    Q{idx + 1}: {score}%
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
