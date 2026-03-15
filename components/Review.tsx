import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/api";
import ReactMarkdown from "react-markdown";

interface ReviewProp {
  merchant: string;
  product: string;
}
const Review = async ({ merchant, product }: ReviewProp) => {
  const getReview = async () => {
    try {
      const cookieHeader = (await cookies()).toString();
      const res = await fetch(
        `${getBackendUrl()}/furniture/search-review?merchant=${encodeURIComponent(merchant)}&product=${encodeURIComponent(product)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", cookie: cookieHeader },
        }
      );
      if (res.ok) {
        const data = await res.text();
        return data;
      } else {
        console.error("Review fetch failed:", res.status);
        return null;
      }
    } catch (err) {
      console.error("Review fetch error:", err);
      return null;
    }
  };
  const review = await getReview();
  return (
    <div className="p-8">
      {review ? (
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      ) : (
        <div className="text-slate-400 text-center py-8">
          No reviews available yet.
        </div>
      )}
    </div>
  );
};

export default Review;
