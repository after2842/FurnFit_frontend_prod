"use client";
import { useMe } from "@/features/auth/hooks/useMe";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const { data: me, isLoading, refetch } = useMe();

  if (isLoading) return <div>loading...</div>;
  if (!me)
    return (
      <div>
        please log in first<Link href="/login"></Link>
      </div>
    );
  const isAuthed = !!me;
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="h-screen mt-12">
        <UserProfile isAuthed={isAuthed} user={me} refetchUser={refetch} />
      </div>
    </div>
  );
}
