"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Modal from "./Modal";
import { fetchMetObject, MetObject } from "@/lib/met-api";

export default function ArtifactModalView({ artifactId }: { artifactId: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const [artifact, setArtifact] = useState<MetObject | null>(null);

  useEffect(() => {
    fetchMetObject(artifactId).then(setArtifact);
  }, [artifactId]);

  if (!artifact) return null;

  return (
    <Modal onClose={() => router.push(pathname, { scroll: false })}>
      <div className="flex max-h-[85vh] flex-col overflow-y-auto p-8">
        <button 
          onClick={() => router.push(pathname, { scroll: false })}
          className="mb-4 self-start text-sm font-semibold text-black/60 hover:text-black flex items-center gap-1"
        >
          &larr; Back
        </button>
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          <div className="relative aspect-square w-full max-w-[320px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-black/5">
            {artifact.primaryImageSmall || artifact.primaryImage ? (
              <Image
                src={artifact.primaryImageSmall || artifact.primaryImage}
                alt={artifact.title || "Artwork"}
                fill
                className="object-contain object-center"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-black/40">No Image Available</div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-4xl font-bold text-black leading-tight mb-2">{artifact.title || "Untitled"}</h2>
            <div className="text-black/60 font-semibold uppercase tracking-widest text-xs mb-6">
              {artifact.objectDate || "Date Unknown"}
            </div>
            
            <div className="space-y-4 text-sm md:text-base text-black/80">
              <p>
                <span className="font-semibold text-black">Artist: </span> 
                {artifact.artistDisplayName ? (
                    artifact.artistDisplayName.split(' | ').map((aName, idx, arr) => (
                      <span key={idx}>
                        <button 
                          onClick={() => router.push(`?artistName=${encodeURIComponent(aName)}`, { scroll: false })}
                          className="underline hover:text-blue-600 transition-colors"
                        >
                          {aName}
                        </button>
                        {idx < arr.length - 1 && " | "}
                      </span>
                    ))
                ) : "Unknown"}
              </p>
              <p><span className="font-semibold text-black">Department:</span> {artifact.department}</p>
              {artifact.medium && <p><span className="font-semibold text-black">Medium:</span> {artifact.medium}</p>}
              {artifact.culture && <p><span className="font-semibold text-black">Culture:</span> {artifact.culture}</p>}
            </div>
            
            {artifact.tags && artifact.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-black/10">
                <h3 className="font-semibold text-black mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {artifact.tags.map((tag: any, idx) => (
                    <span key={idx} className="bg-white/10 border border-black/10 px-3 py-1 rounded-full text-xs text-black/80">
                      {typeof tag === 'string' ? tag : tag.term}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
