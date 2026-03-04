"use client";
import Link from "next/link";
import { User, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function UserIcon({
  isAuthed,
  isLoading,
  user,
}: {
  isAuthed: boolean;
  isLoading: boolean;
  user: any;
}) {
  const href = isAuthed ? "/profile" : "/signup";
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm ">
        <Skeleton className="h-6 w-12" />
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={isAuthed ? "goto account" : "goto login"}
      className="bg-white/80 backdrop-blur-sm"
    >
      {!isAuthed ? (
        <User
          size={28}
          className="text-indigo-500 bg-white/80 backdrop-blur-sm"
        />
      ) : (
        <div className="font-bold">{user?.name}</div>
      )}
    </Link>
  );
}
