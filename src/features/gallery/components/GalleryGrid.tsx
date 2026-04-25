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
  { url: "/assets/images/image8.jpg", title: "Minimalist Design" },
  { url: "/assets/images/image9.jpg", title: "Bifold Door System" },
  { url: "/assets/images/image10.jpg", title: "Contemporary Villa" },
  { url: "/assets/images/img11.jpg", title: "Large Glass Panels" },
];

const GalleryGrid = () => {
  return (
    <section className="py-24 px-8 md:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-[#0061A8] tracking-tighter uppercase mb-3">Gallery</h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Explore our best projects</p>
          </motion.div>
          
          <button className="group flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#0061A8] transition-colors">View All Projects</span>
            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#0061A8] group-hover:text-white group-hover:border-transparent transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </button>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative rounded-[32px] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-700"
            >
              <img
                src={image.url}
                alt={image.title || "Gallery image"}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60 mb-3">Project Detail</span>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">{image.title}</h4>
                <div className="mt-8 w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#0061A8] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
