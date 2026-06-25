"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ArtifactModalView from "./ArtifactModalView";
import ArtistModalView from "./ArtistModalView";
import OrderSuccessModal from "./OrderSuccessModal";

function ModalManager() {
  const searchParams = useSearchParams();
  const artifactId = searchParams.get("artifactId");
  const artistName = searchParams.get("artistName");
  const orderSuccess = searchParams.get("orderSuccess");

  // we can render both if both are in the URL allowing CSS z index to handle stacking

  return (
    <>
      {artistName && <ArtistModalView artistName={artistName} />}
      {artifactId && <ArtifactModalView artifactId={parseInt(artifactId, 10)} />}
      {orderSuccess && <OrderSuccessModal orderId={orderSuccess} />}
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
