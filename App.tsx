import React, { useState, useEffect } from "react";
import { Slider } from "./components/Slider.tsx";
import { SlideData } from "./types.ts";
import { fetchSlideContent } from "./services/geminiService.ts";

const App: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const geminiData = await fetchSlideContent();

        if (geminiData && geminiData.length >= 8) {
          const formattedSlides: SlideData[] = geminiData.map((item, idx) => ({
            id: `slide-${idx}`,
            heading: item.heading,
            text: item.text,
            image: `https://picsum.photos/seed/${item.keyword}-${idx}/1600/1000`,
          }));
          setSlides(formattedSlides.slice(0, 8));
        } else {
          // Robust fallback if API fails or returns partial data
          const fallbackKeys = [
            "arctic",
            "safari",
            "ocean",
            "tokyo",
            "swiss",
            "desert",
            "amazon",
            "bali",
          ];
          const fallback = fallbackKeys.map((key, i) => ({
            id: `fb-${i}`,
            heading: key.toUpperCase(),
            text: "Discover the hidden beauty of the world through our curated experiences.",
            image: `https://picsum.photos/seed/${key}-${i}/1600/1000`,
          }));
          setSlides(fallback);
        }
      } catch (err) {
        console.error("Failed to load slides", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] text-white flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <main className="w-full max-w-[1400px] mx-auto">
        <Slider slides={slides} isLoading={loading} />
      </main>
    </div>
  );
};

export default App;
