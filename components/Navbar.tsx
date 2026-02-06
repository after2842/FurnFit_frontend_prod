"use client";

import { Armchair, Search, Heart, User } from "lucide-react";
import { UserIcon } from "./UserIcon";
const Navbar = ({}) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <div
        onClick={() => (window.location.href = "/")}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <Armchair size={18} />
        </div>
        <span className="font-bold text-xl text-slate-900 tracking-tight">
          FurniFit
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Catalog
        </a>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Inspiration
        </a>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Design Services
        </a>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
          <Heart size={20} />
        </button>
        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
          <UserIcon isAuthed={false} />
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
