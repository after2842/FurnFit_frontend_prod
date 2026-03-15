import Image from "next/image";
interface LoadingProp {
  title: string;
  subtitle: string;
}
const LoadingState = ({ title, subtitle }: LoadingProp) => (
  <div className="flex flex-col items-center justify-center w-full h-full animate-in fade-in">
    <div className="relative mb-8">
      <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-200 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/logo3.svg"
          alt="Loading..."
          width={50}
          height={50}
          className="animate-spin"
        />
      </div>
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
      {title}
    </h2>
    <p className="text-slate-500 mt-3 text-lg max-w-md text-center">
      {subtitle}
    </p>

    <div className="mt-12 flex gap-3">
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-0"></div>
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-150"></div>
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-300"></div>
    </div>
  </div>
);

export { LoadingState };
