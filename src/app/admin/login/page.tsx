"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/testimonials");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-12 w-48 bg-[#0061A8] mb-8" style={{
            WebkitMaskImage: 'url("/assets/images/topo_logo.png")',
            maskImage: 'url("/assets/images/topo_logo.png")',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }} />
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Topo Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-2 text-center">Secure access for authorized personnel only</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0061A8] transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-12 text-[#1A1A1A] focus:ring-2 focus:ring-[#0061A8]/10 transition-all placeholder:text-gray-300 font-medium outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold ml-1"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0061A8] hover:bg-blue-700 disabled:bg-gray-200 transition-all text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <span className={isLoading ? "opacity-0" : "opacity-100"}>Enter Dashboard</span>
              <ArrowRight size={18} className={isLoading ? "opacity-0" : "transition-transform group-hover:translate-x-1"} />
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-gray-300 text-[10px] font-bold uppercase tracking-[0.4em]">
          Topo Windows • Est. 2016
        </p>
      </motion.div>
    </div>
  );
}
