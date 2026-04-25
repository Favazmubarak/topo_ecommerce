"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, MessageSquare, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "FAQ", href: "/admin/faq", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0061A8] text-white hidden md:flex flex-col">
        <div className="p-8 border-b border-blue-400/30">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0061A8] font-bold">
              t
            </div>
            <span className="text-xl font-bold tracking-tight">topo admin</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  pathname === item.href ? "bg-white text-[#0061A8]" : "hover:bg-blue-600"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-400/30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-800">
            {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#0061A8] font-bold border border-gray-200">
              A
            </div>
          </div>
        </header>
        <div className="p-8 overflow-auto flex-grow">{children}</div>
      </main>
    </div>
  );
}
