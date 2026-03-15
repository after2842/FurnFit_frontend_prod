"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageCarouselProps {
  images: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // Use a wrap function to safely compute the index within bounds
  const currentIndex = ((page % images.length) + images.length) % images.length;

  const nextImage = () => {
    setPage([page + 1, 1]);
  };

  const prevImage = () => {
    setPage([page - 1, -1]);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-slate-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[currentIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt={`Product view ${currentIndex + 1}`}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-white/40"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute z-10 right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-white/40"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentIndex) {
                    setPage([
                      page + (idx - currentIndex),
                      idx > currentIndex ? 1 : -1,
                    ]);
                  }
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white w-4 shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                    : "bg-white/60 w-1.5 hover:bg-white/90 shadow-[0_0_4px_rgba(0,0,0,0.2)]"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
