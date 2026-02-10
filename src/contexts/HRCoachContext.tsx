"use client";

import {
    hrCategories,
    HRQuestion,
    HRQuestionCategory,
    hrQuestions,
    readinessLevels
} from '@/data/hr-coach-data';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Types
export interface HRProfile {
  targetCompany: string;
  targetRole: string;
  salaryExpectationMin: number;
  salaryExpectationMax: number;
  shiftPreference: 'any' | 'day' | 'night' | 'rotational';
  relocationWilling: boolean;
  travelAvailability: 'none' | 'occasional' | 'frequent';
  noticePeriod: string;
  currentCTC: number;
  expectedCTC: number;
}

export interface HRAnswer {
  questionId: string;
  answer: string;
  savedAt: string;
  score?: number;
  feedback?: string;
}

export interface InterviewSession {
  id: string;
  mode: 'quick' | 'standard' | 'full' | 'stress';
  startedAt: string;
  completedAt?: string;
  questions: string[];
  responses: {
    questionId: string;
    response: string;
    scores: {
      confidence: number;
      communication: number;
      professionalTone: number;
      attitude: number;
      authenticity: number;
      redFlagCheck: number;
    };
    overallScore: number;
    feedback: string;
    redFlagsDetected: string[];
  }[];
  overallScore?: number;
  readinessLevel?: string;
}

export interface CategoryProgress {
  categoryId: HRQuestionCategory;
  questionsAttempted: number;
  averageScore: number;
  completed: boolean;
}

interface HRCoachState {
  // Profile
  profile: HRProfile | null;
  // Saved Answers
  savedAnswers: Record<string, HRAnswer>;
  // Interview Sessions
  sessions: InterviewSession[];
  currentSession: InterviewSession | null;
  // Category Progress
  categoryProgress: Record<HRQuestionCategory, CategoryProgress>;
  // Overall Readiness Score
  readinessScore: number;
  // Statistics
  totalInterviews: number;
  totalQuestionsAnswered: number;
  averageScore: number;
}

interface HRCoachContextValue extends HRCoachState {
  // Profile Actions
  saveProfile: (profile: HRProfile) => void;
  updateProfile: (updates: Partial<HRProfile>) => void;
  // Answer Actions
  saveAnswer: (questionId: string, answer: string, score?: number, feedback?: string) => void;
  getAnswer: (questionId: string) => HRAnswer | null;
  deleteAnswer: (questionId: string) => void;
  // Interview Session Actions
  startSession: (mode: 'quick' | 'standard' | 'full' | 'stress') => void;
  submitResponse: (questionId: string, response: string, scores: InterviewSession['responses'][0]['scores'], feedback: string, redFlags: string[]) => void;
  completeSession: () => void;
  abandonSession: () => void;
  getSessionHistory: () => InterviewSession[];
  // Question Actions
  getQuestionsByCategory: (category: HRQuestionCategory) => HRQuestion[];
  getRandomQuestions: (count: number, categories?: HRQuestionCategory[]) => HRQuestion[];
  // Progress Actions
  getCategoryProgress: (category: HRQuestionCategory) => CategoryProgress;
  getReadinessLevel: () => { label: string; color: string; bgColor: string };
  // Reset
  resetProgress: () => void;
}


const defaultCategoryProgress: Record<HRQuestionCategory, CategoryProgress> = {
  personal: { categoryId: 'personal', questionsAttempted: 0, averageScore: 0, completed: false },
  strengths_weaknesses: { categoryId: 'strengths_weaknesses', questionsAttempted: 0, averageScore: 0, completed: false },
  behavioral: { categoryId: 'behavioral', questionsAttempted: 0, averageScore: 0, completed: false },
  policy: { categoryId: 'policy', questionsAttempted: 0, averageScore: 0, completed: false },
  situational: { categoryId: 'situational', questionsAttempted: 0, averageScore: 0, completed: false },
  company_specific: { categoryId: 'company_specific', questionsAttempted: 0, averageScore: 0, completed: false }
};

const defaultState: HRCoachState = {
  profile: null,
  savedAnswers: {},
  sessions: [],
  currentSession: null,
  categoryProgress: defaultCategoryProgress,
  readinessScore: 0,
  totalInterviews: 0,
  totalQuestionsAnswered: 0,
  averageScore: 0
};

const HRCoachContext = createContext<HRCoachContextValue | null>(null);

const STORAGE_KEY = 'interview-ai-hr-coach-progress';

export function HRCoachProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<HRCoachState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch (error) {
      console.error('Failed to load HR Coach progress:', error);
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save HR Coach progress:', error);
      }
    }
  }, [state, mounted]);

  // Calculate readiness score
  const calculateReadinessScore = useCallback((currentState: HRCoachState): number => {
    let score = 0;
    
    // Profile completion (10 points)
    if (currentState.profile) {
      score += 10;
    }
    
    // Category progress (50 points max)
    const categoryScores = Object.values(currentState.categoryProgress);
    const avgCategoryScore = categoryScores.reduce((acc, cat) => acc + cat.averageScore, 0) / categoryScores.length;
    score += (avgCategoryScore / 100) * 50;
    
    // Saved answers (20 points max)
    const savedAnswerCount = Object.keys(currentState.savedAnswers).length;
    score += Math.min(savedAnswerCount * 2, 20);
    
    // Interview completion (20 points max)
    const completedSessions = currentState.sessions.filter(s => s.completedAt);
    score += Math.min(completedSessions.length * 5, 20);
    
    return Math.round(Math.min(score, 100));
  }, []);

  // Profile Actions
  const saveProfile = useCallback((profile: HRProfile) => {
    setState(prev => {
      const newState = { ...prev, profile };
      
return { ...newState, readinessScore: calculateReadinessScore(newState) };
    });
  }, [calculateReadinessScore]);

  const updateProfile = useCallback((updates: Partial<HRProfile>) => {
    setState(prev => {
      if (!prev.profile) {return prev;}
      const newProfile = { ...prev.profile, ...updates };
      const newState = { ...prev, profile: newProfile };
      
return { ...newState, readinessScore: calculateReadinessScore(newState) };
    });
  }, [calculateReadinessScore]);

  // Answer Actions
  const saveAnswer = useCallback((questionId: string, answer: string, score?: number, feedback?: string) => {
    setState(prev => {
      const newAnswers = {
        ...prev.savedAnswers,
        [questionId]: {
          questionId,
          answer,
          savedAt: new Date().toISOString(),
          score,
          feedback
        }
      };
      const newState = { ...prev, savedAnswers: newAnswers };
      
return { ...newState, readinessScore: calculateReadinessScore(newState) };
    });
  }, [calculateReadinessScore]);

  const getAnswer = useCallback((questionId: string): HRAnswer | null => {
    return state.savedAnswers[questionId] || null;
  }, [state.savedAnswers]);

  const deleteAnswer = useCallback((questionId: string) => {
    setState(prev => {
      const newAnswers = { ...prev.savedAnswers };
      delete newAnswers[questionId];
      const newState = { ...prev, savedAnswers: newAnswers };
      
return { ...newState, readinessScore: calculateReadinessScore(newState) };
    });
  }, [calculateReadinessScore]);

  // Interview Session Actions
  const startSession = useCallback((mode: 'quick' | 'standard' | 'full' | 'stress') => {
    const questionCounts = { quick: 3, standard: 8, full: 12, stress: 6 };
    // Inline random question selection to avoid dependency issues
    const shuffled = [...hrQuestions].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, questionCounts[mode]);
    
    const session: InterviewSession = {
      id: Date.now().toString(),
      mode,
      startedAt: new Date().toISOString(),
      questions: questions.map(q => q.id),
      responses: []
    };
    
    setState(prev => ({ ...prev, currentSession: session }));
  }, []);

  const submitResponse = useCallback((
    questionId: string,
    response: string,
    scores: InterviewSession['responses'][0]['scores'],
    feedback: string,
    redFlags: string[]
  ) => {
    setState(prev => {
      if (!prev.currentSession) {return prev;}
      
      const overallScore = Math.round(
        (scores.confidence * 0.2) +
        (scores.communication * 0.2) +
        (scores.professionalTone * 0.15) +
        (scores.attitude * 0.15) +
        (scores.authenticity * 0.15) +
        (scores.redFlagCheck * 0.15)
      );
      
      const newResponse = {
        questionId,
        response,
        scores,
        overallScore,
        feedback,
        redFlagsDetected: redFlags
      };
      
      const newSession = {
        ...prev.currentSession,
        responses: [...prev.currentSession.responses, newResponse]
      };
      
      // Update category progress
      const question = hrQuestions.find(q => q.id === questionId);
      if (question) {
        const categoryId = question.category;
        const categoryProgress = prev.categoryProgress[categoryId];
        const newQuestionsAttempted = categoryProgress.questionsAttempted + 1;
        const newAverageScore = Math.round(
          (categoryProgress.averageScore * categoryProgress.questionsAttempted + overallScore) / newQuestionsAttempted
        );
        
        const newCategoryProgress = {
          ...prev.categoryProgress,
          [categoryId]: {
            ...categoryProgress,
            questionsAttempted: newQuestionsAttempted,
            averageScore: newAverageScore,
            completed: newQuestionsAttempted >= hrCategories.find(c => c.id === categoryId)!.questions
          }
        };
        
        return {
          ...prev,
          currentSession: newSession,
          categoryProgress: newCategoryProgress,
          totalQuestionsAnswered: prev.totalQuestionsAnswered + 1
        };
      }
      
      return { ...prev, currentSession: newSession };
    });
  }, []);

  const completeSession = useCallback(() => {
    setState(prev => {
      if (!prev.currentSession) {return prev;}
      
      const responses = prev.currentSession.responses;
      const overallScore = responses.length > 0
        ? Math.round(responses.reduce((acc, r) => acc + r.overallScore, 0) / responses.length)
        : 0;
      
      const readinessLevel = readinessLevels.find(
        level => overallScore >= level.min && overallScore <= level.max
      )?.label || 'Unknown';
      
      const completedSession: InterviewSession = {
        ...prev.currentSession,
        completedAt: new Date().toISOString(),
        overallScore,
        readinessLevel
      };
      
      const newSessions = [...prev.sessions, completedSession];
      const newTotalInterviews = prev.totalInterviews + 1;
      const newAverageScore = Math.round(
        (prev.averageScore * prev.totalInterviews + overallScore) / newTotalInterviews
      );
      
      const newState = {
        ...prev,
        sessions: newSessions,
        currentSession: null,
        totalInterviews: newTotalInterviews,
        averageScore: newAverageScore
      };
      
      return { ...newState, readinessScore: calculateReadinessScore(newState) };
    });
  }, [calculateReadinessScore]);

  const abandonSession = useCallback(() => {
    setState(prev => ({ ...prev, currentSession: null }));
  }, []);

  const getSessionHistory = useCallback((): InterviewSession[] => {
    return state.sessions.filter(s => s.completedAt).sort(
      (a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    );
  }, [state.sessions]);

  // Question Actions
  const getQuestionsByCategory = useCallback((category: HRQuestionCategory): HRQuestion[] => {
    return hrQuestions.filter(q => q.category === category);
  }, []);

  const getRandomQuestions = useCallback((count: number, categories?: HRQuestionCategory[]): HRQuestion[] => {
    let pool = categories 
      ? hrQuestions.filter(q => categories.includes(q.category))
      : hrQuestions;
    
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    
return shuffled.slice(0, count);
  }, []);

  // Progress Actions
  const getCategoryProgress = useCallback((category: HRQuestionCategory): CategoryProgress => {
    return state.categoryProgress[category];
  }, [state.categoryProgress]);

  const getReadinessLevel = useCallback(() => {
    const level = readinessLevels.find(
      l => state.readinessScore >= l.min && state.readinessScore <= l.max
    );
    
return level || { label: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  }, [state.readinessScore]);

  // Reset
  const resetProgress = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: HRCoachContextValue = {
    ...state,
    saveProfile,
    updateProfile,
    saveAnswer,
    getAnswer,
    deleteAnswer,
    startSession,
    submitResponse,
    completeSession,
    abandonSession,
    getSessionHistory,
    getQuestionsByCategory,
    getRandomQuestions,
    getCategoryProgress,
    getReadinessLevel,
    resetProgress
  };

  return (
    <HRCoachContext.Provider value={value}>
      {children}
    </HRCoachContext.Provider>
  );
}

export function useHRCoach() {
  const context = useContext(HRCoachContext);
  if (!context) {
    throw new Error('useHRCoach must be used within a HRCoachProvider');
  }
  
return context;
}
