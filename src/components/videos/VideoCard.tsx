"use client";

import { Video } from "@/types/Videos";
import { motion } from "framer-motion";
import { Icon } from "../ui/icons";
import { Icons } from "../ui/icons/_types";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  index?: number;
}

export default function VideoCard({
  video,
  onPlay,
  index = 0,
}: VideoCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onClick={() => onPlay(video)}
      className="group text-left cursor-pointer"
    >
      <div
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${video.id}/640/400)`,
        }}
        className="relative aspect-video rounded-lg overflow-hidden bg-dark/10 mb-4 bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/45 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-14 sm:size-16 rounded-full bg-warm-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Icon type={Icons.Play} />
          </div>
        </div>
      </div>

      {/* <h3 className="font-serif text-xl text-text-primary mb-1">
        {video.contributorName}
      </h3>
      <p className="font-sans text-[1.3rem] text-text-muted">{video.caption}</p> */}
    </motion.button>
  );
}
