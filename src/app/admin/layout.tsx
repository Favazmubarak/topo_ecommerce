"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, MessageSquare, LogOut, Settings, Package, Star, Info, ShieldCheck, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsVerifying(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setIsVerifying(false);
        }
      } catch (error) {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0061A8]/20 border-t-[#0061A8] rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { name: "Hero & Banner", href: "/admin", icon: LayoutDashboard },
    { name: "About Section", href: "/admin/about", icon: Info },
    { name: "Why Choose", href: "/admin/why-choose", icon: ShieldCheck },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Feedbacks", href: "/admin/testimonials", icon: Star },
    { name: "FAQ", href: "/admin/faq", icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-8 md:p-12 mb-4">
        <Link href="/" className="block">
          <div 
            className="h-10 md:h-14 w-32 md:w-44 bg-[#0061A8]"
            style={{
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
        </Link>
      </div>

      <nav className="flex-grow px-6 md:px-8 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 ml-4 mb-4 md:mb-6">Management Area</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-4 md:gap-5 px-4 md:px-5 py-3 md:py-4 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-[#0061A8]/5 text-[#0061A8]" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  isActive ? "bg-[#0061A8] text-white shadow-lg shadow-blue-100" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                )}>
                  <Icon size={18} strokeWidth={2.5} />
                </div>
              <span className="font-bold text-[14px] md:text-[15px] tracking-tight">{item.name}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-2 h-2 rounded-full bg-[#0061A8]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 md:p-8 border-t border-gray-50 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 w-full group"
        >
          <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
            <LogOut size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[14px] md:text-[15px] tracking-tight">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      <aside className="w-80 border-r border-gray-100 hidden lg:flex flex-col bg-white flex-shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] flex flex-col shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 h-full bg-[#FAFAFB] relative">
        <header className="h-20 md:h-24 flex-shrink-0 flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden text-gray-600 hover:text-[#0061A8] transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="truncate max-w-[150px] md:max-w-none">
                {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0061A8] animate-pulse shrink-0" />
            </h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] md:text-[13px] font-black text-gray-900 uppercase tracking-wider">Admin Space</p>
              <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Active Session</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-[#0061A8] font-black border border-gray-100 shadow-sm shrink-0 text-sm md:text-base">
              AD
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 overflow-y-auto flex-grow custom-scrollbar">
          <div className="max-w-[1200px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}



