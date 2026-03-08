import { ogImageSources } from "@/data/image-sources";

export default function ImageCreditsPage() {
  return (
    <div className="bg-[#f4f4f4] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl border border-black/15 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">Documentation</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-black sm:text-6xl">Image Credits</h1>
        <p className="mt-4 text-base text-black/75">
          This remake keeps the original image source references from the previous website. All listed links point to The
          Metropolitan Museum of Art Open Access image endpoints.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-black/80">
          {ogImageSources.map((source) => (
            <li key={source.id} className="border-b border-black/10 pb-3">
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
      </div>
    </div>
  );
}
