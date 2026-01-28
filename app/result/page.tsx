import Result from "@/components/Result";
export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;
  const type = query.type || "df_sofa";
  const style = query.style || "df_style";
  const width = Number(query.width) || 4;
  const length = Number(query.length) || 12;

  let furniture = [];
  try {
    const res = await fetch(
      `https://locallhost:3001/api/furniture?type=${type}&style=${style}&width=${width}&length=${length}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      furniture = await res.json();
    }
  } catch (err) {
    console.error("serverside problem 🧑🏻‍💻");
  }
  <Result
    type={type}
    style={style}
    roomWidth={width}
    roomLength={length}
    items={furniture}
  />;
}
