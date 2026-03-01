"use client";

import { Armchair, Search, Heart, User } from "lucide-react";
import { UserIcon } from "./UserIcon";
import { useMe } from "@/features/auth/hooks/useMe";
import Image from "next/image";
const Navbar = ({}) => {
  const { data: me, isLoading } = useMe();
  const isAuthed = !!me;
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="">
            <Image src="/logo3.svg" alt="Logo" width={40} height={40} />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            FurnFit
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
        <div className="">
          <div
            className={`bg-white backdrop-blur-sm ${
              !isAuthed ? "" : ""
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
