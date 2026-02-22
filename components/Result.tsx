"use client";
import { FurnitureCard } from "./FurnitureCard";
import Filter from "./Filter";
interface FurnitureItem {
  id: string;
  description: string;
  title: string;
  price_min: number;
  price_max: number;
  image_urls: string[];
  url: string;
}
interface ResultProps {
  type: string;
  style: string;
  roomWidth: number;
  roomLength: number;
  title: string;
  items: FurnitureItem[];
}

const Result = ({
  type,
  style,
  roomWidth,
  roomLength,
  title,
  items,
}: ResultProps) => {
  return (
    <div className="mt-12">
      <div className="mb-12 mr-12">
        <div className="text-center flex">
          <div className="border border-black rounded-lg ml-auto px-4 py-1 cursor-pointer">
            Filter
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <FurnitureCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="">nothing retrieved!</div>
      )}
    </div>
  );
};

export default Result;
