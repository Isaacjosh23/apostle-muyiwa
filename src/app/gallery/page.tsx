"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GalleryTabs from "@/components/gallery/GalleryTabs";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  galleryPhotos,
  GalleryCategory,
  GalleryPhoto,
} from "@/lib/data/gallery";
import LightBox from "@/components/gallery/LightBox";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("throwback");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = galleryPhotos.filter((p) => p.category === activeTab);

  const handleTabChange = (tab: GalleryCategory) => {
    setActiveTab(tab);
    setLightboxIndex(null);
  };

  return (
    <main className="min-h-screen bg-parchment pt-32 sm:pt-40 pb-20 px-5 sm:px-8">
      <SectionWrapper>
        <div className="text-center mb-10 sm:mb-14">
          <p className="font-sans text-[1rem] font-medium sm:text-xl tracking-[0.25em] uppercase text-gold mb-3">
            Moments Through The Years
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-text-primary">
            Gallery
          </h1>
        </div>
      </SectionWrapper>

      <GalleryTabs active={activeTab} onChange={handleTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <GalleryGrid
            photos={photos}
            onSelect={(_photo: GalleryPhoto, index) => setLightboxIndex(index)}
          />
        </motion.div>
      </AnimatePresence>

      <LightBox
        photos={photos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
