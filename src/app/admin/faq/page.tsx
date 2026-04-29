"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const res = await fetch("/api/faq");
    const data = await res.json();
    setFaqs(data);
  };

  const saveFaq = async () => {
    if (!question || !answer) return;
    setLoading(true);
    await fetch("/api/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });
    setQuestion("");
    setAnswer("");
    setIsAdding(false);
    setLoading(false);
    fetchFaqs();
  };

  const deleteFaq = async (id: string) => {
    await fetch(`/api/faq/${id}`, { method: "DELETE" });
    fetchFaqs();
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

      {isAdding && (
        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 mb-4">
          <div className="space-y-4">
            <input
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-4 bg-white border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0061A8]"
            />
            <textarea
              placeholder="Enter Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 bg-white border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0061A8] min-h-[100px]"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-gray-500 font-bold">Cancel</button>
              <button
                onClick={saveFaq}
                disabled={loading}
                className="bg-[#0061A8] text-white px-8 py-2 rounded-xl font-bold disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {faqs.map((faq: any) => (
          <div key={faq._id} className="p-6 flex items-start gap-6 group">
            <div className="mt-1 text-gray-300">
              <GripVertical size={20} />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
            </div>
            <button
              onClick={() => deleteFaq(faq._id)}
              className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}