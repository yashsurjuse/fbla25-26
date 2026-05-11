"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import FakePagination from "@/components/FakePagination";
import { exhibitions } from "@/data/exhibitions";
import { getImageSourceById } from "@/data/image-sources";

const TOTAL_PAGES = 58;
const PAGE_SIZE = 25;

export default function ExhibitionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return exhibitions.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(Math.max(1, Math.min(TOTAL_PAGES, page)));

  return (
    <div className="bg-[#f3f2f0] pb-16">
      <section className="border-b border-black/15 bg-[#e7e4df] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Exhibitions</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Explore current and historical exhibitions at The Metropolitan Museum of Art.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {pageItems.length === 0 ? (
          <div className="border border-black/15 bg-white p-6 text-black/70 lg:col-span-2">
            No exhibitions listed on this page.
          </div>
        ) : (
          pageItems.map((item) => {
            const image = getImageSourceById(item.imageSourceId);
            return (
            <article key={item.id} className="overflow-hidden border border-black/15 bg-white shadow-sm">
              <div className="relative aspect-[16/10] border-b border-black/10">
                <Image
                  src={image.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/60">{item.dateRange}</p>
                  <span className="inline-flex border border-black/30 bg-black/5 px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-black/80">
                    Special Exhibition
                  </span>
                </div>

                <h2 className="font-display text-4xl font-semibold leading-tight text-black">{item.title}</h2>
                <p className="text-base text-black/75">{item.description}</p>

                <span className="inline-flex border-b border-black text-sm font-semibold uppercase tracking-[0.1em]">
                  Plan your museum day
                </span>
              </div>
            </article>
          );})
        )}
      </section>

      <FakePagination totalPages={TOTAL_PAGES} currentPage={currentPage} onPageChange={handlePageChange} label="Exhibitions" />
    </div>
  );
}
