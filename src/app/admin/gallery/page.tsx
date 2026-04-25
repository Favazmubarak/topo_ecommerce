"use client";

import React, { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([
    { id: "1", url: "https://res.cloudinary.com/dzvk7u4nk/image/upload/v1713955000/topo-g1.jpg", title: "Modern Living Room" },
    { id: "2", url: "https://res.cloudinary.com/dzvk7u4nk/image/upload/v1713955000/topo-g2.jpg", title: "Scenic View Window" },
  ]);
  const [uploading, setUploading] = useState(false);

  const handleDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-500 text-sm mt-1">Upload and manage images displayed on the gallery page</p>
        </div>
        <button className="bg-[#0061A8] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <Plus size={20} />
          Upload New Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group"
            >
              <div className="relative h-64">
                <img src={image.url} className="w-full h-full object-cover" alt={image.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white text-gray-900 rounded-xl hover:scale-110 transition-transform">
                    <ImageIcon size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(image.id)}
                    className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <input
                  type="text"
                  defaultValue={image.title}
                  className="w-full bg-transparent font-bold text-gray-800 outline-none border-b border-transparent focus:border-[#0061A8] pb-1 transition-all"
                  placeholder="Enter image title..."
                />
                <p className="text-xs text-gray-400 mt-2">Uploaded on April 24, 2026</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Upload Placeholder */}
        <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer min-h-[350px]">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Upload className="text-[#0061A8]" size={24} />
          </div>
          <p className="font-bold text-gray-900">Add Image</p>
        </div>
      </div>
    </div>
  );
}
