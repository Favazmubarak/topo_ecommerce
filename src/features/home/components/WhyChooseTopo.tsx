"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Pencil, Zap, Cloud } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "High Durability",
    desc: "Built with strong aluminum to ensure long-lasting performance in all conditions."
  },
  {
    icon: Pencil,
    title: "Modern Design",
    desc: "Clean, sleek designs that enhance any modern space."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    desc: "Designed to reduce heat loss and improve energy savings."
  },
  {
    icon: Cloud,
    title: "Custom Solutions",
    desc: "Tailored designs to fit your unique space and style."
  }
];

const WhyChooseTopo = () => {
  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading Section */}
        <div className="mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,5vw,3rem)] font-medium text-[#0061A8] tracking-tight leading-tight mb-3"
          >
            Why Choose Topo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#666666] text-[15px] md:text-[17px] max-w-2xl font-normal leading-relaxed"
          >
            Built on quality, designed for modern living, and trusted for lasting performance.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Horizontal Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="rounded-[24px] overflow-hidden shadow-xl aspect-video">
              <img src="/assets/images/image6.jpg" className="w-full h-full object-cover" alt="Why Choose Topo" />
            </div>
          </motion.div>

          {/* Right: Features Grid */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {features.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="text-[#0061A8]">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-[18px] mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-[#999999] text-[13px] md:text-[14px] leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTopo;
