"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import ExhibitionCard from "@/components/ExhibitionCard";
import ArtistCard from "@/components/ArtistCard";
import ArtifactCard from "@/components/ArtifactCard";
import Link from "next/link";
import { MetObject } from "@/lib/met-api";

type Artist = { id: string; name: string; bio: string; image: string };
type Exhibition = { id: string; title: string; start: string; end: string; dateRange: string; description: string; image: string; featuredObjectIds: number[] };

const sitePages = [
  { id: "/about", title: "About The Met", description: "Learn about the mission, history, and leadership of The Metropolitan Museum of Art.", content: "The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online. Since its founding in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. Every day, art comes alive in the Museum's galleries and through its exhibitions and events, revealing both new ideas and unexpected connections across time and across cultures." },
  { id: "/about/history", title: "History and Fact Sheet", description: "Tracing our roots from 1870 to becoming a world-renowned cultural institution.", content: "Tracing our roots from 1870, the museum was founded by a group of American citizens—businessmen and financiers as well as leading artists and thinkers of the day—who wanted to open a museum to bring art and art education to the American people. It has since grown into one of the largest and most prestigious art museums in the world, holding over two million works in its permanent collection." },
  { id: "/visit", title: "Plan Your Visit", description: "Hours, admission, directions, and guidelines for visiting The Met Fifth Avenue and The Met Cloisters.", content: "Plan your visit to The Met Fifth Avenue or The Met Cloisters. We offer general admission tickets, special exhibitions access, and guided tours. The museum is open seven days a week, though hours vary. We have extensive guidelines covering photography, sketching, luggage, and dining options to ensure a safe and pleasant environment for everyone." },
  { id: "/exhibitions", title: "Exhibitions", description: "Explore current and historical exhibitions at The Metropolitan Museum of Art.", content: "Explore current, upcoming, and past exhibitions. The Met rotates dozens of temporary exhibitions each year, highlighting specific artists, eras, cultures, and mediums. Ranging from monumental retrospectives to intimate showcases of rare works, exhibitions offer visitors fresh perspectives on the global history of art." },
  { id: "/collection-areas", title: "Collection Areas", description: "Discover the 19 curatorial departments that care for and study our diverse collections.", content: "The Met's collection is divided among 19 curatorial departments, each managed by a specialized staff of curators, conservators, and scholars. These include African Art, American Wing, Ancient Near Eastern Art, Arms and Armor, Asian Art, The Costume Institute, Drawings and Prints, Egyptian Art, European Paintings, European Sculpture and Decorative Arts, Greek and Roman Art, Islamic Art, Medieval Art, Modern and Contemporary Art, Musical Instruments, and Photographs." },
  { id: "/careers", title: "Careers", description: "Join our dedicated team. Explore opportunities for employment, internships, and volunteering.", content: "A career at The Met means joining a vibrant, dedicated community of professionals who care deeply about our mission. We offer full-time and part-time employment opportunities, comprehensive internships for students and graduates, prestigious fellowships for scholars, and volunteer roles spanning from visitor experience to guided tours." },
  { id: "/press", title: "Press Room", description: "Official press releases, high-resolution images, and media resources for journalists.", content: "The Press Room serves journalists and media professionals seeking official news, press releases, media kits, and high-resolution image libraries regarding The Met's exhibitions, acquisitions, administrative updates, and special events. Access filming and photography policies here." },
  { id: "/research", title: "Research & Articles", description: "Dive into The Met's Timeline of Art History and comprehensive research papers.", content: "Research is central to The Met's mission. Our scholars produce the Heilbrunn Timeline of Art History, numerous exhibition catalogues, the Metropolitan Museum Journal, and Bulletin. Here you can find long-form articles, essays, scientific conservation reports, and digital publications." },
  { id: "/accessibility", title: "Accessibility", description: "Information about accessible entrances, tours, and services for visitors with disabilities.", content: "The Met is committed to ensuring that all visitors have access to its facilities, exhibitions, and programs. We provide accessible entrances, wheelchairs, assistive listening devices, ASL interpretation, verbal imaging tours, large-print labels, and sensory-friendly resources. Contact our Access Team for specific accommodations." },
  { id: "/conservation", title: "Conservation", description: "Learn how we preserve, study, and care for works of art across our collections.", content: "The Met's conservation departments are responsible for the physical care, preservation, and technical study of the collection. Our conservators and scientists specialize in objects, paintings, paper, photographs, and textiles, employing advanced imaging, chemical analysis, and historical techniques to safeguard art for future generations." }
];

function getHighlightedSnippet(text: string, query: string): string {
  if (!query) return text.slice(0, 150) + "...";
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) return text.slice(0, 150) + "...";
  
  const start = Math.max(0, idx - 50);
  const end = Math.min(text.length, idx + query.length + 80);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";
  
  const regex = new RegExp(`(${query})`, "gi");
  return snippet.replace(regex, '<span class="bg-yellow-200 font-bold">$1</span>');
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const lowerQuery = query.toLowerCase();

  const [artifacts, setArtifacts] = useState<MetObject[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [visibleCount, setVisibleCount] = useState(20);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
  useEffect(() => {
    setVisibleCount(20);
  }, [query, activeCategory]);

  const allPages = query
    ? sitePages.filter(
        (p) => p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery) || p.content.toLowerCase().includes(lowerQuery)
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
      )
    : [];

  const filteredPages = (activeCategory === "all" || activeCategory === "pages") ? allPages : [];
  const filteredExhibitions = (activeCategory === "all" || activeCategory === "exhibitions") ? allExhibitions : [];
  const filteredArtists = (activeCategory === "all" || activeCategory === "artists") ? allArtists : [];
  const filteredArtifacts = (activeCategory === "all" || activeCategory === "artifacts") ? allArtifacts : [];

  const mixedResults: any[] = [];
  if (activeCategory === "all") {
    mixedResults.push(...filteredPages.map(p => ({ type: 'page', data: p })));
    mixedResults.push(...filteredExhibitions.map(e => ({ type: 'exhibition', data: e })));
    mixedResults.push(...filteredArtists.map(a => ({ type: 'artist', data: a })));
    mixedResults.push(...filteredArtifacts.map(a => ({ type: 'artifact', data: a })));
  } else if (activeCategory === "pages") {
    mixedResults.push(...filteredPages.map(p => ({ type: 'page', data: p })));
  } else if (activeCategory === "exhibitions") {
    mixedResults.push(...filteredExhibitions.map(e => ({ type: 'exhibition', data: e })));
  } else if (activeCategory === "artists") {
    mixedResults.push(...filteredArtists.map(a => ({ type: 'artist', data: a })));
  } else if (activeCategory === "artifacts") {
    mixedResults.push(...filteredArtifacts.map(a => ({ type: 'artifact', data: a })));
  }

  const visibleResults = mixedResults.slice(0, visibleCount);

  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < mixedResults.length) {
        setVisibleCount((prev) => prev + 20);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, mixedResults.length, visibleCount]);

  const hasResults = mixedResults.length > 0;
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
                activeCategory === "artifacts" ? allArtifacts.length : activeCategory === "artists" ? allArtists.length : activeCategory === "pages" ? allPages.length : allExhibitions.length
              })
            </h2>
          ) : (
             <h2 className="mb-6 font-display text-3xl font-semibold text-black">
               All Results ({totalCount})
             </h2>
          )}
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleResults.map((item, idx) => {
              if (item.type === 'page') {
                return (
                  <div key={`page-${item.data.id}-${idx}`} className="flex flex-col gap-2">
                    <Link href={item.data.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                      <h3 className="font-display text-2xl font-semibold text-black group-hover:underline decoration-2 underline-offset-4">{item.data.title}</h3>
                      <p 
                        className="mt-3 text-sm text-black/75 line-clamp-3" 
                        dangerouslySetInnerHTML={{ __html: getHighlightedSnippet(item.data.content, query) }}
                      />
                    </Link>
                    {activeCategory === "all" && <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Page</div>}
                  </div>
                );
              } else if (item.type === 'exhibition') {
                return (
                  <div key={`exh-${item.data.id}-${idx}`} className="flex flex-col gap-2">
                    <ExhibitionCard ex={item.data} />
                    {activeCategory === "all" && <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Exhibition</div>}
                  </div>
                );
              } else if (item.type === 'artist') {
                return (
                  <div key={`art-${item.data.id}-${idx}`} className="flex flex-col gap-2">
                    <ArtistCard artist={item.data} />
                    {activeCategory === "all" && <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Artist</div>}
                  </div>
                );
              } else if (item.type === 'artifact') {
                return (
                  <div key={`obj-${item.data.objectID}-${idx}`} className="flex flex-col gap-2 h-full">
                    <div className="flex-1">
                      <ArtifactCard 
                        artifact={{
                          id: String(item.data.objectID),
                          title: item.data.title || "Untitled",
                          era: item.data.objectDate || "Unknown Date",
                          location: item.data.department || "The Met",
                          description: item.data.medium || "",
                          imageSourceId: String(item.data.objectID),
                          image: item.data.primaryImageSmall || item.data.primaryImage || ""
                        }} 
                      />
                    </div>
                    {activeCategory === "all" && <div className="px-2 text-xs font-bold uppercase tracking-widest text-black/40">Artifact</div>}
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          {visibleCount < mixedResults.length && (
            <div ref={loadMoreRef} className="py-12 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black"></div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
