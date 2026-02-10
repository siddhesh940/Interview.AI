import React from 'react';

export default function TimeMachineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="time-machine-layout">
      {children}
    </div>
  );
}
