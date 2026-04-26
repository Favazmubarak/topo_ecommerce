"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const DEFAULT_FAQS = [
  {
    question: "What types of window systems do you offer?",
    answer: "We offer sliding, casement, fixed, and custom-designed aluminum window systems tailored to your needs.",
  },
  {
    question: "Are your windows energy-efficient?",
    answer: "Yes, our windows are designed to improve insulation and help reduce energy costs through advanced thermal breaks.",
  },
  {
    question: "Do you offer custom designs?",
    answer: "Absolutely. We create made-to-measure solutions tailored to your unique space and style preferences.",
  },
  {
    question: "How durable are aluminum windows?",
    answer: "Aluminum windows are highly durable, weather resistant, and built to last for many years with minimal maintenance.",
  },
  {
    question: "How can I get a quote?",
    answer: "You can contact us through our website or call us directly for a free, no-obligation quote.",
  },
];

const FAQAccordion = () => {
  const [faqs, setFaqs] = React.useState<{ question: string; answer: string }[]>(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faq");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-24 md:py-32 px-8 md:px-16 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
          {/* Left Side: Heading */}
          <div className="lg:w-[35%]">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2rem,5vw,3.2rem)] font-medium text-[#0061A8] tracking-tight leading-tight mb-6"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#999999] text-[15px] md:text-[16px] leading-relaxed font-normal max-w-sm"
            >
              Find clear answers to your questions and discover everything you need to know about our products and services.
            </motion.p>
          </div>

          {/* Right Side: FAQ Accordion Pills */}
          <div className="lg:w-[65%] flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`overflow-hidden transition-all duration-500 rounded-[40px] ${
                  openIndex === index ? "bg-[#F0F7FF] shadow-md" : "bg-[#E8F1FC]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center gap-6 p-5 md:p-7 text-left group"
                >
                  <span className="text-[#0061A8] font-semibold text-[15px] md:text-[17px] min-w-[35px]">
                    ({index + 1})
                  </span>
                  <span className="flex-grow text-gray-800 text-[14px] md:text-[16px] font-medium leading-tight">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === index ? "bg-white text-[#0061A8] rotate-180" : "bg-[#0061A8] text-white"
                  }`}>
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-14 md:px-20 pb-8 text-[#666666] text-[14px] md:text-[15px] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
