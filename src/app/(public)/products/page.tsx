import ProductsSection from "@/features/products/components/ProductsSection";

export default function ProductsPage() {
  return (
    <div className="pt-20">
      <div className="py-20 px-6 bg-white text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our wide range of premium aluminum window and door systems designed for modern living.
        </p>
      </div>
      <ProductsSection />
      
      {/* Detailed product features could go here */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Durability", desc: "High-grade aluminum alloy with weather-resistant coating." },
            { title: "Security", desc: "Multi-point locking systems for maximum safety." },
            { title: "Insulation", desc: "Advanced thermal break technology for energy efficiency." },
            { title: "Smoothness", desc: "Precision-engineered rollers and hardware for effortless operation." },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-lg mb-3 text-[#0061A8]">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
