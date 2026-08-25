import PageHero from "@/components/ui/PageHero";
import SectionWrapper from "@/components/ui/SectionWrapper";
import VideoGrid from "@/components/videos/VideoGrid";
import { videos } from "@/lib/data/videos";

export default function VideosPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Mentorship In Motion"
        title="Videos"
        subtitle="Messages from sons and daughters."
      />

      <SectionWrapper className="px-6 py-12 sm:py-16">
        <VideoGrid videos={videos} />
      </SectionWrapper>
    </main>
  );
}
