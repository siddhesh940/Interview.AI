"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHRCoach } from '@/contexts/HRCoachContext';
import { hrCategories, HRQuestionCategory, hrQuestions } from '@/data/hr-coach-data';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Brain,
    Briefcase,
    Building2,
    Check,
    ChevronRight,
    FileText,
    Target,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Target,
  Briefcase,
  FileText,
  Brain,
  Building2
};

export default function CategoryPage() {
  const params = useParams();
  const { savedAnswers, getCategoryProgress } = useHRCoach();
  
  const categoryId = params.categoryId as HRQuestionCategory;
  const category = hrCategories.find(c => c.id === categoryId);
  const questions = hrQuestions.filter(q => q.category === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found</p>
      </div>
    );
  }

  const IconComponent = iconMap[category.icon] || Target;
  const answeredCount = questions.filter(q => savedAnswers[q.id]).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-xl ${category.bgColor}`}>
              <IconComponent className={`w-8 h-8 ${category.color}`} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-500 mt-1">{category.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-sm text-gray-500">{questions.length} questions</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{category.weight}% weight in evaluation</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Your Progress</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {answeredCount}/{questions.length} questions prepared
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600">{progressPercent}%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Questions in this Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions.map((question, idx) => {
                const hasAnswer = !!savedAnswers[question.id];
                
return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href={`/hr-interview-coach/answer-builder?question=${question.id}`}>
                      <div className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        hasAnswer ? 'border-green-200 bg-green-50/50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          {hasAnswer ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-400">
                              {idx + 1}
                            </div>
                          )}
                          <div>
                            <p className={`font-medium ${hasAnswer ? 'text-green-800' : 'text-gray-800'}`}>
                              {question.question}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                question.difficulty === 'basic' ? 'bg-green-100 text-green-700' :
                                question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {question.difficulty}
                              </span>
                              {hasAnswer && (
                                <span className="text-xs text-green-600">Answer saved</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex gap-4"
        >
          <Link href="/hr-interview-coach/answer-builder" className="flex-1">
            <Button variant="outline" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Open Answer Builder
            </Button>
          </Link>
          <Link href="/hr-interview-coach/interview/standard" className="flex-1">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Practice This Category
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
