export type GalleryCategory = "throwback" | "current";

export interface GalleryPhoto {
  id: string;
  src: string;
  category: GalleryCategory;
  caption?: string;
}

// Bump these counts as real photos are added to public/gallery/throwback and
// public/gallery/current. Files must be named photo-01.jpg, photo-02.jpg, ...
// (zero-padded, sequential, no gaps).
const THROWBACK_COUNT = 12;
const CURRENT_COUNT = 12;

// Flip to false once real images are in public/gallery — generatePhotos()
// will switch to the local file path convention below.
const USE_PLACEHOLDERS = true;

function generatePhotos(
  category: GalleryCategory,
  count: number,
): GalleryPhoto[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const id = `${category}-${num}`;
    return {
      id,
      // seeded so each photo stays visually consistent across reloads
      src: USE_PLACEHOLDERS
        ? `https://picsum.photos/seed/${id}/800/800`
        : `/gallery/${category}/photo-${num}.jpg`,
      category,
    };
  });
}

export const galleryPhotos: GalleryPhoto[] = [
  ...generatePhotos("throwback", THROWBACK_COUNT),
  ...generatePhotos("current", CURRENT_COUNT),
];

export const FEATURED_IDS = [
  "throwback-01",
  "current-01",
  "throwback-03",
  "current-04",
  "throwback-05",
  "current-02",
  "current-03",
];

export const featuredPhotos = FEATURED_IDS.map((id) =>
  galleryPhotos.find((p) => p.id === id),
).filter((p): p is NonNullable<typeof p> => Boolean(p));
