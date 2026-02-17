"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Armchair,
  Sofa,
  Bed,
  Lamp,
  Ruler,
  Palette,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Search,
} from "lucide-react";
const PreferencesScreen = ({}) => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("sofa");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [roomWidth, setRoomWidth] = useState(12);
  const [roomLength, setRoomLength] = useState(14);
  const [searchFurn, setSearchFurn] = useState("");

  const furnitureTypes = [
    { id: "sofa", icon: Sofa, label: "Sofa", desc: "Sectionals & Loveseats" },
    { id: "chair", icon: Armchair, label: "Chair", desc: "Accent & Dining" },
    { id: "bed", icon: Bed, label: "Bed", desc: "Frames & Headboards" },
    { id: "lamp", icon: Lamp, label: "Lighting", desc: "Floor & Table" },
  ];

  const styles = [
    {
      id: "modern",
      label: "Modern",
      color: "bg-neutral-100",
      img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "scandi",
      label: "Scandi",
      color: "bg-stone-100",
      img: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "industrial",
      label: "Industrial",
      color: "bg-slate-200",
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "boho",
      label: "Boho",
      color: "bg-orange-50",
      img: "https://www.mydomaine.com/thmb/JBwGOO8tKeEd3KKZZfoM7XU0_Xs=/1080x0/filters:no_upscale():strip_icc()/147969513_1032772157218233_9184212869626937747_n-a6272d61d1a3421abb8f2b5a13298a35.jpg",
    },
  ];
  const handleSubmit = async () => {
    // Navigate to result page with query parameters
    const params = new URLSearchParams({
      type: selectedType,
      style: selectedStyle,
      width: roomWidth.toString(),
      length: roomLength.toString(),
      title: searchFurn,
    });

    router.push(`/result?${params.toString()}`);
  };
  return (
    <div className="flex flex-col items-center animate-in fade-in duration-700">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-16 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12">
          Find furniture that{" "}
          <span className="text-indigo-600">actually fits.</span>
        </h1>
        <div className="flex justify-center items-center text-lg w-full">
          <input
            type="text"
            placeholder=" search your furniture"
            value={searchFurn}
            className="border rounded-lg w-full border-indigo-600 mr-2 px-2 py-1"
            onChange={(e) => {
              setSearchFurn(e.target.value);
            }}
          />
          {/* <Search className="hover:text-inidigo-600 transition:color" /> */}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-6xl px-6 pb-24">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Left Column: Functional Inputs */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-10">
              {/* Type Selection */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    What are you looking for?
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {furnitureTypes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedType(item.id)}
                      className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedType === item.id
                          ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                          : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mb-3 ${
                          selectedType === item.id
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <item.icon size={20} strokeWidth={2} />
                      </div>
                      <span className="font-bold text-slate-900">
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Room Dimensions */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Ruler size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Room Dimensions
                  </h2>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="font-medium text-slate-700">
                          Room Width
                        </label>
                        <span className="text-2xl font-bold text-indigo-600">
                          {roomWidth} ft
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={roomWidth}
                        onChange={(e) => setRoomWidth(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>5'</span>
                        <span>30'</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="font-medium text-slate-700">
                          Room Length
                        </label>
                        <span className="text-2xl font-bold text-indigo-600">
                          {roomLength} ft
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={roomLength}
                        onChange={(e) => setRoomLength(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>5'</span>
                        <span>30'</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Visual Style */}
            <div className="lg:col-span-5 bg-slate-50/50 p-8 md:p-12 flex flex-col">
              <section className="flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <Palette size={20} className="text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Choose your Aesthetic
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative group overflow-hidden rounded-xl aspect-[4/3] border-2 transition-all ${
                        selectedStyle === style.id
                          ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-2"
                          : "border-transparent hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={style.img}
                        alt={style.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 transition-colors duration-300 ${
                          selectedStyle === style.id
                            ? "bg-indigo-900/40"
                            : "bg-black/20 group-hover:bg-black/10"
                        }`}
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        {selectedStyle === style.id && (
                          <div className="bg-white text-indigo-600 rounded-full p-1 mb-2 shadow-lg animate-in zoom-in duration-300">
                            <CheckCircle2 size={16} />
                          </div>
                        )}
                        <span className="font-bold text-white text-lg shadow-black/20 text-shadow-sm">
                          {style.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white h-16 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-1 hover:cursor-pointer transition-all duration-300"
                >
                  <Sparkles size={20} />
                  Find My Furniture
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Search 10000+ furniture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;
