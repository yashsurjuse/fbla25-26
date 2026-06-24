"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import articles from "@/data/articles.json";

export default function ResearchPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      {/* Header */}
      <section className="px-4 py-16 sm:px-6 lg:px-10 border-b border-black/10 bg-white shadow-sm">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] sm:text-7xl">
            Research & Articles
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-black/75">
            Dive into The Met's Timeline of Art History. Explore comprehensive essays, research papers, and deep dives into our collections authored by curators and art historians.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto mt-12 grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {articles.map((article, idx) => {
          const mainImage = article.images && article.images.length > 0 
            ? article.images[0] 
            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

          return (
            <Link key={article.slug} href={`/research/${article.slug}`}>
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-black/10 bg-[#efefef]">
                  <Image 
                    src={mainImage} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                    Research Publication
                  </div>
                  <h2 className="font-display text-3xl font-semibold leading-tight text-black group-hover:underline decoration-2 underline-offset-4">
                    {article.title}
                  </h2>
                  <p className="mt-4 text-black/70 line-clamp-3 leading-relaxed">
                    {article.content && article.content.length > 0 ? article.content[0] : "Explore this article..."}
                  </p>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-black border-b border-black pb-0.5 transition-colors hover:text-black/60 hover:border-black/60">
                      Read Article <span className="ml-2">→</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
