interface FurnitureItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
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
      <div>
        RESULTS FOR type: {type} style:{style} roomWidth:{roomWidth} roomLength
        {roomLength}
      </div>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
          </div>
        ))
      ) : (
        <div>nothing retrieved!</div>
      )}
    </div>
  );
};

export default Result;
