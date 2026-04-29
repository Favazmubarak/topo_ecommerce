"use client";

import React from "react";
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        {/* Cinematic Logo Reveal */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-40 md:w-56 h-16 md:h-[84px] relative"
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundColor: "#0061A8",
                WebkitMaskImage: 'url("/assets/images/topo_logo.png")',
                maskImage: 'url("/assets/images/topo_logo.png")',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </motion.div>
        </div>

        {/* Minimalist Subtext Reveal */}
        <div className="overflow-hidden mt-4">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.3, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-[#0061A8] font-bold text-[10px] uppercase tracking-[0.4em] block"
          >
            Premium Aluminum Solutions
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
