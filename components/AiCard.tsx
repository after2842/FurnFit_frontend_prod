import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Suspense } from "react";
import { Bot } from "lucide-react";
import { LoadingState } from "./Loading";
import Review from "./Review";
import { useMe } from "@/features/auth/hooks/useMe";
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
export default function AiCard({ item }: FurnitureDetailProps) {
  //   const { data: me, isLoading } = useMe();
  return (
    <Card className="w-full border-indigo-600">
      <CardHeader className="flex font-bold justify-center">
        <Bot />
        Hi!
      </CardHeader>

      <Suspense
        fallback={
          <div className="">
            <LoadingState
              title="walking through the internet"
              subtitle="Helpful information and insight is being prepared just for you"
            />
          </div>
        }
      >
        <div className="">
          <Review merchant={item?.url} product={item?.title} />
        </div>
      </Suspense>

      <CardFooter></CardFooter>
    </Card>
  );
}
