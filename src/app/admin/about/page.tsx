"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAbout() {
  const [image1Url, setImage1Url] = useState("");
  const [image1PublicId, setImage1PublicId] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image2PublicId, setImage2PublicId] = useState("");
  
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about", { cache: "no-store" });
      const data = await res.json();
      if (data && !data.error) {
        setImage1Url(data.image1Url || "");
        setImage1PublicId(data.image1PublicId || "");
        setImage2Url(data.image2Url || "");
        setImage2PublicId(data.image2PublicId || "");
      }
    } catch (error) {
      console.error("Failed to fetch about:", error);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "topo_unsigned");
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    return await uploadRes.json();
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    setStatus(null);
    
    try {
      let finalImage1Url = image1Url;
      let finalImage1PublicId = image1PublicId;
      let finalImage2Url = image2Url;
      let finalImage2PublicId = image2PublicId;

      if (file1) {
        const uploadData = await uploadImage(file1);
        finalImage1Url = uploadData.secure_url;
        finalImage1PublicId = uploadData.public_id;
      }
      
      if (file2) {
        const uploadData = await uploadImage(file2);
        finalImage2Url = uploadData.secure_url;
        finalImage2PublicId = uploadData.public_id;
      }

      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          image1Url: finalImage1Url, 
          image1PublicId: finalImage1PublicId,
          image2Url: finalImage2Url,
          image2PublicId: finalImage2PublicId,
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", message: "About images updated successfully!" });
        setImage1Url(finalImage1Url);
        setImage1PublicId(finalImage1PublicId);
        setImage2Url(finalImage2Url);
        setImage2PublicId(finalImage2PublicId);
        setFile1(null);
        setFile2(null);
      } else {
        setStatus({ type: "error", message: "Failed to update about images." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update about images." });
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
        <div className="p-6 md:p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white to-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Homepage About Section</h2>
            <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage Content Images</p>
          </div>
          <button
            onClick={handleSaveAbout}
            disabled={saving || (!file1 && !image1Url && !file2 && !image2Url)}
            className="bg-[#0061A8] text-white px-8 py-4 rounded-2xl font-black text-[14px] hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-100"
          >
            {saving ? "Processing..." : "Commit Changes"}
            {!saving && <Save size={18} />}
          </button>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Image 1 */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Large Image (Image 1)</h3>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setFile1(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[32px] p-8 md:p-12 bg-gray-50 hover:bg-blue-50/50 hover:border-[#0061A8]/30 transition-all duration-300 group">
                <Upload className={file1 ? "text-green-500 mb-4" : "text-[#0061A8] mb-4 group-hover:scale-110 transition-transform"} size={32} />
                <p className="font-black text-gray-900 tracking-tight text-center">
                  {file1 ? file1.name : "Select Large Image"}
                </p>
              </div>
            </div>
            {/* Preview Image 1 */}
            {(file1 || image1Url) && (
              <div className="mt-4 aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                <img 
                  src={file1 ? URL.createObjectURL(file1) : image1Url} 
                  className="w-full h-full object-cover" 
                  alt="Large About Preview" 
                />
              </div>
            )}
          </div>

          {/* Image 2 */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Small Image (Image 2)</h3>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setFile2(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
              />
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[32px] p-8 md:p-12 bg-gray-50 hover:bg-blue-50/50 hover:border-[#0061A8]/30 transition-all duration-300 group">
                <Upload className={file2 ? "text-green-500 mb-4" : "text-[#0061A8] mb-4 group-hover:scale-110 transition-transform"} size={32} />
                <p className="font-black text-gray-900 tracking-tight text-center">
                  {file2 ? file2.name : "Select Small Image"}
                </p>
              </div>
            </div>
            {/* Preview Image 2 */}
            {(file2 || image2Url) && (
              <div className="mt-4 aspect-[16/9] w-full max-w-[350px] mx-auto rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                <img 
                  src={file2 ? URL.createObjectURL(file2) : image2Url} 
                  className="w-full h-full object-cover" 
                  alt="Small About Preview" 
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
