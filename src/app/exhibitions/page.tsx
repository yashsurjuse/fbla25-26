import Image from "next/image";
import Link from "next/link";
import FakePagination from "@/components/FakePagination";
import { exhibitions } from "@/data/exhibitions";
import { getImageSourceById } from "@/data/image-sources";
import { getExhibitionStatus, sortByStartDesc } from "@/lib/content-utils";

const orderedExhibitions = sortByStartDesc(exhibitions);

const statusStyles: Record<ReturnType<typeof getExhibitionStatus>, string> = {
  Ongoing: "border-emerald-700 bg-emerald-900/10 text-emerald-900",
  Upcoming: "border-blue-700 bg-blue-900/10 text-blue-900",
  Past: "border-black/40 bg-black/5 text-black/80",
};

export default function ExhibitionsPage() {
  return (
    <div className="bg-[#f3f2f0] pb-16">
      <section className="border-b border-black/15 bg-[#e7e4df] px-4 py-14 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-black sm:text-7xl">Exhibitions</h1>
          <p className="mt-4 max-w-3xl text-lg text-black/75">
            Explore current and historical exhibitions at The Metropolitan Museum of Art. The timeline below preserves the
            original exhibition writing from your previous site.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {orderedExhibitions.map((exhibition) => {
          const status = getExhibitionStatus(exhibition.start, exhibition.end);
          const image = getImageSourceById(exhibition.imageSourceId);

          return (
            <article key={exhibition.id} className="overflow-hidden border border-black/15 bg-white shadow-sm">
              <div className="relative aspect-[16/10] border-b border-black/10">
                <Image
                  src={image.url}
                  alt={exhibition.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-black/60">{exhibition.dateRange}</p>
                  <span className={`inline-flex border px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${statusStyles[status]}`}>
                    {status}
                  </span>
                </div>

                <h2 className="font-display text-4xl font-semibold leading-tight text-black">{exhibition.title}</h2>
                <p className="text-base text-black/75">{exhibition.description}</p>

                <Link href="/visit" className="inline-flex border-b border-black text-sm font-semibold uppercase tracking-[0.1em]">
                  Plan your museum day
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <FakePagination totalPages={58} label="Exhibitions" />
    </div>
  );
}
