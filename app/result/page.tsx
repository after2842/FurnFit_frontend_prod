import Result from "@/components/Result";
import Navbar from "@/components/Navbar";
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;
  const type = query.type || "sofa";
  const style = query.style || "modern";
  const width = Number(query.width) || 12;
  const length = Number(query.length) || 14;
  const title = query.title || "";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let furniture = [];
  try {
    console.log("page was called");
    const res = await fetch(
      `${BASE_URL}/furniture/search?title=${title}&length=${length}`,
      {
        method: "GET",
        credentials: "include", //need it, because let browser know => I'm going to accept cookie from the response
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      console.log("data fetched OK");
      const data = await res.json();
      console.log("data", data);
      // data returns array directly. So check array? => assign directly, or an empty string
      furniture = Array.isArray(data) ? data : [];
      console.log("data: ", furniture);
    } else {
      console.log(res.status);
      console.log("data fetched NOT OK");
    }
  } catch (err) {
    console.error("serverside problem 🧑🏻‍💻", err);
  }

  return (
    <div>
      {" "}
      <Navbar />
      <Result
        type={type}
        style={style}
        roomWidth={width}
        roomLength={length}
        title={title}
        items={furniture}
      />
    </div>
  );
}
