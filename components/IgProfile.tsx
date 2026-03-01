"use client";
import { Grid3x3, Bookmark, UserSquare2, Settings } from "lucide-react";
import { useState } from "react";

interface ProfilePost {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

export function IgProfile() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );

  const userPosts: ProfilePost[] = [
    {
      id: "1",
      image: "/model_3.mp4",
      likes: 423,
      comments: 12,
    },
    {
      id: "2",
      image: "model_2.mp4",
      likes: 856,
      comments: 23,
    },
    {
      id: "3",
      image: "model_4.mp4",
      likes: 1204,
      comments: 45,
    },
    {
      id: "4",
      image: "model_5.mp4",
      likes: 2134,
      comments: 67,
    },
    {
      id: "5",
      image: "model_6.mp4",
      likes: 945,
      comments: 34,
    },
    {
      id: "6",
      image: "landing.mp4",
      likes: 1567,
      comments: 89,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="mb-4 ml-2">
        {/* <h1 className="text-xl font-semibold">Customize your taste</h1> */}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {activeTab === "posts" &&
          userPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square relative group cursor-pointer"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full"
                style={{ objectPosition: "center 20%" }}
              >
                <source src={post.image} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 flex items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
