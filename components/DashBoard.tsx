"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Instagram,
  Heart,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Focus,
} from "lucide-react";
import Navbar from "./Navbar";
import { useMe } from "@/features/auth/hooks/useMe";
import { useUserIgImages } from "@/features/auth/hooks/useUserIgImages";
import PreferencesScreen from "./Preference";
import FakeFilter from "./FakeFilter";
import Link from "next/link";
const history = [
  {
    id: "h1",
    name: "Canvas Low-Tops",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMzM5MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "h2",
    name: "Classic Aviators",
    price: "$145",
    image:
      "https://images.unsplash.com/photo-1601633792220-5497bdee603a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzMyOTk2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "h3",
    name: "Vintage Wash Jeans",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1580437167606-6e682c992c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMzM5MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "h4",
    name: "Silver Link Chain",
    price: "$40",
    image:
      "https://images.unsplash.com/photo-1705326452390-3ecf6070595f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBuZWNrbGFjZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMzM5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

async function fetchTextRecs() {
  console.log("fetching text-recs similarity search");
  const res = await fetch("/api/product/text-recs", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed /product/text-recs: ${res.status}`);
  }
  return res.json();
}

const mapProductsFromApi = (products: any[] = []) =>
  products.map((p, idx) => ({
    id: (
      p.id ??
      p.product_id ??
      p.product_gid ??
      p.handle ??
      p.title ??
      `rec-${idx}`
    ).toString(),
    name: p.name ?? p.title ?? "Product",
    price:
      typeof p.price_min === "number"
        ? `$${p.price_min.toFixed(2)}`
        : p.price ?? p.price_max ?? "—",
    match: Math.round((p.score ?? 0) * 10),
    image:
      p.image_url ??
      p.image ??
      (Array.isArray(p.image_urls) ? p.image_urls[0] : undefined) ??
      "https://placehold.co/400x500",
  }));

const ProductSkeletonCard = () => (
  <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm flex flex-col animate-pulse">
    <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 p-6" />
    <div className="p-8 flex flex-col flex-1 bg-white gap-3">
      <div className="h-5 bg-slate-100 rounded w-3/4" />
      <div className="h-4 bg-slate-100 rounded w-1/3" />
      <div className="mt-auto h-10 bg-slate-100 rounded" />
    </div>
  </div>
);

const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-200 pb-6 gap-4">
      <div>
        <div className="h-4 bg-slate-100 rounded w-24 mb-2" />
        <div className="h-9 bg-slate-100 rounded w-48" />
      </div>
    </div>
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="w-full xl:w-[400px] shrink-0">
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 h-full flex flex-col">
          <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-slate-100 shadow-inner" />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        <ProductSkeletonCard />
        <ProductSkeletonCard />
      </div>
    </div>
  </div>
);

const BATCH_SIZE = 10;

export const Dashboard = () => {
  const router = useRouter();
  const { data: user } = useMe();
  const { data: igImages = [], isLoading: isLoadingIg } = useUserIgImages();

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  useEffect(() => setVisibleCount(BATCH_SIZE), [igImages]);

  useEffect(() => {
    if (igImages.length) {
      console.log("IG image sample", igImages[0]);
    }
  }, [igImages]);

  const { data: recsData = [], isLoading: isLoadingRecs } = useQuery({
    queryKey: ["text-recs"],
    queryFn: fetchTextRecs,
    enabled: igImages.length > 0,
    staleTime: 60_000,
    retry: false,
  });

  // Build a lookup map: sourceImage URL → rec object
  const recsMap = new Map(
    (recsData as any[]).map((rec: any) => [rec.sourceImage, rec])
  );

  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((v) => Math.min(v + BATCH_SIZE, igImages.length));
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [igImages.length]);

  return (
    <div className="min-h-screen bg-slate-white text-slate-900 font-sans pb-32 overflow-hidden relative">
      <Navbar />

      <main className="pt-12 mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <PreferencesScreen />
          <div className="mt-4 max-w-3xl mx-auto">
            <FakeFilter />
          </div>
        </div>

        {/* Recommendations Feed — one section per IG image */}
        <div className="space-y-32">
          {isLoadingIg
            ? /* IG images still loading — show skeleton placeholders */
              [0, 1, 2].map((i) => <SectionSkeleton key={`ig-skeleton-${i}`} />)
            : igImages.slice(0, visibleCount).map((img, index) => {
                const rec = recsMap.get(img.url);
                const isPending = isLoadingRecs;
                const products = rec?.products?.length
                  ? mapProductsFromApi(rec.products)
                  : [];
                const categoryLabel = rec?.reason ?? "Detecting...";
                const description = img?.nice_words
                  ? img.nice_words
                  : "Personalized picks coming soon";

                return (
                  <motion.section
                    key={img?.url ?? index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-200 pb-6 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold uppercase tracking-wider text-sm">
                          <img src="/logo3.svg" width={16} /> Fits for you
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                          {isPending ? (
                            <span className="inline-block h-9 w-48 bg-slate-100 rounded animate-pulse" />
                          ) : (
                            categoryLabel
                          )}
                        </h2>
                      </div>
                      {!isPending && (
                        <button
                          onClick={() =>
                            router.push(
                              `/result?source=text-rec&url=${encodeURIComponent(
                                img.url
                              )}&title=${encodeURIComponent(rec?.reason ?? "")}`
                            )
                          }
                          className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors flex items-center gap-2 group whitespace-nowrap bg-indigo-50 px-5 py-2.5 rounded-full hover:bg-indigo-100 cursor-pointer"
                        >
                          View all
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col xl:flex-row gap-10">
                      {/* Left Column: Instagram Inspiration */}
                      <div className="w-full xl:w-[400px] shrink-0">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl shadow-indigo-900/5 h-full flex flex-col relative overflow-hidden group">
                          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-bl from-pink-200 to-purple-200 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                          <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px] rounded-full shrink-0">
                              <div className="bg-white p-2 rounded-full">
                                <Instagram
                                  className="text-pink-600"
                                  size={24}
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-slate-900">
                                Style Inspiration
                              </h3>
                              <p className="text-sm text-slate-500 font-medium">
                                From your posts
                              </p>
                            </div>
                          </div>

                          <div className="mb-8 flex-1">
                            <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/5] bg-slate-100 shadow-inner group/img">
                              <img
                                src={img?.url}
                                alt="Your Instagram Post"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                              />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-lg border border-white/20 cursor-pointer">
                                <Focus size={14} className="text-indigo-600" />{" "}
                                Sourcedx
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative z-10">
                            <div className="flex items-start gap-3">
                              <img src="/logo3.svg" width={20} />
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Products (skeleton while recs load) */}
                      <div className="w-full hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {isPending
                          ? [0, 1].map((i) => (
                              <ProductSkeletonCard
                                key={`skeleton-${index}-${i}`}
                              />
                            ))
                          : products.slice(0, 2).map((product) => (
                              <div
                                key={product.id}
                                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
                              >
                                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 p-6">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105 shadow-md"
                                  />
                                </div>
                                <div className="p-8 flex flex-col flex-1 bg-white">
                                  <div className="flex justify-between items-start mb-3 gap-4">
                                    <h4 className="font-bold text-xl text-slate-900 leading-tight line-clamp-2">
                                      {product.name}
                                    </h4>
                                    <span className="font-extrabold text-xl text-slate-900 whitespace-nowrap">
                                      {product.price}
                                    </span>
                                  </div>

                                  <Link
                                    href={`/product/${product.id}`}
                                    className="mt-auto w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl py-3 flex justify-center items-center gap-2 text-sm transition-colors group-hover:border-indigo-600 cursor-pointer"
                                  >
                                    <ShoppingBag size={20} /> Details
                                  </Link>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  </motion.section>
                );
              })}
        </div>

        {/* Sentinel: triggers next batch when scrolled into view */}
        <div ref={sentinelRef} className="h-1" />

        {/* Recent History Widget */}
        <motion.section
          className="mt-32 pt-16 border-t-2 border-slate-200/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Recent History
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {history.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-md overflow-hidden bg-white mb-4 border border-black shadow-sm group-hover:shadow-lg group-hover:border-indigo-300 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h4 className="font-bold text-slate-900 text-base md:text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors px-1">
                  {item.name}
                </h4>
                <p className="text-slate-500 font-medium px-1">{item.price}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};
