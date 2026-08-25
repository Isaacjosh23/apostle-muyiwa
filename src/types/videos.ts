export interface Video {
  id: string;
  title?: string;
  vimeoId: string; // Vimeo video ID — replace placeholder with the real ID per testimony once uploaded
  contributorName?: string;
  caption?: string;
  sortOrder: number;
}
