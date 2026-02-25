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
      image:
        "https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsaWZlc3R5bGUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcxOTIyNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 423,
      comments: 12,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1505209487757-5114235191e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzE4OTQ1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 856,
      comments: 23,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1708604378427-a06673e5cc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwYm91cXVldCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTk0NzgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 1204,
      comments: 45,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1604580826271-aa59d10b875a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc3MTk3MTI1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 2134,
      comments: 67,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1692818769925-6b815111c653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MTkzNjc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 945,
      comments: 34,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1613356522023-e95206f99214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NzE5MTYyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      likes: 1567,
      comments: 89,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="mb-4 ml-2">
        <h1 className="text-xl font-semibold">Customize your taste</h1>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {activeTab === "posts" &&
          userPosts.map((post) => (
            <div
              key={post.id}
              className="aspect-square relative group cursor-pointer"
            >
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
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
