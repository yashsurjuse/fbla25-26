"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { storeCategories, storeProducts } from "@/data/store-products";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<(typeof storeCategories)[number]>("All");

  const filtered =
    activeCategory === "All" ? storeProducts : storeProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="bg-[#f4f4f4] pb-16">
      <section className="border-b border-black/15 bg-[#e8e8e8] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">
            The Met Store
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Take a piece of the museum home with best-selling gifts, books, jewelry, and design objects.
          </p>
        </div>
      </section>

      <div className="sticky top-20 z-10 border-b border-black/15 bg-[color:var(--paper)] px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="search"
              placeholder="Search the store..."
              aria-label="Search store (display only)"
              readOnly
              className="w-full border border-black/25 bg-white px-4 py-2.5 pr-10 text-sm text-black placeholder:text-black/45 outline-none"
            />
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/35"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m15 15 4 4" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {storeCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-150 ${
                  activeCategory === cat
                    ? "border-black bg-black text-white"
                    : "border-black/25 bg-white text-black/70 hover:border-black/55 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-sm text-black/50">
          Showing <span className="font-semibold text-black">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "item" : "items"}
          {activeCategory !== "All" && (
            <>
              {" "}
              in <span className="font-semibold text-black">{activeCategory}</span>
            </>
          )}
        </p>
      </div>

      <section
        className="mx-auto mt-4 grid w-full max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10 xl:grid-cols-4"
        aria-label="Store products"
      >
        {filtered.map((product) => (
          <article key={product.id} className="group flex flex-col overflow-hidden border border-black/15 bg-white">
            <div className="relative aspect-square overflow-hidden bg-[#f8f5ef]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(232,232,232,0.72))]" aria-hidden />
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-black/45">
                {product.category}
              </p>
              <h2 className="mt-1 flex-1 font-display text-xl font-semibold leading-snug text-black">
                {product.name}
              </h2>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/55">{product.description}</p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/store/${product.id}`}
                  className="shrink-0 border border-black bg-black px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.06em] !text-white transition-colors duration-150 hover:bg-transparent hover:!text-black"
                >
                  View Item
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
