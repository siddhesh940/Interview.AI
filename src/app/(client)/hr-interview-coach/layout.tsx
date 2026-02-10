"use client";

import { HRCoachProvider } from '@/contexts/HRCoachContext';

export default function HRInterviewCoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HRCoachProvider>
      {children}
    </HRCoachProvider>
  );
}
