import { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search Results | The Met",
  description: "Search results across exhibitions, artists, and artifacts.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
      <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-black sm:text-5xl">
        Search Results
      </h1>

      <Suspense fallback={<div className="py-12 text-center text-lg text-black/60">Loading search results...</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
