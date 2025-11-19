import React from 'react';
import Squares from "@/app/_components/Squares";
import StickyHeader from "@/app/_components/StickyHeader";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* Animated Background - matches other pages */}
      <Squares />

      {/* Header */}
      <StickyHeader />

      {/* Content Container */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 md:p-8 pt-24">
        {children}
      </main>
    </div>
  );
}
