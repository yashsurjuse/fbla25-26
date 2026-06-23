import Image from "next/image";
import Link from "next/link";
import type { Artifact } from "@/data/artifacts";

type CirculatingMarqueeProps = {
  items: Artifact[];
};

export default function CirculatingMarquee({ items }: CirculatingMarqueeProps) {
  if (items.length === 0) {
    return null;
  }

  const loopItems = [...items, ...items];

  return (
    <div className="circulating-marquee relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f3f3f3] to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f3f3f3] to-transparent sm:w-14"
        aria-hidden
      />

      <div className="circulating-track flex w-max gap-5 py-1">
        {loopItems.map((artifact, index) => {
          return (
            <article key={`${artifact.id}-${index}`} className="group/card w-[16.75rem] shrink-0 border border-black/15 bg-white p-3">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-black/5">
                <Image
                  src={artifact.image || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
                  alt={artifact.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-[1.03]"
                  sizes="268px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                  <Link
                    href={`?artifactId=${artifact.id}`}
                    scroll={false}
                    className="border border-white bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] !text-white visited:!text-white backdrop-blur-[1px] transition-colors duration-200 hover:bg-white hover:!text-black"
                  >
                    View
                  </Link>
                </div>
              </div>
              <h3 className="text-3xl font-semibold leading-tight text-black">{artifact.title}</h3>
              <p className="mt-1 text-base font-medium text-black/75">{artifact.era}</p>
              <p className="mt-1 text-sm text-black/65">{artifact.location}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
