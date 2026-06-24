import Image from "next/image";
import Link from "next/link";
import { artifacts } from "@/data/artifacts";
import CountUpNumber from "@/components/CountUpNumber";
import CirculatingMarquee from "@/components/CirculatingMarquee";
import FeaturedExhibitionPreview from "@/components/FeaturedExhibitionPreview";
import HomeNumbersCollage from "@/components/HomeNumbersCollage";
import { getImageSourceById } from "@/data/image-sources";
import { homeIntro, metStats, museumInfo } from "@/data/site";

const heroImage = "/met(1).jpg";
const collageImages = [
  getImageSourceById("sphinx-hatshepsut"),
  getImageSourceById("death-of-socrates"),
  getImageSourceById("washington-crossing-delaware"),
];

export default function Home() {
  return (
    <div className="bg-[color:var(--paper)] text-[color:var(--ink)]">
      <section
        className="hero-cover-bg relative isolate min-h-[74vh] overflow-hidden"
        style={{ backgroundImage: `url("${heroImage}")` }}
      >
        <div className="absolute inset-0 bg-black/55" aria-hidden />

        <div className="relative mx-auto grid min-h-[74vh] w-full max-w-7xl items-center gap-8 px-4 py-12 text-white sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="relative max-w-[31rem] pl-16 sm:pl-24">
            <div className="home-hero-banner absolute inset-y-0 left-0 w-14 sm:w-16 bg-[color:var(--accent)]" aria-hidden>
              <div className="home-hero-logo absolute bottom-5 left-1/2 z-10 w-10 -translate-x-1/2 sm:w-11" aria-hidden>
                <Image src="/TheMetFill.webp" alt="" width={96} height={96} className="h-auto w-full" />
              </div>
            </div>
            <h1 className="font-display text-[3.8rem] font-semibold leading-[0.9] sm:text-[4.9rem] lg:text-[5.2rem]">
              {homeIntro.heroTitle}
            </h1>
          </div>

          <aside className="justify-self-start border border-black/20 bg-white p-6 text-black shadow-2xl lg:justify-self-end">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-black/55">Welcome to</p>
            <h2 className="mt-2 font-display text-4xl font-semibold leading-tight">The Met Museum</h2>
            <p className="mt-4 text-base text-black/80">{homeIntro.heroSummary}</p>
            <Link
              href="/visit"
              className="mt-6 inline-flex border border-black bg-black px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white transition-colors duration-200 hover:bg-transparent hover:!text-black"
            >
              {homeIntro.primaryCta}
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-black py-14 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Collection</p>
            <h2 className="mt-2 font-display text-5xl font-semibold">{homeIntro.collectionTitle}</h2>
            <p className="mt-3 max-w-2xl text-lg text-white/80">{homeIntro.collectionSummary}</p>
          </div>
          <ul className="space-y-2 self-center text-lg font-semibold lg:justify-self-end lg:pt-2">
            <li>
              ADMISSION{" "}
              <span className="text-white/70">
                Adults $30 -
                <Link href="/visit" className="ml-1 font-semibold !text-white !underline underline-offset-4">
                  Book Now
                </Link>
              </span>
            </li>
            <li>
              SUN-THU <span className="text-white/70">10:00 AM - 5:00 PM</span>
            </li>
            <li>
              FRI-SAT <span className="text-white/70">10:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="museum-pattern bg-[#f1f1f1] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <HomeNumbersCollage images={collageImages} />

          <div className="flex h-full flex-col">
            <h2 className="font-display text-6xl font-semibold leading-[0.9] text-black sm:text-7xl">
              THE MET
              <br />
              IN NUMBERS
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {metStats.slice(0, 2).map((stat) => (
                <article key={stat.value} className="border-t border-black/20 pt-4">
                  <p className="text-base font-semibold lowercase text-black/70">{stat.label}</p>
                  <p className="mt-1 text-5xl font-bold tracking-tight text-black">
                    <CountUpNumber to={Number(stat.value.replace(/[^0-9]/g, ""))} />
                  </p>
                  <p className="mt-2 text-base text-black/75">{stat.detail}</p>
                </article>
              ))}
            </div>
            <Link href="/mission" className="group mt-auto flex cursor-pointer select-none items-center justify-between border-b border-black pb-1 pt-8">
              <span className="origin-left text-xl font-semibold uppercase tracking-[0.02em] text-black transition-all duration-200 group-hover:scale-[1.03] group-hover:font-bold sm:text-2xl">
                Mission and History
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black text-black transition-transform duration-200 group-hover:scale-110" aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedExhibitionPreview />

      <section className="bg-[#f3f3f3] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex items-center justify-between border-b border-black/30 pb-2">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-black/60">Featured works</p>
            <h2 className="font-display text-5xl font-semibold tracking-tight">Circulating</h2>
          </div>
          <CirculatingMarquee items={artifacts} />
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#ececec] py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-10">
          <Link
            href="/exhibitions"
            className="cursor-pointer select-none border border-black/20 bg-white p-5 transition-colors hover:bg-[#fafafa]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Explore</p>
            <h3 className="mt-2 font-display text-4xl font-semibold text-black">Exhibitions</h3>
            <p className="mt-2 text-sm text-black/75">Browse current and historical showcases curated from The Met timeline.</p>
          </Link>
          <Link
            href="/artists"
            className="cursor-pointer select-none border border-black/20 bg-white p-5 transition-colors hover:bg-[#fafafa]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Discover</p>
            <h3 className="mt-2 font-display text-4xl font-semibold text-black">Artists</h3>
            <p className="mt-2 text-sm text-black/75">Learn about the creators shaping painting, sculpture, fashion, and modern art.</p>
          </Link>
          <Link
            href="/visit"
            className="cursor-pointer select-none border border-black/20 bg-white p-5 transition-colors hover:bg-[#fafafa]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Plan</p>
            <h3 className="mt-2 font-display text-4xl font-semibold text-black">Your Visit</h3>
            <p className="mt-2 text-sm text-black/75">
              See hours, ticket pricing, and directions to {museumInfo.addressLines[0]}.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
