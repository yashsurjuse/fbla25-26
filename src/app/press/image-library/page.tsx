"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const pressCollections = [
  { id: 1, title: "European Paintings Gallery", cover: "https://images.metmuseum.org/CRDImages/ep/original/DP146455.jpg" },
  { id: 2, title: "Asian Art Collection", cover: "https://images.metmuseum.org/CRDImages/as/original/DP251139.jpg" },
  { id: 3, title: "Egyptian Art", cover: "https://images.metmuseum.org/CRDImages/gr/original/DT276.jpg" },
  { id: 4, title: "Greek and Roman Art", cover: "https://images.metmuseum.org/CRDImages/gr/original/DP109258.jpg" },
  { id: 5, title: "Islamic Art Collection", cover: "https://images.metmuseum.org/CRDImages/is/original/DP214317.jpg" }
];

export default function ImageLibraryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string>("");
  const [imagesMap, setImagesMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch("/data/image_library_split.json")
      .then(res => res.json())
      .then(data => setImagesMap(data))
      .catch(err => console.error("Failed to load image library", err));
  }, []);

  const openGallery = (title: string) => {
    setActiveCollection(title);
    setModalOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeGallery = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Link href="/press" className="text-sm font-semibold text-black/50 hover:text-black mb-6 inline-block">
            &larr; Back to Press Room
          </Link>
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-6xl">
            High-Resolution Image Library
          </h1>
          <p className="mt-4 text-lg text-black/75">
            Official press images available for editorial use by accredited media members.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressCollections.map((col) => (
            <div key={col.id} className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden flex flex-col group">
              <div className="relative h-64 w-full bg-black/5">
                <Image src={col.cover} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col items-start">
                <h2 className="font-display text-xl font-semibold mb-4 text-black">{col.title}</h2>
                <button 
                  onClick={() => openGallery(col.title)}
                  className="mt-auto px-6 py-2 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors text-sm"
                >
                  View High-Res
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#ece7de] p-8 sm:p-12 rounded-3xl text-center max-w-3xl mx-auto border border-black/5">
          <h3 className="font-display text-3xl font-semibold mb-4 text-black">Need a specific artwork?</h3>
          <p className="text-black/80 mb-6 text-lg">
            For specific collection objects, please use our Open Access initiative or download the complete Open Access CSV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/metmuseum/openaccess/raw/master/MetObjects.csv" className="inline-block px-8 py-4 bg-white border border-black !text-black font-semibold rounded-full hover:bg-black hover:!text-white transition-colors">
              Download Open Access CSV
            </a>
            <a href="mailto:image.requests@metmuseum.org" className="inline-block px-8 py-4 bg-black border border-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors">
              Email Image Requests
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center justify-between p-4 border-b border-black/10">
            <h2 className="text-xl font-display font-semibold">{activeCollection} - High-Res Library</h2>
            <button onClick={closeGallery} className="p-2 bg-black/5 rounded-full hover:bg-black/10">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(imagesMap[activeCollection] || []).map((src, idx) => (
                <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl bg-black/5">
                  <img src={src.replace('/original/', '/web-large/')} alt="Gallery image" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <a href={src} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
