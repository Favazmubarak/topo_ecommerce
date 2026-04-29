"use client";

import React from "react";
import ProductsSection from "@/features/products/components/ProductsSection";
import Navbar from "@/components/layout/Navbar";

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <Navbar />
      <div className="pt-[112px]">
        <ProductsSection variant="premium" />
      </div>
    </div>
  );
}
