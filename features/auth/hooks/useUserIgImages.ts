import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type UserImage = { url: string; nice_words?: string };

async function fetchUserIgImages(): Promise<UserImage[]> {
  const res = await fetch(`${BASE_URL}/user/user-ig-ims`, {
    credentials: "include",
  });
  if (res.status === 401) return [];
  if (!res.ok) throw new Error(`Failed /user/user-ig-ims: ${res.status}`);
  // console.log("user ig image fetch", res.json());
  return res.json();
}

export function useUserIgImages() {
  return useQuery({
    queryKey: ["user-ig-images"],
    queryFn: fetchUserIgImages,
    staleTime: 60_000,
    retry: false,
  });
}
