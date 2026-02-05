import Result from "@/components/Result";
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
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let furniture = [];
  try {
    console.log("page was called");
    const res = await fetch(`${BASE_URL}/furniture/search-all`, {
      //temporarily not passing query params now! => later pass it with params that matches the controller's requirement.
      cache: "no-store",
    });
    if (res.ok) {
      console.log("data fetched OK");
      const data = await res.json();
      console.log(data);
      // data returns array directly. So check array? => assign directly, or an empty string
      furniture = Array.isArray(data) ? data : [];
      console.log(furniture);
    } else {
      console.log("data fetched NOT OK");
    }
  } catch (err) {
    console.error("serverside problem 🧑🏻‍💻", err);
  }

  return (
    <Result
      type={type}
      style={style}
      roomWidth={width}
      roomLength={length}
      items={furniture}
    />
  );
}
