"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
  variant?: "default" | "premium";
}

const ProductCard = ({ title, description, imageUrl, index, variant = "default" }: ProductCardProps) => {
  if (variant === "premium") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.2, 
          delay: index * 0.15, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="group relative bg-[#F8F8F8] rounded-[32px] overflow-hidden aspect-[4/5.2] flex flex-col cursor-pointer"
      >
        <div className="relative flex-grow overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
          />
        </div>

        {/* Content Box with Lift Effect */}
        <div className="absolute inset-x-0 bottom-0 p-4 transform transition-transform duration-700 group-hover:-translate-y-2">
          <div className="bg-white/60 backdrop-blur-md rounded-[24px] p-6 border border-white/40 shadow-sm">
            <h3 className="text-[17px] font-bold text-gray-900 mb-1 tracking-tight leading-tight uppercase">
              {title}
            </h3>
            <p className="text-[#666666] text-[13px] leading-[1.5] font-normal">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1.4, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] aspect-[4/4.2] border border-gray-100 cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
      />

      {/* Content Overlay with Lift Effect */}
      <div className="absolute inset-x-0 bottom-0 p-4 transform transition-transform duration-700 group-hover:-translate-y-2">
        <div className="bg-white/95 backdrop-blur-md rounded-[16px] p-6 shadow-xl border border-white/20">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-[#666666] text-[13px] md:text-[14px] leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
