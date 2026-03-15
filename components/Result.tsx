"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { AlignLeft, Filter, ChevronDown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "./Pagination";

type SortOption = "recommended" | "price_asc" | "price_desc" | "alpha";

const SORT_LABELS: Record<SortOption, string> = {
  recommended: "Recommended",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  alpha: "A – Z",
};

interface FurnitureItem {
  id: string;
  description: string;
  title: string;
  price_min: number;
  price_max: number;
  image_urls: string[];
  url: string;
}

interface ResultProps {
  title: string;
  items: FurnitureItem[];
  currentPage: number;
  totalPages: number;
}

const Result = ({ title, items, currentPage, totalPages }: ResultProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<SortOption>("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const sortedItems = useMemo(() => {
    if (sort === "recommended") return items;
    const sorted = [...items];
    if (sort === "price_asc") sorted.sort((a, b) => a.price_min - b.price_min);
    if (sort === "price_desc") sorted.sort((a, b) => b.price_min - a.price_min);
    if (sort === "alpha") sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [items, sort]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="pt-28 mx-auto px-6 lg:px-8 pb-32">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm tracking-wide mb-3 uppercase">
            <AlignLeft size={16} /> FITS FOR YOU
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors border border-slate-200">
            <Filter size={16} /> Filters
          </button>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
            >
              Sort by: {SORT_LABELS[sort]} <ChevronDown size={16} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-20 overflow-hidden">
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSort(key); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      sort === key
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {items.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-[2rem] p-3 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all group flex flex-col"
              >
                <div className="rounded-[1.5rem] overflow-hidden bg-slate-50 aspect-[3/4] relative">
                  {item.image_urls?.[0] && (
                    <img
                      src={item.image_urls[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-3 pt-5 flex flex-col gap-4 grow">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <span className="font-extrabold text-slate-900 shrink-0">
                      ${item.price_min}
                    </span>
                  </div>

                  <Link
                    href={`/product/${item.id}`}
                    className="mt-auto w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-xl py-3 flex justify-center items-center gap-2 text-sm transition-colors group-hover:border-indigo-600 cursor-pointer"
                  >
                    <ShoppingBag size={16} /> Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          {totalPages > 0 && (
            <div className="mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 font-medium text-lg">
          No results found
        </div>
      )}
    </main>
  );
};

export default Result;
