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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "./Navbar";
import Image from "next/image";
export function Login() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)); // only for test
  // promise object => after ms, call resolve function.
  const queryClient = useQueryClient();
  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include", //need it, because let browser know => I'm going to accept cookie from the response
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        console.error(res.status);
        throw new Error("nothing good@@@");
      } else {
        console.log(await res.json());
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        router.push("/");
      }
    } catch (error) {
      console.error("ERROR~!!!!", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-lg h-[400px] border-indigo-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              <div className="flex justify-center">
                Log in
                <Image src="/logo3.svg" width={30} height={30} alt="logo" />
              </div>
            </CardTitle>
            <CardDescription className="text-center">
              unlock your <a className="font-bold">taste</a> of fits with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-md font-medium">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg text-black"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-md font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-400 rounded-lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <div className="w-full my-4">
              <button
                onClick={() => handleLogin()}
                className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-indigo-800 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="text-center mt-2">
                don't have an acocunt?{" "}
                <Link
                  href="/signup"
                  className="underline text-indigo-500 hover:text-indigo-700"
                >
                  create account
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
