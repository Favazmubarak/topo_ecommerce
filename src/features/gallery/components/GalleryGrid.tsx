"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  url: string;
  title?: string;
}

const images: GalleryImage[] = [
  { url: "/assets/images/image6.jpg", title: "Modern Living Room" },
  { url: "/assets/images/image7.png", title: "Scenic View Window" },
  { url: "/assets/images/image10.jpg", title: "Contemporary Villa" },
  { url: "/assets/images/image8.jpg", title: "Minimalist Design" },
  { url: "/assets/images/img11.jpg", title: "Large Glass Panels" },
  { url: "/assets/images/image9.jpg", title: "Bifold Door System" },
  { url: "/assets/images/img12.png", title: "Modern Sunroom" },
];

const GalleryGrid = () => {
  return (
    <section className="pt-12 pb-0 px-8 md:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-6xl font-medium text-[#0061A8] tracking-tight">Gallery</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore our completed projects showcasing quality, style, and precision in every detail.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {images.map((image, index) => {
            // Determine column span based on 2-3-2 pattern
            // Row 1 (Index 0, 1): Span 3
            // Row 2 (Index 2, 3, 4): Span 2
            // Row 3 (Index 5, 6): Span 3
            let colSpan = "md:col-span-3";
            if (index >= 2 && index <= 4) {
              colSpan = "md:col-span-2";
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${colSpan} relative rounded-[32px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700`}
              >
                <img
                  src={image.url}
                  alt={image.title || "Gallery image"}
                  className="w-full h-80 md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 mb-2">Project Detail</span>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">{image.title}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
