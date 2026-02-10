"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useHRCoach } from '@/contexts/HRCoachContext';
import { evaluationParameters, hrCategories, interviewModes, redFlags } from '@/data/hr-coach-data';
import { motion, useInView } from 'framer-motion';
import {
    AlertCircle,
    AlertTriangle,
    Award,
    BookOpen,
    Brain,
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    FileText,
    Heart,
    MessageSquare,
    Play,
    Shield,
    Smile,
    Target,
    TrendingUp,
    User,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardHoverVariants = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
};

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Target,
  Briefcase,
  FileText,
  Brain,
  Building2,
  Zap,
  ClipboardList,
  Award,
  AlertTriangle,
  Shield,
  MessageSquare,
  Smile,
  Heart,
  AlertCircle
};

// Animated Counter component
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// Animated Progress Bar
function AnimatedProgress({ value, className }: { value: number; className?: string }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      
return () => clearTimeout(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <Progress 
        value={animatedValue} 
        className={`${className} transition-all duration-700 ease-out`} 
      />
    </div>
  );
}

// Breadcrumb
function Breadcrumb() {
  return (
    <motion.nav 
      className="flex items-center text-sm text-gray-500 mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
        Dashboard
      </Link>
      <ChevronRight className="w-4 h-4 mx-2" />
      <span className="text-gray-900 font-medium">HR Interview Coach</span>
    </motion.nav>
  );
}

// HR Readiness Score Card
function ReadinessScoreCard({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 90) {return 'text-green-600';}
    if (s >= 75) {return 'text-blue-600';}
    if (s >= 60) {return 'text-yellow-600';}
    
return 'text-red-600';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 90) {return 'HR Interview Ready';}
    if (s >= 75) {return 'Almost Ready';}
    if (s >= 60) {return 'Needs Practice';}
    
return 'Getting Started';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-100 overflow-hidden relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 opacity-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            HR Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-end gap-4">
            <motion.div 
              className={`text-5xl font-bold ${getScoreColor(score)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <AnimatedCounter value={score} />%
            </motion.div>
            <span className="text-gray-500 mb-1">{getScoreLabel(score)}</span>
          </div>
          <AnimatedProgress value={score} className="mt-4 h-3" />
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Profile Setup
            </span>
            <span className="flex items-center gap-1">
              <Play className="w-3 h-3" /> Mock Interviews
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Saved Answers
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Statistics Cards
function StatisticsCards({ stats }: { stats: { totalInterviews: number; totalQuestionsAnswered: number; averageScore: number } }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="text-center py-4">
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-purple-600">
              <AnimatedCounter value={stats.totalInterviews} />
            </div>
            <p className="text-sm text-gray-500 mt-1">Mock Interviews</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="text-center py-4">
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-indigo-600">
              <AnimatedCounter value={stats.totalQuestionsAnswered} />
            </div>
            <p className="text-sm text-gray-500 mt-1">Questions Answered</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Card className="text-center py-4">
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-green-600">
              <AnimatedCounter value={stats.averageScore} />%
            </div>
            <p className="text-sm text-gray-500 mt-1">Average Score</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Question Category Card
function CategoryCard({ category }: { category: typeof hrCategories[0] }) {
  const IconComponent = iconMap[category.icon] || Target;
  
  return (
    <Link href={`/hr-interview-coach/category/${category.id}`}>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <Card className="h-full cursor-pointer group border-gray-200 hover:border-purple-300 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                <IconComponent className={`w-5 h-5 ${category.color}`} />
              </div>
              <span className="text-xs text-gray-400">{category.weight}% weight</span>
            </div>
            <CardTitle className="text-base mt-2 group-hover:text-purple-600 transition-colors">
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400">{category.questions} questions</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

// Interview Mode Card
function InterviewModeCard({ mode }: { mode: typeof interviewModes[0] }) {
  const IconComponent = iconMap[mode.icon] || Play;
  
  return (
    <Link href={`/hr-interview-coach/interview/${mode.id}`}>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="h-full"
      >
        <Card className="h-full cursor-pointer group border-gray-200 hover:border-indigo-300 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50">
                <IconComponent className={`w-5 h-5 ${mode.color}`} />
              </div>
              <div>
                <h3 className="font-medium group-hover:text-indigo-600 transition-colors">{mode.name}</h3>
                <p className="text-xs text-gray-400">{mode.duration} • {mode.questionCount} questions</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">{mode.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

// Red Flag Awareness Section
function RedFlagSection() {
  return (
    <Card className="border-red-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Red Flags to Avoid
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {redFlags.slice(0, 6).map((flag) => (
            <div key={flag.id} className="p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className={`w-4 h-4 ${flag.color}`} />
                <span className="font-medium text-sm">{flag.category}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  flag.severity === 'critical' ? 'bg-red-200 text-red-700' :
                  flag.severity === 'high' ? 'bg-orange-200 text-orange-700' :
                  'bg-yellow-200 text-yellow-700'
                }`}>
                  {flag.severity}
                </span>
              </div>
              <p className="text-xs text-gray-600">{flag.description}</p>
            </div>
          ))}
        </div>
        <Link href="/hr-interview-coach/red-flags">
          <Button variant="outline" className="mt-4 w-full">
            Learn More About Red Flags
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Evaluation Parameters Section
function EvaluationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          How You&apos;re Evaluated
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {evaluationParameters.map((param) => {
            const IconComponent = iconMap[param.icon] || Shield;
            
return (
              <div key={param.id} className="text-center p-3 rounded-lg bg-gray-50">
                <IconComponent className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                <p className="text-sm font-medium">{param.name}</p>
                <p className="text-xs text-gray-500">{param.weight}%</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Actions
function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Link href="/hr-interview-coach/profile">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group">
          <CardContent className="pt-6 text-center">
            <User className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <h3 className="font-medium group-hover:text-purple-600">Setup HR Profile</h3>
            <p className="text-xs text-gray-500 mt-1">Configure your preferences</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/hr-interview-coach/videos">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group bg-gradient-to-br from-pink-50 to-purple-50">
          <CardContent className="pt-6 text-center">
            <Play className="w-8 h-8 mx-auto text-pink-600 mb-2" />
            <h3 className="font-medium group-hover:text-pink-600">Video Tutorials</h3>
            <p className="text-xs text-gray-500 mt-1">Learn from experts</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/hr-interview-coach/answer-builder">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group">
          <CardContent className="pt-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
            <h3 className="font-medium group-hover:text-indigo-600">Answer Builder</h3>
            <p className="text-xs text-gray-500 mt-1">Craft perfect HR answers</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/hr-interview-coach/interview/quick">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group">
          <CardContent className="pt-6 text-center">
            <Zap className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <h3 className="font-medium group-hover:text-yellow-600">Quick Practice</h3>
            <p className="text-xs text-gray-500 mt-1">5-minute session</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/hr-interview-coach/history">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group">
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <h3 className="font-medium group-hover:text-green-600">View Progress</h3>
            <p className="text-xs text-gray-500 mt-1">Track your improvement</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

// Main Page Component
export default function HRInterviewCoachPage() {
  const { readinessScore, totalInterviews, totalQuestionsAnswered, averageScore } = useHRCoach();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="w-8 h-8 text-purple-600" />
            HR Interview Coach
          </h1>
          <p className="text-gray-500 mt-2">
            Master your HR round with AI-powered coaching, personalized feedback, and red flag detection
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <QuickActions />
        </motion.div>

        {/* Score and Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ReadinessScoreCard score={readinessScore} />
          <div className="lg:col-span-2">
            <StatisticsCards stats={{ totalInterviews, totalQuestionsAnswered, averageScore }} />
          </div>
        </div>

        {/* Interview Modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-indigo-600" />
            Start Mock Interview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interviewModes.map((mode) => (
              <InterviewModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </motion.div>

        {/* Question Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            Practice by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hrCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </motion.div>

        {/* Evaluation Parameters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <EvaluationSection />
        </motion.div>

        {/* Red Flags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RedFlagSection />
        </motion.div>
      </div>
    </div>
  );
}
