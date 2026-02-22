import { cookies } from "next/headers";
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
        `http://localhost:3000/api/furniture/search-review?merchant=${merchant}&product=${product}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", cookie: cookieHeader },
        }
      );
      if (res.ok) {
        const data = await res.text();
        return data;
      } else {
        console.log(res.status);
        console.log("not good");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const review = await getReview();
  //   const review = "";
  return (
    <div className="">
      {review ? (
        <div className="p-8 rounded-lg">
          <h3 className="font-bold">Review</h3>
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      ) : (
        <div className="p-8 rounded-lg">
          No review found hi this is a sample I've fixed the visibility issue by
          adding z-10 to both navigation buttons and increasing the background
          opacity from bg-white/80 to bg-white/90. This ensures the chevron
          buttons appear on top of the image and are more visible.
        </div>
      )}
    </div>
  );
};

export default Review;
