"use client";

import React, { useState, useEffect } from "react";
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
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setDbData(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const currentTestimonials = dbData.length > 0 ? dbData : staticTestimonials;
  const itemsPerPage = 3;
  const totalItems = currentTestimonials.length;
  
  const visibleItems = currentTestimonials.slice(
    currentIndex, 
    currentIndex + itemsPerPage
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % totalItems);
  };

  return (
    <section id="testimonials" className="pt-16 md:pt-24 pb-24 md:pb-32 px-8 md:px-16 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,5vw,3rem)] font-medium text-[#0061A8] tracking-tight leading-tight mb-16"
        >
          What Our Clients Say
        </motion.h2>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {visibleItems.map((item, i) => (
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
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                      <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-[14px]">{item.name}</h4>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Simple Next Button (Arrow only) */}
        {totalItems > itemsPerPage && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleNext}
              className="group flex items-center gap-3 text-[#0061A8] font-bold text-[16px] transition-all"
            >
              <span className="tracking-tight">View More Feedback</span>
              <div className="p-2 rounded-full border border-[#0061A8]/20 group-hover:bg-[#0061A8] group-hover:text-white transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
