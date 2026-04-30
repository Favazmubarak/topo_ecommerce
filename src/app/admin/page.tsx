"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroColor, setHeroColor] = useState("#FFFFFF");
  const [heroImage, setHeroImage] = useState("");
  const [heroPublicId, setHeroPublicId] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/hero", { cache: "no-store" });
      const data = await res.json();
      if (data) {
        setHeroTitle(data.title || "");
        setHeroColor(data.titleColor || "#FFFFFF");
        setHeroImage(data.imageUrl || "");
        setHeroPublicId(data.publicId || "");
      }
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    }
  };

  const handleSaveHero = async () => {
    // Strict Validation: Image is mandatory
    if (!file && !heroImage) {
      setStatus({ type: "error", message: "No image selected! A background asset is required." });
      return;
    }

    setSaving(true);
    setStatus(null);
    
    try {
      let imageUrl = heroImage;
      let publicId = heroPublicId;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "topo_unsigned");
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
        publicId = uploadData.public_id;
      }

      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: heroTitle, 
          titleColor: heroColor, 
          imageUrl, 
          publicId 
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Hero section updated successfully!" });
        setHeroImage(imageUrl);
        setHeroPublicId(publicId);
        setFile(null);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update hero section." });
    } finally {
      setSaving(false);
    }
  };

  const colorPresets = [
    { name: "Pure White", value: "#FFFFFF" },
    { name: "Topo Navy", value: "#0061A8" },
    { name: "Deep Black", value: "#1A1A1A" },
    { name: "Soft Gray", value: "#F5F5F5" },
  ];

  return (
    <div className="space-y-10 pb-20">
      {status && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "p-5 rounded-2xl flex items-center gap-4 border shadow-sm backdrop-blur-sm",
            status.type === "success" 
              ? "bg-green-50/80 text-green-700 border-green-100" 
              : "bg-red-50/80 text-red-700 border-red-100"
          )}
        >
          <div className={cn(
            "p-2 rounded-xl",
            status.type === "success" ? "bg-green-100" : "bg-red-100"
          )}>
            {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          </div>
          <span className="font-bold text-[14px]">{status.message}</span>
        </motion.div>
      )}

      {/* Hero Management Card */}
      <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.03)]">
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white to-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Homepage Hero</h2>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mt-1">Primary Landing Visuals</p>
          </div>
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="bg-[#0061A8] text-white px-8 py-4 rounded-2xl font-black text-[14px] hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-100"
          >
            {saving ? "Processing..." : "Commit Changes"}
            {!saving && <Save size={18} />}
          </button>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Inputs */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Main Heading</label>
              <textarea
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-6 bg-gray-50/50 border border-gray-100 rounded-[24px] focus:ring-4 focus:ring-[#0061A8]/5 focus:border-[#0061A8]/20 focus:bg-white transition-all outline-none min-h-[140px] text-xl font-black text-gray-900 leading-tight placeholder:text-gray-200"
                placeholder="Enter hero title..."
              />
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Title Color & Appearance</label>
              <div className="flex flex-wrap gap-4 items-center bg-gray-50/50 p-6 rounded-[24px] border border-gray-100">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setHeroColor(preset.value)}
                    className={cn(
                      "group relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all",
                      heroColor === preset.value ? "bg-white shadow-sm ring-1 ring-gray-100" : "hover:bg-white/50"
                    )}
                  >
                    <div className="w-6 h-6 rounded-lg border border-gray-100 shadow-inner" style={{ backgroundColor: preset.value }} />
                    <span className="text-[13px] font-bold text-gray-700">{preset.name}</span>
                  </button>
                ))}
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={heroColor}
                    onChange={(e) => setHeroColor(e.target.value)}
                    className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer border-none bg-transparent"
                  />
                  <span className="text-[12px] font-black text-gray-400 font-mono tracking-tighter uppercase">{heroColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Background Asset</label>
              <div className="relative">
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[32px] p-8 md:p-16 bg-gray-50/30 hover:bg-gray-50 hover:border-[#0061A8]/30 transition-all duration-500 group">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Upload className={file ? "text-green-500" : "text-[#0061A8]"} size={28} />
                  </div>
                  <p className="font-black text-gray-900 tracking-tight">{file ? file.name : "Select New Image"}</p>
                  <p className="text-[12px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Supports high-res JPG, PNG, WEBP</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Live Preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-10">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1 block mb-4 text-center lg:text-left">Live Preview</label>
              <div className="relative aspect-[4/5] lg:aspect-square w-full rounded-[40px] overflow-hidden border-[12px] border-gray-50 shadow-2xl group bg-gray-100 flex items-center justify-center">
                {heroImage ? (
                  <img 
                    src={heroImage} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                    alt="Hero Preview" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Loading Asset...</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                   <p className="text-white text-xs font-black uppercase tracking-[0.4em] opacity-60 mb-2">Overlay View</p>
                   <h3 
                    className="text-lg font-black leading-tight line-clamp-2"
                    style={{ color: heroColor }}
                   >
                    {heroTitle}
                   </h3>
                </div>
              </div>
              <div className="mt-8 p-6 bg-blue-50/50 rounded-[24px] border border-blue-100/50 flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 text-[#0061A8] shadow-sm">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[13px] text-blue-900 uppercase tracking-wider">System Recommendation</h4>
                  <p className="text-[12px] text-blue-800/70 leading-relaxed mt-1 font-medium">
                    Use high-resolution landscape images (1920x1080px+) for maximum visual impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add cn helper import if not present
import { cn } from "@/lib/utils";
