"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExhibitionCard from "@/components/ExhibitionCard";
import ArtistCard from "@/components/ArtistCard";
import ArtifactCard from "@/components/ArtifactCard";
import Link from "next/link";
import { MetObject } from "@/lib/met-api";

type Artist = { id: string; name: string; bio: string; image: string };
type Exhibition = { id: string; title: string; start: string; end: string; dateRange: string; description: string; image: string; featuredObjectIds: number[] };

const sitePages = [
  { id: "/about", title: "About The Met", description: "Learn about the mission, history, and leadership of The Metropolitan Museum of Art." },
  { id: "/about/history", title: "History and Fact Sheet", description: "Tracing our roots from 1870 to becoming a world-renowned cultural institution." },
  { id: "/visit", title: "Plan Your Visit", description: "Hours, admission, directions, and guidelines for visiting The Met Fifth Avenue and The Met Cloisters." },
  { id: "/exhibitions", title: "Exhibitions", description: "Explore current and historical exhibitions at The Metropolitan Museum of Art." },
  { id: "/collection-areas", title: "Collection Areas", description: "Discover the 19 curatorial departments that care for and study our diverse collections." },
  { id: "/careers", title: "Careers", description: "Join our dedicated team. Explore opportunities for employment, internships, and volunteering." },
  { id: "/press", title: "Press Room", description: "Official press releases, high-resolution images, and media resources for journalists." },
  { id: "/research", title: "Research & Articles", description: "Dive into The Met's Timeline of Art History and comprehensive research papers." },
  { id: "/accessibility", title: "Accessibility", description: "Information about accessible entrances, tours, and services for visitors with disabilities." },
  { id: "/conservation", title: "Conservation", description: "Learn how we preserve, study, and care for works of art across our collections." }
];

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

  const [activeCategory, setActiveCategory] = useState<"all" | "artifacts" | "artists" | "exhibitions" | "pages">("all");

  const allPages = query
    ? sitePages.filter(
        (p) => p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)
      )
    : [];

  const allExhibitions = query
    ? exhibitions.filter(
        (e) =>
          e.title?.toLowerCase().includes(lowerQuery) ||
          e.description?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const allArtists = query
    ? artists.filter(
        (a) =>
          a.name?.toLowerCase().includes(lowerQuery) ||
          a.bio?.toLowerCase().includes(lowerQuery)
      )
    : [];

  const allArtifacts = query
    ? artifacts.filter(
        (a) =>
          a.title?.toLowerCase().includes(lowerQuery) ||
          a.artistDisplayName?.toLowerCase().includes(lowerQuery) ||
          a.department?.toLowerCase().includes(lowerQuery) ||
          a.medium?.toLowerCase().includes(lowerQuery)
      ).slice(0, 40)
    : [];

  const filteredPages = (activeCategory === "all" || activeCategory === "pages") ? allPages : [];
  const filteredExhibitions = (activeCategory === "all" || activeCategory === "exhibitions") ? allExhibitions : [];
  const filteredArtists = (activeCategory === "all" || activeCategory === "artists") ? allArtists : [];
  const filteredArtifacts = (activeCategory === "all" || activeCategory === "artifacts") ? allArtifacts : [];

  const hasResults =
    allPages.length > 0 ||
    allExhibitions.length > 0 ||
    allArtists.length > 0 ||
    allArtifacts.length > 0;
    
  const totalCount = allPages.length + allExhibitions.length + allArtists.length + allArtifacts.length;

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
                All ({totalCount})
              </button>
              <button 
                onClick={() => setActiveCategory("artifacts")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "artifacts" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Artifacts ({allArtifacts.length})
              </button>
              <button 
                onClick={() => setActiveCategory("artists")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "artists" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Artists ({allArtists.length})
              </button>
              <button 
                onClick={() => setActiveCategory("exhibitions")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "exhibitions" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Exhibitions ({allExhibitions.length})
              </button>
              <button 
                onClick={() => setActiveCategory("pages")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === "pages" ? "bg-black text-white" : "bg-black/5 text-black hover:bg-black/10"}`}
              >
                Pages ({allPages.length})
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

      {hasResults && (
        <section className="mb-16">
          {activeCategory !== "all" ? (
            <h2 className="mb-6 font-display text-3xl font-semibold text-black">
              {activeCategory === "artifacts" ? "Collection Artifacts" : activeCategory === "artists" ? "Artists" : activeCategory === "pages" ? "Pages" : "Exhibitions"} ({
                activeCategory === "artifacts" ? filteredArtifacts.length : activeCategory === "artists" ? filteredArtists.length : activeCategory === "pages" ? filteredPages.length : filteredExhibitions.length
              })
            </h2>
          ) : (
             <h2 className="mb-6 font-display text-3xl font-semibold text-black">
               All Results ({totalCount})
             </h2>
          )}
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPages.map((page, idx) => (
              <div key={`page-${page.id}-${idx}`} className="flex flex-col gap-2">
                <Link href={page.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="font-display text-2xl font-semibold text-black group-hover:underline decoration-2 underline-offset-4">{page.title}</h3>
                  <p className="mt-3 text-sm text-black/75 line-clamp-3">{page.description}</p>
                </Link>
                <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Page</div>
              </div>
            ))}
            {filteredExhibitions.map((exhibition, idx) => (
              <div key={`exh-${exhibition.id}-${idx}`} className="flex flex-col gap-2">
                <ExhibitionCard ex={exhibition} />
                <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Exhibition</div>
              </div>
            ))}
            {filteredArtists.map((artist, idx) => (
              <div key={`art-${artist.id}-${idx}`} className="flex flex-col gap-2">
                <ArtistCard artist={artist} />
                <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Artist</div>
              </div>
            ))}
            {filteredArtifacts.map((artifact, idx) => (
              <div key={`obj-${artifact.objectID}-${idx}`} className="flex flex-col gap-2 h-full">
                <div className="flex-1">
                  <ArtifactCard 
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
                </div>
                <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Artifact</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
