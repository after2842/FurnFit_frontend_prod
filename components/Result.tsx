"use client";
interface FurnitureItem {
  id: string;
  description: string;
  title: string;
  price_min: number;
  price_max: number;
  image_urls: [string];
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
    <div className="bg-white border rounded-xl">
      <div className="flex text-xl font-bold ">
        RESULTS FOR type: <a className="text-red-500 text-3xl">{type}</a>
        title: <a className="text-red-500 text-3xl">{title}</a> <br />
        {/* roomWidth: <a className="text-red-500 text-3xl">{roomWidth}</a> <br />
        roomLength
        <a className="text-red-500 text-3xl">{roomLength}</a> */}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id}>
              <img
                src={item.image_urls[0]}
                alt={item.title}
                className="w-full h-auto rounded-lg border shadow-sm cursor-pointer"
                onClick={() => window.open(`${item.url}`)}
              />
              <div className="text-center">{item.title}</div>
              <div className="text-center">${item.price_min}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">nothing retrieved!</div>
      )}
    </div>
  );
};

export default Result;
