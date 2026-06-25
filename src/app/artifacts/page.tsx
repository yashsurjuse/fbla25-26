"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FakePagination from "@/components/FakePagination";
import { fetchMetObjectIds, fetchMetObject, fetchDepartments, MetObject } from "@/lib/met-api";

import CustomDropdown from "@/components/CustomDropdown";

const PAGE_SIZE = 27;

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative">
            <div className="col-span-1 sm:col-span-2 flex gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`rounded-full border border-black/30 bg-white/50 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-black outline-none placeholder:text-black/40 focus:border-black/50 focus:bg-white transition-all duration-500 ease-out ${isSearchFocused ? 'w-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]' : 'w-full sm:w-1/2 shadow-[0_4px_16px_rgba(0,0,0,0.02)]'}`}
              />
              
              <div className={`transition-all duration-500 ease-out overflow-hidden ${isSearchFocused ? 'w-0 opacity-0' : 'w-full sm:w-1/2 opacity-100'}`}>
                <div className="w-[180px] sm:w-[100%] min-w-full">
                  <CustomDropdown
                    value={selectedDept}
                    onChange={(val) => { setSelectedDept(val); setSelectedArtist(""); }}
                    placeholder="All Departments"
                    options={departments.map(d => ({ value: d.departmentId.toString(), label: d.displayName }))}
                  />
                </div>
              </div>
            </div>
            
            <CustomDropdown
              value={selectedMedium}
              onChange={(val) => { setSelectedMedium(val); setSelectedArtist(""); }}
              placeholder="All Mediums"
              options={[
                { value: "Oil|Canvas|Watercolor", label: "Paintings" },
                { value: "Bronze|Marble|Stone|Wood", label: "Sculpture" },
                { value: "Ceramic|Porcelain", label: "Ceramics" },
                { value: "Silk|Cotton|Wool|Linen|Textile", label: "Textiles" },
                { value: "Photograph|Gelatin|Silver|Paper", label: "Photographs" },
                { value: "Steel|Iron|Brass", label: "Armor" },
              ]}
            />
            
            <CustomDropdown
              value={selectedCulture}
              onChange={(val) => { setSelectedCulture(val); setSelectedArtist(""); }}
              placeholder="All Cultures"
              options={[
                { value: "Roman", label: "Roman" },
                { value: "Greek", label: "Greek" },
                { value: "Egyptian", label: "Egyptian" },
                { value: "Japanese", label: "Japanese" },
                { value: "Chinese", label: "Chinese" },
                { value: "French", label: "French" },
                { value: "Italian", label: "Italian" },
                { value: "American", label: "American" },
                { value: "Indian", label: "Indian" },
                { value: "British", label: "British" },
                { value: "German", label: "German" },
                { value: "Dutch", label: "Dutch" },
                { value: "Spanish", label: "Spanish" },
              ]}
            />
            
            <CustomDropdown
              value={selectedGeo}
              onChange={(val) => { setSelectedGeo(val); setSelectedArtist(""); }}
              placeholder="All Regions"
              options={[
                { value: "Egypt", label: "Egypt" },
                { value: "France", label: "France" },
                { value: "Italy", label: "Italy" },
                { value: "Japan", label: "Japan" },
                { value: "China", label: "China" },
                { value: "United States", label: "United States" },
                { value: "India", label: "India" },
                { value: "United Kingdom", label: "United Kingdom" },
                { value: "Germany", label: "Germany" },
                { value: "Netherlands", label: "Netherlands" },
                { value: "Spain", label: "Spain" },
                { value: "Greece", label: "Greece" },
              ]}
            />
            
            <CustomDropdown
              value={selectedArtist}
              onChange={(val) => {
                setSelectedArtist(val);
                if (val) {
                  setSearchQuery("");
                  setSelectedDept("");
                  setSelectedMedium("");
                  setSelectedCulture("");
                  setSelectedGeo("");
                }
              }}
              placeholder="All Artists"
              options={artistsData.slice(0, 500).map(a => ({ value: a.name, label: a.name }))}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {loading ? (
          <div className="glass-card rounded-[2.5rem] p-12 text-center text-black/50 font-medium">
            Loading artifacts...
          </div>
        ) : pageObjects.length === 0 ? (
          <div className="glass-card rounded-[2.5rem] p-12 text-center text-black/50 font-medium">
            No artifacts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger-fade">
          {pageObjects.map((obj) => {
            const image = obj.primaryImageSmall || obj.primaryImage;
            return (
            <article 
              key={obj.objectID} 
              onClick={() => router.push(`?artifactId=${obj.objectID}`, { scroll: false })}
              className="group cursor-pointer flex flex-col glass-card rounded-[2.5rem] overflow-hidden h-full"
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
              <div className="space-y-4 p-6 md:p-8 flex-1 flex flex-col">
                <h2 className="font-display text-3xl font-bold leading-tight text-black group-hover:text-[color:var(--accent)] transition-colors">{obj.title || "Untitled"}</h2>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">{obj.objectDate || "Unknown Date"}</div>
                <p className="text-sm font-medium text-black/60 leading-relaxed">{obj.department}{obj.culture ? ` — ${obj.culture}` : ""}</p>
                <div className="pt-4 border-t border-black/5 mt-auto text-sm leading-relaxed text-black/60">
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
