"use client";

import React, { useState, useEffect } from "react";
import GalleryGrid from "@/features/gallery/components/GalleryGrid";
import { motion } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";
import Navbar from "@/components/layout/Navbar";

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="pt-24 md:pt-32">
        <GalleryGrid />
      </div>
    </div>
  );
}
