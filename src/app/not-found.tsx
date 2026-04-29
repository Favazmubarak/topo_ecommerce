"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-32 pb-20 px-6">
        {/* Subtle background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#0061A8]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        {/* Grid lines for structural feel */}
        <div className="absolute inset-0 z-[-5] opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 
              className="hero-title-refined text-[#1A1A1A] m-0 leading-[0.8] tracking-tighter" 
              style={{ fontSize: "clamp(10rem, 28vw, 350px)" }}
            >
              404
            </h1>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mt-8 md:mt-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black/20" />
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">
                Page Not Found
              </h2>
              <div className="h-[1px] w-12 bg-black/20" />
            </div>
            
            <p className="text-[#666666] text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed">
              The space you're looking for doesn't exist or has been moved. Let's get you back to our premium structural designs.
            </p>

            <Link href="/" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-10 font-bold text-white bg-[#0061A8] hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-3 text-[15px] tracking-wide uppercase">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Return to Homepage
              </span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
