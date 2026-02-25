"use clinet";
import { Instagram, Camera, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { LoadingState } from "./Loading";
interface ConnectInstagramProops {
  onConnected: (data: any) => void;
}
export function ConnectInstagram({ onConnected }: ConnectInstagramProops) {
  const [Igid, setIgId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const GetUserIg = async () => {
    console.log(Igid);
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:3000/api/user/get-ig?usrname=${Igid}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.ok) {
        setIsLoading(false);

        const data = await res.json();
        console.log(data);
        onConnected(data);
      } else {
        console.log("somting wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-lg">
        {/* Main Card */}
        {isLoading ? (
          <LoadingState
            title={"Gathering your style"}
            subtitle={"Your style reflects the products"}
          />
        ) : (
          <div className="bg-white rounded-2xl p-8 mb-6 border border-black">
            {/* Instagram Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-4 rounded-3xl">
                <Instagram size={48} className="text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2">
              Connect with Instagram
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Share your everyday, and we find the best match
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-semibold">Posts</h3>
                  <p className="text-sm text-gray-600">
                    We read your posts and analyze your preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h3 className="font-semibold">Captions</h3>
                  <p className="text-sm text-gray-600">
                    They way you present your moments will be reflected.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold ">Your Instagram ID</h3>
                <input
                  className="w-full text-md text-gray-600 mt-2 px-1 border border-black focus:border-black focus:outline-none"
                  placeholder="FurnFit"
                  value={Igid}
                  onChange={(e) => setIgId(e.target.value)}
                />
              </div>
            </div>

            {/* Connect Button */}
            <button
              className="w-full border border-black text-black py-4 rounded-xl font-semibold text-lg hover:text-indigo-600 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              onClick={() => GetUserIg()}
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
