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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedCulture, setSelectedCulture] = useState("");
  const [selectedGeo, setSelectedGeo] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");

  const [departments, setDepartments] = useState<{ departmentId: number; displayName: string }[]>([]);
  const [artistsData, setArtistsData] = useState<ArtistData[]>([]);

  useEffect(() => {
    fetchDepartments().then(setDepartments);
    fetch("/data/artists_master.json")
      .then(res => res.json())
      .then((data: ArtistData[]) => setArtistsData(data))
      .catch(err => console.warn("Could not load artists data", err));
  }, []);

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
        medium: selectedMedium || undefined,
        culture: selectedCulture || undefined,
        geo: selectedGeo || undefined
      });
      if (active) {
        setObjectIds(ids);
        setCurrentPage(1);
      }
    }

    loadIds();
    return () => { active = false; };
  }, [searchQuery, selectedDept, selectedMedium, selectedCulture, selectedGeo, selectedArtist, artistsData]);

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
    <div className="bg-[color:var(--paper)] pb-20">
      <section className="border-b border-black/5 bg-[color:var(--paper)] px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Across Time</p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] text-black sm:text-7xl lg:text-8xl">Artifacts</h1>
          <p className="mt-6 max-w-3xl text-lg text-black/60 leading-relaxed">
            Step inside The Met&apos;s encyclopedic collection, spanning pharaonic temples, Renaissance armor, West African
            bronzes, and much more.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
              value={selectedCulture}
              onChange={(e) => { setSelectedCulture(e.target.value); setSelectedArtist(""); }}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none focus:border-black/30 transition-colors"
            >
              <option value="">All Cultures</option>
              <option value="Roman">Roman</option>
              <option value="Greek">Greek</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
              <option value="French">French</option>
              <option value="Italian">Italian</option>
              <option value="American">American</option>
              <option value="Indian">Indian</option>
              <option value="British">British</option>
              <option value="German">German</option>
              <option value="Dutch">Dutch</option>
              <option value="Spanish">Spanish</option>
            </select>
            <select
              value={selectedGeo}
              onChange={(e) => { setSelectedGeo(e.target.value); setSelectedArtist(""); }}
              className="w-full border border-black/15 bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-black/85 outline-none focus:border-black/30 transition-colors"
            >
              <option value="">All Regions</option>
              <option value="Egypt">Egypt</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="United States">United States</option>
              <option value="India">India</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Spain">Spain</option>
              <option value="Greece">Greece</option>
            </select>
            <select
              value={selectedArtist}
              onChange={(e) => {
                setSelectedArtist(e.target.value);
                if (e.target.value) {
                  setSearchQuery("");
                  setSelectedDept("");
                  setSelectedMedium("");
                  setSelectedCulture("");
                  setSelectedGeo("");
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

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="glass-card rounded-3xl p-12 text-center text-black/50 font-medium">
            Loading artifacts...
          </div>
        ) : pageObjects.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-black/50 font-medium">
            No artifacts found.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-stagger-fade">
          {pageObjects.map((obj) => {
            const image = obj.primaryImageSmall || obj.primaryImage;
            return (
            <article 
              key={obj.objectID} 
              onClick={() => router.push(`?artifactId=${obj.objectID}`, { scroll: false })}
              className="group cursor-pointer break-inside-avoid flex flex-col glass-card rounded-3xl overflow-hidden"
            >
              <div className="relative w-full overflow-hidden bg-black/5" style={{ aspectRatio: image ? 'auto' : '4/3' }}>
                {image ? (
                  <Image
                    src={image}
                    alt={obj.title || "Artwork"}
                    width={800}
                    height={600}
                    className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-black/40">Image Unavailable</span>
                )}
              </div>
              <div className="space-y-4 p-6 md:p-8">
                <h2 className="font-display text-3xl font-bold leading-tight text-black group-hover:text-[color:var(--accent)] transition-colors">{obj.title || "Untitled"}</h2>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">{obj.objectDate || "Unknown Date"}</div>
                <p className="text-sm font-medium text-black/60 leading-relaxed">{obj.department}{obj.culture ? ` — ${obj.culture}` : ""}</p>
                <div className="pt-4 border-t border-black/5 mt-4 text-sm leading-relaxed text-black/60">
                  <p><span className="font-bold text-black/80">Artist:</span> {obj.artistDisplayName || "Unknown"}</p>
                  {obj.medium && <p><span className="font-bold text-black/80">Medium:</span> {obj.medium}</p>}
                </div>
              </div>
            </article>
          );})}
          </div>
        )}
      </section>

      {!loading && totalPages > 1 && (
        <FakePagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} label="Artifacts" />
      )}
    </div>
  );
}
