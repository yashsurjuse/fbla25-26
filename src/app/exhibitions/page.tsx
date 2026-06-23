"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import FakePagination from "@/components/FakePagination";
import Modal from "@/components/Modal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchMetObject, MetObject } from "@/lib/met-api";

const PAGE_SIZE = 26;

export default function ExhibitionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [exhibitionsData, setExhibitionsData] = useState<any[]>([]);
  const [selectedExhibition, setSelectedExhibition] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredWorks, setFeaturedWorks] = useState<MetObject[]>([]);
  const [loadingWorks, setLoadingWorks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadFeatured() {
      if (!selectedExhibition || !selectedExhibition.featured_object_ids) {
        setFeaturedWorks([]);
        return;
      }
      setLoadingWorks(true);
      const objects = await Promise.all(selectedExhibition.featured_object_ids.map((id: number) => fetchMetObject(id)));
      setFeaturedWorks(objects.filter((o): o is MetObject => o !== null));
      setLoadingWorks(false);
    }
    loadFeatured();
  }, [selectedExhibition]);

  useEffect(() => {
    fetch("/data/exhibitions_master.json")
      .then((res) => res.json())
      .then((data) => setExhibitionsData(data))
      .catch((err) => console.error("Failed to load exhibitions", err));
  }, []);

  const filteredData = useMemo(() => {
    let data = exhibitionsData;
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        data = data.filter(e => e.title?.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q));
    }
    return data;
  }, [exhibitionsData, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE) || 1;

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredData]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page)));

  return (
    <div className="bg-[#f3f2f0] pb-16">
      <section className="border-b border-black/15 bg-[#e7e4df] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Exhibitions</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Explore current and historical exhibitions at The Metropolitan Museum of Art.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <input
                type="text"
                placeholder="Search exhibitions by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none placeholder:text-black/40 focus:border-black/30 transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {pageItems.length === 0 ? (
          <div className="border border-black/15 bg-white p-6 text-black/70 lg:col-span-2">
            No exhibitions listed on this page.
          </div>
        ) : (
          pageItems.map((item, idx) => {
            return (
            <article 
              key={idx} 
              onClick={() => setSelectedExhibition(item)}
              className="cursor-pointer overflow-hidden border border-black/15 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] border-b border-black/10">
                <Image
                  src={item.image_url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/60">{item.dates}</p>
                </div>

                <h2 className="font-display text-4xl font-semibold leading-tight text-black">{item.title}</h2>
                <p className="text-base text-black/75 line-clamp-3">{item.description}</p>

                <span className="inline-flex border-b border-black text-sm font-semibold uppercase tracking-[0.1em] text-black/80 hover:text-black">
                  View Exhibition Details
                </span>
              </div>
            </article>
          );})
        )}
      </section>

      <FakePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} label="Exhibitions" />

      {selectedExhibition && (
        <Modal onClose={() => setSelectedExhibition(null)}>
          <div className="flex max-h-[85vh] flex-col overflow-y-auto">
            <div className="relative aspect-[21/9] w-full bg-[#e7e4df]">
              <Image
                src={selectedExhibition.image_url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                alt={selectedExhibition.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] to-transparent opacity-90" />
              <div className="absolute bottom-6 left-8 right-8">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                  {selectedExhibition.dates}
                </span>
                <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {selectedExhibition.title}
                </h2>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-black mb-3">About the Exhibition</h3>
                <p className="text-black/80 leading-relaxed text-lg">{selectedExhibition.description}</p>
              </div>
              
              <div className="pt-6 border-t border-black/10">
                <h3 className="font-display text-2xl font-semibold text-black mb-6">Featured Works</h3>
                {loadingWorks ? (
                  <div className="text-black/50">Loading works...</div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {featuredWorks.map((art) => (
                      <div 
                         key={art.objectID} 
                         onClick={() => router.push(`?artifactId=${art.objectID}`, { scroll: false })}
                         className="group cursor-pointer relative flex flex-col overflow-hidden rounded-lg bg-black/5 border border-black/10 hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-square bg-black/40">
                          {art.primaryImageSmall ? (
                            <Image src={art.primaryImageSmall} alt={art.title || "Artwork"} fill className="object-cover transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-black/30">No Image</div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="truncate text-sm font-semibold text-black">{art.title || "Untitled"}</div>
                          <div className="truncate text-xs text-black/60">{art.objectDate || "Unknown Date"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
