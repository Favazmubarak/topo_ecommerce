"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const staticTestimonials = [
  {
    name: "Sarah M.",
    text: "Great experience from start to finish. Smooth installation and very modern design.",
    imageUrl: "/assets/images/imagepassport.jpg"
  },
  {
    name: "Sarah M.",
    text: "Great experience from start to finish. Smooth installation and very modern design.",
    imageUrl: "/assets/images/imagepassport.jpg"
  },
  {
    name: "Sarah M.",
    text: "Great experience from start to finish. Smooth installation and very modern design.",
    imageUrl: "/assets/images/imagepassport.jpg"
  }
];

const Testimonials = () => {
  const [dbData, setDbData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setDbData(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    
    fetchTestimonials();
    const interval = setInterval(fetchTestimonials, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonials = dbData.length > 0 ? dbData : staticTestimonials;
  const itemsPerPage = 3;
  const totalItems = currentTestimonials.length;
  
  // Auto-scroll logic
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000); // Faster 4-second scroll
    return () => clearInterval(timer);
  }, [isHovered, totalItems]);

  const visibleItems = currentTestimonials.slice(
    currentIndex, 
    currentIndex + itemsPerPage
  );

  // Fallback for when we reach the end of the array but still need 3 items
  const displayItems = visibleItems.length === itemsPerPage 
    ? visibleItems 
    : [
        ...visibleItems, 
        ...currentTestimonials.slice(0, itemsPerPage - visibleItems.length)
      ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section id="testimonials" className="pt-16 md:pt-24 pb-24 md:pb-32 px-8 md:px-16 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,5vw,3rem)] font-medium text-[#0061A8] tracking-tight leading-tight"
          >
            What Our Clients Say
          </motion.h2>

          {/* Navigation Controls */}
          {totalItems > 1 && (
            <div className="flex gap-4">
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 rounded-full border border-[#0061A8]/20 flex items-center justify-center text-[#0061A8] hover:bg-[#0061A8] hover:text-white transition-all shadow-sm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button 
                onClick={handleNext} 
                className="w-12 h-12 rounded-full border border-[#0061A8]/20 flex items-center justify-center text-[#0061A8] hover:bg-[#0061A8] hover:text-white transition-all shadow-sm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>

        <div 
          className="relative min-h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100, position: "absolute", top: 0, left: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full"
            >
              {displayItems.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col h-full bg-white rounded-[32px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-shadow duration-500"
                >
                  {/* Card Top: Stars & Quote */}
                  <div className="p-8 pb-0 flex justify-between items-center">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} size={15} className="fill-[#0061A8] text-[#0061A8]" />
                      ))}
                    </div>
                    <div className="text-[#0061A8]/10">
                      <Quote size={32} className="fill-current" />
                    </div>
                  </div>

                  {/* Card Content: Text */}
                  <div className="px-8 py-6 flex-grow">
                    <p className="text-[#666666] text-[15px] md:text-[16px] leading-relaxed font-normal italic">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Card Bottom: User Info */}
                  <div className="px-8 pb-8 pt-4 mt-auto border-t border-gray-50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 relative bg-gray-200 shrink-0">
                      <Image 
                        src={item.imageUrl} 
                        fill
                        className="object-cover" 
                        alt={item.name} 
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-[14px]">{item.name}</h4>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
