"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Search } from "lucide-react";
const PreferencesScreen = ({}) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("sofa");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [roomWidth, setRoomWidth] = useState(12);
  const [roomLength, setRoomLength] = useState(14);
  const [searchFurn, setSearchFurn] = useState("");

  const handleSubmit = async (e: any) => {
    // Navigate to result page with query parameters
    if (e) e.preventDefault();
    const params = new URLSearchParams({
      type: selectedType,
      style: selectedStyle,
      width: roomWidth.toString(),
      length: roomLength.toString(),
      title: searchFurn,
    });
    console.log("search submitted!");

    router.push(`/result?${params.toString()}`);
  };
  return (
    <div className="flex flex-col items-center">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-16 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12">
          Find products that{" "}
          <span className="text-indigo-600">actually fit.</span>
        </h1>
        <div className="flex justify-center items-center text-md w-full gap-4">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search your product"
              value={searchFurn}
              className="text-xl rounded-lg w-full !border !border-gray-900 focus:!border-indigo-600 focus:outline-none px-2 py-2"
              onChange={(e) => {
                setSearchFurn(e.target.value);
              }}
            />
          </form>
          <button
            onClick={handleSubmit}
            className=" px-4 py-3 bg-white border border-black hover:border-indigo-600 text-slate-300  rounded-xl flex items-center justify-center hover:cursor-pointer "
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;
