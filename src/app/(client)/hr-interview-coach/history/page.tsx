 "use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InterviewSession, useHRCoach } from '@/contexts/HRCoachContext';
import { readinessLevels } from '@/data/hr-coach-data';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    TrendingUp,
    Trophy,
    XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const { getSessionHistory, readinessScore, totalInterviews, totalQuestionsAnswered, averageScore } = useHRCoach();
  
  const sessions = getSessionHistory();

  const getReadinessConfig = (score: number) => {
    return readinessLevels.find(l => score >= l.min && score <= l.max) || readinessLevels[3];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Progress History
          </h1>
          <p className="text-gray-500 mt-1">Track your HR interview preparation journey</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">{readinessScore}%</div>
              <div className="text-sm text-gray-500">Readiness Score</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">{totalInterviews}</div>
              <div className="text-sm text-gray-500">Interviews</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{totalQuestionsAnswered}</div>
              <div className="text-sm text-gray-500">Questions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
              <div className="text-2xl font-bold text-indigo-600">{averageScore}%</div>
              <div className="text-sm text-gray-500">Avg Score</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Session History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session History</CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length > 0 ? (
                <div className="space-y-4">
                  {sessions.map((session: InterviewSession, idx: number) => {
                    const readinessConfig = getReadinessConfig(session.overallScore || 0);
                    
return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${readinessConfig.bgColor}`}>
                            {session.overallScore && session.overallScore >= 75 ? (
                              <CheckCircle className={`w-5 h-5 ${readinessConfig.color}`} />
                            ) : (
                              <XCircle className={`w-5 h-5 ${readinessConfig.color}`} />
                            )}
                          </div>
                          <div>
                            <div className="font-medium capitalize">{session.mode} Interview</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              {new Date(session.completedAt!).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${readinessConfig.color}`}>
                            {session.overallScore}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {session.responses.length} questions
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500">No Sessions Yet</h3>
                  <p className="text-sm text-gray-400 mt-1">Complete your first mock interview to see history</p>
                  <Link href="/hr-interview-coach/interview/quick">
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Start Quick Practice
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
