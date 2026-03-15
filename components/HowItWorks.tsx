"use client";
import React from "react";
import { motion } from "motion/react";
import {
  ScanLine,
  Instagram,
  Sparkles,
  Layers,
  Fingerprint,
  Focus,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Catalog AI Analysis",
    description:
      "Every catalog item is analyzed by our in-house AI, trained alongside top fashion industry leaders to intimately understand cut, drape, materials, and trend archetypes.",
    icon: <Layers className="text-indigo-600" size={28} />,
    bgColor: "bg-indigo-100",
    ringColor: "ring-indigo-200",
  },
  {
    id: "02",
    title: "Your Instagram Profile",
    description:
      "Your Instagram photos are analyzed by that exact same in-house AI to map your authentic personal style, favorite color palettes, preferred silhouettes, and lifestyle contexts.",
    icon: <Instagram className="text-pink-600" size={28} />,
    bgColor: "bg-pink-100",
    ringColor: "ring-pink-200",
  },
  {
    id: "03",
    title: "The Perfect Match",
    description:
      "Our engine bridges the gap, scoring and ranking clothing items based on your unique fashion DNA, accompanied by virtual try-ons generated exclusively for you.",
    icon: <Sparkles className="text-purple-600" size={28} />,
    bgColor: "bg-purple-100",
    ringColor: "ring-purple-200",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative border-t border-slate-200">
      {/* Background soft blurs to match the landing page theme */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-extrabold text-indigo-600 tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
              <ScanLine size={18} /> The Intelligence Engine
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              A fashion brain trained by experts, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                tailored exactly to you.
              </span>
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Text Steps */}
          <div className="w-full lg:w-1/2 space-y-12 relative">
            {/* Connecting vertical line */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-200 via-pink-200 to-purple-200 hidden md:block"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
              >
                <div
                  className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl ${step.bgColor} ring-4 ring-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:${step.ringColor} transition-all duration-300`}
                >
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-400">
                      Step {step.id}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Image Display with AI Scanning Effects */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 max-w-md mx-auto bg-white aspect-[4/5] group"
            >
              <img
                src="https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzMyMzIwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Fashion Analysis"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-slate-900/10"></div>

              {/* Simulated AI Scan Line */}
              <motion.div
                animate={{ y: ["0%", "400%", "0%"] }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)] z-20"
              ></motion.div>

              {/* Floating Tags */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                <Focus size={16} className="text-indigo-600" />
                <span className="text-sm font-bold text-slate-900">
                  Silhouette Match
                </span>
              </div>

              <div className="absolute top-20 right-6 bg-indigo-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 flex items-center gap-2 text-white">
                <Fingerprint size={16} />
                <span className="text-sm font-bold">Archetype: Minimalist</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-0.5 rounded-full shrink-0">
                    <div className="bg-white p-1.5 rounded-full">
                      <Instagram className="text-pink-600" size={18} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
                      Profile Analysis Complete
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Aesthetic aligned perfectly
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
