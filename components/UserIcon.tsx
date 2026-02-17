import Link from "next/link";
import { User } from "lucide-react";

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

  return (
    <Link
      href={href}
      aria-label={isAuthed ? "goto account" : "goto login"}
      className=""
    >
      {!isAuthed ? (
        <User size={20} className="text-indigo-500" />
      ) : (
        <div className="font-bold">{user?.name}</div>
      )}
    </Link>
  );
}
