import Hero from "@/features/home/components/Hero";
import HomeAbout from "@/features/home/components/HomeAbout";
import ProductsSection from "@/features/products/components/ProductsSection";
import WhyChooseTopo from "@/features/home/components/WhyChooseTopo";
import Testimonials from "@/features/home/components/Testimonials";
import ProductFeatures from "@/features/home/components/ProductFeatures";
import FAQAccordion from "@/features/faq/components/FAQAccordion";
import GalleryGrid from "@/features/gallery/components/GalleryGrid";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <HomeAbout />
      <ProductsSection />
      <WhyChooseTopo />
      <Testimonials />
      <ProductFeatures />
      <FAQAccordion />
      <GalleryGrid />
      
      {/* Final CTA */}
      <section className="py-20 px-8 relative overflow-hidden my-40">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/img14.jpg" className="w-full h-full object-cover" alt="CTA Background" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-white tracking-tight leading-tight mb-8">
            Upgrade Your Space with Topo
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto font-medium">
            Transform your home or project with premium aluminum designed for style, strength, and performance.
          </p>
          <button className="bg-[#0061A8] hover:bg-blue-700 transition-colors text-white text-[16px] font-semibold px-8 py-3 rounded-full flex items-center gap-4 mx-auto group">
            Get a Free Quote
            <div className="bg-white text-[#0061A8] rounded-full p-2 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
