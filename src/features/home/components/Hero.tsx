"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Framing the Future of Modern Living",
    imageUrl: "/assets/images/image1.jpg"
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            setHeroData({
              title: data.title,
              imageUrl: data.imageUrl || "/assets/images/image1.jpg"
            });
          }
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  // Split title for the two-line effect
  const titleWords = heroData.title.split(" ");
  const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");

  return (
    <section id="home" className="relative h-screen w-full flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroData.imageUrl}
          alt="Topo Hero"
          fill
          className="object-cover object-[35%_center] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[82%] via-white/80 via-[93%] to-white z-10" />
      </div>

      <div className="absolute z-20 left-[95px] top-[19%]">
        <motion.div
          key={heroData.title} // Re-animate if title changes
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: "opacity, transform" }}
        >
          <h1
            className="hero-title-refined"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            <span className="block whitespace-nowrap">
              {firstLine}
            </span>
            <span className="block">{secondLine}</span>
          </h1>
        </motion.div>
      </div>

      {/* Interactive Hotspots */}
      <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
        {/* Hotspot 1: Structural Aluminum Systems */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute left-[47.5%] top-[58%] pointer-events-auto"
        >
          <div className="relative">
            <div className="w-3.5 h-3.5 bg-white/30 rounded-full flex items-center justify-center border border-white/60">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <svg
              className="absolute top-[7px] left-[7px] w-[80px] h-[40px]"
              viewBox="0 0 80 40"
              fill="none"
            >
              <path
                d="M0 0 L30 30 L70 30"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
            </svg>
            <div className="absolute left-[75px] top-[22px] px-4 py-2.5 bg-white/10 border border-white/50 rounded-xl text-white text-[11px] font-medium tracking-[0.05em] whitespace-nowrap" style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              Structural Aluminum <br /> Systems
            </div>
          </div>
        </motion.div>

        {/* Hotspot 2: Modern Balustrades */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute right-[19.5%] top-[41%] pointer-events-auto"
        >
          <div className="relative">
            <div className="w-3.5 h-3.5 bg-white/30 rounded-full flex items-center justify-center border border-white/60">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <svg
              className="absolute top-[7px] right-[7px] w-[60px] h-[100px]"
              viewBox="0 0 60 100"
              fill="none"
              style={{ transform: "rotateY(180deg)" }}
            >
              <path
                d="M0 0 L0 80 L50 80"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
            </svg>
           <div className="absolute right-[65px] top-[74px] px-4 py-2.5 bg-white/10 border border-white/50 rounded-xl text-white text-[11px] font-medium tracking-[0.05em] whitespace-nowrap text-right" style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
              Modern <br /> Balustrades
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 right-16 z-20 flex flex-col items-end text-white/40 gap-4">
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
