"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/features/home/components/Hero";
import HomeAbout from "@/features/home/components/HomeAbout";
import ProductsSection from "@/features/products/components/ProductsSection";
import WhyChooseTopo from "@/features/home/components/WhyChooseTopo";
import Testimonials from "@/features/home/components/Testimonials";
import ProductFeatures from "@/features/home/components/ProductFeatures";
import FAQAccordion from "@/features/faq/components/FAQAccordion";
import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";

import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [isFontReady, setIsFontReady] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    
    // Check if font is already loaded or wait for it
    if (document.fonts) {
      document.fonts.load('1em HighriseDemo').then(() => {
        setIsFontReady(true);
      }).catch(() => {
        // Fallback in case of error
        setIsFontReady(true);
      });
    } else {
      setIsFontReady(true);
    }

    // Ensure loader shows for at least 800ms
    const minTimer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 800);

    // Fallback timer to ensure loader doesn't get stuck forever
    const maxTimer = setTimeout(() => {
      setIsImageReady(true);
      setIsFontReady(true);
      setIsMinTimePassed(true);
    }, 2500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  const isLoading = !(isMinTimePassed && isImageReady && isFontReady);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key="loader" />}
      </AnimatePresence>

      <motion.div
        className={cn("loading-gate", hasHydrated && !isLoading && "ready")}
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Navbar startAnimation={!isLoading} />
        <div className="bg-white">
          <Hero 
            onImageLoad={() => setIsImageReady(true)} 
            startAnimation={!isLoading}
          />
          <HomeAbout />
          <ProductsSection />
          <WhyChooseTopo />
          <Testimonials />
          <ProductFeatures />
          <FAQAccordion />
          <GalleryGrid limit={7} isHomePage={true} />
          
          {/* Final CTA - Restored Parallax Background */}
          <section className="py-12 md:py-15 px-8 relative overflow-hidden mt-10 mb-20 md:mt-18 md:mb-38">
            {/* Restored Background Image Logic */}
            <div className="absolute inset-0 z-0">
              <div 
                className="absolute inset-0 bg-[url('/assets/images/img14.jpg')] bg-cover bg-center md:bg-fixed"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-[32px] md:text-[64px] font-medium text-white tracking-tight leading-tight mb-6">
                  Upgrade Your Space with Topo
                </h2>
                
                <p className="text-white/90 text-lg md:text-[22px] font-medium leading-relaxed mb-10 max-w-[700px] mx-auto">
                  Transform your home or project with premium aluminum <br className="hidden md:block" />
                  designed for style, strength, and performance.
                </p>

                <button className="bg-[#0061A8] hover:bg-blue-700 transition-all duration-300 text-white text-[15px] font-bold py-[14px] pl-8 pr-3 rounded-full flex items-center gap-5 mx-auto group shadow-lg">
                  Get a Free Quote
                  <div className="bg-white text-[#0061A8] rounded-full w-10 h-10 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17l10-10M17 17V7H7"/>
                    </svg>
                  </div>
                </button>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      </motion.div>
    </>
  );
}
