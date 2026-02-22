import Result from "@/components/Result";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
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
    const cookieHeader = (await cookies()).toString();
    const res = await fetch(
      `http://localhost:3000/api/furniture/search?title=${title}&length=${length}`,
      {
        method: "GET",
        //credentials: "include", //need it, because let browser know => I'm going to accept cookie from the response
        //server side request = > can't automatically include cookie, so explicitly attach it inside the header
        headers: { "Content-Type": "application/json", cookie: cookieHeader },
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
    <div className="">
      <Navbar />

      <div className="">
        <Result
          type={type}
          style={style}
          roomWidth={width}
          roomLength={length}
          title={title}
          items={furniture}
        />
      </div>
    </div>
  );
}
