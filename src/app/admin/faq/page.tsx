"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit2, Check, X, GripVertical, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState([
    { id: "1", question: "Are your window systems energy-efficient?", answer: "Yes, all our systems are designed with thermal breaks.", isVisible: true },
    { id: "2", question: "Do you offer custom sizes?", answer: "Absolutely. We specialize in custom-made solutions.", isVisible: true },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const toggleVisibility = (id: string) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, isVisible: !faq.isVisible } : faq));
  };

  const deleteFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage the questions and answers displayed on the website</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#0061A8] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} />
          Add New FAQ
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 rounded-3xl p-8 border border-blue-100"
            >
              <div className="space-y-4">
                <input 
                  placeholder="Enter Question" 
                  className="w-full p-4 bg-white border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0061A8]"
                />
                <textarea 
                  placeholder="Enter Answer" 
                  className="w-full p-4 bg-white border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0061A8] min-h-[100px]"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
                  <button className="bg-[#0061A8] text-white px-8 py-2 rounded-xl font-bold">Save FAQ</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {faqs.map((faq) => (
            <div key={faq.id} className={cn("p-6 flex items-start gap-6 group", !faq.isVisible && "opacity-60")}>
              <div className="mt-1 text-gray-300 cursor-grab active:cursor-grabbing">
                <GripVertical size={20} />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => toggleVisibility(faq.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#0061A8]"
                >
                  {faq.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => deleteFaq(faq.id)}
                  className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
