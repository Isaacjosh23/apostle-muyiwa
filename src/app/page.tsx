import FeaturedImages from "@/components/home/FeaturedImages";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import Hero from "@/components/home/Hero";
import LetterCTA from "@/components/home/LetterCTA";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <FeaturedImages />

      <FeaturedVideos />

      <LetterCTA />
    </main>
  );
}
