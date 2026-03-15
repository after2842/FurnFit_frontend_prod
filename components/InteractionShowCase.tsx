"use client";
import React, { useState } from "react";
import {
  Search,
  Bot,
  Instagram,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import Image from "next/image";
export const InteractiveShowcase = () => {
  const [search, setSearch] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          {/* Big Product Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative h-[800px] lg:h-[700px] rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200">
              <img
                src="/exmaple.jpg"
                alt="Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Image
                  src="/logo5.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="text-white"
                />
                99% Style Match
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Crinkle Texture Lounge Set
                </h3>
                <p className="text-white/80 text-lg">$145.00</p>
              </div>
            </div>
          </div>

          {/* AI Review & Virtual Try-On Box */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <Card className="border-indigo-200 shadow-xl overflow-hidden relative flex-1 flex flex-col">
              <CardContent className="p-8 flex flex-col h-full">
                {/* Instagram Virtual Try-On - MOVED UP */}
                <div className="flex-1 min-h-[300px] relative rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200 group mb-8">
                  <img
                    src={
                      showOriginal ? "/tryonexample.jpg" : "/try_on_result.png"
                    }
                    alt="Virtual Try On"
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute top-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 shadow-lg border border-white/20">
                      <div className="flex-1">
                        <span className="font-bold text-slate-900 block text-lg">
                          Virtual Try-On
                        </span>
                        <span className="text-slate-500 text-sm">
                          Generated referencing your recent post
                        </span>
                      </div>
                      <button
                        onClick={() => setShowOriginal(!showOriginal)}
                        className="bg-indigo-600 text-white p-2 rounded-full shadow-lg"
                      >
                        {showOriginal ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Review Text - MOVED DOWN */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <img src="/logo5.svg" width={36} />

                    <h3 className="font-bold text-2xl text-slate-900">
                      FurnFit Review
                    </h3>
                  </div>

                  <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
                    <p className="text-slate-700 text-lg leading-relaxed">
                      "Based on your recent aesthetic and love for minimalist
                      earth tones, this matching crinkle set aligns perfectly
                      with your vibe. The relaxed silhouette complements your
                      preferred oversized fit, making it a highly recommended
                      addition to your capsule wardrobe."
                    </p>
                  </div>
                </div>

                <button className="mt-8 w-full py-4 bg-black text-white rounded-xl text-lg font-bold hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2 group cursor-pointer">
                  Let's buy
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
