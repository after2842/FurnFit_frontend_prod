"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Navbar from "./Navbar";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const submitSignUp = async () => {
    if (showOtp) {
      submitVerifiedSignup();
    } else {
      console.log("no otp yet sent");
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/auth/signup/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        if (res.status == 409) {
          setEmailExist(true);
        } else if (!res.ok) {
          console.error(res.status);
          throw new Error("signupFailed❌");
        } else if (res.ok && res.status === 200) {
          setShowOtp(true);
        }
      } catch (error) {
        console.error("ERROR❌", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 8);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < 8) newOtp[idx] = digit;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = Math.min(digits.length, 7);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const submitVerifiedSignup = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/auth/signup/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          code: otp.join(""),
        }),
      });
      if (!res.ok) {
        console.error(res.status);
        throw new Error("signupFailed❌");
      } else if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("ERROR❌", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Card
          className={`w-full max-w-lg ${
            !showOtp ? "h-[500px]" : "h-[580px]"
          } shadow-md border-indigo-200 transition-all duration-400 ease-in-out`}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              <div className="flex items-center justify-center">
                {" "}
                <Image src="/logo3.svg" width={30} height={30} alt="logo" />
                Create an Account
              </div>
            </CardTitle>
            <CardDescription>
              {/* <div className="flex items-center justify-center">
              Welcome to <a className="text-indigo-500 mx-1">FurnFit</a> your
              new furniture right here
            </div> */}
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
              <label className="text-md font-medium">
                <a>Email </a>
                <a className="text-red-400 text-xs ml-1 ">
                  {emailExist ? "*already exist" : ""}
                </a>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className={`w-full px-3 py-2 border rounded-lg ${
                  emailExist ? "border-red-600" : "border-gray-400"
                }`}
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
            {showOtp && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 text-center">
                  code sent to {email}
                </p>
                <div
                  className="flex justify-center gap-2"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border-1 border-gray-500 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>
            )}
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
      </div>{" "}
    </div>
  );
};
export default SignUp;
