import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-8 text-gray-900">About Topo</h1>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Founded on the principles of quality and innovation, Topo has been 
              a leader in providing premium aluminum window and door systems for 
              over a decade.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our journey started with a simple goal: to combine the strength of 
              aluminum with the elegance of modern design. Today, we are proud 
              to serve thousands of homeowners and architects who trust us for 
              our precision engineering and aesthetic excellence.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-4xl font-bold text-[#0061A8]">10+</h4>
                <p className="text-gray-500 text-sm">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-[#0061A8]">500+</h4>
                <p className="text-gray-500 text-sm">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/assets/images/image5.png" 
              alt="Topo Factory" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Innovation", desc: "We constantly push the boundaries of design and technology to deliver state-of-the-art solutions." },
              { title: "Quality", desc: "Every product that leaves our facility is rigorously tested to meet the highest international standards." },
              { title: "Integrity", desc: "We believe in honest communication and delivering on our promises to every client." },
            ].map((value, i) => (
              <div key={i} className="text-center p-10 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0061A8] font-bold text-2xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
