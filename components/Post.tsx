"use client";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface PostProps {
  id: string;
  username: string;
  userImage: string;
  image: string;
  likes: number;
  caption: string;
  timestamp: string;
}

export function Post({
  username,
  userImage,
  image,
  likes: initialLikes,
  caption,
  timestamp,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="max-w-lg bg-white border-b border-indigo-600 ">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt={username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <button className="text-gray-700">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Image */}
      <img
        src={image}
        alt="Post"
        className="w-full aspect-square object-cover"
      />

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="transition-transform active:scale-125"
            >
              <Heart
                size={28}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-gray-900"
                }
              />
            </button>
            <button>
              <MessageCircle size={28} className="text-gray-900" />
            </button>
            <button>
              <Send size={28} className="text-gray-900" />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)}>
            <Bookmark
              size={28}
              className={
                saved ? "fill-gray-900 text-gray-900" : "text-gray-900"
              }
            />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">
          {likes.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 mt-2">{timestamp}</div>
      </div>
    </div>
  );
}
