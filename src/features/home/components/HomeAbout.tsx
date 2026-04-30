"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HomeAbout = () => {
  const [images, setImages] = useState({
    image1Url: "/assets/images/image2.jpg",
    image2Url: "/assets/images/image6.jpg"
  });

  const [isImage1Loaded, setIsImage1Loaded] = useState(false);
  const [isImage2Loaded, setIsImage2Loaded] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about");
        const data = await res.json();
        if (data && !data.error) {
          setImages({
            image1Url: data.image1Url || "/assets/images/image2.jpg",
            image2Url: data.image2Url || "/assets/images/image6.jpg"
          });
        }
      } catch (error) {
        console.error("Failed to fetch about images:", error);
      }
    };
    fetchAbout();
  }, []);
  return (
    <section id="about" className="pt-24 pb-12 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-medium text-[#8F8F8F] tracking-tight"
              >
                About
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h3 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[32px] md:text-[42px] font-medium text-gray-900 leading-tight tracking-tight"
              >
                Building Trust Through <br />
                Precision & Quality
              </motion.h3>
            </div>
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <p className="text-[#666666] text-lg leading-relaxed mb-10">
              Established in 2016, <span className="text-[#0061A8] font-semibold">Topo is a trusted name in premium aluminum window 
              solutions,</span> known for delivering quality, precision, and modern design. We 
              believe windows are more than just functional elements—they shape the 
              way spaces look, feel, and perform. <span className="text-[#0061A8] font-semibold">That's why we focus on creating sleek, 
              durable, and energy-efficient systems</span> that enhance both residential and 
              commercial environments.
            </p>

            <div className="flex">
              <button className="bg-[#0061A8] hover:bg-blue-700 transition-colors text-white text-[14px] font-medium px-6 py-2.5 rounded-full flex items-center gap-3">
                Learn more
                <div className="bg-white text-[#0061A8] rounded-full p-1.5 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Images Row - Enhanced Responsiveness */}
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-[18px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[450px] aspect-[16/9] md:h-[280px] rounded-[22px] overflow-hidden shadow-2xl shrink-0 relative bg-gray-200"
          >
            {!isImage1Loaded && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse z-0" />
            )}
            <Image 
              src={images.image1Url} 
              alt="Interior Design" 
              fill
              className={`object-cover transition-opacity duration-700 z-10 ${isImage1Loaded ? 'opacity-100' : 'opacity-0'}`} 
              onLoad={() => setIsImage1Loaded(true)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[358px] aspect-[16/9] md:h-[190px] rounded-[22px] overflow-hidden shadow-2xl shrink-0 relative bg-gray-200"
          >
            {!isImage2Loaded && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse z-0" />
            )}
            <Image 
              src={images.image2Url} 
              alt="Modern Architecture" 
              fill
              className={`object-cover transition-opacity duration-700 z-10 ${isImage2Loaded ? 'opacity-100' : 'opacity-0'}`} 
              onLoad={() => setIsImage2Loaded(true)}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
