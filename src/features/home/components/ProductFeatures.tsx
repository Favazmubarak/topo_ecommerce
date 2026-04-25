"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wind, ShieldCheck, Sun, Thermometer } from "lucide-react";

const features = [
  {
    icon: Wind,
    title: "Wind Resistant",
    desc: "Tested to withstand high-velocity winds."
  },
  {
    icon: ShieldCheck,
    title: "Secure Locking",
    desc: "Multi-point locking for maximum safety."
  },
  {
    icon: Sun,
    title: "UV Protection",
    desc: "Blocks harmful UV rays while letting in light."
  },
  {
    icon: Thermometer,
    title: "Thermal Insulation",
    desc: "Keeps your home warm in winter and cool in summer."
  }
];

const ProductFeatures = () => {
  return (
    <section className="py-24 px-8 bg-[#E6F0F8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-[#0061A8] tracking-tighter uppercase mb-4"
          >
            Product Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium max-w-2xl mx-auto text-sm"
          >
            Our products are engineered with the latest technology to provide superior performance and comfort.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[32px] bg-white group hover:bg-[#0061A8] transition-all duration-700 shadow-sm"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E6F0F8] flex items-center justify-center text-[#0061A8] mb-6 group-hover:bg-white/20 group-hover:text-white transition-all">
                <item.icon size={28} />
              </div>
              <h4 className="font-black uppercase tracking-tight text-lg mb-3 text-gray-900 group-hover:text-white transition-all">{item.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed group-hover:text-blue-100 transition-all font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
