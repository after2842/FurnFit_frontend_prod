"use client";
import React from "react";
import { motion } from "motion/react";
import { Instagram, Sparkles, MoveRight, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200 pt-20 pb-24 sm:pt-32 sm:pb-32 lg:pb-40">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-300 to-purple-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        {/* Left text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              <img src="/logo5.svg" width={16} /> AI-Powered Personalization
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Find apparel that{" "}
              <span className="text-indigo-600 relative inline-block">
                actually fits
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-200 -z-10 transform -rotate-2"></span>
              </span>{" "}
              your unique taste.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Connect your Instagram and let our AI analyze your photos,
              captions, and comments. We'll discover your exact fashion
              archetype and rank search results uniquely for you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                onClick={() => router.push("/login")}
              >
                <Instagram size={20} />
                Connect Instagram
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                onClick={() => router.push("/login")}
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-300 hover:border-indigo-600 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Explore Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right 3D/Floating Cards Scene */}
        <div className="w-full lg:w-1/2 relative h-[500px] perspective-1000">
          {/* Card 1: Instagram Post Mock */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15, rotateZ: -5 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              duration: 0.8,
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute top-10 right-10 lg:right-20 w-64 z-10 shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-100"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="p-3 flex items-center gap-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1701850508570-75e73169fd7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwcGVyc29uJTIwaW5zdGFncmFtJTIwcHJvZmlsZXxlbnwxfHx8fDE3NzMzMDgzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">
                  @your_style
                </div>
                <div className="text-[10px] text-slate-400">Tokyo, Japan</div>
              </div>
              <Instagram size={14} className="text-slate-400" />
            </div>
            <div className="h-64 bg-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1768489038395-9ee146fb2b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG91dGZpdHxlbnwxfHx8fDE3NzMzMDgzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Outfit"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                <Sparkles size={10} /> Extracting Style...
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI Analysis Token */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateZ: 10 }}
            animate={{ opacity: 1, scale: 1, y: [0, 15, 0] }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute top-40 left-0 lg:-left-10 w-48 z-20 shadow-xl rounded-xl bg-white/90 backdrop-blur-xl border border-indigo-100 p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                <img src="/logo3.svg" width={16} />
              </div>
              <div className="text-sm font-bold text-slate-900">
                Archetype Found
              </div>
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Urban Minimalist</span>
                <span className="text-indigo-600 font-bold">94%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full w-[94%]"></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Y2K Vintage</span>
                <span className="text-indigo-600 font-bold">65%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-indigo-400 h-1.5 rounded-full w-[65%]"></div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Personalized Product Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10, rotateZ: 5 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              y: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            className="absolute bottom-10 right-20 lg:right-40 w-56 z-30 shadow-2xl rounded-2xl bg-white border border-indigo-200 overflow-hidden"
          >
            <div className="h-40 bg-slate-100 relative">
              <img
                src="/example.jpg"
                alt="Recommended Item"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                98% Match
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs text-indigo-600 font-semibold mb-1">
                AI Agent Review
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">
                "Based on your recent Tokyo trip photos, this beige minimalist
                shirts perfectly aligns with your aesthetic and fits your
                neutral color palette preference."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
