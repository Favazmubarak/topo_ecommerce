"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex P.",
    role: "Homeowner",
    text: "Topo transformed my home with their stunning sliding doors. The quality is unmatched.",
    image: "/assets/images/imagepassport.jpg"
  },
  {
    name: "Sarah M.",
    role: "Architect",
    text: "I always recommend Topo to my clients. Their engineering precision is exceptional.",
    image: "/assets/images/imagepassport.jpg"
  },
  {
    name: "John D.",
    role: "Developer",
    text: "Professional service and high-quality products. They are our go-to for all window solutions.",
    image: "/assets/images/imagepassport.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-[#0061A8] tracking-tighter uppercase mb-16"
        >
          What Our <br /> Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className="fill-[#0061A8] text-[#0061A8]" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-8 leading-relaxed font-medium text-sm">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
