"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  itemsPerPage?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function ImageCarousel({
  images,
  itemsPerPage = 1,
  autoPlay = false,
  autoPlayInterval = 3000,
}: ImageCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalPages <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalPages, currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-md md:max-w-lg border border-1 border-black rounded-lg">
      {/* Main carousel container */}
      <div className="relative  rounded-lg">
        {/* Only render current image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentPage]}
            alt={`Image ${currentPage + 1}`}
            className="max-w-full max-h-full object-contain transition-opacity duration-300 rounded-lg"
          />
        </div>

        {/* Previous button */}
        <div className="flex justify-between mb-2 ">
          {totalPages > 1 && (
            <button
              onClick={goToPrevious}
              className="transition-all cursor-pointer ml-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-black hover:text-indigo-600 transition-colors" />
            </button>
          )}
          {totalPages > 1 && (
            <div className="text-center">
              <span className="text-sm text-gray-600 ">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          )}
          {/* Next button */}
          {totalPages > 1 && (
            <button
              onClick={goToNext}
              className="transition-all cursor-pointer mr-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-black hover:text-indigo-600 transition-colors" />
            </button>
          )}
        </div>
      </div>
      {/* {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentPage
                  ? "bg-indigo-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )} */}
      {/* Page counter */}
    </div>
  );
}
