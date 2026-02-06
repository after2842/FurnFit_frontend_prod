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
import { Armchair, Loader2 } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const submitSignUp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("signupFailed❌");
      router.push("/login");
    } catch (error) {
      console.error("ERROR❌", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg h-[500px] shadow-md border-indigo-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            <div className="flex items-center justify-center">
              Create an Account <Armchair className="text-indigo-500 mx-1" />
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center justify-center">
              Welcome to <a className="text-indigo-500 mx-1">FurnFit</a> your
              new furniture right here
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-md font-medium">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-md font-medium">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </CardContent>
        <CardFooter className=" flex-col">
          <div className="w-full my-4">
            <button
              onClick={() => submitSignUp()}
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-600 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="text-center mt-2">
              already have an account?{" "}
              <Link
                href="/login"
                className="underline text-indigo-500 hover:text-indigo-700"
              >
                Login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SignUp;
