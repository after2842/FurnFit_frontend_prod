"use client";
import React from "react";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import {
  MessageCircleQuestion,
  TrendingUp,
  BarChart2,
  Check,
  ArrowRight,
  Store,
  Sparkles,
} from "lucide-react";

export const Merchants = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32 relative overflow-hidden">
      <Navbar />

      {/* Decorative colored background blooms */}
      <div className="absolute top-0 right-0 -translate-y-24 translate-x-1/3 w-[800px] h-[800px] bg-indigo-300/30 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <main className="pt-32 mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100/50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-indigo-200">
            <Store size={16} />
            AuraFit for Merchants
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Put your products where style happens.
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl px-4">
            Upload your catalogs, sponsor your best pieces, and leverage AI to
            uncover what our highly-engaged community truly thinks about your
            brand.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
              Start Selling <ArrowRight size={18} />
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm">
              View Analytics Demo
            </button>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Why advertise with us?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-start hover:-translate-y-1 transition-transform"
            >
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-6">
                <MessageCircleQuestion size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Interaction Insights
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Stop guessing. We identify exactly how users interact with your
                products and automatically compile the most common questions
                they have before purchasing.
              </p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-start hover:-translate-y-1 transition-transform"
            >
              <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 mb-6">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Priority Search Placement
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Sponsored products bypass the algorithm to show up first for
                highly relevant aesthetic searches, guaranteeing impressions
                from shoppers looking for your exact style.
              </p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-start hover:-translate-y-1 transition-transform"
            >
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 mb-6">
                <BarChart2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Competitive Traction
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Access a real-time dashboard comparing your product's save
                rates, clicks, and impressions directly against competitors in
                the same aesthetic archetypes.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Pricing Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
              Transparent Pricing
            </h2>
            <p className="text-slate-500 font-medium">
              Choose a plan that scales with your catalog.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    $3
                  </span>
                  <span className="text-slate-500 font-medium">/month</span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  Perfect for independent creators testing the waters.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Upload up to 50 products",
                  "Standard search placement",
                  "Basic click analytics",
                  "Community support",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-medium text-slate-700"
                  >
                    <div className="bg-indigo-100 p-1 rounded-full text-indigo-600 shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-slate-100 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-sm">
                Get Started
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl shadow-indigo-900/20 relative md:-mt-8 md:mb-8"
            >
              {/* Badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Sparkles size={14} /> Most Popular
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Pro</h3>
                <div className="mt-4 flex items-baseline gap-1 text-white">
                  <span className="text-5xl font-extrabold">$10</span>
                  <span className="text-slate-400 font-medium">/month</span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-400">
                  Scale your brand with priority features and deep insights.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited product uploads",
                  "Sponsored priority placement",
                  "AI interaction & common questions",
                  "Competitor traction dashboard",
                  "Priority 24/7 support",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-medium text-slate-300"
                  >
                    <div className="bg-indigo-500/20 border border-indigo-500/30 p-1 rounded-full text-indigo-400 shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30">
                Upgrade to Pro
              </button>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    Custom
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  For large retailers requiring API sync and bespoke setup.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Dedicated Account Manager",
                  "API catalog synchronization",
                  "Custom brand storefront aesthetic",
                  "White-glove onboarding & setup",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-medium text-slate-700"
                  >
                    <div className="bg-indigo-100 p-1 rounded-full text-indigo-600 shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
