import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Share2, Camera, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0061A8] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/assets/images/topo_logo.png" alt="Topo Logo" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <p className="text-blue-100 text-sm leading-relaxed">
            Framing the future of modern living with high-quality aluminum window solutions.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-200 transition-colors">
              <Globe size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              <Camera size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              <Share2 size={20} />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Company</h4>
          <ul className="flex flex-col gap-4 text-blue-100 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-blue-100 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contact</h4>
          <ul className="flex flex-col gap-4 text-blue-100 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0" />
              <span>123 Design St, Creative City, CA 90210</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} />
              <span>+1 (555) 000-0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} />
              <span>info@topo.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-blue-400/30 text-center text-blue-200 text-xs">
        © {new Date().getFullYear()} Topo Aluminum Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
