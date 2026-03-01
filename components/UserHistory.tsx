"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HistoryItem {
  id: string;
  image_urls: string[];
  title: string;
}

export default function UserHistory() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's search history from API
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user/history");
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setHistoryItems(data || []);
        } else {
          console.log("something wrong");
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const clearHistory = async () => {
    try {
      const res = await fetch("/api/user/history", {
        method: "DELETE",
      });
      if (res.ok) {
        setHistoryItems([]);
      }
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-200 aspect-square rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Search History</h2>
          <p className="text-slate-600 text-sm mt-1">
            Recently viewed products ({historyItems.length})
          </p>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          ></button>
        )}
      </div>

      {historyItems.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-500 mt-4">No search history yet</p>
          <p className="text-slate-400 text-sm mt-2">
            Products you search will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {historyItems.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`product/${item.id}`)}
              className="group cursor-pointer bg-white border border-black rounded-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-square">
                <Image
                  src={item?.image_urls[0]}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200 border"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-slate-900 truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
