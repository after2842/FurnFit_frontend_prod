"use client";
import { useState } from "react";
import { DollarSign, Ruler, Calendar, Palette } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;
const COLORS = [
  { name: "Red", value: "#EF4444" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Orange", value: "#F97316" },
  { name: "Green", value: "#22C55E" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Yellow", value: "#EAB308" },
] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

type FilterTab = "price" | "size" | "date" | "color";

const FakeFilter = () => {
  const [activeTab, setActiveTab] = useState<FilterTab | null>(null);
  const [price, setPrice] = useState(150);
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState([0, 11]);

  const tabs: { key: FilterTab; label: string; icon: React.ReactNode }[] = [
    { key: "price", label: "Price", icon: <DollarSign size={16} /> },
    { key: "size", label: "Size", icon: <Ruler size={16} /> },
    { key: "date", label: "Date", icon: <Calendar size={16} /> },
    { key: "color", label: "Color", icon: <Palette size={16} /> },
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      next.has(size) ? next.delete(size) : next.add(size);
      return next;
    });
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => {
      const next = new Set(prev);
      next.has(color) ? next.delete(color) : next.add(color);
      return next;
    });
  };

  const activeCount =
    (price !== 150 ? 1 : 0) +
    selectedSizes.size +
    selectedColors.size +
    (dateRange[0] !== 0 || dateRange[1] !== 11 ? 1 : 0);

  return (
    <div className="w-full">
      {/* Filter Tab Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(isActive ? null : tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}

        {activeCount > 0 && (
          <button
            onClick={() => {
              setPrice(150);
              setSelectedSizes(new Set());
              setSelectedColors(new Set());
              setDateRange([0, 11]);
              setActiveTab(null);
            }}
            className="ml-1 text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Expandable Filter Panel */}
      {activeTab && (
        <div className="mt-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Price Slider */}
          {activeTab === "price" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-700">
                  Max Price
                </span>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  ${price}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          )}

          {/* Size Chips */}
          {activeTab === "size" && (
            <div>
              <span className="text-sm font-semibold text-slate-700 block mb-3">
                Select Sizes
              </span>
              <div className="flex items-center gap-2">
                {SIZES.map((size) => {
                  const selected = selectedSizes.has(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-11 h-11 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer border ${
                        selected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Date Range (Month Selector) */}
          {activeTab === "date" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">
                  Date Range
                </span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {MONTHS[dateRange[0]]} – {MONTHS[dateRange[1]]}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">
                    From
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={11}
                    step={1}
                    value={dateRange[0]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDateRange([Math.min(v, dateRange[1]), dateRange[1]]);
                    }}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium mb-1 block">
                    To
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={11}
                    step={1}
                    value={dateRange[1]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setDateRange([dateRange[0], Math.max(v, dateRange[0])]);
                    }}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                {MONTHS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Color Swatches */}
          {activeTab === "color" && (
            <div>
              <span className="text-sm font-semibold text-slate-700 block mb-3">
                Select Colors
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                {COLORS.map((color) => {
                  const selected = selectedColors.has(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                        selected
                          ? "border-indigo-600 bg-indigo-50 text-slate-800 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FakeFilter;
