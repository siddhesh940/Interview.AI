"use client";

import { SessionResultData } from '@/components/technical-practice/ConceptExplanationMode';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowRight,
    Award,
    BarChart3,
    BookOpen,
    Brain,
    Bug,
    CheckCircle,
    Clock,
    Code,
    MessageSquare,
    Star,
    Target, Trophy,
    Zap
} from 'lucide-react';
import React from 'react';

interface TechPrepResultsProps {
  domain: string;
  mode: string;
  sessionData?: SessionResultData | null;
  onRetry: () => void;
  onNewSession: () => void;
}

// Domain names mapping
const domainNames: { [key: string]: string } = {
  dsa: 'Data Structures & Algorithms',
  dbms: 'Database Management Systems',
  os: 'Operating Systems',
  oops: 'Object Oriented Programming',
  cn: 'Computer Networks',
  c: 'C Programming',
  cpp: 'C++ Programming',
  java: 'Java Programming',
  python: 'Python Programming',
  javascript: 'JavaScript',
};

// Mode names mapping
const modeNames: { [key: string]: { name: string; icon: React.ComponentType<any>; color: string } } = {
  concept: { name: 'Concept Explanation', icon: BookOpen, color: 'text-blue-500' },
  coding: { name: 'Coding Practice', icon: Code, color: 'text-green-500' },
  followup: { name: 'Follow-Up Questions', icon: MessageSquare, color: 'text-purple-500' },
  debugging: { name: 'Debugging Mode', icon: Bug, color: 'text-red-500' },
};

export default function TechPrepResults({ domain, mode, sessionData, onRetry, onNewSession }: TechPrepResultsProps) {
  // Build results from real session data or use fallback
  const buildResults = () => {
    if (sessionData && sessionData.scores.length > 0) {
      const scores = sessionData.scores;
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const correctCount = scores.filter(s => s >= 60).length;
      
      // Build concept strength from per-question topic/score
      const conceptStrength: Record<string, number> = {};
      sessionData.questions.forEach(q => {
        conceptStrength[q.topic] = q.score;
      });

      // Determine strong and weak areas
      const strongAreas = sessionData.questions
        .filter(q => q.score >= 70)
        .map(q => q.topic);
      const weakAreas = sessionData.questions
        .filter(q => q.score < 60)
        .map(q => q.topic);
      const midAreas = sessionData.questions
        .filter(q => q.score >= 60 && q.score < 70)
        .map(q => q.topic);

      // Generate dynamic recommendations based on actual performance
      const recommendations: string[] = [];
      weakAreas.forEach(area => {
        recommendations.push(`Focus on strengthening your understanding of ${area}`);
      });
      midAreas.forEach(area => {
        recommendations.push(`Review ${area} concepts — you're close to mastering it`);
      });
      strongAreas.forEach(area => {
        recommendations.push(`Great work on ${area}! Try more advanced problems`);
      });
      if (recommendations.length === 0) {
        recommendations.push('Keep practicing to maintain your skills');
      }

      // Dynamic badges based on real performance
      const badges: { name: string; icon: React.ComponentType<any>; description: string }[] = [];
      if (avgScore >= 90) {
        badges.push({ name: 'Concept Master', icon: Brain, description: 'Scored 90%+ overall' });
      }
      if (avgScore >= 80) {
        badges.push({ name: 'High Achiever', icon: Trophy, description: 'Scored 80%+ overall' });
      }
      if (sessionData.timeSpent < scores.length * 120) {
        badges.push({ name: 'Quick Thinker', icon: Zap, description: 'Answered quickly' });
      }
      if (correctCount === scores.length) {
        badges.push({ name: 'Perfect Session', icon: Award, description: 'All answers scored 60%+' });
      }
      if (scores.some(s => s >= 90)) {
        badges.push({ name: 'Expert Answer', icon: Star, description: 'Scored 90%+ on a question' });
      }

      return {
        overallScore: avgScore,
        questionsAttempted: scores.length,
        correctAnswers: correctCount,
        timeSpent: sessionData.timeSpent,
        conceptStrength,
        weakAreas: weakAreas.length > 0 ? weakAreas : ['None — great job!'],
        strongAreas: strongAreas.length > 0 ? strongAreas : ['Keep practicing!'],
        recommendations,
        badges,
        improvement: {
          previousScore: 0,
          currentScore: avgScore,
          change: avgScore,
        }
      };
    }

    // Fallback for other modes that don't pass session data yet
    return {
      overallScore: 0,
      questionsAttempted: 0,
      correctAnswers: 0,
      timeSpent: 0,
      conceptStrength: {} as Record<string, number>,
      weakAreas: ['No data available'],
      strongAreas: ['No data available'],
      recommendations: ['Complete a practice session to see recommendations'],
      badges: [] as { name: string; icon: React.ComponentType<any>; description: string }[],
      improvement: {
        previousScore: 0,
        currentScore: 0,
        change: 0,
      }
    };
  };

  const results = buildResults();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) {return 'text-emerald-600 dark:text-emerald-400';}
    if (score >= 60) {return 'text-amber-600 dark:text-amber-400';}
    
return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) {return 'bg-emerald-500';}
    if (score >= 60) {return 'bg-amber-500';}
    
return 'bg-red-500';
  };

  const ModeIcon = modeNames[mode]?.icon || BookOpen;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Session Complete!</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {domainNames[domain]} - {modeNames[mode]?.name}
        </p>
      </motion.div>

      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 border-slate-200 dark:border-gray-700 overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Overall Score */}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-40 h-40">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#d1d5db"
                      strokeWidth="12"
                      className="dark:stroke-gray-600"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke={results.overallScore >= 80 ? '#22c55e' : results.overallScore >= 60 ? '#eab308' : '#ef4444'}
                      strokeWidth="12"
                      strokeDasharray={`${results.overallScore * 4.4} 440`}
                      strokeLinecap="round"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}%
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="text-slate-600 dark:text-slate-300">Questions</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">{results.questionsAttempted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-600 dark:text-slate-300">Correct</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{results.correctAnswers}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-slate-600 dark:text-slate-300">Time</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">{formatTime(results.timeSpent)}</span>
                </div>
              </div>

              {/* Session Summary */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/30">
                  <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{results.overallScore}%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {results.correctAnswers}/{results.questionsAttempted} answers scored 60%+
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Concept Strength */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Concept Strength Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(results.conceptStrength).map(([concept, score], index) => (
                <motion.div
                  key={concept}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-700 dark:text-slate-300">{concept}</span>
                    <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className={`h-full rounded-full ${getProgressColor(score)}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-emerald-50 dark:bg-slate-800/90 border-emerald-200 dark:border-slate-700 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                Strong Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.strongAreas.map((area, i) => (
                  <Badge key={i} className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-red-50 dark:bg-slate-800/90 border-red-200 dark:border-slate-700 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                Needs Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.weakAreas.map((area, i) => (
                  <Badge key={i} className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/30">
                    <Target className="w-3 h-3 mr-1" />
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
              <Brain className="w-5 h-5 text-purple-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.recommendations.map((rec, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900/50 rounded-lg border border-slate-100 dark:border-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{i + 1}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{rec}</p>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges Earned */}
      {results.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10 border-amber-200 dark:border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-yellow-400">
                <Award className="w-5 h-5" />
                Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {results.badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.2, type: 'spring' }}
                    className="flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-900/50 rounded-xl border border-amber-200 dark:border-yellow-500/20"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-yellow-500/20 flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-amber-500 dark:text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-bold text-amber-700 dark:text-yellow-400">{badge.name}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-4 pt-4"
      >
        <Button variant="outline" size="lg" onClick={onRetry} className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
          <ModeIcon className="w-5 h-5 mr-2" />
          Practice Again
        </Button>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          onClick={onNewSession}
        >
          New Session
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
