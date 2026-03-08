import Image from "next/image";
import FakePagination from "@/components/FakePagination";
import { artifacts } from "@/data/artifacts";
import { getImageSourceById } from "@/data/image-sources";

export default function ArtifactsPage() {
  return (
    <div className="bg-[#f4f4f4] pb-16">
      <section className="border-b border-black/15 bg-[#e8e8e8] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">Across Time</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Artifacts</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Step inside The Met&apos;s encyclopedic collection, spanning pharaonic temples, Renaissance armor, West African
            bronzes, and much more.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {artifacts.map((artifact) => {
          const image = getImageSourceById(artifact.imageSourceId);
          return (
            <article key={artifact.id} className="grid gap-0 border border-black/15 bg-white sm:grid-cols-[210px_1fr]">
              <div className="relative min-h-56 border-b border-black/10 sm:min-h-full sm:border-b-0 sm:border-r">
                <Image src={image.url} alt={artifact.title} fill className="object-cover" sizes="(min-width: 1024px) 20vw, 100vw" />
              </div>
              <div className="space-y-2 p-5">
                <h2 className="font-display text-4xl font-semibold leading-tight text-black">{artifact.title}</h2>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-black/60">{artifact.era}</p>
                <p className="text-sm font-semibold text-black/75">{artifact.location}</p>
                <p className="pt-2 text-sm leading-6 text-black/75">{artifact.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <FakePagination totalPages={146} label="Artifacts" />
    </div>
  );
}
