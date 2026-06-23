"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ArtifactModalView from "./ArtifactModalView";
import ArtistModalView from "./ArtistModalView";

function ModalManager() {
  const searchParams = useSearchParams();
  const artifactId = searchParams.get("artifactId");
  const artistName = searchParams.get("artistName");

  // We can render both if both are in the URL, allowing CSS z-index to handle stacking,
  // or we render the one that was most recently added. But actually, React re-renders, 
  // and having both means the topmost one is the active one.
  // Modals use Fixed positioning, so rendering both naturally stacks them.

  return (
    <>
      {artistName && <ArtistModalView artistName={artistName} />}
      {artifactId && <ArtifactModalView artifactId={parseInt(artifactId, 10)} />}
    </>
  );
}

export default function GlobalModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ModalManager />
      </Suspense>
    </>
  );
}
