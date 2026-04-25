"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

const ProductCard = ({ title, description, imageUrl, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-1000 flex flex-col h-full border border-gray-50"
    >
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#0061A8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tighter uppercase leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
          {description}
        </p>
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-50">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0061A8]">View Collection</span>
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[#0061A8] group-hover:bg-[#0061A8] group-hover:text-white transition-all duration-500 shadow-sm group-hover:rotate-45">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
