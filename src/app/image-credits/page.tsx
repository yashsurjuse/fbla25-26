import { ogImageSources } from "@/data/image-sources";
import { storeImageSources } from "@/data/store-products";

const localAssets = [
  {
    id: "met-hero",
    title: "The Met Fifth Avenue - Exterior Hero Photo",
    url: "https://www.metmuseum.org/visit/plan-your-visit/met-fifth-avenue",
  },
  {
    id: "met-logo-fill",
    title: "The Met Logo (Filled / Red)",
    url: "https://www.metmuseum.org/",
  },
  {
    id: "met-logo-transparent",
    title: "The Met Logo (Transparent)",
    url: "https://www.metmuseum.org/",
  },
];

export default function ImageCreditsPage() {
  const artworkSources = ogImageSources.filter((source) => source.credit.toLowerCase().includes("metropolitan"));
  const portraitSources = ogImageSources.filter((source) => source.credit.toLowerCase().includes("wikimedia"));

  return (
    <div className="bg-[#f4f4f4] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl border border-black/15 bg-white p-6 sm:p-8">
        <h1 className="mt-2 font-display text-5xl font-semibold text-black sm:text-6xl">Image Credits</h1>

        <section className="mt-6">
          <h2 className="border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
            Artwork Images
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-black/80">
            {artworkSources.map((source) => (
              <li key={source.id} className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
                <p className="font-semibold text-black">{source.title}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-black/70 underline decoration-black/35 underline-offset-2"
                >
                  {source.url}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
            Store Product Photography
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-black/80">
            {storeImageSources.map((source) => (
              <li key={source.id} className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
                <p className="font-semibold text-black">{source.title}</p>
                <a
                  href={source.pageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-black/70 underline decoration-black/35 underline-offset-2"
                >
                  {source.pageUrl}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
            Wikimedia Commons (Public Domain)
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-black/80">
            {portraitSources.map((source) => (
              <li key={source.id} className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
                <p className="font-semibold text-black">{source.title}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-black/70 underline decoration-black/35 underline-offset-2"
                >
                  {source.url}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
            Live Listing Data
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-black/80">
            <li className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
              <p className="font-semibold text-black">Exhibitions, Artists, Artifacts pages</p>
              <a
                href="https://collectionapi.metmuseum.org/public/collection/v1"
                target="_blank"
                rel="noreferrer"
                className="break-all text-black/70 underline decoration-black/35 underline-offset-2"
              >
                https://collectionapi.metmuseum.org/public/collection/v1
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="border-b border-black/10 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
            Museum Branding &amp; Local Assets
          </h2>
          <ul className="mt-3 space-y-3 text-sm text-black/80">
            {localAssets.map((asset) => (
              <li key={asset.id} className="border-b border-black/10 pb-3 last:border-0 last:pb-0">
                <p className="font-semibold text-black">{asset.title}</p>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-black/70 underline decoration-black/35 underline-offset-2"
                >
                  {asset.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
