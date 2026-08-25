"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GalleryTabs from "@/components/gallery/GalleryTabs";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageHero from "@/components/ui/PageHero";
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
    <main className="min-h-screen">
      <PageHero eyebrow="Moments Through The Years" title="Gallery" />

      <SectionWrapper className="px-6 py-12 sm:py-16">
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
              onSelect={(_photo: GalleryPhoto, index) =>
                setLightboxIndex(index)
              }
            />
          </motion.div>
        </AnimatePresence>

        <LightBox
          photos={photos}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      </SectionWrapper>
    </main>
  );
}
