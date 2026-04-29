"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Package, Upload, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "topo_unsigned"); // Replace with actual preset if needed or use signed

    try {
      // For now, I'll simulate the upload URL if no preset is available, 
      // but in a real app, you'd use your Cloudinary upload URL
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
    if (!file || !formData.title || !formData.description) return;

    setIsUploading(true);
    const uploadResult = await handleUpload();

    if (uploadResult) {
      try {
        const res = await fetch("/api/products", {
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
          setFormData({ title: "", description: "" });
          setFile(null);
          fetchProducts();
        }
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
          <p className="text-gray-500 text-sm mt-1">Add and manage products displayed on the website</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#0061A8] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#0061A8]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group"
              >
                <div className="relative h-64">
                  <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.title} />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform shadow-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg uppercase">{product.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {products.length === 0 && !showAddForm && (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <Package className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No products added yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Product Modal */}
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

              <h3 className="text-2xl font-bold text-gray-900 mb-8">Add New Product</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. 55 SERIES TWO TRACK ECONOMY"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0061A8] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Briefly describe the product..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0061A8] outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
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
                        {file ? file.name : "Select or Drop Image"}
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
                      Uploading...
                    </>
                  ) : (
                    "Create Product"
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
