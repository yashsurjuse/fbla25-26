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
    <div className="bg-[#f1f1f1] pb-16">
      <section className="border-b border-black/15 bg-[#ece7de] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Artists</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
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

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {pageItems.length === 0 ? (
          <div className="border border-black/15 bg-white p-6 text-black/70 md:col-span-2 xl:col-span-3">
            No artists listed on this page.
          </div>
        ) : (
          pageItems.map((artist, idx) => {
            const hasImage = artist.portrait_url && !artist.portrait_url.includes("No_image_available.svg");
            return (
            <article 
              key={idx} 
              onClick={() => handleArtistClick(artist)}
              className="cursor-pointer overflow-hidden border border-black/15 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
            <div className="relative aspect-[4/3] border-b border-black/10 bg-[#efefef] flex items-center justify-center">
              {hasImage ? (
                  <Image
                    src={artist.portrait_url!}
                    alt={artist.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />
              ) : (
                  <span className="font-display text-7xl font-bold text-black/10 uppercase">{artist.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex min-h-48 flex-col items-center px-5 py-6 text-center">
              <h2 className="font-display text-4xl font-semibold leading-[0.95] text-black">
                {artist.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-black/75 line-clamp-4">{artist.bio}</p>
            </div>
          </article>
          );})
        )}
      </section>

      <FakePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} label="Artists" />
    </div>
  );
}
