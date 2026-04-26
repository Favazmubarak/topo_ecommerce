"use client";

import React from "react";
import { motion } from "framer-motion";

const HomeAbout = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Large Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-[30%]"
          >
            <h2 className="text-[clamp(4rem,10vw,7.5rem)] font-light text-[#A0A0A0] tracking-tight leading-none">
              About
            </h2>
          </motion.div>

          {/* Content Section */}
          <div className="lg:w-[70%] pt-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[16px] md:text-[18px] text-[#777777] leading-[1.8] font-normal max-w-3xl mb-10">
                Established in 2016, <span className="text-[#0061A8] font-semibold">Topo is a trusted name in premium aluminum window 
                solutions,</span> known for delivering quality, precision, and modern design. We 
                believe windows are more than just functional elements they shape the 
                way spaces look, feel, and perform. <span className="text-[#0061A8] font-semibold">That's why we focus on creating sleek, 
                durable, and energy-efficient systems</span> that enhance both residential and 
                commercial environments.
              </p>

              <button className="bg-[#0061A8] hover:bg-blue-700 transition-colors text-white text-[14px] font-medium px-6 py-2.5 rounded-full flex items-center gap-3">
                Learn more
                <div className="bg-white text-[#0061A8] rounded-full p-1.5 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Images Row */}
        <div className="mt-20 flex flex-col md:flex-row items-end gap-[18px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[358px] h-[197px] rounded-[22px] overflow-hidden shadow-lg shrink-0"
          >
            <img src="/assets/images/image2.jpg" className="w-full h-full object-cover" alt="Interior Design" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[358px] h-[152px] rounded-[22px] overflow-hidden shadow-lg shrink-0"
          >
            <img src="/assets/images/image6.jpg" className="w-full h-full object-cover" alt="Modern Architecture" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
