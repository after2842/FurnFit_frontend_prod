import { Sparkles } from "lucide-react";
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] w-full animate-in fade-in">
    <div className="relative mb-8">
      <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles size={32} className="text-indigo-600 animate-pulse" />
      </div>
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
      Designing your space...
    </h2>
    <p className="text-slate-500 mt-3 text-lg max-w-md text-center">
      We're cross-referencing dimensions and style preferences with our catalog
      database.
    </p>

    <div className="mt-12 flex gap-3">
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-0"></div>
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-150"></div>
      <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-300"></div>
    </div>
  </div>
);
