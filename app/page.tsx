"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { useMe } from "@/features/auth/hooks/useMe";

const InteractiveShowcase = dynamic(
  () => import("@/components/InteractionShowCase").then((m) => m.InteractiveShowcase),
  { ssr: false }
);
const HowItWorks = dynamic(
  () => import("@/components/HowItWorks").then((m) => m.HowItWorks),
  { ssr: false }
);
const Bottom = dynamic(() => import("@/components/Bottom"), { ssr: false });
const Dashboard = dynamic(
  () => import("@/components/DashBoard").then((m) => m.Dashboard),
  { ssr: false }
);

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InteractiveShowcase />
      <HowItWorks />
      <Bottom />
    </>
  );
}

export default function Home() {
  const { data: user, isLoading } = useMe();

  if (!isLoading && user) {
    return <Dashboard />;
  }

  return <LandingPage />;
}
