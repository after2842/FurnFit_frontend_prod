import Image from "next/image";
interface YourFitProp {
  id: string;
  caption: string;
  firstComment: string;
  images: string[];
  timestamp: string;
}
interface YourFitProps {
  posts: YourFitProp[];
}
export default function YourFit({ posts }: YourFitProps) {
  return (
    <div className="max-w-xl">
      {posts?.map((post) => (
        <div key={post?.id}>
          <Image src={post?.images[0]} alt="usr ig image"></Image>
          <p>{post?.caption}</p>
        </div>
      ))}
    </div>
  );
}
