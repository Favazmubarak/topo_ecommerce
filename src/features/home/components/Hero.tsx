"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  onImageLoad?: () => void;
  startAnimation?: boolean;
}

const Hero = ({ onImageLoad, startAnimation = true }: HeroProps) => {
  const [heroData, setHeroData] = useState({
    title: "Framing the Future of Modern Living",
    titleColor: "#FFFFFF",
    imageUrl: "/assets/images/image1.jpg"
  });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setHeroData(prev => {
              const newUrl = data.imageUrl || "/assets/images/image1.jpg";
              if (prev.imageUrl !== newUrl) {
                setIsImageLoaded(false);
              }
              return {
                title: data.title || "",
                titleColor: data.titleColor || "#FFFFFF",
                imageUrl: newUrl
              };
            });
          }
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      } finally {
        setIsApiReady(true);
      }
    };

    fetchHero();
    
    // Live Sync: Check for updates every 10 seconds
    const interval = setInterval(fetchHero, 10000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isApiReady && isImageLoaded) {
      if (onImageLoad) onImageLoad();
    }
  }, [isApiReady, isImageLoaded, onImageLoad]);

  // Split title for the two-line effect
  const titleWords = heroData.title.split(" ");
  const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");

  return (
    <section id="home" className="relative h-screen w-full flex items-center overflow-hidden bg-white">
      {/* Background Image with Parallax Zoom */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0 bg-gray-200"
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse z-0" />
        )}
        <Image
          src={heroData.imageUrl}
          alt="Topo Hero"
          fill
          className="object-cover object-[35%_center]"
          priority
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[82%] via-white/80 via-[93%] to-white z-10" />
      </motion.div>

      {heroData.title && (
        <div className="absolute z-20 left-6 right-6 top-[22%] md:left-[95px] md:right-auto md:top-[19%]">
          <motion.div
            key={heroData.title}
            initial={{ opacity: 0, y: 30 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "opacity, transform" }}
          >
            <h1
              className="hero-title-refined"
              style={{ 
                color: heroData.titleColor, 
                WebkitTextFillColor: heroData.titleColor,
                transition: "color 0.5s ease-in-out" 
              }}
            >
              <span className="block md:whitespace-nowrap">
                {firstLine}
              </span>
              <span className="block">{secondLine}</span>
            </h1>
          </motion.div>
        </div>
      )}

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
