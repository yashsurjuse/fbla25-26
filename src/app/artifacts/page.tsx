"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FakePagination from "@/components/FakePagination";
import { fetchMetObjectIds, fetchMetObject, fetchDepartments, MetObject } from "@/lib/met-api";

const PAGE_SIZE = 26;

type ArtistData = {
  name: string;
  bio: string | null;
  portrait_url: string | null;
  object_ids: number[];
};

export default function ArtifactsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [objectIds, setObjectIds] = useState<number[]>([]);
  const [pageObjects, setPageObjects] = useState<MetObject[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");

  const [departments, setDepartments] = useState<{ departmentId: number; displayName: string }[]>([]);
  const [artistsData, setArtistsData] = useState<ArtistData[]>([]);

  // Load departments and artists JSON
  useEffect(() => {
    fetchDepartments().then(setDepartments);
    fetch("/data/artists_master.json")
      .then(res => res.json())
      .then((data: ArtistData[]) => setArtistsData(data))
      .catch(err => console.warn("Could not load artists data", err));
  }, []);

  // Fetch IDs when filters change
  useEffect(() => {
    let active = true;
    setLoading(true);

    async function loadIds() {
      if (selectedArtist) {
        const ids = await fetchMetObjectIds({
          q: selectedArtist,
          artistOrCulture: true
        });
        if (active) {
           setObjectIds(ids);
           setCurrentPage(1);
        }
        return;
      }

      const ids = await fetchMetObjectIds({
        q: searchQuery || "*",
        departmentId: selectedDept || undefined,
        medium: selectedMedium || undefined
      });
      if (active) {
        setObjectIds(ids);
        setCurrentPage(1);
      }
    }

    loadIds();
    return () => { active = false; };
  }, [searchQuery, selectedDept, selectedMedium, selectedArtist, artistsData]);

  // Load objects for the current page
  useEffect(() => {
    let active = true;
    
    async function loadObjects() {
      setLoading(true);
      const start = (currentPage - 1) * PAGE_SIZE;
      const slice = objectIds.slice(start, start + PAGE_SIZE);
      
      const objects = await Promise.all(slice.map(id => fetchMetObject(id)));
      
      if (active) {
        setPageObjects(objects.filter((obj): obj is MetObject => obj !== null));
        setLoading(false);
      }
    }

    if (objectIds.length > 0) {
      loadObjects();
    } else {
      setPageObjects([]);
      setLoading(false);
    }
    return () => { active = false; };
  }, [currentPage, objectIds]);

  const totalPages = Math.max(1, Math.ceil(objectIds.length / PAGE_SIZE));
  const handlePageChange = (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page)));

  return (
    <div className="bg-[#f4f4f4] pb-16">
      <section className="border-b border-black/15 bg-[#e8e8e8] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">Across Time</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Artifacts</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Step inside The Met&apos;s encyclopedic collection, spanning pharaonic temples, Renaissance armor, West African
            bronzes, and much more.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none placeholder:text-black/40 focus:border-black/30 transition-colors"
            />
            <select
              value={selectedDept}
              onChange={(e) => { setSelectedDept(e.target.value); setSelectedArtist(""); }}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none focus:border-black/30 transition-colors"
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d.departmentId} value={d.departmentId}>{d.displayName}</option>
              ))}
            </select>
            <select
              value={selectedMedium}
              onChange={(e) => { setSelectedMedium(e.target.value); setSelectedArtist(""); }}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none focus:border-black/30 transition-colors"
            >
              <option value="">All Mediums</option>
              <option value="Oil|Canvas|Watercolor">Paintings</option>
              <option value="Bronze|Marble|Stone|Wood">Sculpture</option>
              <option value="Ceramic|Porcelain">Ceramics</option>
              <option value="Silk|Cotton|Wool|Linen|Textile">Textiles</option>
              <option value="Photograph|Gelatin|Silver|Paper">Photographs</option>
              <option value="Steel|Iron|Brass">Armor</option>
            </select>
            <select
              value={selectedArtist}
              onChange={(e) => {
                setSelectedArtist(e.target.value);
                if (e.target.value) {
                  setSearchQuery("");
                  setSelectedDept("");
                  setSelectedMedium("");
                }
              }}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none focus:border-black/30 transition-colors"
            >
              <option value="">All Artists</option>
              {artistsData.slice(0, 500).map((a, i) => (
                <option key={i} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {loading ? (
          <div className="border border-black/15 bg-white p-6 text-black/70 lg:col-span-2">
            Loading artifacts...
          </div>
        ) : pageObjects.length === 0 ? (
          <div className="border border-black/15 bg-white p-6 text-black/70 lg:col-span-2">
            No artifacts found.
          </div>
        ) : (
          pageObjects.map((obj) => {
            const image = obj.primaryImageSmall || obj.primaryImage;
            return (
            <article 
              key={obj.objectID} 
              onClick={() => router.push(`?artifactId=${obj.objectID}`, { scroll: false })}
              className="group cursor-pointer grid gap-0 border border-black/15 bg-white sm:grid-cols-[210px_1fr] transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative min-h-56 border-b border-black/10 sm:min-h-full sm:border-b-0 sm:border-r bg-[#e8e8e8] flex items-center justify-center p-4">
                {image ? (
                  <Image
                    src={image}
                    alt={obj.title || "Artwork"}
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                ) : (
                  <span className="text-center text-sm font-medium text-black/40">Image Unavailable<br/><span className="text-xs">(Copyright or digitization pending)</span></span>
                )}
              </div>
              <div className="space-y-2 p-5">
                <h2 className="font-display text-4xl font-semibold leading-tight text-black">{obj.title || "Untitled"}</h2>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-black/60">{obj.objectDate || "Unknown Date"}</p>
                <p className="text-sm font-semibold text-black/75">{obj.department}{obj.culture ? ` — ${obj.culture}` : ""}</p>
                <div className="pt-2 text-sm leading-6 text-black/75">
                  <p><span className="font-semibold text-black">Artist:</span> {obj.artistDisplayName || "Unknown"}</p>
                  {obj.medium && <p><span className="font-semibold text-black">Medium:</span> {obj.medium}</p>}
                </div>
              </div>
            </article>
          );})
        )}
      </section>

      {!loading && totalPages > 1 && (
        <FakePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} label="Artifacts" />
      )}
    </div>
  );
}
