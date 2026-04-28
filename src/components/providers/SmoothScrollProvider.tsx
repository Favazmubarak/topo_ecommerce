"use client";

import { useEffect } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Basic but effective smooth scroll momentum simulation for a premium feel
    // This is often what separates "beginner" from "premium" sites
    const smoothScroll = () => {
      document.documentElement.style.scrollBehavior = "smooth";
    };
    
    smoothScroll();
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return <>{children}</>;
}
