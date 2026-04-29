"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "topo_unsigned");

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      const apiRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          imageUrl: data.secure_url,
          publicId: data.public_id,
        }),
      });

      if (apiRes.ok) {
        setTitle("");
        setFile(null);
        fetchImages();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" }); // Wait, is there a [id] route for gallery?
      if (res.ok) fetchImages();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-500 text-sm mt-1">Upload and manage images displayed on the gallery page</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Upload Form Card */}
        <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-200 flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Add New Image</h3>
          <input 
            type="text" 
            placeholder="Image Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#0061A8]"
          />
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-xs"
          />
          <button 
            onClick={handleUpload}
            disabled={isUploading || !file || !title}
            className="mt-2 bg-[#0061A8] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            {isUploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        <AnimatePresence>
          {images.map((image) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group"
            >
              <div className="relative h-64">
                <img src={image.imageUrl} className="w-full h-full object-cover" alt={image.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(image._id)}
                    className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="font-bold text-gray-800">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
