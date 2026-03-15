"use client";
import { useState, useEffect } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { LoadingState } from "./Loading";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, Sparkles, Camera, Wand2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface FurnitureDetailProps {
  item: {
    id: string;
    name: string;
    price_min: number;
    price_max: number;
    image_urls: string[];
    description?: string;
    product_url: string;
    title: string;
  };
}

export default function FurnitureDetail({ item }: FurnitureDetailProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  const [tryOnUrl, setTryOnUrl] = useState<string | null>(null);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [tryOnError, setTryOnError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch(
          `/api/product/style-analysis?productId=${encodeURIComponent(item.id)}`
        );
        if (res.ok) {
          const data = await res.json();
          setAnalysis(data.analysis);
        }
      } catch (err) {
        console.error("Style analysis failed:", err);
      } finally {
        setAnalysisLoading(false);
      }
    };
    fetchAnalysis();
  }, [item.id]);

  const handleTryOn = async () => {
    const referenceImage = item.image_urls?.[0];
    if (!referenceImage) return;

    setTryOnLoading(true);
    setTryOnError(null);
    try {
      console.log(referenceImage);
      const res = await fetch(
        `/api/product/try-on?referenceImage=${encodeURIComponent(
          referenceImage
        )}`
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Try-on failed");
      }
      const data = await res.json();
      setTryOnUrl(data.resultUrl);
    } catch (err: any) {
      setTryOnError(err.message || "Something went wrong");
    } finally {
      setTryOnLoading(false);
    }
  };

  const price =
    item.price_min === item.price_max
      ? `$${item.price_min}`
      : `$${item.price_min} - $${item.price_max}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32">
      <main className="pt-28 mx-auto max-w-7xl px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm mb-8"
        >
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left Column: Image & Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Main Product Image */}
            <div className="rounded-[2rem] overflow-hidden bg-slate-100 aspect-[4/5] relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
              <ImageCarousel images={item.image_urls} />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {item.title}
                </h1>
                <span className="text-3xl font-extrabold text-indigo-600 shrink-0 ml-4">
                  {price}
                </span>
              </div>

              <a
                href={item.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full text-black px-8 py-4 rounded-xl font-bold border border-indigo-600 transition-all flex items-center justify-center gap-2 text-lg cursor-pointer"
              >
                Visit Store
              </a>
            </div>
          </motion.div>

          {/* Right Column: AI Insights & Virtual Try-On */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* AI Style Analysis */}
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-[2rem] p-8 border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white text-white p-2 rounded-xl shadow-md shadow-indigo-200">
                  <img src="/logo3.svg" width={20} />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  FurnFit Analysis
                </h2>
              </div>

              <div className="space-y-4">
                {analysisLoading ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
                    <span className="font-medium text-lg">Analyzing your style...</span>
                  </div>
                ) : analysis ? (
                  <div className="prose prose-slate prose-lg max-w-none prose-strong:text-indigo-700">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-400 font-medium leading-relaxed text-lg">
                    Style analysis unavailable.
                  </p>
                )}
              </div>
            </div>

            {/* Virtual Try-On Area */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 text-slate-700 p-2 rounded-xl">
                    <Camera size={20} />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Virtual Try-On
                  </h2>
                </div>
                <button
                  onClick={handleTryOn}
                  disabled={tryOnLoading}
                  className="cursor-pointer hover:border-indigo-600 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-1 disabled:opacity-50"
                >
                  <Wand2 size={12} />{" "}
                  {tryOnLoading ? "Generating..." : "Try On"}
                </button>
              </div>

              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50 min-h-[400px] overflow-hidden">
                {tryOnLoading ? (
                  <LoadingState
                    title="Trying it on..."
                    subtitle="Our AI is generating your virtual try-on. This may take a moment."
                  />
                ) : tryOnError ? (
                  <p className="text-red-500 font-medium">{tryOnError}</p>
                ) : tryOnUrl ? (
                  <img
                    src={tryOnUrl}
                    alt="Virtual try-on result"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
