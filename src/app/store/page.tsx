"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

type StoreProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
};

export default function StorePage() {
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    fetch('/data/store_master.json')
      .then(res => res.json())
      .then((data: StoreProduct[]) => {
         setStoreProducts(data);
         setLoading(false);
      })
      .catch(err => {
         console.error("Failed to load store data", err);
         setLoading(false);
      });
  }, []);

  const storeCategories = useMemo(() => {
    const cats = new Set(storeProducts.map(p => p.category));
    return ["All", ...Array.from(cats)].filter(c => c && c.trim() !== "");
  }, [storeProducts]);

  const filtered = useMemo(() => {
     let data = storeProducts;
     if (activeCategory !== "All") {
       data = data.filter(p => p.category === activeCategory);
     }
     if (searchQuery) {
       const q = searchQuery.toLowerCase();
       data = data.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
     }
     const getRelevancy = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes("shirt") || t.includes("tote") || t.includes("mug") || t.includes("cap") || t.includes("sweatshirt") || t.includes("hoodie") || t.includes("umbrella") || t.includes("socks")) return 5;
        if (t.includes("necklace") || t.includes("earrings") || t.includes("bracelet") || t.includes("pin") || t.includes("watch") || t.includes("scarf")) return 4;
        if (t.includes("book") || t.includes("guide") || t.includes("poster") || t.includes("print")) return 3;
        if (t.includes("puzzle") || t.includes("toy") || t.includes("plush") || t.includes("game")) return 2;
        return 1;
     };

     return [...data].sort((a, b) => getRelevancy(b.title) - getRelevancy(a.title));
  }, [storeProducts, activeCategory, searchQuery]);

  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
        setVisibleCount((prev) => prev + 12);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[color:var(--paper)] pb-16">
      <section className="border-b border-black/5 bg-[color:var(--paper)] px-4 py-16 sm:px-6 lg:px-10">
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
              type="text"
              placeholder="Search the store..."
              aria-label="Search store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-black/30 bg-white/50 backdrop-blur-md px-6 py-3.5 pr-12 text-sm font-semibold text-black placeholder:text-black/45 outline-none focus:border-black/50 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all"
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
                className={`rounded-full px-5 py-2.5 border text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md ${
                  activeCategory === cat
                    ? "border-black bg-black text-white shadow-lg scale-105"
                    : "border-black/30 bg-white/50 text-black hover:bg-white hover:border-black/50 hover:shadow-md"
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
          {loading ? "Loading store..." : (
          <>
            Showing <span className="font-semibold text-black">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "item" : "items"}
          </>
          )}
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
        {filtered.slice(0, visibleCount).map((product) => (
          <article key={product.id} className="group cursor-pointer glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border-black/5">
            <div className="relative aspect-square overflow-hidden bg-black/5 rounded-t-[2.5rem]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(232,232,232,0.72))]" aria-hidden />
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
            </div>

            <div className="flex flex-col justify-between flex-grow p-6 md:p-8">
              <div className="mt-1 flex items-center justify-between">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-black/45 line-clamp-1">
                  {product.category}
                </p>
                <div className="flex items-center gap-1">
                    <span className="text-[0.7rem] font-semibold text-black/60">{product.rating.toFixed(1)}</span>
                    <svg className="h-3 w-3 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-[0.65rem] text-black/40">({product.reviews})</span>
                </div>
              </div>
              <h2 className="mt-1.5 flex-1 font-display text-xl font-semibold leading-snug text-black">
                {product.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-black/55">{product.description}</p>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
                <span className="font-semibold text-lg">{product.price}</span>
                <Link
                  href={`/store/${product.id}`}
                  className="shrink-0 pill-btn pill-btn-dark px-4 py-2 text-[0.7rem] uppercase transition-all"
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
