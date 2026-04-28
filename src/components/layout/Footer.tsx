"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0061A8] text-white py-8 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 items-start mb-6">
          {/* Left Section: Logo, Description, Socials */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link href="/" className="inline-block">
              <img src="/assets/images/topo_logo.png" alt="Topo Logo" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white text-[17px] leading-relaxed font-normal">
              Premium aluminum window solutions designed for durability, style, and performance. Established in 2016.
            </p>
            <div className="flex gap-5 mt-4">
              <Link href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              <Link href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </Link>
              <Link href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </Link>
              <Link href="#" className="text-white hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
            </div>
          </div>

          {/* Right Section: Clustered Links and Contact */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            {/* Company */}
            <div className="flex flex-col gap-6 min-w-[120px]">
              <h4 className="font-bold text-[18px]">Company</h4>
              <ul className="flex flex-col gap-3 text-white/90 text-[16px]">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-6 min-w-[150px]">
              <h4 className="font-bold text-[18px]">Support</h4>
              <ul className="flex flex-col gap-3 text-white/90 text-[16px]">
                <li><Link href="#" className="hover:text-white transition-colors">Help</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">privacy policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Warranty Information</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6 max-w-[320px]">
              <h4 className="font-bold text-[18px]">Contact</h4>
              <ul className="flex flex-col gap-5 text-white/90 text-[16px]">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <MapPin size={22} />
                  </div>
                  <span className="leading-relaxed">
                    Kakathodu, Karumanamkurissi (P.O.),<br />
                    Cherpulassery, Palakkad, Kerala<br />
                    679 504.
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="shrink-0">
                    <Phone size={22} />
                  </div>
                  <span>75564442588</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="shrink-0">
                    <Mail size={22} />
                  </div>
                  <span>Toppo@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Divider Line */}
        <div className="border-t border-white/40 pt-4 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 text-[14px] font-medium tracking-wide">
              Copyright © {new Date().getFullYear()} TOPO. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-white/40 text-[13px] font-medium">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
