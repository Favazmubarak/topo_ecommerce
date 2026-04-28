"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const products = [
  {
    title: "Framed Glass Entrance System",
    description: "Strong, stylish aluminum doors that bring in natural light with a modern grid design.",
    imageUrl: "/assets/images/image3.png",
  },
  {
    title: "Full-Height Fixed Glass Panels",
    description: "Floor-to-ceiling panels that maximize light and create a clean, spacious look.",
    imageUrl: "/assets/images/image4.png",
  },
  {
    title: "Panoramic Sliding Window",
    description: "Smooth sliding windows offering wide views and a seamless indoor-outdoor feel.",
    imageUrl: "/assets/images/image5.png",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="pt-12 pb-24 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-6xl font-medium text-[#0061A8] tracking-tight">
              Our Products
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <p className="text-[#666666] text-lg leading-relaxed pt-1">
              At Topo, we offer high-quality aluminum window solutions designed for durability, style, and performance. Our products combine modern aesthetics with precision engineering to suit both residential and commercial spaces.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
