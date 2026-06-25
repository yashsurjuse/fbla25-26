"use client";

import Image from "next/image";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FakePagination from "@/components/FakePagination";

const PAGE_SIZE = 27;

type ArtifactData = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  medium: string;
  department: string;
  objectDate: string;
  primaryImage: string;
  primaryImageSmall: string;
  tags: string[];
};

type ArtistData = {
  name: string;
  bio: string | null;
  portrait_url: string | null;
  object_ids: number[];
};

export default function ArtistsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [artistsData, setArtistsData] = useState<ArtistData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`/data/artists_master.json?v=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setArtistsData(data))
      .catch((err) => console.error("Failed to load artists", err));
  }, []);

  const filteredData = useMemo(() => {
    let data = artistsData;
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        data = data.filter(a => a.name?.toLowerCase().includes(q) || a.bio?.toLowerCase().includes(q));
    }
    return data;
  }, [artistsData, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE) || 1;

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page)));

  const handleArtistClick = (artist: ArtistData) => {
    router.push(`?artistName=${encodeURIComponent(artist.name)}`, { scroll: false });
  };

  return (
    <div className="bg-[color:var(--paper)] pb-20">
      <section className="border-b border-black/5 bg-[color:var(--paper)] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-bold leading-[0.95] text-black sm:text-7xl lg:text-8xl">Artists</h1>
          <p className="mt-6 max-w-3xl text-lg text-black/60 leading-relaxed">
            Discover artists represented throughout the museum collection, from impressionist pioneers to modern fashion and
            contemporary voices.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
                type="text"
                placeholder="Search artists by name or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none placeholder:text-black/40 focus:border-black/30 transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {pageItems.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-black/50 font-medium">
            No artists listed on this page.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 animate-stagger-fade">
          {pageItems.map((artist, idx) => {
            const hasImage = artist.portrait_url && !artist.portrait_url.includes("No_image_available.svg");
            return (
            <article 
              key={idx} 
              onClick={() => handleArtistClick(artist)}
              className="group cursor-pointer break-inside-avoid flex flex-col glass-card rounded-3xl overflow-hidden"
            >
            <div className="relative aspect-[4/3] bg-black/5 overflow-hidden">
              {hasImage ? (
                  <Image
                    src={artist.portrait_url!}
                    alt={artist.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                  />
              ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-black/10 uppercase">{artist.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex flex-col items-center px-6 py-8 text-center">
              <h2 className="font-display text-3xl font-bold leading-tight text-black group-hover:text-[color:var(--accent)] transition-colors">
                {artist.name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-black/60 line-clamp-4">{artist.bio}</p>
            </div>
          </article>
          );})}
          </div>
        )}
      </section>

      <FakePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} label="Artists" />
    </div>
  );
}
