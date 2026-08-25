import { Video } from "@/types/Videos";

// Placeholder Vimeo ID shared across all entries for now — swap in each
// real per-testimony Vimeo ID once videos are uploaded. Thumbnails are also
// seeded placeholders; replace with real poster frames when available.
const PLACEHOLDER_VIMEO_ID = "76979871";

export const videos: Video[] = [
  {
    id: "video-01",
    // title: "A Father Who Never Gave Up On Me",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Pastor Kunle Adebayo",
    // caption: "Son in the faith, now leading his own ministry",
    sortOrder: 1,
  },
  {
    id: "video-02",
    // title: "He Believed In Me Before I Believed In Myself",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Deaconess Ronke Fashola",
    // caption: "Daughter in the faith, 15 years of mentorship",
    sortOrder: 2,
  },
  {
    id: "video-03",
    // title: "Lessons That Shaped My Ministry",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Minister Tayo Bankole",
    // caption: "Mentee, now serving in youth ministry",
    sortOrder: 3,
  },
  {
    id: "video-04",
    // title: "More Than A Pastor, A True Father",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Sister Amaka Obi",
    // caption: "Spiritual daughter, member for over a decade",
    sortOrder: 4,
  },
  {
    id: "video-05",
    // title: "Standing On His Shoulders",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Pastor Emeka Nwosu",
    // caption: "Son in the faith, church planter",
    sortOrder: 5,
  },
  {
    id: "video-06",
    // title: "The Call I Almost Missed",
    vimeoId: PLACEHOLDER_VIMEO_ID,
    // contributorName: "Sister Bisi Alade",
    // caption: "Mentee, worship ministry",
    sortOrder: 6,
  },
];

// Home page preview — first 4. Reorder the array above (or pick specific
// ids) once you know which testimonies should lead.
export const featuredVideos = videos.slice(0, 4);
