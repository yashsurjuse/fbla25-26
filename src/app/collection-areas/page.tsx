"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import departmentsData from "@/data/departments.json";
import ArtifactCard from "@/components/ArtifactCard";
import { MetObject } from "@/lib/met-api";

export default function CollectionAreasPage() {
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const [artifacts, setArtifacts] = useState<MetObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/artifacts_master.json")
      .then(r => r.json())
      .then(data => {
        setArtifacts(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const deptTitle = params.get("dept");
    if (deptTitle) {
      const found = departmentsData.find(d => d.title === deptTitle || d.title.includes(deptTitle));
      if (found) {
        setSelectedDept(found);
      }
    }
  }, []);

  const getDeptArtifacts = (title: string) => {
    const nameMap: Record<string, string | string[]> = {
      "African Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
      "Ancient American Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
      "Oceanic Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
      "Medieval Art and The Cloisters": ["Medieval Art", "The Cloisters"],
      "Ancient West Asian Art": ["Ancient West Asian Art", "Ancient Near Eastern Art"],
      "The Robert Lehman Collection": "Robert Lehman Collection",
      "The Costume Institute": "Costume Institute",
    };
    
    let searchDept = nameMap[title] || title;
    return artifacts.filter(item => {
      if (Array.isArray(searchDept)) {
        return searchDept.includes(item.department);
      }
      return item.department === searchDept;
    }).slice(0, 16); // limit to 16 for performance
  };

  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Collection Areas
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-black/80 leading-relaxed">
            The Met's collection is divided among 19 curatorial departments. Each department comprises an exceptional array of art and artifacts, studied and cared for by dedicated curators and scholars. Explore our rich diversity of art spanning over 5,000 years.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departmentsData.map((dept) => (
            <div 
              key={dept.id} 
              onClick={() => setSelectedDept(dept)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                <Image 
                  src={dept.image} 
                  alt={dept.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-semibold text-black mb-3">
                  {dept.title}
                </h3>
                <p className="text-black/70 text-sm line-clamp-3 mb-6 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto text-black font-semibold text-sm group-hover:underline group-hover:text-[#e4002b] transition-colors">
                  Explore Department &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedDept && (
        <Modal onClose={() => setSelectedDept(null)}>
          <div className="flex max-h-[85vh] flex-col overflow-y-auto p-0 sm:p-0">
            <div className="relative h-64 sm:h-80 w-full shrink-0">
              <Image 
                src={selectedDept.image} 
                alt={selectedDept.title} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-black/30" />
              <button 
                onClick={() => setSelectedDept(null)}
                className="absolute top-4 left-4 text-white hover:text-white/80 font-bold drop-shadow-md flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                &larr; Back
              </button>
            </div>
            
            <div className="p-8 sm:p-12 bg-white">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                {selectedDept.title}
              </h2>
              
              <div className="prose prose-lg prose-black max-w-none mb-12">
                <p className="text-xl text-black/80 font-medium leading-relaxed mb-8">
                  {selectedDept.description}
                </p>
              </div>

              <h3 className="text-2xl font-display font-semibold mt-10 mb-8 border-b border-black/10 pb-4">
                Featured Highlights
              </h3>
              
              {loading ? (
                <div className="py-12 text-center text-black/50">Loading artifacts...</div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {getDeptArtifacts(selectedDept.title).map((art) => (
                      <Link 
                         key={art.objectID} 
                         href={`?artifactId=${art.objectID}`} scroll={false}
                         className="group cursor-pointer relative flex flex-col overflow-hidden rounded-lg bg-black/5 border border-black/10 hover:shadow-md transition-shadow"
                      >
                        <div className="relative aspect-square bg-black/40">
                          {art.primaryImageSmall || art.primaryImage ? (
                            <Image src={art.primaryImageSmall || art.primaryImage} alt={art.title || "Artwork"} fill className="object-cover transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-black/30">No Image</div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="truncate text-sm font-semibold text-black">{art.title || "Untitled"}</div>
                          <div className="truncate text-xs text-black/60">{art.objectDate || "Unknown Date"}</div>
                        </div>
                      </Link>
                  ))}
                </div>
              )}

              <div className="mt-16 flex justify-center">
                <button 
                   onClick={() => setSelectedDept(null)}
                   className="bg-black text-white px-8 py-4 font-semibold hover:bg-black/80 transition-colors rounded-full"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
