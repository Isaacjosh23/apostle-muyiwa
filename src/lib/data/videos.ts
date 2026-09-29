import { Video } from "@/types/videos";

export const videos: Video[] = [
  {
    id: "video-01",
    vimeoId: 1229160919,
    sortOrder: 1,
  },
  {
    id: "video-02",
    vimeoId: 1229160705,
    sortOrder: 2,
  },
  {
    id: "video-03",
    vimeoId: 1229860535,
    sortOrder: 3,
  },
  {
    id: "video-04",
    vimeoId: 1229860534,
    sortOrder: 4,
  },
  {
    id: "video-05",
    vimeoId: 1229860533,
    sortOrder: 5,
  },
  {
    id: "video-06",
    vimeoId: 1231441272,
    sortOrder: 6,
  },
  {
    id: "video-07",
    vimeoId: 1231441108,
    sortOrder: 7,
  },
];

export const featuredVideos = videos.slice(0, 4);
