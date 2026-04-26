"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 px-8 md:px-16 pt-4 pb-12 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/assets/images/topo_logo.png" 
            alt="Topo Logo" 
            className="h-20 w-auto brightness-0 invert"
          />
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              className={cn(
                "text-[14px] tracking-normal transition-all",
                pathname === item.href
                  ? "text-white font-bold"
                  : "text-white/80 font-normal hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side spacer */}
        <div className="w-14 hidden md:block"></div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-12 right-16 p-2">
              <X size={40} className="text-black" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-5xl font-black uppercase tracking-tighter",
                    pathname === item.href ? "text-[#0061A8]" : "text-black/10 hover:text-black transition-colors"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
