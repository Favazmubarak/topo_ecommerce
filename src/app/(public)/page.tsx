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
      <section className="py-24 md:py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/image10.jpg" className="w-full h-full object-cover" alt="CTA Background" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black text-white leading-none tracking-tighter uppercase mb-10">
            Upgrade Your <br /> Space with Topo
          </h2>
          <p className="text-white/70 text-base mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of satisfied customers who have transformed their homes with our premium window solutions.
          </p>
          <button className="bg-[#0061A8] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl flex items-center gap-4 mx-auto group text-sm">
            Get Started Now
            <svg className="transition-transform group-hover:translate-x-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
    </div>
  );
}
