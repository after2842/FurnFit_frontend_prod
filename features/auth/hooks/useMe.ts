import { useQuery } from "@tanstack/react-query";
import { Me } from "../types";

async function fetchMe(): Promise<Me | null> {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  console.log(res);

  if (res.status === 401) {
    console.log("401????????");
    return null;
  }
  if (!res.ok) throw new Error(`Failed /auth/me: ${res.status}`);

  const data = await res.json();
  console.log("MEMEMMEM", data.user);
  return data.user as Me;
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
