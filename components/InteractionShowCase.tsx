"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export const InteractiveShowcase = () => {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Product image */}
          <div className="relative group rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200 aspect-[4/5]">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
            <div className="relative w-full h-full">
              <Image
                src="/src.jpeg"
                alt="Product"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-6 right-6 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Sparkles size={16} />
                99% Style Match
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Light Blue Bomber Jacket
                </h3>
                <p className="text-white/80 text-lg">$145.00</p>
              </div>
            </div>
          </div>

          {/* Right: Virtual try-on with toggle */}
          <div className="relative group rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200 aspect-[4/5]">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
            <div className="relative w-full h-full">
              <Image
                src={showOriginal ? "/target.jpeg" : "/try_on_result.jpg"}
                alt="Virtual Try On"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 shadow-lg border border-white/20">
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block text-lg">
                      Virtual Try-On
                    </span>
                    <span className="text-slate-500 text-sm">
                      {showOriginal
                        ? "Your reference photo"
                        : "Generated for your style"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowOriginal((v) => !v)}
                    aria-label={
                      showOriginal ? "Show try-on result" : "Show original"
                    }
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition-colors cursor-pointer"
                  >
                    {showOriginal ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
