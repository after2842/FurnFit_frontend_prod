import Result from "@/components/Result";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/api";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;
  const source = query.source || "";
  const title = query.title || "";
  const page = Number(query.page) || 1;

  let items: any[] = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    const cookieHeader = (await cookies()).toString();
    const backendUrl = getBackendUrl();

    if (source === "text-rec" && query.url) {
      const res = await fetch(
        `${backendUrl}/product/text-recs-single?url=${encodeURIComponent(query.url)}&page=${page}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", cookie: cookieHeader },
        }
      );
      if (res.ok) {
        const data = await res.json();
        items = Array.isArray(data.products) ? data.products : [];
        currentPage = data.page ?? 1;
        totalPages = data.totalPages ?? 1;
      }
    } else {
      const res = await fetch(
        `${backendUrl}/product/search?title=${title}&page=${page}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", cookie: cookieHeader },
        }
      );
      if (res.ok) {
        const data = await res.json();
        items = Array.isArray(data.items) ? data.items : [];
        currentPage = data.page ?? 1;
        totalPages = data.totalPages ?? 1;
      }
    }
  } catch (err) {
    console.error("serverside problem", err);
  }

  return (
    <div className="">
      <Navbar />
      <div className="">
        <Result
          title={title}
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
