"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExhibitionCard from "@/components/ExhibitionCard";
import ArtistCard from "@/components/ArtistCard";
import ArtifactCard from "@/components/ArtifactCard";
import { MetObject } from "@/lib/met-api";

type Artist = { id: string; name: string; bio: string; image: string };
type Exhibition = { id: string; title: string; start: string; end: string; dateRange: string; description: string; image: string; featuredObjectIds: number[] };

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const lowerQuery = query.toLowerCase();

  const [artifacts, setArtifacts] = useState<MetObject[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [artsRes, artistsRes, exhRes] = await Promise.all([
          fetch("/data/artifacts_master.json").then(r => r.json()),
          fetch("/data/artists_master.json").then(r => r.json()),
          fetch("/data/exhibitions_master.json").then(r => r.json())
        ]);
        
        setArtifacts(artsRes);
        setArtists(artistsRes.map((a: any) => ({
          id: a.name,
          name: a.name,
          bio: a.bio || "No biography available.",
          image: a.portrait_url && !a.portrait_url.includes("No_image_available") ? a.portrait_url : "https://images.metmuseum.org/CRDImages/ep/web-large/DP353257.jpg"
        })));
        setExhibitions(exhRes.map((e: any) => ({
          id: e.title,
          title: e.title,
          start: "Opening",
          end: e.dates,
          dateRange: e.dates,
          description: e.description,
          image: e.image_url,
          featuredObjectIds: e.featured_object_ids || []
        })));
      } catch (err) {
        console.error("Failed to load search data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const [activeCategory, setActiveCategory] = useState<"all" | "artifacts" | "artists" | "exhibitions">("all");

  const filteredExhibitions = query && (activeCategory === "all" || activeCategory === "exhibitions")
    ? exhibitions.filter(
        (e) =>
          e.title?.toLowerCase().includes(lowerQuery) ||
          e.description?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const filteredArtists = query && (activeCategory === "all" || activeCategory === "artists")
    ? artists.filter(
        (a) =>
          a.name?.toLowerCase().includes(lowerQuery) ||
          a.bio?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const filteredArtifacts = query && (activeCategory === "all" || activeCategory === "artifacts")
    ? artifacts.filter(
        (a) =>
          a.title?.toLowerCase().includes(lowerQuery) ||
          a.artistDisplayName?.toLowerCase().includes(lowerQuery) ||
          a.department?.toLowerCase().includes(lowerQuery) ||
          a.medium?.toLowerCase().includes(lowerQuery)
      ).slice(0, 40) // Limit to 40 so it doesn't crash on broad queries
    : [];

  const hasResults =
    filteredExhibitions.length > 0 ||
    filteredArtists.length > 0 ||
    filteredArtifacts.length > 0;

  return (
    <>
      <div className="mb-12 border-b border-black/15 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xl text-black/70">
            {loading ? (
               "Loading databases..."
            ) : query ? (
              <>
                Showing results for <span className="font-bold text-black">&quot;{query}&quot;</span>
              </>
            ) : (
              "Please enter a search term above."
            )}
          </p>
          
          {query && !loading && (
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "all" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveCategory("artifacts")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "artifacts" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Artifacts
              </button>
              <button 
                onClick={() => setActiveCategory("artists")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "artists" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Artists
              </button>
              <button 
                onClick={() => setActiveCategory("exhibitions")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "exhibitions" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Exhibitions
              </button>
            </div>
          )}
        </div>
      </div>

      {!loading && !hasResults && query && (
        <div className="py-12 text-center text-lg text-black/60">
          No results found. Try adjusting your search term or category.
        </div>
      )}

      {filteredExhibitions.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-3xl font-semibold text-black">Exhibitions ({filteredExhibitions.length})</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExhibitions.map((exhibition) => (
              <ExhibitionCard key={exhibition.id} ex={exhibition} />
            ))}
          </div>
        </section>
      )}

      {filteredArtists.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-3xl font-semibold text-black">Artists ({filteredArtists.length})</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {filteredArtifacts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-3xl font-semibold text-black">Collection Artifacts ({filteredArtifacts.length})</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtifacts.map((artifact) => (
              <ArtifactCard 
                key={artifact.objectID} 
                artifact={{
                  id: String(artifact.objectID),
                  title: artifact.title || "Untitled",
                  era: artifact.objectDate || "Unknown Date",
                  location: artifact.department || "The Met",
                  description: artifact.medium || "",
                  imageSourceId: String(artifact.objectID),
                  image: artifact.primaryImageSmall || artifact.primaryImage || ""
                }} 
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
