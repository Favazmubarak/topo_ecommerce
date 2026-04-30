"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Products", href: "/products" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.location.pathname === "/") {
        const sections = ["home", "about"];
        let current = "home";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && window.scrollY >= el.offsetTop - 200) {
            current = section;
          }
        }
        setActiveSection(current);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightPage =
    pathname === "/gallery" ||
    pathname === "/products" ||
    pathname === "/about";
  const isHomePage = pathname === "/";

  const isNotch = isLightPage || (isHomePage && isScrolled);
  const shouldBeLight = isNotch;

  const logoColor = shouldBeLight ? "#0061A8" : "#FFFFFF";

  return (
    <motion.nav
      initial={isHomePage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        isHomePage
          ? { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0 }
      }
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 pt-0 md:pt-3"
    >
      <div
        className={cn(
          "relative mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500",
          isNotch
            ? "h-[52px] max-w-[680px] bg-white/40 backdrop-blur-sm rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/30 px-4 md:px-6 mt-3 md:mt-0 w-[calc(100%-2rem)] md:w-full"
            : "h-[88px] max-w-[1400px] bg-transparent rounded-none px-8 md:px-16 mt-0 w-full border border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/#home" className="flex items-center gap-2 group">
          <div
            className={cn(
              "relative transition-all duration-500",
              isNotch
                ? "h-6 md:h-[36px] w-20 md:w-[110px]"
                : "h-10 md:h-[68px] w-28 md:w-[190px]"
            )}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundColor: logoColor,
                WebkitMaskImage: 'url("/assets/images/topo_logo.png")',
                maskImage: 'url("/assets/images/topo_logo.png")',
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
              }}
            />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("/#");
            const hashName = isAnchor ? item.href.substring(2) : "";
            const isActive = isAnchor
              ? pathname === "/" && activeSection === hashName
              : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13.5px] tracking-tight transition-colors duration-300",
                  shouldBeLight
                    ? isActive
                      ? "text-[#0061A8] font-bold"
                      : "text-[#1A1A1A] font-bold hover:text-[#0061A8]"
                    : isActive
                    ? "text-white font-bold"
                    : "text-white font-bold hover:text-white/80"
                )}
                style={
                  !shouldBeLight
                    ? { textShadow: "0 1px 4px rgba(0,0,0,0.3)" }
                    : {}
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right spacer */}
        <div className="w-8 hidden md:block" />

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors duration-300 pointer-events-auto",
            shouldBeLight ? "text-black" : "text-white"
          )}
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[100] flex flex-col px-8 py-12 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-24">
              <div
                className="h-10 w-24 bg-[#0061A8]"
                style={{
                  WebkitMaskImage: 'url("/assets/images/topo_logo.png")',
                  maskImage: 'url("/assets/images/topo_logo.png")',
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
              <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-50/80 rounded-full hover:bg-gray-100 transition-colors">
                <X size={32} className="text-[#0061A8]" strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, index) => {
                const isAnchor = item.href.startsWith("/#");
                const hashName = isAnchor ? item.href.substring(2) : "";
                const isActive = isAnchor
                  ? pathname === "/" && activeSection === hashName
                  : pathname === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-4xl font-medium tracking-tight block transition-colors",
                        isActive
                          ? "text-[#0061A8]"
                          : "text-gray-400 hover:text-gray-900"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto pt-12 border-t border-black/5">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30 mb-4">
                Contact
              </p>
              <p className="text-xl font-bold text-[#0061A8]">
                info@topowindows.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;