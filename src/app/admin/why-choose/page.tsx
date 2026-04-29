"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminWhyChoose() {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/why-choose", { cache: "no-store" });
      const data = await res.json();
      if (data && !data.error) {
        setImageUrl(data.imageUrl || "");
        setPublicId(data.publicId || "");
      }
    } catch (error) {
      console.error("Failed to fetch why choose data:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    
    try {
      let finalImageUrl = imageUrl;
      let finalPublicId = publicId;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "topo_unsigned");
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.secure_url;
        finalPublicId = uploadData.public_id;
      }

      const res = await fetch("/api/why-choose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageUrl: finalImageUrl, 
          publicId: finalPublicId,
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "Why Choose section updated successfully!" });
        setImageUrl(finalImageUrl);
        setPublicId(finalPublicId);
        setFile(null);
      } else {
        setStatus({ type: "error", message: "Failed to update section." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update section." });
    } finally {
      setSaving(false);
    }
  };

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

      <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0,0,0,0.03)]">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white to-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Why Choose Topo</h2>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage Section Image</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || (!file && !imageUrl)}
            className="bg-[#0061A8] text-white px-8 py-4 rounded-2xl font-black text-[14px] hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-100"
          >
            {saving ? "Processing..." : "Commit Changes"}
            {!saving && <Save size={18} />}
          </button>
        </div>

        <div className="p-10 max-w-2xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 text-center">Feature Image</h3>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[32px] p-12 bg-gray-50 hover:bg-blue-50/50 hover:border-[#0061A8]/30 transition-all duration-300 group">
                <Upload className={file ? "text-green-500 mb-4" : "text-[#0061A8] mb-4 group-hover:scale-110 transition-transform"} size={32} />
                <p className="font-black text-gray-900 tracking-tight text-center">
                  {file ? file.name : "Select Image"}
                </p>
                <p className="text-[12px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Recommended: Landscape aspect ratio (16:9)</p>
              </div>
            </div>
            
            {/* Preview Image */}
            {(file || imageUrl) && (
              <div className="mt-8 aspect-video w-full rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                <img 
                  src={file ? URL.createObjectURL(file) : imageUrl} 
                  className="w-full h-full object-cover" 
                  alt="Preview" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
