"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redFlags } from '@/data/hr-coach-data';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    CheckCircle,
    XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function RedFlagsPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            HR Interview Red Flags
          </h1>
          <p className="text-gray-500 mt-1">
            Avoid these common mistakes that lead to HR round rejections
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-red-50 border-red-100">
            <CardContent className="pt-6">
              <p className="text-red-800">
                <strong>Did you know?</strong> Many technically qualified candidates get rejected in the HR round 
                due to red flags in their responses. These are subtle signals that concern HR managers and can 
                cost you the job offer even after clearing all technical rounds.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Red Flags Grid */}
        <div className="space-y-6">
          {redFlags.map((flag, idx) => (
            <motion.div
              key={flag.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className={`w-5 h-5 ${flag.color}`} />
                      {flag.category}
                    </CardTitle>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      flag.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      flag.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {flag.severity.toUpperCase()} RISK
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{flag.description}</p>
                  
                  {/* Examples - What to Avoid */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 flex items-center gap-2 mb-3">
                      <XCircle className="w-4 h-4" />
                      What to Avoid
                    </h4>
                    <ul className="space-y-2">
                      {flag.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                          <span className="text-red-500 mt-0.5">✗</span>
                          <span className="italic">&quot;{example}&quot;</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What to Say Instead */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4" />
                      Better Alternatives
                    </h4>
                    <ul className="space-y-2">
                      {getAlternatives(flag.id).map((alt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="italic">&quot;{alt}&quot;</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="bg-indigo-50 border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-800">
                Pro Tips to Avoid Red Flags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <strong className="text-indigo-800">Stay Positive</strong>
                    <p className="text-sm text-indigo-700">Even when discussing challenges, focus on what you learned rather than blame</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <strong className="text-indigo-800">Show Flexibility</strong>
                    <p className="text-sm text-indigo-700">Avoid absolute statements. Use phrases like &quot;I prefer&quot; instead of &quot;I will never&quot;</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <strong className="text-indigo-800">Be Realistic</strong>
                    <p className="text-sm text-indigo-700">Have research-backed salary expectations and reasonable growth timelines</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <strong className="text-indigo-800">Do Your Homework</strong>
                    <p className="text-sm text-indigo-700">Research the company thoroughly before the interview</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <strong className="text-indigo-800">Be Consistent</strong>
                    <p className="text-sm text-indigo-700">Ensure your answers align with your resume and previous statements</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

// Helper function to get better alternatives for each red flag
function getAlternatives(flagId: string): string[] {
  const alternatives: Record<string, string[]> = {
    negativity: [
      "I learned a lot at my previous company and am looking for new growth opportunities",
      "While there were challenges, I gained valuable experience that I can bring here",
      "I appreciated the learning environment and am ready for the next step in my career"
    ],
    rigidity: [
      "I am flexible and willing to adapt based on project needs",
      "While I have preferences, I am open to different arrangements",
      "I believe in being adaptable to meet business requirements"
    ],
    unrealistic_expectations: [
      "Based on my research and experience, I am expecting a salary in the range of X to Y",
      "I am focused on growth and learning, and believe fair compensation will follow",
      "I am open to discussing the complete compensation package"
    ],
    overconfidence: [
      "I have strong skills in X, and I am continuously working to improve",
      "I am confident in my abilities but always open to learning new things",
      "I have achieved good results, and I know there is always room for growth"
    ],
    lack_preparation: [
      "I have researched your company and am impressed by [specific detail]",
      "I understand you are known for [product/service] and I would love to contribute",
      "Your recent [news/achievement] caught my attention"
    ],
    inconsistency: [
      "As mentioned in my resume, I worked on X which helped me develop Y skills",
      "To be consistent with what I shared earlier, my expectation is...",
      "Building on my previous experience at X, I am now looking for..."
    ]
  };
  
  return alternatives[flagId] || ["Be genuine and positive in your response"];
}
