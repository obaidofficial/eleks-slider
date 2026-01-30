import React from "react";
import { SlideData } from "../types";
import * as Icons from "lucide-react";

interface SlideItemProps {
  slide: SlideData;
  isActive: boolean;
  onClick: () => void;
  iconName?: string;
}

export const SlideItem: React.FC<SlideItemProps> = ({
  slide,
  isActive,
  onClick,
  iconName = "Compass",
}) => {
  const width = isActive ? "36.84%" : "15.79%";

  // Dynamically get the icon from Lucide
  const IconComponent = (Icons as any)[iconName] || Icons.Compass;

  return (
    <div
      onClick={onClick}
      style={{
        width: width,
        minWidth: width,
        flex: `0 0 ${width}`,
      }}
      className={`relative h-[400px] md:h-[300px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer px-2`}
    >
      <div
        className={`relative w-full h-full p-8 md:p-10 flex flex-col transition-all duration-700 ${
          isActive
            ? "bg-white border-l border-[#c7c7d6]"
            : "bg-white border-l border-[#c7c7d6]"
        }`}
      >
        {/* Icon Header */}
        <div
          className={`mb-auto transition-colors w-[55px] rounded-lg p-2 duration-500 bg-[#c2d4ff] ${isActive ? "text-[#3068ec]" : "text-[#3068ec]"}`}
        >
          <IconComponent size={isActive ? 40 : 40} strokeWidth={1.5} />
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <h3
            className={`font-extrabold tracking-tighter leading-tight transition-all duration-500 ${
              isActive
                ? "text-base md:text-lg mb-4 text-[#1e1d28]"
                : "text-base md:text-lg text-[#1e1d28]"
            }`}
          >
            {slide.heading}
          </h3>

          <div
            className={`overflow-hidden transition-all duration-700 ${
              isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[#494949] text-sm md:text-base font-medium leading-relaxed">
              {slide.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
