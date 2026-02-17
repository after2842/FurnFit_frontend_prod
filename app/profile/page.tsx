"use client";
import { useMe } from "@/features/auth/hooks/useMe";
import Link from "next/link";
export default function Profile() {
  const { data: me, isLoading } = useMe();
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
      <div className="h-screen flex flex-col justify-center items-center border">
        <div className="text-3xl">
          Hi, <a className="font-bold">{me?.name}</a>
        </div>
        <div>your email: {me?.email}</div>
      </div>
    </div>
  );
}
