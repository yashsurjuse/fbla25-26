'use client';

import Link from "next/link";
import ArtifactCard from "@/components/ArtifactCard";
import { artifacts } from "@/data/artifacts";

export default function ArtifactsPreview() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {artifacts.slice(0, 2).map((artifact, index) => (
          <ArtifactCard key={artifact.id} artifact={artifact} index={index} />
        ))}
      </div>
      <div className="flex justify-end">
        <Link
          href="/artifacts"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white/85 backdrop-blur transition hover:border-white/35 hover:text-white"
        >
          See all artifacts
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
