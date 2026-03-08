import Image from "next/image";
import FakePagination from "@/components/FakePagination";
import { artists } from "@/data/artists";

export default function ArtistsPage() {
  return (
    <div className="bg-[#f1f1f1] pb-16">
      <section className="border-b border-black/15 bg-[#ece7de] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Artists</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Discover artists represented throughout the museum collection, from Impressionist pioneers to modern fashion and
            contemporary voices.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {artists.map((artist) => (
          <article key={artist.id} className="overflow-hidden border border-black/15 bg-white shadow-sm">
            <div className="relative aspect-[4/3] border-b border-black/10 bg-[#efefef]">
              <Image src={artist.image} alt={artist.name} fill className="object-cover object-top" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" />
            </div>
            <div className="flex min-h-48 flex-col items-center px-5 py-6 text-center">
              <h2 className="font-display text-4xl font-semibold leading-[0.95] text-black">{artist.name}</h2>
              <p className="mt-3 text-sm leading-6 text-black/75">{artist.bio}</p>
            </div>
          </article>
        ))}
      </section>

      <FakePagination totalPages={32} label="Artists" />
    </div>
  );
}
