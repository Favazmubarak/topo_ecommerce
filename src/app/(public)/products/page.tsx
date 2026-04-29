"use client";

import ProductsSection from "@/features/products/components/ProductsSection";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.21, 1.02, 0.73, 1] }}
      className="bg-white min-h-screen pb-24"
    >
      <div className="pt-[112px]">
        <ProductsSection variant="premium" />
      </div>
    </motion.div>
  );
}
