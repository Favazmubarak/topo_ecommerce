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
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feedbacks Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage client testimonials displayed on the homepage</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#0061A8] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Add New Feedback
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#0061A8]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {testimonials.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative group"
              >
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#0061A8] text-[#0061A8]" />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{item.text}"</p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                  <img src={item.imageUrl} className="w-10 h-10 rounded-full object-cover" alt={item.name} />
                  <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {testimonials.length === 0 && !showAddForm && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <MessageSquare className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No feedbacks added yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] w-full max-w-xl p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAddForm(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-8">Add New Feedback</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Client Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0061A8] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Feedback Text</label>
                  <textarea 
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    placeholder="What did the client say?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0061A8] outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Client Photo</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className={cn(
                      "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all",
                      file ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 group-hover:bg-gray-100"
                    )}>
                      <Upload className={file ? "text-green-500" : "text-[#0061A8]"} size={32} />
                      <p className="mt-2 text-sm font-bold text-gray-700">
                        {file ? file.name : "Select Photo"}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-[#0061A8] text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Saving...
                    </>
                  ) : (
                    "Save Feedback"
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
