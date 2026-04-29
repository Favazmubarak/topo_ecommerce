"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const staticProducts = [
  {
    title: "55 SERIES TWO TRACK ECONOMY",
    description: "Strong, stylish aluminum doors that bring in natural light with a modern grid design.",
    imageUrl: "/assets/images/image3.png",
  },
  {
    title: "CBD.50",
    description: "Floor-to-ceiling panels that maximize light and create a clean, spacious look.",
    imageUrl: "/assets/images/img23.png",
  },
  {
    title: "CS.27.MR",
    description: "Smooth sliding windows offering wide views and a seamless indoor-outdoor feel.",
    imageUrl: "/assets/images/img24.png",
  },
  {
    title: "Framed Glass Entrance System",
    description: "Strong, stylish aluminum doors that bring in natural light with a modern grid design.",
    imageUrl: "/assets/images/image4.png",
  },
  {
    title: "Full-Height Fixed Glass Panels",
    description: "Floor-to-ceiling panels that maximize light and create a clean, spacious look.",
    imageUrl: "/assets/images/img25.png",
  },
  {
    title: "Panoramic Sliding Window",
    description: "Smooth sliding windows offering wide views and a seamless indoor-outdoor feel.",
    imageUrl: "/assets/images/image5.png",
  },
];

const ProductsSection = ({ variant = "default" }: { variant?: "default" | "premium" }) => {
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDbProducts(data);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
    const interval = setInterval(fetchProducts, 15000);
    return () => clearInterval(interval);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const currentProducts = dbProducts.length > 0 ? dbProducts : staticProducts;
  const totalPages = Math.ceil(currentProducts.length / itemsPerPage);

  const displayProducts = variant === "premium" 
    ? currentProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : currentProducts.slice(0, 3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (variant === "premium") {
    return (
      <section id="products" className="pt-24 pb-32 px-8 md:px-16 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 1.02, 0.73, 1] }}
              className="md:w-1/2"
            >
            <h2 className="text-[48px] md:text-[64px] font-medium text-[#0061A8] leading-[1.1] tracking-tight">
              Our Products
            </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 1.02, 0.73, 1] }}
              className="md:w-1/2 pt-0"
            >
              <p className="text-[#888888] text-[16px] md:text-[18px] leading-[1.6] max-w-[540px]">
                At Topo, we offer high-quality aluminum window solutions designed for durability, style, and performance. Our products combine modern aesthetics with precision engineering to suit both residential and commercial spaces.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {displayProducts.map((product, index) => (
              <ProductCard key={index} {...product} index={index} variant="premium" />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] transition-all duration-300 ${
                    currentPage === i + 1
                      ? "bg-[#0061A8] text-white shadow-lg shadow-blue-900/20"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="pt-12 pb-24 px-8 md:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
          <div className="md:w-1/2 overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl font-medium text-[#0061A8] tracking-tight"
            >
              Our Products
            </motion.h2>
          </div>
          
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
          {displayProducts.map((product, index) => (
            <ProductCard key={index} {...product} index={index} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
