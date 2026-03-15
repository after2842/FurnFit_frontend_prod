"use client";

import Navbar from "@/components/Navbar";
import PreferencesScreen from "@/components/Preference";
import Bottom from "@/components/Bottom";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveShowcase } from "@/components/InteractionShowCase";
import { HowItWorks } from "@/components/HowItWorks";
import { Dashboard } from "@/components/DashBoard";
import { useMe } from "@/features/auth/hooks/useMe";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-20 pb-24 px-6 max-w-7xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PreferencesScreen />
      <InteractiveShowcase />
      <HowItWorks />
      <Bottom />
    </>
  );
}

export default function Home() {
  const { data: user, isLoading } = useMe();
  const isAuthed = !!user;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return <div>{isAuthed ? <Dashboard /> : <LandingPage />}</div>;
}
