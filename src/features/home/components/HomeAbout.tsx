"use client";

import React from "react";
import { motion } from "framer-motion";

const HomeAbout = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Large Heading as per Figma */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/4"
          >
            <h2 className="text-[clamp(4rem,10vw,8rem)] font-light text-[#F0F0F0] tracking-[-0.05em] leading-[0.8] mt-4">
              About
            </h2>
          </motion.div>

          {/* Content Section */}
          <div className="lg:w-3/4 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0061A8] mb-6">Established 2016</div>
              <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-medium max-w-3xl mb-12">
                <span className="text-[#0061A8]">Topo is a trusted name in premium aluminum window 
                solutions</span>, known for delivering quality, precision, and modern design. We 
                partner with homeowners, architects, and developers to bring visions to life 
                with <span className="text-[#0061A8]">durable and aesthetically superior systems</span>.
              </p>

              <button className="group flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#0061A8] flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 shadow-xl shadow-blue-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0061A8]">Read Full Story</span>
              </button>
            </motion.div>

            {/* Images */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[1.2] rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img src="/assets/images/image5.png" className="w-full h-full object-cover" alt="Interior Design" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="aspect-[1.2] rounded-[40px] overflow-hidden shadow-2xl md:mt-24"
              >
                <img src="/assets/images/image6.jpg" className="w-full h-full object-cover" alt="Modern Architecture" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
