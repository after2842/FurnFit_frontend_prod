import { useRouter } from "next/navigation";
interface FurnitureCardProps {
  item: {
    id: string;
    title: string;
    image_urls: string[];
    price_min: number;
    price_max: number;
    url: string;
  };
}

export function FurnitureCard({ item }: FurnitureCardProps) {
  const router = useRouter();
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col p-2">
        <img
          src={item.image_urls[0]}
          alt={item.title}
          className="w-full h-auto rounded-lg border cursor-pointer shadow-sm"
          onClick={() => router.push(`product/${item.id}`)}
        />
        <div className="text-center font-bold">{item.title}</div>
        <div className="text-center">${item.price_min}</div>
        <a className="text-center text-sm" href={item.url}>
          {item.url}
        </a>
      </div>
    </div>
  );
}
