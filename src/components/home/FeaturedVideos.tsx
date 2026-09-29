"use client";

import { useState } from "react";
import Link from "next/link";
import { featuredVideos } from "@/lib/data/videos";
import VideoCard from "@/components/videos/VideoCard";
import VideoModal from "@/components/videos/VideoModal";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Video } from "@/types/videos";

export default function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <SectionWrapper className="bg-videos py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="font-sans text-[1rem] font-medium sm:text-xl tracking-[0.25em] uppercase text-gold mb-3">
            Voices Of Sons And Daughters
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary">
            Heartfelt messages
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 justify-center gap-4 sm:gap-8 mb-10 sm:mb-14">
          {featuredVideos.map((video, index) => (
            <div
              key={video.id}
              className={`w-full ${index === 3 ? "sm:hidden" : ""}`}
            >
              <VideoCard video={video} index={index} onPlay={setActiveVideo} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/videos"
            className="inline-block px-8 py-3 rounded-full font-sans text-[1.3rem] tracking-wide uppercase font-medium text-warm-white bg-primary hover:bg-primary-light transition-colors duration-300"
          >
            Watch More
          </Link>
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </SectionWrapper>
  );
}
