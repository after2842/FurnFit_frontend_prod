"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react";
const PreferencesScreen = ({}) => {
  const router = useRouter();
  const [searchFurn, setSearchFurn] = useState("");

  const handleSubmit = async (e: any) => {
    // Navigate to result page with query parameters
    if (e) e.preventDefault();
    const params = new URLSearchParams({
      title: searchFurn,
    });
    console.log("search submitted!");

    router.push(`/result?${params.toString()}`);
  };
  return (
    <div className="flex flex-col items-center">
      {/* Hero Header */}
      <div className="text-center w-full md:w-3/4 pt-16 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl w-full font-extrabold text-slate-900 mb-0"></h1>
        <div className="flex justify-center items-center text-md w-full gap-4">
          <div className="w-full relative">
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="search your product"
                value={searchFurn}
                className="w-full text-xl rounded-2xl w-full border-1 border-black pl-6 pr-16 py-5 bg-white shadow-md transition-all font-medium"
                onChange={(e) => {
                  setSearchFurn(e.target.value);
                }}
              />
            </form>
            <button
              onClick={handleSubmit}
              className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;
