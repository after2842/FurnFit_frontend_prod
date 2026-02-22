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
    <div className="flex flex-col items-center">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto pt-16 pb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12">
          Find products that{" "}
          <span className="text-indigo-600">actually fit.</span>
        </h1>
        <div className="flex justify-center items-center text-md w-full">
          <input
            type="text"
            placeholder="search your product"
            value={searchFurn}
            className="rounded-lg w-full !border !border-gray-900 focus:!border-indigo-600 focus:outline-none px-2 py-2"
            onChange={(e) => {
              setSearchFurn(e.target.value);
            }}
          />
          {/* <Search className="hover:text-inidigo-600 transition:color" /> */}
        </div>
      </div>
      <div className="flex justify-center border-slate-200 w-full">
        <button
          onClick={handleSubmit}
          className=" px-12 bg-slate-900 hover:bg-indigo-600 text-white h-16 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-1 hover:cursor-pointer transition-all duration-300"
        >
          <Sparkles size={20} />
          Find My Furniture
        </button>
      </div>
    </div>
  );
};

export default PreferencesScreen;
