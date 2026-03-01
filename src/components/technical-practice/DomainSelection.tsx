"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, Target, TrendingUp } from 'lucide-react';
import React from 'react';

interface Domain {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  questions: number;
}

interface DomainSelectionProps {
  domains: Domain[];
  onSelect: (domainId: string) => void;
  onBack: () => void;
}

// Empty progress data - will be populated from API/database after user practices
const domainProgress: { [key: string]: { progress: number; lastScore: number; sessionsCompleted: number } } = {
  dsa: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  dbms: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  os: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  oops: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  cn: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  c: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  cpp: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  java: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  python: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
  javascript: { progress: 0, lastScore: 0, sessionsCompleted: 0 },
};

export default function DomainSelection({ domains, onSelect, onBack }: DomainSelectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Technical Domain</h2>
            <p className="text-gray-500 dark:text-gray-400">Choose a subject to practice</p>
          </div>
        </div>
      </div>

      {/* Domain Categories */}
      <div className="space-y-8">
        {/* Core CS Subjects */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Core Computer Science
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.slice(0, 5).map((domain, index) => (
              <DomainCard 
                key={domain.id} 
                domain={domain} 
                progress={domainProgress[domain.id]}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>

        {/* Programming Languages */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Programming Languages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.slice(5).map((domain, index) => (
              <DomainCard 
                key={domain.id} 
                domain={domain} 
                progress={domainProgress[domain.id]}
                index={index + 5}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Your Technical Readiness
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-500">0%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">DSA</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">0%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">DBMS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-500">0%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">OS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">0%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Python</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">0%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">OOPs</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">Start practicing to track your progress!</p>
      </div>
    </div>
  );
}

interface DomainCardProps {
  domain: Domain;
  progress: { progress: number; lastScore: number; sessionsCompleted: number };
  index: number;
  onSelect: (domainId: string) => void;
}

function DomainCard({ domain, progress, index, onSelect }: DomainCardProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="cursor-pointer"
      onClick={() => onSelect(domain.id)}
    >
      <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 hover:border-blue-500/50 transition-all overflow-hidden">
        <CardContent className="p-0">
          {/* Gradient Header */}
          <div className={`h-2 bg-gradient-to-r ${domain.color}`} />
          
          <div className="p-5">
            {/* Icon and Title */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center`}>
                  <domain.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{domain.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{domain.questions} questions</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Progress</span>
                <span className="font-medium">{progress.progress}%</span>
              </div>
              <Progress value={progress.progress} className="h-2" />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-slate-600 dark:text-slate-300">Last: {progress.lastScore}%</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {progress.sessionsCompleted} sessions
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
