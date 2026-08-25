import FeaturedImages from "@/components/home/FeaturedImages";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <FeaturedImages />

      <FeaturedVideos />
    </main>
  );
}
