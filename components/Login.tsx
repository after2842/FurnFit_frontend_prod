"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, LogIn, Sparkles, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "./Navbar";
import Image from "next/image";

const DEMO_EMAIL = "samuelchoi322@yahoo.com";
const DEMO_PASSWORD = "After007!";

type Mode = "login" | "demo";

export function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const submit = async (creds: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!res.ok) {
        console.error(res.status);
        throw new Error("login failed");
      }
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    } catch (error) {
      console.error("login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => submit({ email, password });
  const handleDemo = () =>
    submit({ email: DEMO_EMAIL, password: DEMO_PASSWORD });

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-lg border-indigo-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              <div className="flex justify-center items-center gap-1">
                {mode === "login" ? "Log in" : "Try a demo"}
                <Image src="/logo3.svg" width={30} height={30} alt="logo" />
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              unlock your <span className="font-bold">taste</span> of fits with us.
            </CardDescription>

            {/* Mode toggle */}
            <div
              role="tablist"
              aria-label="Login mode"
              className="mt-4 mx-auto inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1"
            >
              <button
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => setMode("login")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LogIn size={16} />
                Login
              </button>
              <button
                role="tab"
                aria-selected={mode === "demo"}
                onClick={() => setMode("demo")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  mode === "demo"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Sparkles size={16} />
                Demo
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {mode === "login" ? (
              <>
                <div className="space-y-2">
                  <label className="text-md font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-md font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg border border-indigo-100">
                    <PlayCircle className="text-indigo-600" size={22} />
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    Skip signup — explore FurnFit with a pre-loaded demo
                    account. We'll sign you in with shared credentials so you
                    can see a real recommendation feed and virtual try-on.
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col">
            <div className="w-full my-2">
              <button
                onClick={mode === "login" ? handleLogin : handleDemo}
                disabled={isLoading}
                className={`w-full py-2.5 rounded-lg font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors disabled:opacity-60 ${
                  mode === "login"
                    ? "bg-black text-white hover:bg-indigo-800"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : mode === "login" ? (
                  <>
                    <LogIn size={18} /> Log In
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Launch Demo
                  </>
                )}
              </button>

              {mode === "login" && (
                <div className="text-center mt-3 text-sm">
                  don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="underline text-indigo-500 hover:text-indigo-700"
                  >
                    create account
                  </Link>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
