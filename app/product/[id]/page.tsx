// app/furniture/[id]/page.tsx
import FurnitureDetail from "@/components/FurnitureDetail";
import Navbar from "@/components/Navbar";
import { getBackendUrl } from "@/lib/api";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FurniturePage({ params }: PageProps) {
  const { id } = await params;

  // Fetch product details from backend (Server-side)
  const res = await fetch(`${getBackendUrl()}/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Product not found</div>;
  }

  const product = await res.json();

  return (
    <main className="w-full bg-white">
      <Navbar></Navbar>
      <div className="w-full">
        <FurnitureDetail item={product} />
      </div>
    </main>
  );
}
