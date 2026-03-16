"use client";
import { ConnectInstagram } from "./ConnectIg";
import { useState } from "react";
import YourFit from "./YourFit";
import React from "react";
import { motion } from "motion/react";
import {
  Instagram,
  Plus,
  CheckCircle2,
  Lock,
  ArrowRight,
  User,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Me } from "@/features/auth/types";

interface ArchetypeScore {
  label: string;
  score: number;
  confidence: number;
  evidence_refs: string[];
}

interface EvidenceItem {
  post_shortcode: string;
  excerpt: string;
}

interface InstagramAnalysis {
  username: string;
  summary: string;
  aesthetic_archetypes: ArchetypeScore[];
  lifestyle_and_occasion: ArchetypeScore[];
  color_and_pattern_affinity: ArchetypeScore[];
  evidence_index: EvidenceItem[];
  overall_confidence: number;
  missing_data: string[];
}

interface UserProfileProps {
  isAuthed: boolean;
  user: Me;
  refetchUser: () => void;
}

export default function UserProfile({
  isAuthed,
  user,
  refetchUser,
}: UserProfileProps) {
  if (!isAuthed) {
    return <div className="text-center py-20">Please login</div>;
  }

  return <Profile user={user} refetchUser={refetchUser} />;
}

export const Profile = ({
  user,
  refetchUser,
}: {
  user: Me;
  refetchUser: () => void;
}) => {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isConnected, setIsConnected] = useState(user.is_connected || false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [instaAnalysis, setInstaAnalysis] = useState<InstagramAnalysis | null>(
    null
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleInstagramConnected = (data: InstagramAnalysis) => {
    console.log("IG connected!");
    setIsConnected(true);
    setShowConnectForm(false);
    setInstaAnalysis(data);
    // Refetch user data to update is_connected status
    refetchUser();
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans ">
      {/* Decorative colored background blooms */}
      <div className="absolute top-0 right-0 -translate-y-24 translate-x-1/3 w-[800px] h-[800px] bg-indigo-300/30 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <main className="pt-32 mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-indigo-200">
            <img src="/logo3.svg" alt="Aura icon" className="w-4 h-4" />
            Account Settings
          </div>
        </motion.div>

        <div className="space-y-8 max-w-4xl">
          {/* Personal Information */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Personal Details
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-6">
                <div className="relative">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900 outline-none shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-bold text-slate-700 block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900 outline-none shadow-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  Save Changes
                </button>
                {isSaved && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-emerald-600 font-bold flex items-center gap-2 text-sm bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100"
                  >
                    <CheckCircle2 size={16} /> Saved
                  </motion.span>
                )}
              </div>
            </form>
          </motion.section>

          {/* Connected Accounts */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
                <Instagram size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Connections
                </h2>
              </div>
            </div>

            {/* Show Connect Form */}
            {showConnectForm ? (
              <div className="mb-6">
                <ConnectInstagram onConnected={handleInstagramConnected} />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-pink-200 transition-colors group">
                <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
                  <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-0.5 rounded-xl shrink-0 shadow-md">
                    <div className="bg-white p-2.5 rounded-[10px]">
                      <Instagram size={24} className="text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Instagram
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                      {isConnected ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Connected
                        </span>
                      ) : (
                        "Not connected"
                      )}
                    </p>
                  </div>
                </div>

                {isConnected ? (
                  <div className="w-full sm:w-auto flex items-center gap-3">
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} /> Connected
                    </span>
                    <button
                      onClick={() => setShowConnectForm(true)}
                      className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors cursor-pointer"
                    >
                      Re-sync
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowConnectForm(true)}
                    className="w-full sm:w-auto bg-slate-50 text-slate-700 border border-slate-200 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    Connect <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}

            {/* Show YourFit Analysis after connection */}
            {isConnected && instaAnalysis && (
              <div className="mt-8">
                {/* <YourFit data={instaAnalysis} /> */}
              </div>
            )}
          </motion.section>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4"
          >
            <button
              onClick={async () => {
                await fetch(
                  "/api/auth/logout",
                  { method: "POST", credentials: "include" }
                );
                window.location.href = "/";
              }}
              className="text-slate-500 hover:text-red-600 text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={16} /> Log out
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
