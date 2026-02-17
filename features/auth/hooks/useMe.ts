import { useQuery } from "@tanstack/react-query";
import { Me } from "../types";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchMe(): Promise<Me | null> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Failed /auth/me: ${res.status}`);

  const data = await res.json();
  return data.user as Me; // backend returns { user: ... }
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: true,
  });
}
