interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}
interface ResultProps {
  type: string;
  style: string;
  roomWidth: number;
  roomLength: number;
  items: FurnitureItem[];
}

const Result = ({ type, style, roomWidth, roomLength, items }: ResultProps) => {
  return (
    <div className="bg-white border rounded-xl">
      <div className="text-xl font-bold ">
        RESULTS FOR <br />
        type: <a className="text-red-500 text-3xl">{type}</a>
        <br />
        style: <a className="text-red-500 text-3xl">{style}</a> <br />
        roomWidth: <a className="text-red-500 text-3xl">{roomWidth}</a> <br />
        roomLength
        <a className="text-red-500 text-3xl">{roomLength}</a>
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <div className="mt-12" key={item.id}>
            <img
              className="border-2 border-black rounded-xl cursor-pointer"
              src={item.image_url}
              alt={item.name}
            />
          </div>
        ))
      ) : (
        <div>nothing retrieved!</div>
      )}
    </div>
  );
};

export default Result;
