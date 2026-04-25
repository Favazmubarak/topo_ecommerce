"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Are your window systems energy-efficient?",
    answer: "Yes, all our aluminum window systems are designed with thermal breaks and high-performance glass options to ensure maximum energy efficiency and insulation.",
  },
  {
    question: "Do you offer custom sizes and designs?",
    answer: "Absolutely. We specialize in custom-made solutions tailored to your specific architectural requirements and design preferences.",
  },
  {
    question: "What kind of warranty do you provide?",
    answer: "We provide a comprehensive warranty on both the aluminum profiles and the hardware components, typically ranging from 5 to 10 years depending on the product line.",
  },
  {
    question: "Are your products suitable for coastal areas?",
    answer: "Yes, we use marine-grade finishes and corrosion-resistant hardware specifically designed to withstand harsh coastal environments.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black text-[#0061A8] tracking-tighter uppercase"
          >
            Frequently <br /> Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md text-gray-500 font-medium text-sm"
          >
            Find answers to common questions about our products and services.
          </motion.p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-[32px] transition-all duration-500",
                openIndex === index ? "bg-[#F4F9FD] p-2" : "bg-white"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-black uppercase tracking-tight text-gray-900">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                  openIndex === index ? "bg-[#0061A8] text-white rotate-180" : "bg-gray-50 text-gray-400"
                )}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-8 text-gray-600 text-base leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
