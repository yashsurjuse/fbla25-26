import HeroSection from "@/components/HeroSection";
import FeaturedArtists from "@/components/FeaturedArtists";
import Highlights from "@/components/Highlights";
import ArtifactsPreview from "@/components/ArtifactsPreview";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#04060a] pb-24">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <section className="mt-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">Exhibitions</h2>
          <Highlights />
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Artifacts</h2>
          <ArtifactsPreview />
        </section>

        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold text-white">Featured Artists</h2>
          <FeaturedArtists limit={3} />
        </section>
      </div>
    </div>
  );
}
