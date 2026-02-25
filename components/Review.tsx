import { cookies } from "next/headers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  //   const review = await getReview();
  const review =
    'Here’s a concise, well-organized summary regarding the Hopeless Romantic Platform Boots (aka Lamoda Heart & Buckle Strap Platform Ankle Boots) from Dolls Kill:\n\nProduct & Price  \n• The "Hopeless Romantic Platform Boots" are listed at $80, with a discounted price of $56 using a promo code.([dollskill.com](https://www.dollskill.com/products/hopeless-romantic-platform-boots?utm_source=openai))\n\nReviews of This Specific Product  \n• No direct customer reviews or feedback specifically addressing these boots were located on the site or in review aggregates.\n\nCompany Reputation Overview  \nPositive Highlights:  \n• Some customers appreciate Dolls Kill for offering unique, edgy alternative fashion, especially statement footwear and accessories.([influenster.com](https://www.influenster.com/reviews/dolls-kill?utm_source=openai))\n\nNegative Feedback:  \n• Dolls Kill’s Trustpilot score hovers around 3.0/5, reflecting widely mixed customer experiences. Common complaints involve low product quality, slow or unfulfilled orders, problematic refunds, and the issuance of store credit instead of monetary refunds.([trustpilot.com](https://www.trustpilot.com/review/www.dollskill.com?utm_source=openai))  \n• On Reddit, multiple users describe declining quality over time, uncomfortable footwear, limited refunds, questionable sizing, and a shift toward “fast fashion” approaches.([reddit.com](https://www.reddit.com/r/dollskill/comments/1nyv3nw?utm_source=openai))\n\nSecurity & Trust Indicators  \n• ScamDoc rates dolls kill.com as “excellent” and notes its longevity (domain created in 2010), though it flags some concerns around anonymity of ownership.([scamdoc.com](https://www.scamdoc.com/view/12823?utm_source=openai))  \n• Contrarily, Gridinsoft flags the site as suspicious, assigning a low trust score of 39/100 and noting red flags around site safety and operations.([gridinsoft.com](https://gridinsoft.com/online-virus-scanner/url/dollskill-com?utm_source=openai))\n\nSummary Assessment  \n• Are the boots “expensive”? At the sale price ($56) they are mid-tier for fashion platforms—they\'re not bargain-bin, but also not designer-level expensive.  \n• The brand offers highly distinctive styles, which appeals to niche fashion tastes, but is frequently criticized for inconsistent quality, poor customer service, and difficult return policies.  \n• No user feedback specific to this boot model was found, so its fit, comfort, and durability remain uncertain.\n\nLet me know if you’d like more detail on sizing, materials, or up-to-date availability for these boots.';
  return (
    <div className="p-8">
      {review ? (
        <div className="prose prose-slate max-w-none ">
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      ) : (
        <div className="rounded-lg">
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
