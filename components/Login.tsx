import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
export function Login() {
  const handleLogin = () => {};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg h-[400px] border-indigo-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            Log in
          </CardTitle>
          <CardDescription className="text-center">
            unlock more than <a className="font-bold">30000+</a> furniture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-md font-medium">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-md font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg"
            />
          </div>
        </CardContent>
        <CardFooter className=" flex-col">
          <div className="w-full my-4">
            <button className="w-full bg-indigo-500 text-white py-2 rounded-lg font-bold hover:bg-indigo-800 cursor-pointer">
              Log In
            </button>
            <div className="text-center mt-2">
              don't have an acocunt?{" "}
              <Link
                href="/signup"
                className="underline text-indigo-500 hover:text-indigo-700"
              >
                create account
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
