"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PageLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center animate-pulse-subtle">
        {/* Cinematic Logo Reveal */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-40 md:w-56 h-16 md:h-[84px] relative animate-logo-ssr"
          >
            <div className="w-full h-full relative">
              <Image 
                src="/assets/images/topo_logo.png"
                alt="Topo Logo"
                fill
                priority
                className="object-contain"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(2135%) hue-rotate(185deg) brightness(96%) contrast(101%)' 
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Minimalist Subtext Reveal */}
        <div className="overflow-hidden mt-4">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.15, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-[#0061A8] font-bold text-[10px] uppercase tracking-[0.4em] block animate-subtext-ssr"
          >
            Premium Aluminum Solutions
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
