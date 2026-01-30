import React, { useState, useEffect, useCallback, useRef } from "react";
import { SlideData } from "../types";
import { SlideItem } from "./SlideItem.tsx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface SliderProps {
  slides: SlideData[];
  isLoading: boolean;
}

const ICONS_MAP = [
  "Compass",
  "Map",
  "Wind",
  "Sun",
  "Mountain",
  "Cloud",
  "Waves",
  "Globe",
];

export const Slider: React.FC<SliderProps> = ({ slides, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (slides.length === 0) return null;

  // Width definitions for translation
  const inactiveWidth = 15.79;
  const activeWidth = 36.84;

  // Total width of all 8 slides = 1 active + 7 inactive
  const totalTrackWidth = activeWidth + 7 * inactiveWidth; // 147.37%
  const visibleArea = 100;
  const maxTranslate = totalTrackWidth - visibleArea; // 47.37%

  // Shift logic: If index > 0, we want exactly ONE inactive slide on the left.
  // So index (activeIndex-1) should be at the start.
  const targetTranslate = -Math.max(0, activeIndex - 1) * inactiveWidth;

  // Clamp so we don't translate into empty space at the end
  const translateX = Math.max(targetTranslate, -maxTranslate);

  return (
    <div className="relative w-full py-16 md:py-24">
      {/* Navigation Arrows */}
      <div
        className="absolute z-40 flex gap-4 
                      md:top-0 md:right-4 md:bottom-auto md:left-auto
                      bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0"
      >
        <button
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className="p-5 rounded-full bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={activeIndex === slides.length - 1}
          className="p-5 rounded-full bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Main Track Section */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {slides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              iconName={ICONS_MAP[index % ICONS_MAP.length]}
            />
          ))}
        </div>
      </div>

      {/* Subtle Background Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none">
        <h2 className="text-[12rem] md:text-[20rem] font-black tracking-tighter uppercase leading-none opacity-[0.02] whitespace-nowrap">
          {slides[activeIndex]?.heading?.split(" ")[0]}
        </h2>
      </div>
    </div>
  );
};
