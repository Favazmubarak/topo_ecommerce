"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  
  // Check if we are on a light-themed page
  const isLightPage = pathname === "/gallery" || pathname === "/about" || pathname === "/products";

  // Determine Logo Color based on page
  const logoColor = isLightPage ? "#0061A8" : "#FFFFFF";

  return (
    <nav className={cn(
      "absolute top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 border-none h-[112px]",
      isLightPage ? "bg-white" : "bg-transparent pointer-events-none"
    )}>
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between pointer-events-auto">
        {/* Logo - Standardized Container */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-12 md:h-[72px] w-32 md:w-48">
            <div 
              className="w-full h-full"
              style={{
                backgroundColor: logoColor,
                WebkitMaskImage: 'url("/assets/images/topo_logo.png")',
                maskImage: 'url("/assets/images/topo_logo.png")',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }}
            />
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15.5px] tracking-tight",
                isLightPage 
                  ? (pathname === item.href ? "text-[#0061A8] font-bold" : "text-[#1A1A1A] font-bold hover:text-[#0061A8]")
                  : (pathname === item.href ? "text-white font-bold" : "text-white font-bold hover:text-white/80")
              )}
              style={!isLightPage ? { textShadow: '0 1px 4px rgba(0,0,0,0.3)' } : {}}
            >
              <span className="relative pb-1">
                {item.name}
                {pathname === item.href && (
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2.5px]",
                    isLightPage ? "bg-[#0061A8]" : "bg-white"
                  )} />
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* Right side spacer */}
        <div className="w-14 hidden md:block"></div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2",
            isLightPage ? "text-black" : "text-white"
          )}
          onClick={() => setIsOpen(true)}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Nav - Keeping minimal transition for usability */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10">
          <button onClick={() => setIsOpen(false)} className="absolute top-12 right-16 p-2">
            <X size={44} className="text-black" />
          </button>
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-5xl font-black uppercase tracking-tighter",
                  pathname === item.href ? "text-[#0061A8]" : "text-black/20 hover:text-black transition-colors"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
