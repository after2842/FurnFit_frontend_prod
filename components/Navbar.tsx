"use client";

import { Armchair, Search, Heart, User } from "lucide-react";
import { UserIcon } from "./UserIcon";
import { useMe } from "@/features/auth/hooks/useMe";
const Navbar = ({}) => {
  const { data: me, isLoading } = useMe();
  const isAuthed = !!me;
  return (
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
          <div
            className={`bg-white rounded-full flex items-center justify-center text-slate-600 ${
              !isAuthed ? "border border-slate-300" : ""
            } cursor-pointer hover:text-indigo-600 transition-colors `}
          >
            <UserIcon isAuthed={isAuthed} isLoading={isLoading} user={me} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
