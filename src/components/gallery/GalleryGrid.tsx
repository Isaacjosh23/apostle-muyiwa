"use client";

import { motion } from "framer-motion";
import { GalleryPhoto } from "@/lib/data/gallery";

interface GalleryGridProps {
  photos: GalleryPhoto[];
  onSelect: (photo: GalleryPhoto, index: number) => void;
}

export default function GalleryGrid({ photos, onSelect }: GalleryGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {photos.map((photo, index) => (
        <motion.button
          key={photo.id}
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, delay: index * 0.02, ease: "easeOut" }}
          onClick={() => onSelect(photo, index)}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
          className="no-save group relative aspect-square rounded-lg overflow-hidden bg-dark/5 cursor-pointer"
        >
          <div
            style={{ backgroundImage: `url(${photo.src})` }}
            className="no-save absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none"
          />
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
        </motion.button>
      ))}
    </motion.div>
  );
}
