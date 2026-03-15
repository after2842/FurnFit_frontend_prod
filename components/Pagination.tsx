import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1 bg-slate-50/80 backdrop-blur-xl p-1.5 rounded-2xl border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
              currentPage === page
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-100"
                : "text-slate-500 hover:bg-white hover:text-slate-900 scale-95 hover:scale-100"
            }`}
          >
            {page}
          </button>
        ))}

        {totalPages > 3 && (
          <>
            <div className="w-8 h-10 flex items-center justify-center text-slate-300">
              <MoreHorizontal size={16} />
            </div>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-100"
                  : "text-slate-500 hover:bg-white hover:text-slate-900 scale-95 hover:scale-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
