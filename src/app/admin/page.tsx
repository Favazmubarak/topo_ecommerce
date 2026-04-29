"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [heroTitle, setHeroTitle] = useState("FRAMING THE FUTURE OF MODERN LIVING");
  const [heroImage, setHeroImage] = useState("https://res.cloudinary.com/dzvk7u4nk/image/upload/v1713955000/topo-hero.jpg");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data) {
        setHeroTitle(data.title);
        setHeroImage(data.imageUrl);
      }
    } catch (error) {
      console.error("Failed to fetch hero:", error);
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    setStatus(null);
    
    try {
      let imageUrl = heroImage;
      let publicId = "";

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
        body: JSON.stringify({ title: heroTitle, imageUrl, publicId }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Hero section updated successfully!" });
        setHeroImage(imageUrl);
        setFile(null);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update hero section." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {status && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mb-8 p-4 rounded-xl flex items-center gap-3 border",
            status.type === "success" 
              ? "bg-green-50 text-green-700 border-green-100" 
              : "bg-red-50 text-red-700 border-red-100"
          )}
        >
          {status.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium text-sm">{status.message}</span>
        </motion.div>
      )}

      {/* Hero Management */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Hero Section Management</h2>
          <button
            onClick={handleSaveHero}
            disabled={saving}
            className="bg-[#0061A8] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
            {!saving && <Save size={16} />}
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Title Edit */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hero Title</label>
            <textarea
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0061A8] focus:border-transparent transition-all outline-none min-h-[100px] text-lg font-bold"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
            <div className="relative mt-2">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-12 bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className={file ? "text-green-500" : "text-[#0061A8]"} size={24} />
                </div>
                <p className="font-bold text-gray-900">{file ? file.name : "Click to upload new image"}</p>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG or WEBP (Max 5MB)</p>
              </div>
            </div>
            
            {/* Current Image Preview */}
            <div className="mt-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Current Background</p>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img 
                  src={heroImage} 
                  className="w-full h-full object-cover"
                  alt="Current Hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 text-[#0061A8] shadow-sm">
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Pro Tip</h4>
          <p className="text-sm text-blue-800/80 leading-relaxed mt-1">
            Use high-resolution landscape images (at least 1920x1080px) for the hero section to ensure it looks sharp on all screen sizes.
          </p>
        </div>
      </div>
    </div>
  );
}

// Add cn helper import if not present
import { cn } from "@/lib/utils";
