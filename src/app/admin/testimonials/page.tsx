"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Star, Upload, Loader2, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  _id: string;
  name: string;
  text: string;
  imageUrl: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", text: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "topo_unsigned");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !formData.name || !formData.text) return;

    setIsUploading(true);
    const uploadResult = await handleUpload();

    if (uploadResult) {
      try {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            imageUrl: uploadResult.url,
            publicId: uploadResult.publicId,
          }),
        });
        
        if (res.ok) {
          setShowAddForm(false);
          setFormData({ name: "", text: "" });
          setFile(null);
          fetchTestimonials();
        }
      } catch (error) {
        console.error("Failed to create testimonial:", error);
      }
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Client Feedbacks</h2>
          <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage your public reputation</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#0061A8] text-white px-8 py-4 rounded-2xl font-black text-[14px] flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-100"
        >
          <Plus size={18} />
          Add New Feedback
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-12 h-12 border-4 border-[#0061A8]/10 border-t-[#0061A8] rounded-full animate-spin" />
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">Synchronizing...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {testimonials.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative group hover:shadow-[0_20px_60px_rgb(0,0,0,0.04)] transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#0061A8] text-[#0061A8]" />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 italic font-medium">"{item.text}"</p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div>
                    <span className="font-black text-gray-900 text-[14px] block leading-none mb-1">{item.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Client</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {testimonials.length === 0 && !showAddForm && (
            <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <MessageSquare className="text-[#0061A8]" size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">No Testimonials Found</h3>
              <p className="text-gray-400 font-bold text-[13px] mt-2 uppercase tracking-widest">Share your first client success story</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal - Premium Overlay */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-xl p-10 sm:p-12 shadow-2xl relative z-10 overflow-hidden"
            >
              <button 
                onClick={() => setShowAddForm(false)}
                className="absolute top-8 right-8 p-3 hover:bg-gray-50 rounded-2xl transition-all group"
              >
                <X size={24} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">New Feedback</h3>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-2">Publish a new client testimonial</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Client Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-6 py-4 rounded-[20px] bg-gray-50 border border-transparent focus:bg-white focus:border-[#0061A8]/20 focus:ring-4 focus:ring-[#0061A8]/5 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Testimonial content</label>
                  <textarea 
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    placeholder="Paste the client's message here..."
                    rows={4}
                    className="w-full px-6 py-4 rounded-[24px] bg-gray-50 border border-transparent focus:bg-white focus:border-[#0061A8]/20 focus:ring-4 focus:ring-[#0061A8]/5 outline-none transition-all resize-none font-medium text-gray-600 leading-relaxed placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Client Photo</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      required
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className={cn(
                      "border-2 border-dashed rounded-[24px] p-10 flex flex-col items-center justify-center transition-all duration-500",
                      file ? "border-green-100 bg-green-50/50" : "border-gray-100 bg-gray-50 group-hover:bg-gray-100/50 group-hover:border-[#0061A8]/20"
                    )}>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Upload className={file ? "text-green-500" : "text-[#0061A8]"} size={24} />
                      </div>
                      <p className="text-[14px] font-black text-gray-900 tracking-tight">
                        {file ? file.name : "Choose File"}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-[#0061A8] text-white py-5 rounded-[24px] font-black text-[15px] hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-100 mt-4"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Publishing...
                    </>
                  ) : (
                    <>
                      Save Feedback
                      <Plus size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { cn } from "@/lib/utils";

