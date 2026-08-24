"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { featuredPhotos } from "@/lib/data/gallery";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function FeaturedImages() {
  return (
    <SectionWrapper>
      <section className="bg-gallery py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-sans text-[1rem] font-medium sm:text-xl tracking-[0.25em] uppercase text-gold mb-3">
              A Life In Pictures
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-primary">
              Moments Worth Remembering
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {featuredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                onContextMenu={(e) => e.preventDefault()}
                className={`no-save relative rounded-lg overflow-hidden bg-dark/5 ${
                  index === 0
                    ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                    : "aspect-square"
                }`}
              >
                <div
                  style={{ backgroundImage: `url(${photo.src})` }}
                  className="no-save absolute inset-0 bg-cover bg-center"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-warm-white bg-primary hover:bg-primary-light transition-colors duration-300"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
