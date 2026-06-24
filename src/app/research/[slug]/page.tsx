import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import articles from "@/data/articles.json";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const heroImage = article.images && article.images.length > 0 ? article.images[0] : null;

  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link 
          href="/research" 
          className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
        >
          ← Back to Research
        </Link>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-black/50">
            Timeline of Art History Essay
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight text-black sm:text-6xl md:text-7xl">
            {article.title}
          </h1>
        </header>

        {/* Hero Image */}
        {heroImage && (
          <div className="relative mb-16 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-black/10 shadow-xl">
            <Image 
              src={heroImage} 
              alt={article.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Body */}
        <div className="prose prose-lg prose-black max-w-none bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm border border-black/5">
          {article.content && article.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-black/80">
              {paragraph}
            </p>
          ))}
          
          {/* Display a few remaining images sprinkled at the bottom or skip them for elegance */}
          {article.images && article.images.length > 1 && (
            <div className="mt-16 border-t border-black/10 pt-12">
              <h3 className="font-display text-2xl font-semibold mb-8">Related Imagery</h3>
              <div className="grid grid-cols-2 gap-4">
                {article.images.slice(1, 5).map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-black/10">
                    <Image src={imgUrl} alt="Article imagery" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
