// components/FurnitureDetail.tsx
import { ImageCarousel } from "./ImageCarousel";
import AiCard from "./AiCard";
interface FurnitureDetailProps {
  item: {
    id: string;
    name: string;
    price_min: number;
    price_max: number;
    image_urls: string[];
    description?: string;
    url: string;
    title: string;
  };
}

export default function FurnitureDetail({ item }: FurnitureDetailProps) {
  return (
    <div className="w-full">
      <div className="bg-white p-8">
        <div className="mb-12">
          <p className="text-4xl font-bold text-center">{item.title}</p>
        </div>
        <div className="flex gap-8 mb-4 items-start">
          <ImageCarousel images={item.image_urls} itemsPerPage={1} />
          <AiCard item={item} />
        </div>

        <div className="flex flex-col w-full mt-12">
          <div className="text-xl font-bold text-black mb-6">
            {item.price_min === item.price_max ? (
              <p>${item.price_min}</p>
            ) : (
              <p>
                ${item.price_min} - ${item.price_max}
              </p>
            )}
          </div>
          <div className="">
            {item.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-slate-700">{item.description}</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
