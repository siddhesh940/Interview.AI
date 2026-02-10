"use client";

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
    Target,
    TrendingUp,
    Trophy,
    Zap
} from 'lucide-react';
import React from 'react';

interface TechPrepResultsProps {
  domain: string;
  mode: string;
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

export default function TechPrepResults({ domain, mode, onRetry, onNewSession }: TechPrepResultsProps) {
  // Mock results data - in real app, this would come from state/API
  const results = {
    overallScore: 76,
    questionsAttempted: 5,
    correctAnswers: 4,
    timeSpent: 1245, // seconds
    conceptStrength: {
      'Arrays': 85,
      'Linked Lists': 72,
      'Trees': 68,
      'Sorting': 90,
      'Searching': 78,
    },
    weakAreas: ['Trees', 'Graphs', 'Dynamic Programming'],
    strongAreas: ['Sorting', 'Arrays', 'Searching'],
    recommendations: [
      'Practice more Tree traversal problems',
      'Review Graph algorithms like BFS and DFS',
      'Attempt more Dynamic Programming questions',
      'Your Sorting concepts are strong - try harder problems',
    ],
    badges: [
      { name: 'Quick Thinker', icon: Zap, description: 'Answered within 2 minutes' },
      { name: 'Concept Master', icon: Brain, description: 'Scored 90%+ in a concept' },
    ],
    improvement: {
      previousScore: 68,
      currentScore: 76,
      change: 8,
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) {return 'text-green-500';}
    if (score >= 60) {return 'text-yellow-500';}
    
return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) {return 'bg-green-500';}
    if (score >= 60) {return 'bg-yellow-500';}
    
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
        <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
        <p className="text-gray-400">
          {domainNames[domain]} - {modeNames[mode]?.name}
        </p>
      </motion.div>

      {/* Main Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 overflow-hidden">
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
                      stroke="#374151"
                      strokeWidth="12"
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
                    <span className="text-gray-400 text-sm">Overall Score</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-400">Questions</span>
                  </div>
                  <span className="font-bold">{results.questionsAttempted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Correct</span>
                  </div>
                  <span className="font-bold text-green-500">{results.correctAnswers}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-400">Time</span>
                  </div>
                  <span className="font-bold">{formatTime(results.timeSpent)}</span>
                </div>
              </div>

              {/* Improvement */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-500">+{results.improvement.change}%</p>
                  <p className="text-sm text-gray-400">Improvement</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {results.improvement.previousScore}% → {results.improvement.currentScore}%
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
        <Card className="bg-gray-800/70 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                    <span className="text-gray-300">{concept}</span>
                    <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
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
          <Card className="bg-gray-800/70 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-500">
                <CheckCircle className="w-5 h-5" />
                Strong Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.strongAreas.map((area, i) => (
                  <Badge key={i} className="bg-green-500/20 text-green-400 border-green-500/30">
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
          <Card className="bg-gray-800/70 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                Needs Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.weakAreas.map((area, i) => (
                  <Badge key={i} className="bg-red-500/20 text-red-400 border-red-500/30">
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
        <Card className="bg-gray-800/70 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                  className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-400">{i + 1}</span>
                  </div>
                  <p className="text-gray-300">{rec}</p>
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
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-500">
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
                    className="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <badge.icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="font-bold text-yellow-400">{badge.name}</p>
                      <p className="text-xs text-gray-400">{badge.description}</p>
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
        <Button variant="outline" size="lg" onClick={onRetry}>
          <ModeIcon className="w-5 h-5 mr-2" />
          Practice Again
        </Button>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={onNewSession}
        >
          New Session
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
