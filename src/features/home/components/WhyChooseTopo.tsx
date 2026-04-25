"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Wrench, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Maximum Security",
    desc: "Engineered with multi-point locking systems for ultimate peace of mind."
  },
  {
    icon: Zap,
    title: "Efficiency",
    desc: "Optimized thermal breaks to reduce energy consumption and costs."
  },
  {
    icon: Wrench,
    title: "Precision",
    desc: "Expertly fitted by our team to ensure flawless operation and longevity."
  },
  {
    icon: Clock,
    title: "Durability",
    desc: "High-grade aluminum built to withstand extreme weather conditions."
  }
];

const WhyChooseTopo = () => {
  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left: Image with organic rounded corners */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-3xl aspect-[4/5]">
              <img src="/assets/images/image8.jpg" className="w-full h-full object-cover" alt="Why Choose Topo" />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </motion.div>

          {/* Right: Features */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-[#0061A8] tracking-tighter uppercase leading-[0.9] mb-12">
                Why Choose <br /> Topo
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {features.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center text-[#0061A8] shadow-xl shadow-blue-900/5">
                      <item.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-gray-900 text-base mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTopo;
