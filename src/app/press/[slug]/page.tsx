import { notFound } from "next/navigation";
import Link from "next/link";
import pressReleases from "@/data/press_releases.json";

export async function generateStaticParams() {
  return pressReleases.map((pr) => ({
    slug: pr.slug,
  }));
}

export default async function PressReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pr = pressReleases.find((p) => p.slug === resolvedParams.slug);

  if (!pr) {
    notFound();
  }

  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <Link href="/press" className="text-sm font-semibold text-black/50 hover:text-black mb-6 inline-block">
            &larr; Back to Press Room
          </Link>
          <div className="text-sm font-semibold text-black/50 mb-4 uppercase tracking-widest">{pr.date}</div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-black sm:text-6xl leading-tight mb-8">
            {pr.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="prose prose-lg prose-black max-w-none bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5">
          {pr.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 text-black/80 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
          
          <div className="mt-12 pt-8 border-t border-black/10">
            <h3 className="font-display text-2xl font-semibold mb-4">Press Contact</h3>
            <p className="text-black/70">
              For more information or to request high-resolution images, please contact the Communications Department at <a href="mailto:communications@metmuseum.org" className="text-blue-700 hover:underline">communications@metmuseum.org</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
