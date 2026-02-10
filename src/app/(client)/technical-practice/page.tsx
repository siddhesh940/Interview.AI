"use client";

import CodingPracticeMode from '@/components/technical-practice/CodingPracticeMode';
import ConceptExplanationMode from '@/components/technical-practice/ConceptExplanationMode';
import DebuggingMode from '@/components/technical-practice/DebuggingMode';
import DomainSelection from '@/components/technical-practice/DomainSelection';
import FollowUpMode from '@/components/technical-practice/FollowUpMode';
import TechPrepResults from '@/components/technical-practice/TechPrepResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TechPrepProvider, useTechPrep } from '@/contexts/TechPrepContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle,
  ChevronRight,
  Code,
  Cpu,
  Database,
  MessageSquare,
  Network,
  Play,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  Zap
} from 'lucide-react';
import { useState } from 'react';

// Technical Domains Configuration
const technicalDomains = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: Code, color: 'from-blue-500 to-cyan-500', questions: 60 },
  { id: 'dbms', name: 'Database Management Systems', icon: Database, color: 'from-green-500 to-emerald-500', questions: 47 },
  { id: 'os', name: 'Operating Systems', icon: Cpu, color: 'from-purple-500 to-violet-500', questions: 45 },
  { id: 'oops', name: 'Object Oriented Programming', icon: Box, color: 'from-orange-500 to-amber-500', questions: 45 },
  { id: 'cn', name: 'Computer Networks', icon: Network, color: 'from-pink-500 to-rose-500', questions: 21 },
  { id: 'c', name: 'C Programming', icon: Terminal, color: 'from-gray-500 to-slate-500', questions: 44 },
  { id: 'cpp', name: 'C++ Programming', icon: Terminal, color: 'from-blue-600 to-indigo-500', questions: 46 },
  { id: 'java', name: 'Java Programming', icon: Terminal, color: 'from-red-500 to-orange-500', questions: 46 },
  { id: 'python', name: 'Python Programming', icon: Terminal, color: 'from-yellow-500 to-green-500', questions: 47 },
  { id: 'javascript', name: 'JavaScript', icon: Terminal, color: 'from-yellow-400 to-amber-500', questions: 46 },
];

// Practice Modes
const practiceModes = [
  { 
    id: 'concept', 
    name: 'Concept Explanation', 
    icon: BookOpen, 
    description: 'Explain technical concepts like in real interviews',
    color: 'bg-blue-500'
  },
  { 
    id: 'coding', 
    name: 'Coding Practice', 
    icon: Code, 
    description: 'Solve coding problems with AI evaluation',
    color: 'bg-green-500'
  },
  { 
    id: 'followup', 
    name: 'Follow-Up Questions', 
    icon: MessageSquare, 
    description: 'Dynamic follow-up questions like real interviewers',
    color: 'bg-purple-500'
  },
];

function TechnicalPracticeEngineContent() {
  const { dispatch } = useTechPrep();
  const [currentView, setCurrentView] = useState<'home' | 'domain' | 'mode' | 'practice' | 'results'>('home');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // User Stats - starts empty, will be populated from API/database after user practices
  const userStats = {
    totalSessions: 0,
    avgScore: 0,
    strongAreas: [] as string[],
    weakAreas: [] as string[],
    streak: 0,
    questionsAttempted: 0
  };

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    dispatch({ type: 'SET_DOMAIN', payload: domainId });
    setCurrentView('mode');
  };

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    dispatch({ type: 'SET_MODE', payload: modeId });
    setCurrentView('practice');
  };

  const handleSessionComplete = () => {
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedDomain(null);
    setSelectedMode(null);
    dispatch({ type: 'RESET_SESSION' });
  };

  const renderPracticeMode = () => {
    switch (selectedMode) {
      case 'concept':
        return <ConceptExplanationMode domain={selectedDomain!} onComplete={handleSessionComplete} />;
      case 'coding':
        return <CodingPracticeMode domain={selectedDomain!} onComplete={handleSessionComplete} />;
      case 'followup':
        return <FollowUpMode domain={selectedDomain!} onComplete={handleSessionComplete} />;
      case 'debugging':
        return <DebuggingMode domain={selectedDomain!} onComplete={handleSessionComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                TechPrep Engine
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">TechPrep Engine – A comprehensive technical interview preparation system with coding practice, debugging challenges, follow-up questions, and AI-powered evaluation.</p>
            </div>
            <div className="flex items-center gap-4">
              {userStats.streak > 0 && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">{userStats.streak} Day Streak</span>
                </div>
              )}
              {userStats.avgScore > 0 && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-gray-800 dark:text-white">{userStats.avgScore}% Avg Score</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Home View */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Sessions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalSessions}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Questions Done</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.questionsAttempted}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-purple-500/50 transition-all shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Strong Areas</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{userStats.strongAreas.length > 0 ? userStats.strongAreas.join(', ') : 'Practice to discover'}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-red-500/50 transition-all shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Needs Practice</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{userStats.weakAreas.length > 0 ? userStats.weakAreas.join(', ') : 'Practice to discover'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Start Practice Button */}
              <motion.div 
                className="text-center mb-12"
                whileHover={{ scale: 1.02 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg md:text-xl px-8 md:px-12 py-5 md:py-6 rounded-xl shadow-lg shadow-purple-500/25"
                  onClick={() => setCurrentView('domain')}
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Start TechPrep Engine
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                </Button>
              </motion.div>

              {/* Practice Modes Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Practice Modes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {practiceModes.map((mode, index) => (
                    <motion.div
                      key={mode.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all cursor-pointer h-full group shadow-sm">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 ${mode.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <mode.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{mode.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{mode.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technical Domains Preview */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Technical Domains</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {technicalDomains.map((domain, index) => (
                    <motion.div
                      key={domain.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="cursor-pointer"
                      onClick={() => handleDomainSelect(domain.id)}
                    >
                      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all group shadow-sm">
                        <CardContent className="p-4 text-center">
                          <div className={`w-10 h-10 mx-auto bg-gradient-to-r ${domain.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                            <domain.icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{domain.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{domain.questions} questions</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Domain Selection View */}
          {currentView === 'domain' && (
            <motion.div
              key="domain"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <DomainSelection 
                domains={technicalDomains}
                onSelect={handleDomainSelect}
                onBack={handleBackToHome}
              />
            </motion.div>
          )}

          {/* Mode Selection View */}
          {currentView === 'mode' && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="mb-6">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setCurrentView('domain')}>
                  ← Back to Domains
                </Button>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Select Practice Mode for {technicalDomains.find(d => d.id === selectedDomain)?.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {practiceModes.map((mode, index) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleModeSelect(mode.id)}
                  >
                    <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all cursor-pointer shadow-sm">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 ${mode.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <mode.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{mode.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{mode.description}</p>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Practice View */}
          {currentView === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setCurrentView('mode')}>
                  ← Back to Modes
                </Button>
              </div>
              {renderPracticeMode()}
            </motion.div>
          )}

          {/* Results View */}
          {currentView === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TechPrepResults 
                domain={selectedDomain!}
                mode={selectedMode!}
                onRetry={() => setCurrentView('practice')}
                onNewSession={handleBackToHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TechnicalPracticeEngine() {
  return (
    <TechPrepProvider>
      <TechnicalPracticeEngineContent />
    </TechPrepProvider>
  );
}
