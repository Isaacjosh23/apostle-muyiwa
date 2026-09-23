"use client";

import { useState } from "react";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import { Video } from "@/types/videos";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,150px))] sm:grid-cols-[repeat(auto-fill,minmax(160px,200px))] justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            onPlay={setActiveVideo}
          />
        ))}
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
