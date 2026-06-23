"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Modal from "./Modal";
import { fetchMetObject, MetObject } from "@/lib/met-api";

type ArtistData = {
  name: string;
  bio: string | null;
  portrait_url: string | null;
  object_ids: number[];
};

export default function ArtistModalView({ artistName }: { artistName: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [artistArtifacts, setArtistArtifacts] = useState<MetObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/data/artists_master.json?v=${Date.now()}`);
        const allArtists: ArtistData[] = await res.json();
        
        const matched = allArtists.find(a => a.name === artistName);
        if (matched) {
            setArtist(matched);
            const objects = await Promise.all(matched.object_ids.map(id => fetchMetObject(id)));
            setArtistArtifacts(objects.filter((o): o is MetObject => o !== null));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [artistName]);

  if (!artist && !loading) return null;

  return (
    <Modal onClose={() => router.push(pathname, { scroll: false })}>
      <div className="flex max-h-[85vh] flex-col overflow-y-auto p-8">
        <button 
          onClick={() => router.push(pathname, { scroll: false })}
          className="mb-4 self-start text-sm font-semibold text-black/60 hover:text-black flex items-center gap-1"
        >
          &larr; Back
        </button>
        {loading ? (
            <div className="text-black/50">Loading artist profile...</div>
        ) : artist && (
            <>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="relative aspect-square w-full flex items-center justify-center max-w-[240px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-black/5">
                    {artist.portrait_url && !artist.portrait_url.includes("No_image_available.svg") ? (
                        <Image
                          src={artist.portrait_url}
                          alt={artist.name}
                          fill
                          className="object-cover object-top"
                        />
                    ) : (
                        <span className="font-display text-7xl font-bold text-black/10 uppercase">{artist.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-4xl font-bold text-black mb-4">{artist.name}</h2>
                    <p className="text-black/80 leading-relaxed text-sm md:text-base">{artist.bio}</p>
                  </div>
                </div>

                <div className="mt-10 border-t border-black/10 pt-8">
                  <h3 className="mb-6 font-display text-2xl font-semibold text-black">Featured Works</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {artistArtifacts.map((art) => (
                        <div 
                           key={art.objectID} 
                           onClick={() => router.push(`?artifactId=${art.objectID}`, { scroll: false })}
                           className="group cursor-pointer relative flex flex-col overflow-hidden rounded-lg bg-black/5 border border-black/10 hover:shadow-md transition-shadow"
                        >
                          <div className="relative aspect-square bg-black/40">
                            {art.primaryImageSmall ? (
                              <Image src={art.primaryImageSmall} alt={art.title || "Artwork"} fill className="object-cover transition-transform group-hover:scale-105" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-black/30">No Image</div>
                            )}
                          </div>
                          <div className="p-3">
                            <div className="truncate text-sm font-semibold text-black">{art.title || "Untitled"}</div>
                            <div className="truncate text-xs text-black/60">{art.objectDate || "Unknown Date"}</div>
                          </div>
                        </div>
                      ))}
                      {artistArtifacts.length === 0 && <div className="col-span-3 text-black/50">No pieces found in the dataset.</div>}
                  </div>
                </div>
            </>
        )}
      </div>
    </Modal>
  );
}
