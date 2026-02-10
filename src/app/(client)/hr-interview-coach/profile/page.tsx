"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HRProfile, useHRCoach } from '@/contexts/HRCoachContext';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Briefcase,
    Building2,
    Calendar,
    CheckCircle,
    DollarSign,
    MapPin,
    Plane,
    Save
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function HRProfilePage() {
  const { profile, saveProfile } = useHRCoach();
  const router = useRouter();
  const [formData, setFormData] = useState<HRProfile>({
    targetCompany: '',
    targetRole: '',
    salaryExpectationMin: 0,
    salaryExpectationMax: 0,
    shiftPreference: 'any',
    relocationWilling: true,
    travelAvailability: 'occasional',
    noticePeriod: '30 days',
    currentCTC: 0,
    expectedCTC: 0
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push('/hr-interview-coach');
    }, 1500);
  };

  const handleChange = (field: keyof HRProfile, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <h1 className="text-2xl font-bold text-gray-900">HR Profile Setup</h1>
          <p className="text-gray-500 mt-1">Configure your preferences for personalized HR interview preparation</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Target Company & Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Target Position
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetCompany">Target Company</Label>
                    <Input
                      id="targetCompany"
                      placeholder="e.g., Google, Microsoft, TCS"
                      value={formData.targetCompany}
                      className="mt-1"
                      onChange={(e) => handleChange('targetCompany', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetRole">Target Role</Label>
                    <Input
                      id="targetRole"
                      placeholder="e.g., Software Engineer, Data Analyst"
                      value={formData.targetRole}
                      className="mt-1"
                      onChange={(e) => handleChange('targetRole', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Salary Expectations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Compensation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentCTC">Current CTC (LPA)</Label>
                    <Input
                      id="currentCTC"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="0 for freshers"
                      value={formData.currentCTC ?? ''}
                      className="mt-1"
                      onChange={(e) => handleChange('currentCTC', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedCTC">Expected CTC (LPA)</Label>
                    <Input
                      id="expectedCTC"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g., 4"
                      value={formData.expectedCTC ?? ''}
                      className="mt-1"
                      onChange={(e) => handleChange('expectedCTC', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaryMin">Minimum Expected (LPA)</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g., 3"
                      value={formData.salaryExpectationMin ?? ''}
                      className="mt-1"
                      onChange={(e) => handleChange('salaryExpectationMin', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryMax">Maximum Expected (LPA)</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="e.g., 6"
                      value={formData.salaryExpectationMax ?? ''}
                      className="mt-1"
                      onChange={(e) => handleChange('salaryExpectationMax', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notice Period */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="noticePeriod">Notice Period</Label>
                  <select
                    id="noticePeriod"
                    aria-label="Notice Period"
                    value={formData.noticePeriod}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => handleChange('noticePeriod', e.target.value)}
                  >
                    <option value="Immediate">Immediate Joiner</option>
                    <option value="15 days">15 Days</option>
                    <option value="30 days">30 Days</option>
                    <option value="60 days">60 Days</option>
                    <option value="90 days">90 Days</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Work Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Work Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shiftPreference">Shift Preference</Label>
                  <select
                    id="shiftPreference"
                    aria-label="Shift Preference"
                    value={formData.shiftPreference}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => handleChange('shiftPreference', e.target.value as HRProfile['shiftPreference'])}
                  >
                    <option value="any">Flexible / Any Shift</option>
                    <option value="day">Day Shift Only</option>
                    <option value="night">Night Shift Preferred</option>
                    <option value="rotational">Rotational Shifts OK</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Willing to Relocate?
                    </Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.relocationWilling === true}
                          className="text-purple-600"
                          onChange={() => handleChange('relocationWilling', true)}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.relocationWilling === false}
                          className="text-purple-600"
                          onChange={() => handleChange('relocationWilling', false)}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      Travel Availability
                    </Label>
                    <select
                      aria-label="Travel Availability"
                      value={formData.travelAvailability}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => handleChange('travelAvailability', e.target.value as HRProfile['travelAvailability'])}
                    >
                      <option value="none">Not Available for Travel</option>
                      <option value="occasional">Occasional Travel OK</option>
                      <option value="frequent">Frequent Travel OK</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              className={`w-full ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}
              size="lg"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Profile Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
