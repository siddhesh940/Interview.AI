"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    Bot,
    Brain,
    Clock,
    MessageSquare,
    Send,
    Target,
    User,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface FollowUpModeProps {
  domain: string;
  onComplete: () => void;
}

interface Message {
  id: string;
  type: 'interviewer' | 'user' | 'system';
  content: string;
  timestamp: Date;
  score?: number;
  feedback?: string;
}

interface ConversationTopic {
  mainQuestion: string;
  followUps: string[];
  keywords: string[];
  topic: string;
}

export default function FollowUpMode({ domain, onComplete }: FollowUpModeProps) {
  useTechPrep();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [followUpCount, setFollowUpCount] = useState(0);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Get questions for this domain and create follow-up topics
  const domainQuestions = SAMPLE_CONCEPTUAL_QUESTIONS.filter(
    q => q.domain === domain as TechnicalDomain
  );
  
  // Create topics from questions
  const topics: ConversationTopic[] = domainQuestions.slice(0, 3).map(q => ({
    mainQuestion: q.question,
    followUps: q.followUpQuestions || [],
    keywords: q.keyPoints || [],
    topic: q.topic
  }));
  
  const currentTopic = topics[currentTopicIndex];
  const maxTopics = topics.length;
  const maxFollowUps = 3;

  // Initialize with first question
  useEffect(() => {
    if (messages.length === 0 && currentTopic) {
      setMessages([
        {
          id: '1',
          type: 'system',
          content: `🎯 Technical Interview Simulation - ${currentTopic.topic}`,
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'interviewer',
          content: currentTopic.mainQuestion,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentTopic, messages.length]);

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

  const evaluateResponse = (response: string, keywords: string[]): { score: number; feedback: string } => {
    const responseLower = response.toLowerCase();
    const matchedKeywords = keywords.filter(kw => responseLower.includes(kw.toLowerCase()));
    const keywordCount = keywords.length || 1;
    const score = Math.min(100, Math.round((matchedKeywords.length / keywordCount) * 100) + 20);
    
    let feedback = '';
    if (score >= 80) {
      feedback = "Excellent response! You covered the key points well.";
    } else if (score >= 60) {
      feedback = "Good answer, but could be more detailed.";
    } else if (score >= 40) {
      feedback = "Partial answer. Consider covering more aspects.";
    } else {
      feedback = "Try to be more specific and cover the main concepts.";
    }
    
    return { score, feedback };
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isAIThinking || !currentTopic) {return;}

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    // Evaluate the user's response
    const evaluation = evaluateResponse(userInput, currentTopic.keywords);
    userMessage.score = evaluation.score;
    userMessage.feedback = evaluation.feedback;

    setMessages(prev => [...prev, userMessage]);
    setSessionScores(prev => [...prev, evaluation.score]);
    setUserInput('');
    setIsAIThinking(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add feedback message
    const feedbackMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'system',
      content: `📊 Score: ${evaluation.score}% - ${evaluation.feedback}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, feedbackMessage]);

    // Check if we should ask follow-up or move to next topic
    if (followUpCount < maxFollowUps - 1 && currentTopic.followUps[followUpCount]) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const followUpMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'interviewer',
        content: currentTopic.followUps[followUpCount],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, followUpMessage]);
      setFollowUpCount(prev => prev + 1);
    } else if (currentTopicIndex < maxTopics - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transitionMessage: Message = {
        id: (Date.now() + 3).toString(),
        type: 'system',
        content: `✅ Topic completed! Moving to next question...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, transitionMessage]);

      setCurrentTopicIndex(prev => prev + 1);
      setFollowUpCount(0);

      await new Promise(resolve => setTimeout(resolve, 1500));

      const nextTopic = topics[currentTopicIndex + 1];
      if (nextTopic) {
        const newTopicMessage: Message = {
          id: (Date.now() + 4).toString(),
          type: 'system',
          content: `🎯 New Topic: ${nextTopic.topic}`,
          timestamp: new Date()
        };
        
        const newQuestionMessage: Message = {
          id: (Date.now() + 5).toString(),
          type: 'interviewer',
          content: nextTopic.mainQuestion,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, newTopicMessage, newQuestionMessage]);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const completeMessage: Message = {
        id: (Date.now() + 6).toString(),
        type: 'system',
        content: `🎉 Interview simulation complete! Great job!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, completeMessage]);
      setIsSessionComplete(true);
    }

    setIsAIThinking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) {return 'text-green-500';}
    if (score >= 60) {return 'text-yellow-500';}
    
return 'text-red-500';
  };

  const getAverageScore = () => {
    if (sessionScores.length === 0) {return 0;}
    
return Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length);
  };

  return (
    <div className="space-y-4 min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Follow-Up Question Mode</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Dynamic interview simulation with follow-up questions</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="w-4 h-4 mr-2" />
            {formatTime(timeSpent)}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-purple-600">
            Topic {currentTopicIndex + 1} / {maxTopics || 1}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((currentTopicIndex + 1) / (maxTopics || 1)) * 100} className="h-2" />

      {/* Chat Area */}
      <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-2 border-b border-slate-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-slate-900 dark:text-white">AI Technical Interviewer</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Target className="w-3 h-3 mr-1" />
                {currentTopic?.topic || 'Loading...'}
              </Badge>
              {sessionScores.length > 0 && (
                <Badge className={`${getAverageScore() >= 70 ? 'bg-green-600' : getAverageScore() >= 50 ? 'bg-yellow-600' : 'bg-red-600'}`}>
                  Avg: {getAverageScore()}%
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages */}
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'system' ? (
                      <div className="w-full text-center">
                        <span className="inline-block px-4 py-2 bg-slate-100 dark:bg-gray-700/50 rounded-full text-sm text-slate-600 dark:text-slate-300">
                          {message.content}
                        </span>
                      </div>
                    ) : (
                      <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          message.type === 'interviewer' ? 'bg-purple-600' : 'bg-blue-600'
                        }`}>
                          {message.type === 'interviewer' ? (
                            <Bot className="w-5 h-5 text-white" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className={`space-y-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`p-4 rounded-2xl ${
                            message.type === 'interviewer' 
                              ? 'bg-slate-100 dark:bg-gray-700 rounded-tl-none' 
                              : 'bg-blue-600 rounded-tr-none'
                          }`}>
                            <p className={message.type === 'interviewer' ? 'text-slate-800 dark:text-white' : 'text-white'}>{message.content}</p>
                          </div>
                          {message.score !== undefined && (
                            <div className="flex items-center gap-2 text-sm">
                              <Badge className={`${
                                message.score >= 80 ? 'bg-green-600' : 
                                message.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}>
                                {message.score}%
                              </Badge>
                              <span className="text-slate-500 dark:text-slate-400 text-xs">{message.feedback}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* AI Thinking Indicator */}
              {isAIThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-gray-700 rounded-2xl rounded-tl-none">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            {!isSessionComplete ? (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Textarea
                    value={userInput}
                    placeholder="Type your answer here... or use 🎤 voice input. Be detailed and cover key concepts."
                    className="min-h-[80px] bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-600 text-slate-900 dark:text-white resize-none"
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {/* Voice input button using Web Speech API */}
                  <VoiceInputButton
                    currentValue={userInput}
                    disabled={isAIThinking}
                    size="icon"
                    onValueChange={setUserInput}
                  />
                  <Button
                    size="icon"
                    disabled={!userInput.trim() || isAIThinking}
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={sendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-600 dark:text-slate-400 mb-4">Interview simulation complete!</p>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={onComplete}>
                  View Results
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session Stats */}
      {sessionScores.length > 0 && (
        <Card className="bg-white/60 dark:bg-gray-800/50 border-slate-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400">Response Scores:</span>
                {sessionScores.map((score, i) => (
                  <Badge key={`score-${i}`} className={`${
                    score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    Q{i + 1}: {score}%
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className={`font-bold ${getScoreColor(getAverageScore())}`}>
                  Average: {getAverageScore()}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
