export type GalleryCategory = "throwback" | "current";

export interface GalleryPhoto {
  id: string;
  src: string;
  category: GalleryCategory;
  caption?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  // Throwback
  {
    id: "throwback-1",
    src: "/gallery/throwback/throwback-1.jpg",
    category: "throwback",
  },
  {
    id: "throwback-2",
    src: "/gallery/throwback/throwback-2.jpg",
    category: "throwback",
  },
  {
    id: "throwback-3",
    src: "/gallery/throwback/throwback-3.jpg",
    category: "throwback",
  },
  {
    id: "throwback-4",
    src: "/gallery/throwback/throwback-4.jpg",
    category: "throwback",
  },
  {
    id: "throwback-5",
    src: "/gallery/throwback/throwback-5.jpg",
    category: "throwback",
  },
  {
    id: "throwback-6",
    src: "/gallery/throwback/throwback-6.jpg",
    category: "throwback",
  },
  {
    id: "throwback-7",
    src: "/gallery/throwback/throwback-7.jpg",
    category: "throwback",
  },
  {
    id: "throwback-8",
    src: "/gallery/throwback/throwback-8.jpg",
    category: "throwback",
  },
  {
    id: "throwback-9",
    src: "/gallery/throwback/throwback-9.jpg",
    category: "throwback",
  },
  {
    id: "throwback-10",
    src: "/gallery/throwback/throwback-10.jpg",
    category: "throwback",
  },
  {
    id: "throwback-11",
    src: "/gallery/throwback/throwback-11.jpg",
    category: "throwback",
  },
  {
    id: "throwback-12",
    src: "/gallery/throwback/throwback-12.jpg",
    category: "throwback",
  },
  {
    id: "throwback-13",
    src: "/gallery/throwback/throwback-13.jpg",
    category: "throwback",
  },
  {
    id: "throwback-14",
    src: "/gallery/throwback/throwback-14.jpg",
    category: "throwback",
  },
  {
    id: "throwback-15",
    src: "/gallery/throwback/throwback-15.jpg",
    category: "throwback",
  },
  {
    id: "throwback-16",
    src: "/gallery/throwback/throwback-16.jpg",
    category: "throwback",
  },
  {
    id: "throwback-17",
    src: "/gallery/throwback/throwback-17.jpg",
    category: "throwback",
  },
  {
    id: "throwback-18",
    src: "/gallery/throwback/throwback-18.jpg",
    category: "throwback",
  },
  {
    id: "throwback-19",
    src: "/gallery/throwback/throwback-19.jpg",
    category: "throwback",
  },
  {
    id: "throwback-20",
    src: "/gallery/throwback/throwback-20.jpg",
    category: "throwback",
  },

  // Current
  {
    id: "current-1",
    src: "/gallery/current/c-1.jpg",
    category: "current",
  },
  {
    id: "current-2",
    src: "/gallery/current/c-2.jpg",
    category: "current",
  },
  {
    id: "current-3",
    src: "/gallery/current/current-3.jpg",
    category: "current",
  },
  {
    id: "current-4",
    src: "/gallery/current/current-4.jpg",
    category: "current",
  },
  {
    id: "current-5",
    src: "/gallery/current/current-5.jpg",
    category: "current",
  },
  {
    id: "current-6",
    src: "/gallery/current/current-6.jpg",
    category: "current",
  },
  {
    id: "current-7",
    src: "/gallery/current/current-7.jpg",
    category: "current",
  },
  {
    id: "current-8",
    src: "/gallery/current/current-8.jpg",
    category: "current",
  },
  {
    id: "current-9",
    src: "/gallery/current/current-9.jpg",
    category: "current",
  },
  {
    id: "current-10",
    src: "/gallery/current/current-10.jpg",
    category: "current",
  },
  {
    id: "current-11",
    src: "/gallery/current/current-11.jpg",
    category: "current",
  },
  {
    id: "current-12",
    src: "/gallery/current/current-12.jpg",
    category: "current",
  },
  {
    id: "current-13",
    src: "/gallery/current/current-13.jpg",
    category: "current",
  },
  {
    id: "current-14",
    src: "/gallery/current/current-14.jpg",
    category: "current",
  },
  {
    id: "current-15",
    src: "/gallery/current/current-15.jpg",
    category: "current",
  },
  {
    id: "current-16",
    src: "/gallery/current/current-16.jpg",
    category: "current",
  },
  {
    id: "current-17",
    src: "/gallery/current/current-17.jpg",
    category: "current",
  },
  {
    id: "current-18",
    src: "/gallery/current/current-18.jpg",
    category: "current",
  },
  {
    id: "current-19",
    src: "/gallery/current/current-19.jpg",
    category: "current",
  },
  {
    id: "current-20",
    src: "/gallery/current/current-20.jpg",
    category: "current",
  },
];

export const FEATURED_IDS = [
  "throwback-1",
  "current-1",
  "throwback-3",
  "current-4",
  "throwback-5",
  "current-2",
  "throwback-10",
  "current-3",
  "throwback-15",
];

export const featuredPhotos = FEATURED_IDS.map((id) =>
  galleryPhotos.find((p) => p.id === id),
).filter((p): p is NonNullable<typeof p> => Boolean(p));
