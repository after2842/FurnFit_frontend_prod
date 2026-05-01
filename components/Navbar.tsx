"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, Sparkles, Loader2, User } from "lucide-react";
import { useMe } from "@/features/auth/hooks/useMe";

const DEMO_EMAIL = "samuelchoi322@yahoo.com";
const DEMO_PASSWORD = "After007!";

const Navbar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useMe();
  const isAuthed = !!me;
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    try {
      setDemoLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: DEMO_EMAIL, password: DEMO_PASSWORD }),
      });
      if (!res.ok) throw new Error(`demo login failed: ${res.status}`);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    } catch (err) {
      console.error("demo login error", err);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image src="/logo3.svg" alt="Logo" width={40} height={40} />
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

        {/* Auth area */}
        <div className="flex items-center">
          {isLoading ? (
            <div className="h-8 w-32 rounded-full bg-slate-100 animate-pulse" />
          ) : isAuthed ? (
            <Link
              href="/profile"
              aria-label="account"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <User size={18} className="text-indigo-500" />
              <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                {me?.name || "Account"}
              </span>
            </Link>
          ) : (
            <div
              role="group"
              aria-label="Login or demo"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1"
            >
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700 bg-white shadow-sm hover:text-indigo-600 transition-colors"
              >
                <LogIn size={16} />
                Login
              </Link>
              <button
                onClick={handleDemo}
                disabled={demoLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer disabled:opacity-60"
              >
                {demoLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
