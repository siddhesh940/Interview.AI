"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { useHRCoach } from '@/contexts/HRCoachContext';
import { hrCategories, hrQuestions } from '@/data/hr-coach-data';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Check,
    ChevronDown, ChevronUp,
    Lightbulb,
    Save,
    Star,
    Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AnswerBuilderPage() {
  const { savedAnswers, saveAnswer, deleteAnswer, getAnswer } = useHRCoach();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showTips, setShowTips] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentQuestionData = selectedQuestion 
    ? hrQuestions.find(q => q.id === selectedQuestion) 
    : null;

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestion(questionId);
    const existingAnswer = getAnswer(questionId);
    setCurrentAnswer(existingAnswer?.answer || '');
    setSaveSuccess(false);
  };

  const handleSaveAnswer = () => {
    if (selectedQuestion && currentAnswer.trim()) {
      saveAnswer(selectedQuestion, currentAnswer.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleDeleteAnswer = (questionId: string) => {
    deleteAnswer(questionId);
    if (selectedQuestion === questionId) {
      setCurrentAnswer('');
    }
  };

  const savedAnswerCount = Object.keys(savedAnswers).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/hr-interview-coach" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to HR Coach
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                HR Answer Builder
              </h1>
              <p className="text-gray-500 mt-1">Craft and save your perfect HR interview answers</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">{savedAnswerCount}</div>
              <div className="text-sm text-gray-500">Saved Answers</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category & Question Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Select Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {hrCategories.map((category) => (
                  <div key={category.id} className="border rounded-lg">
                    <button
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50"
                      onClick={() => setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )}
                    >
                      <span className="font-medium text-sm">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {hrQuestions.filter(q => q.category === category.id && savedAnswers[q.id]).length}/
                          {hrQuestions.filter(q => q.category === category.id).length}
                        </span>
                        {selectedCategory === category.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {selectedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t p-2 space-y-1">
                            {hrQuestions
                              .filter(q => q.category === category.id)
                              .map((question) => (
                                <button
                                  key={question.id}
                                  className={`w-full text-left p-2 rounded text-sm flex items-center gap-2 ${
                                    selectedQuestion === question.id
                                      ? 'bg-purple-100 text-purple-700'
                                      : 'hover:bg-gray-100'
                                  }`}
                                  onClick={() => handleQuestionSelect(question.id)}
                                >
                                  {savedAnswers[question.id] && (
                                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  )}
                                  <span className="line-clamp-2">{question.question}</span>
                                </button>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Answer Editor */}
          <div className="lg:col-span-2">
            {currentQuestionData ? (
              <motion.div
                key={currentQuestionData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          currentQuestionData.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                          currentQuestionData.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {currentQuestionData.difficulty}
                        </span>
                        <CardTitle className="text-lg mt-2">{currentQuestionData.question}</CardTitle>
                      </div>
                      {savedAnswers[currentQuestionData.id] && (
                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Delete saved answer"
                          onClick={() => handleDeleteAnswer(currentQuestionData.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Answer input with voice support */}
                    <div className="relative">
                      <Textarea
                        placeholder="Write your answer here... or use 🎤 voice input"
                        value={currentAnswer}
                        className="min-h-[200px] mb-4 pr-12"
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                      />
                      <div className="absolute top-2 right-2">
                        <VoiceInputButton
                          currentValue={currentAnswer}
                          onValueChange={setCurrentAnswer}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {currentAnswer.split(' ').filter(w => w).length} words
                      </span>
                      <Button
                        disabled={!currentAnswer.trim()}
                        className={saveSuccess ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'}
                        onClick={handleSaveAnswer}
                      >
                        {saveSuccess ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Answer
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips & Sample Answer */}
                <Card>
                  <CardHeader>
                    <button
                      className="flex items-center justify-between w-full"
                      onClick={() => setShowTips(!showTips)}
                    >
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Tips & Sample Answer
                      </CardTitle>
                      {showTips ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </CardHeader>
                  <AnimatePresence>
                    {showTips && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <CardContent className="space-y-6">
                          {/* Key Points */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Key Points to Include:</h4>
                            <ul className="space-y-1">
                              {currentQuestionData.idealPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tips */}
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Tips:</h4>
                            <ul className="space-y-1">
                              {currentQuestionData.tips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Sample Answer */}
                          <div className="bg-indigo-50 rounded-lg p-4">
                            <h4 className="font-medium text-sm text-indigo-700 mb-2">Sample Answer:</h4>
                            <p className="text-sm text-indigo-900 italic">
                              {currentQuestionData.sampleAnswer}
                            </p>
                          </div>

                          {/* Red Flags */}
                          <div className="bg-red-50 rounded-lg p-4">
                            <h4 className="font-medium text-sm text-red-700 mb-2">Avoid These Red Flags:</h4>
                            <ul className="space-y-1">
                              {currentQuestionData.redFlagPatterns.map((flag, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-red-600">
                                  <span className="text-red-500">✗</span>
                                  {flag}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ) : (
              <Card className="flex items-center justify-center h-[400px]">
                <CardContent className="text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500">Select a Question</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose a question from the left panel to start crafting your answer
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
