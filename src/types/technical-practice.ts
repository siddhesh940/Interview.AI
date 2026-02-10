// src/types/technical-practice.ts
// Type definitions for TechPrep Engine

// ============================================
// DOMAIN TYPES
// ============================================

export type TechnicalDomain = 
  | 'dsa'           // Data Structures & Algorithms
  | 'dbms'          // Database Management Systems
  | 'os'            // Operating Systems
  | 'oops'          // Object Oriented Programming
  | 'networks'      // Computer Networks
  | 'c'             // C Programming
  | 'cpp'           // C++ Programming
  | 'java'          // Java Programming
  | 'python'        // Python Programming
  | 'javascript';   // JavaScript Programming

export type PracticeMode = 
  | 'concept'       // Concept Explanation Mode
  | 'coding'        // Coding Practice Mode
  | 'followup'      // Follow-Up Question Mode
  | 'debugging';    // Debugging Mode

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type QuestionType = 
  | 'conceptual'    // Theory/Explanation
  | 'coding'        // Code writing
  | 'debugging'     // Find/Fix bugs
  | 'mcq'           // Multiple choice
  | 'followup';     // Follow-up question

// ============================================
// DOMAIN CONFIGURATION
// ============================================

export interface DomainConfig {
  id: TechnicalDomain;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  topics: string[];
  supportedModes: PracticeMode[];
}

// ============================================
// QUESTION TYPES
// ============================================

export interface BaseQuestion {
  id: string;
  domain: TechnicalDomain;
  topic: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  question: string;
  hints?: string[];
  tags: string[];
  estimatedTime: number; // in minutes
}

export interface ConceptualQuestion extends BaseQuestion {
  type: 'conceptual';
  keyPoints: string[];      // Key concepts to cover
  expectedAnswer: string;   // Ideal answer for AI comparison
  relatedTopics: string[];  // Related topics for follow-up
  followUpQuestions: string[];
}

export interface CodingQuestion extends BaseQuestion {
  type: 'coding';
  templateCode: string;            // Starting code template
  expectedOutput?: string;         // Expected output for test cases
  testCases: TestCase[];           // Test cases for validation
  solution: string;                // Reference solution
  timeComplexity: string;          // Expected O(n) complexity
  spaceComplexity: string;         // Expected space complexity
  languageSupport: string[];       // Supported programming languages
  constraints: string[];           // Problem constraints
}

export interface DebuggingQuestion extends BaseQuestion {
  type: 'debugging';
  buggyCode: string;              // Code with bugs
  bugs: BugInfo[];                // List of bugs to find
  fixedCode: string;              // Correct code
  errorType: string;              // Type of error (syntax, logic, runtime)
  language: string;               // Programming language
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface FollowUpQuestion extends BaseQuestion {
  type: 'followup';
  parentQuestionId: string;
  depth: number;                  // How deep in the follow-up chain
  expectedAnswer: string;
  keyPoints: string[];
}

export type Question = 
  | ConceptualQuestion 
  | CodingQuestion 
  | DebuggingQuestion 
  | MCQQuestion 
  | FollowUpQuestion;

// ============================================
// TEST CASE & BUG INFO
// ============================================

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

export interface BugInfo {
  lineNumber: number;
  bugType: 'syntax' | 'logic' | 'runtime' | 'edge-case';
  description: string;
  hint: string;
}

// ============================================
// USER ANSWER TYPES
// ============================================

export interface ConceptAnswer {
  questionId: string;
  textAnswer: string;
  audioAnswer?: string;           // Base64 encoded audio
  submittedAt: string;
}

export interface CodingAnswer {
  questionId: string;
  code: string;
  language: string;
  submittedAt: string;
  executionTime?: number;
  memoryUsed?: number;
}

export interface DebuggingAnswer {
  questionId: string;
  fixedCode: string;
  identifiedBugs: {
    lineNumber: number;
    description: string;
  }[];
  submittedAt: string;
}

export interface MCQAnswer {
  questionId: string;
  selectedOption: number;
  submittedAt: string;
}

export type UserAnswer = 
  | ConceptAnswer 
  | CodingAnswer 
  | DebuggingAnswer 
  | MCQAnswer;

// ============================================
// EVALUATION RESULTS
// ============================================

export interface ConceptEvaluation {
  questionId: string;
  score: number;                  // 0-100
  conceptCoverage: number;        // Percentage of key points covered
  depth: 'shallow' | 'moderate' | 'deep';
  clarity: 'poor' | 'average' | 'good' | 'excellent';
  coveredPoints: string[];
  missingPoints: string[];
  feedback: string;
  suggestions: string[];
  followUpQuestions: string[];
}

export interface CodingEvaluation {
  questionId: string;
  score: number;                  // 0-100
  correctness: number;            // Test case pass rate
  codeQuality: number;            // Code style and structure
  efficiency: number;             // Time/space complexity score
  testResults: TestResult[];
  timeComplexityAnalysis: string;
  spaceComplexityAnalysis: string;
  optimizationSuggestions: string[];
  feedback: string;
}

export interface DebuggingEvaluation {
  questionId: string;
  score: number;                  // 0-100
  bugsFound: number;
  totalBugs: number;
  correctFixes: number;
  problemSolvingScore: number;
  feedback: string;
  missedBugs: BugInfo[];
}

export interface MCQEvaluation {
  questionId: string;
  isCorrect: boolean;
  score: number;
  explanation: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTime: number;
  error?: string;
}

export type Evaluation = 
  | ConceptEvaluation 
  | CodingEvaluation 
  | DebuggingEvaluation 
  | MCQEvaluation;

// ============================================
// SESSION & PROGRESS
// ============================================

export interface PracticeSession {
  id: string;
  userId: string;
  domain: TechnicalDomain;
  mode: PracticeMode;
  difficulty: DifficultyLevel;
  startedAt: string;
  endedAt?: string;
  questionsAttempted: number;
  questionsCorrect: number;
  totalScore: number;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  answers: UserAnswer[];
  evaluations: Evaluation[];
}

export interface DomainProgress {
  domain: TechnicalDomain;
  totalAttempts: number;
  correctAnswers: number;
  averageScore: number;
  lastPracticed: string;
  topicProgress: Record<string, TopicProgress>;
  weakTopics: string[];
  strongTopics: string[];
  modeProgress: Record<PracticeMode, ModeProgress>;
}

export interface TopicProgress {
  topic: string;
  attempted: number;
  correct: number;
  averageScore: number;
  lastAttempted: string;
  difficultyDistribution: Record<DifficultyLevel, number>;
}

export interface ModeProgress {
  mode: PracticeMode;
  totalSessions: number;
  averageScore: number;
  timeSpent: number; // in minutes
  lastPracticed: string;
}

// ============================================
// ANALYTICS & STATS
// ============================================

export interface TechPrepStats {
  totalSessions: number;
  totalTimeSpent: number;         // in minutes
  overallScore: number;           // 0-100
  technicalReadinessScore: number;
  conceptStrength: number;
  codingAccuracy: number;
  debuggingSkill: number;
  domainScores: Record<TechnicalDomain, number>;
  weakestDomains: TechnicalDomain[];
  strongestDomains: TechnicalDomain[];
  recentActivity: ActivityLog[];
  improvementTrend: number;       // Percentage improvement over last 7 days
  practiceStreak: number;         // Days of continuous practice
}

export interface ActivityLog {
  id: string;
  type: 'session_started' | 'session_completed' | 'achievement_unlocked' | 'milestone_reached';
  domain?: TechnicalDomain;
  mode?: PracticeMode;
  score?: number;
  timestamp: string;
  description: string;
}

export interface WeakAreaAnalysis {
  domain: TechnicalDomain;
  topic: string;
  conceptGaps: string[];
  recommendedQuestions: string[];
  practiceCount: number;
  lastScore: number;
}

// ============================================
// RECOMMENDATIONS
// ============================================

export interface Recommendation {
  id: string;
  type: 'topic' | 'mode' | 'difficulty' | 'domain';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  domain?: TechnicalDomain;
  topic?: string;
  mode?: PracticeMode;
  difficulty?: DifficultyLevel;
  reason: string;
}

// ============================================
// STATE & CONTEXT
// ============================================

export interface TechPrepState {
  // Current session
  currentSession: PracticeSession | null;
  currentQuestion: Question | null;
  currentEvaluation: Evaluation | null;
  followUpChain: Question[];
  followUpDepth: number;
  
  // User progress
  domainProgress: Record<TechnicalDomain, DomainProgress>;
  stats: TechPrepStats;
  weakAreas: WeakAreaAnalysis[];
  recommendations: Recommendation[];
  
  // UI state
  selectedDomain: TechnicalDomain | null;
  selectedMode: PracticeMode | null;
  selectedDifficulty: DifficultyLevel;
  isLoading: boolean;
  error: string | null;
}

export interface TechPrepContextValue extends TechPrepState {
  // Domain actions
  selectDomain: (domain: TechnicalDomain) => void;
  selectMode: (mode: PracticeMode) => void;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  
  // Session actions
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
  pauseSession: () => void;
  resumeSession: () => void;
  
  // Question actions
  getNextQuestion: () => Promise<void>;
  submitAnswer: (answer: UserAnswer) => Promise<Evaluation>;
  skipQuestion: () => Promise<void>;
  requestHint: () => string | null;
  
  // Follow-up actions
  generateFollowUp: () => Promise<Question | null>;
  answerFollowUp: (answer: ConceptAnswer) => Promise<ConceptEvaluation>;
  
  // Code execution (for coding mode)
  executeCode: (code: string, language: string) => Promise<TestResult[]>;
  
  // Progress & Analytics
  getDomainProgress: (domain: TechnicalDomain) => DomainProgress | null;
  getOverallStats: () => TechPrepStats;
  getWeakAreas: () => WeakAreaAnalysis[];
  getRecommendations: () => Recommendation[];
  
  // Data management
  resetProgress: () => void;
  exportProgress: () => string;
  syncWithTimeMachine: () => Promise<void>;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface AIEvaluationResponse {
  success: boolean;
  evaluation: Evaluation;
  followUpQuestions?: string[];
  recommendations?: Recommendation[];
}

export interface CodeExecutionResponse {
  success: boolean;
  results: TestResult[];
  executionTime: number;
  memoryUsed: number;
  error?: string;
}

export interface QuestionGenerationResponse {
  success: boolean;
  question: Question;
  relatedTopics: string[];
}
