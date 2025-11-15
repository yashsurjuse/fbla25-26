import HeroSection from "@/components/HeroSection";
import FeaturedArtists from "@/components/FeaturedArtists";
import Highlights from "@/components/Highlights";
import ArtifactsPreview from "@/components/ArtifactsPreview";
import CircularGallery from "@/components/CircularGallery";
import { metGalleryItems } from "@/data/galleryItems";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#04060a] pb-24">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <section className="mt-12">
          <div className="flex flex-col gap-2 text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Immersive artifacts</span>
            <h2 className="text-2xl font-semibold">Circular gallery</h2>
          </div>
          <div className="mt-6 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 via-white/0 to-white/5 p-1 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <CircularGallery
              items={metGalleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.08}
              scrollEase={0.035}
            />
          </div>
        </section>

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
