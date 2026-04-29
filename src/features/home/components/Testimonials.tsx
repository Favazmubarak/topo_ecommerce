"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const count = currentTestimonials.length;

  // Determine grid layout based on count
  let gridCols = "lg:grid-cols-3"; // Default for 3 or many
  if (count === 2) gridCols = "lg:grid-cols-2 max-w-[1000px] mx-auto";
  if (count === 4) gridCols = "lg:grid-cols-2 max-w-[1000px] mx-auto";
  if (count > 4) gridCols = "lg:grid-cols-3";

  return (
    <section id="testimonials" className="pt-16 md:pt-24 pb-24 md:pb-32 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,5vw,3rem)] font-medium text-[#0061A8] tracking-tight leading-tight mb-12"
        >
          What Our Clients Say
        </motion.h2>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-8 md:gap-10`}>
          {currentTestimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full bg-white rounded-[24px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-shadow duration-500"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
