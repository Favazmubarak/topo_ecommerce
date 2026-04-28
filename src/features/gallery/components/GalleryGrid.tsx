"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  title?: string;
}

const images: GalleryImage[] = [
  { url: "/assets/images/image6.jpg", title: "Modern Panorama" },
  { url: "/assets/images/image7.png", title: "Mountain Retreat" },
  { url: "/assets/images/image10.jpg", title: "Red Chair Lounge" },
  { url: "/assets/images/image8.jpg", title: "Minimalist Loft" },
  { url: "/assets/images/img11.jpg", title: "Forest Sanctuary" },
  { url: "/assets/images/image9.jpg", title: "Glass Sunroom" },
  { url: "/assets/images/img12.png", title: "Twilight Views" },
  { url: "/assets/images/image1.jpg", title: "Classic Framing" },
  { url: "/assets/images/img16.jpg", title: "Modern Living" },
  { url: "/assets/images/img17.jpg", title: "Contemporary Villa" },
  { url: "/assets/images/img18.jpg", title: "Luxury Poolside" },
  { url: "/assets/images/img19.jpg", title: "Brutalist Design" },
  { url: "/assets/images/img20.jpg", title: "Waterfront View" },
  { url: "/assets/images/img21.jpg", title: "Wicker Terrace" },
  { url: "/assets/images/img22.jpg", title: "Gallery Hall" },
];

const ParallaxImage = ({ url, title, isHomePage }: { url: string; title?: string; isHomePage: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-gray-100">
      <motion.img
        src={url}
        alt={title || "Gallery image"}
        style={{ y, scale: 1.2 }}
        className={`w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-1000 ease-out ${isHomePage ? "group-hover:scale-[1.25]" : ""}`}
      />
    </div>
  );
};

interface GalleryGridProps {
  limit?: number;
  showTitle?: boolean;
  isHomePage?: boolean;
}

const GalleryGrid = ({ limit, showTitle = true, isHomePage = false }: GalleryGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const displayImages = limit ? images.slice(0, limit) : images;

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const getColSpan = (index: number) => {
    if (index === 0 || index === 10) return "md:col-span-4";
    if (index === 1 || index === 11) return "md:col-span-2";
    if (index >= 2 && index <= 4) return "md:col-span-2";
    if (index >= 12 && index <= 14) return "md:col-span-2";
    if (index === 5) return "md:col-span-2";
    if (index === 6) return "md:col-span-4";
    if (index >= 7 && index <= 9) return "md:col-span-2";
    return "md:col-span-2";
  };

  return (
    <section className="py-20 px-8 md:px-12 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto bg-white">
        {/* Header Section */}
        {showTitle && (
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16 bg-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:w-1/2"
            >
              <h2 className="text-[54px] md:text-[72px] font-medium text-[#0061A8] leading-[1] tracking-tight">
                Gallery
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="md:w-1/2 pb-2"
            >
              <p className="text-[#333333] text-[18px] md:text-[20px] leading-[1.3] font-medium md:text-right max-w-[420px] ml-auto">
                Explore our completed projects showcasing<br className="hidden md:block" /> quality, style, and precision in every detail.
              </p>
            </motion.div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-10 bg-white">
          {displayImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ 
                duration: 1.2, 
                delay: (index % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => !isHomePage && setSelectedIndex(index)}
              className={`${getColSpan(index)} relative rounded-[32px] overflow-hidden bg-gray-50 group cursor-pointer aspect-square md:aspect-auto md:h-[550px] shadow-sm`}
            >
              <ParallaxImage url={image.url} title={image.title} isHomePage={isHomePage} />

              {/* Home Page Specific Hover Overlay */}
              {isHomePage && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/90 mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">Project Detail</span>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100">{image.title}</h4>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Slider */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center cursor-default"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-all z-[110]"
              onClick={() => setSelectedIndex(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={44} strokeWidth={1.5} />
            </motion.button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all p-4 z-[110]"
              onClick={goToPrev}
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-all p-4 z-[110]"
              onClick={goToNext}
            >
              <ChevronRight size={64} strokeWidth={1} />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-24 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={images[selectedIndex].url}
                    alt={images[selectedIndex].title || "Gallery image"}
                    className="max-w-full max-h-[80vh] object-contain shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-lg"
                  />
                  
                  <div className="mt-12 text-center">
                    <span className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] mb-3 block">
                      {selectedIndex + 1} / {images.length}
                    </span>
                    <h3 className="text-white text-3xl font-bold tracking-tight">
                      {images[selectedIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryGrid;
