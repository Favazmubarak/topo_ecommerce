"use client";

import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      <div className="pt-24 md:pt-32">
        <GalleryGrid />
      </div>
    </motion.div>
  );
}
