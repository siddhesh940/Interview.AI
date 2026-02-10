"use client";

import React, { createContext, ReactNode, useContext, useReducer } from 'react';

// Types
export interface Question {
  id: string;
  domain: string;
  type: 'concept' | 'coding' | 'followup' | 'debugging';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  expectedAnswer?: string;
  codeTemplate?: string;
  buggyCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
  hints?: string[];
  topics: string[];
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  code?: string;
  timeTaken: number;
  isCorrect?: boolean;
}

export interface Evaluation {
  score: number;
  conceptCoverage: number;
  clarity: number;
  depth: number;
  missingPoints: string[];
  feedback: string;
  suggestions: string[];
  codeAnalysis?: {
    correctness: number;
    efficiency: number;
    timeComplexity: string;
    spaceComplexity: string;
    edgeCases: string[];
  };
}

export interface SessionResult {
  sessionId: string;
  domain: string;
  mode: string;
  startTime: Date;
  endTime: Date;
  questionsAttempted: number;
  correctAnswers: number;
  overallScore: number;
  conceptStrength: { [topic: string]: number };
  weakAreas: string[];
  recommendations: string[];
}

export interface TechPrepState {
  currentDomain: string | null;
  currentMode: string | null;
  currentQuestion: Question | null;
  questionHistory: Question[];
  answers: UserAnswer[];
  evaluations: Evaluation[];
  sessionResults: SessionResult[];
  difficulty: 'easy' | 'medium' | 'hard';
  isSessionActive: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  weakTopics: string[];
  strongTopics: string[];
  overallProgress: {
    dsa: number;
    dbms: number;
    os: number;
    oops: number;
    cn: number;
    c: number;
    cpp: number;
    java: number;
    python: number;
    javascript: number;
  };
}

type TechPrepAction =
  | { type: 'SET_DOMAIN'; payload: string }
  | { type: 'SET_MODE'; payload: string }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ADD_ANSWER'; payload: UserAnswer }
  | { type: 'ADD_EVALUATION'; payload: Evaluation }
  | { type: 'SET_DIFFICULTY'; payload: 'easy' | 'medium' | 'hard' }
  | { type: 'START_SESSION' }
  | { type: 'END_SESSION'; payload: SessionResult }
  | { type: 'NEXT_QUESTION' }
  | { type: 'UPDATE_WEAK_TOPICS'; payload: string[] }
  | { type: 'UPDATE_STRONG_TOPICS'; payload: string[] }
  | { type: 'UPDATE_PROGRESS'; payload: { domain: string; score: number } }
  | { type: 'RESET_SESSION' };

const initialState: TechPrepState = {
  currentDomain: null,
  currentMode: null,
  currentQuestion: null,
  questionHistory: [],
  answers: [],
  evaluations: [],
  sessionResults: [],
  difficulty: 'medium',
  isSessionActive: false,
  currentQuestionIndex: 0,
  totalQuestions: 5,
  weakTopics: [],
  strongTopics: [],
  overallProgress: {
    dsa: 0,
    dbms: 0,
    os: 0,
    oops: 0,
    cn: 0,
    c: 0,
    cpp: 0,
    java: 0,
    python: 0,
    javascript: 0,
  },
};

function techPrepReducer(state: TechPrepState, action: TechPrepAction): TechPrepState {
  switch (action.type) {
    case 'SET_DOMAIN':
      return { ...state, currentDomain: action.payload };
    
    case 'SET_MODE':
      return { ...state, currentMode: action.payload };
    
    case 'SET_QUESTION':
      return { 
        ...state, 
        currentQuestion: action.payload,
        questionHistory: [...state.questionHistory, action.payload]
      };
    
    case 'ADD_ANSWER':
      return { ...state, answers: [...state.answers, action.payload] };
    
    case 'ADD_EVALUATION':
      return { ...state, evaluations: [...state.evaluations, action.payload] };
    
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    
    case 'START_SESSION':
      return { 
        ...state, 
        isSessionActive: true,
        currentQuestionIndex: 0,
        answers: [],
        evaluations: [],
        questionHistory: []
      };
    
    case 'END_SESSION':
      return { 
        ...state, 
        isSessionActive: false,
        sessionResults: [...state.sessionResults, action.payload]
      };
    
    case 'NEXT_QUESTION':
      return { 
        ...state, 
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentQuestion: null
      };
    
    case 'UPDATE_WEAK_TOPICS':
      return { ...state, weakTopics: action.payload };
    
    case 'UPDATE_STRONG_TOPICS':
      return { ...state, strongTopics: action.payload };
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        overallProgress: {
          ...state.overallProgress,
          [action.payload.domain]: action.payload.score
        }
      };
    
    case 'RESET_SESSION':
      return {
        ...state,
        currentDomain: null,
        currentMode: null,
        currentQuestion: null,
        questionHistory: [],
        answers: [],
        evaluations: [],
        isSessionActive: false,
        currentQuestionIndex: 0
      };
    
    default:
      return state;
  }
}

interface TechPrepContextType {
  state: TechPrepState;
  dispatch: React.Dispatch<TechPrepAction>;
}

const TechPrepContext = createContext<TechPrepContextType | undefined>(undefined);

export function TechPrepProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(techPrepReducer, initialState);

  return (
    <TechPrepContext.Provider value={{ state, dispatch }}>
      {children}
    </TechPrepContext.Provider>
  );
}

export function useTechPrep() {
  const context = useContext(TechPrepContext);
  if (context === undefined) {
    throw new Error('useTechPrep must be used within a TechPrepProvider');
  }
  
return context;
}

export default TechPrepContext;
