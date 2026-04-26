"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2, Thermometer, Wrench, Cloud } from "lucide-react";

const features = [
  {
    icon: Volume2,
    title: "Noise reduction",
    desc: "Blocks outside noise for a peaceful space",
    highlight: true
  },
  {
    icon: Thermometer,
    title: "Thermal insulation",
    desc: "Blocks outside noise for a peaceful space",
    highlight: false
  },
  {
    icon: Wrench,
    title: "Low maintenance",
    desc: "Blocks outside noise for a peaceful space",
    highlight: false
  },
  {
    icon: Cloud,
    title: "Weather resistance",
    desc: "Blocks outside noise for a peaceful space",
    highlight: false
  }
];

const ProductFeatures = () => {
  return (
    <section className="py-12 md:py-20 px-8 md:px-16 bg-[#E8F1FC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,5vw,3rem)] font-bold text-[#0061A8] tracking-tight leading-tight mb-3"
          >
            Product Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 font-bold max-w-2xl mx-auto text-[15px] md:text-[17px]"
          >
            Designed to deliver comfort, durability, and high performance in every detail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[24px] relative flex flex-col h-[280px] bg-white text-gray-900 hover:bg-[#0061A8] hover:text-white transition-all duration-500 shadow-sm"
            >
              <div className="mb-8 text-gray-900 group-hover:text-white transition-colors">
                <item.icon size={36} strokeWidth={2.5} />
              </div>
              
              <h4 className="font-bold text-[18px] md:text-[20px] mb-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-[13px] md:text-[14px] leading-relaxed font-normal text-gray-400 group-hover:text-blue-100 transition-colors">
                {item.desc}
              </p>

              {/* Bottom Arrow Icon */}
              <div className="absolute bottom-8 right-8">
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#0061A8] text-white group-hover:bg-white group-hover:text-[#0061A8]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
