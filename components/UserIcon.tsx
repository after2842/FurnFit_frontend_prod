import Link from "next/link";
import { User } from "lucide-react";

export function UserIcon({ isAuthed }: { isAuthed: boolean }) {
  const href = isAuthed ? "/account" : "/login";

  return (
    <Link href={href} aria-label={isAuthed ? "goto account" : "goto login"}>
      <User size={20} className="text-indigo-500" />
    </Link>
  );
}
