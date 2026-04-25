"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const products = [
  {
    title: "55 SERIES TWO TRACK ECONOMY",
    description: "Strong, stylish aluminum doors that bring in natural light with a modern grid design.",
    imageUrl: "/assets/images/image2.jpg",
  },
  {
    title: "CBD.50 50mm Bifold Door",
    description: "Floor-to-ceiling panels that maximize light and create a clean, spacious look.",
    imageUrl: "/assets/images/image3.png",
  },
  {
    title: "CS.27.MR 27mm Cardinal Sliding",
    description: "Smooth sliding windows offering wide views and a seamless indoor-outdoor feel.",
    imageUrl: "/assets/images/image4.png",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-32 px-8 md:px-16 bg-[#F9FAFB]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(3rem,8vw,5rem)] font-black text-[#0061A8] tracking-tighter uppercase leading-[0.8] mb-4">
              Our <br /> Products
            </h2>
            <div className="w-16 h-1.5 bg-[#0061A8]" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-gray-500 font-medium leading-relaxed text-lg"
          >
            At Topo, we offer high-quality aluminum window solutions designed for durability, style, and performance. Our systems are engineered to perfection for premium architectural projects.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
