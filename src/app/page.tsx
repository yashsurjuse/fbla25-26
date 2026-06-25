import Image from "next/image";
import Link from "next/link";
import { artifacts } from "@/data/artifacts";
import CountUpNumber from "@/components/CountUpNumber";
import CirculatingMarquee from "@/components/CirculatingMarquee";
import FeaturedExhibitionPreview from "@/components/FeaturedExhibitionPreview";
import HomeNumbersCollage from "@/components/HomeNumbersCollage";
import { getImageSourceById } from "@/data/image-sources";
import { homeIntro, metStats, museumInfo } from "@/data/site";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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

          <aside className="justify-self-start glass-card bg-white/90 p-8 text-black rounded-3xl lg:justify-self-end">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">Welcome to</p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight">The Met Museum</h2>
            <p className="mt-4 text-base text-black/70 leading-relaxed max-w-sm">{homeIntro.heroSummary}</p>
            <Link
              href="/visit"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-transparent hover:text-black"
            >
              {homeIntro.primaryCta}
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.4),transparent_50%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10 animate-stagger-fade">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Collection</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl font-bold">{homeIntro.collectionTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{homeIntro.collectionSummary}</p>
          </div>
          <ul className="space-y-6 self-center text-lg font-bold lg:justify-self-end glass-card !bg-white/5 !border-white/10 !text-white rounded-3xl p-8 backdrop-blur-md w-full max-w-sm hover:!border-white/20 transition-colors">
            <li className="border-b border-white/10 pb-4">
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Admission</span>
              <div className="flex justify-between items-center">
                <span>Adults $30</span>
                <Link href="/visit" className="text-sm border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">
                  Book Now
                </Link>
              </div>
            </li>
            <li className="border-b border-white/10 pb-4">
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Sun - Thu</span>
              <span className="text-white/90">10:00 AM - 5:00 PM</span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Fri - Sat</span>
              <span className="text-white/90">10:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[color:var(--paper)] py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-10 animate-stagger-fade">
          <div className="glass-card rounded-[2.5rem] p-2 overflow-hidden bg-white hidden lg:block">
            <HomeNumbersCollage images={collageImages} />
          </div>

          <div className="flex h-full flex-col justify-center">
            <h2 className="font-display text-6xl font-bold leading-[0.9] text-black sm:text-7xl">
              THE MET
              <br />
              <span className="text-[color:var(--accent)]">IN NUMBERS</span>
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {metStats.slice(0, 2).map((stat) => (
                <article key={stat.value} className="glass-card rounded-3xl p-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-black/40">{stat.label}</p>
                  <p className="mt-4 text-6xl font-bold tracking-tight text-black">
                    <CountUpNumber to={Number(stat.value.replace(/[^0-9]/g, ""))} />
                  </p>
                  <p className="mt-4 text-sm text-black/60 leading-relaxed">{stat.detail}</p>
                </article>
              ))}
            </div>
            <Link href="/mission" className="group mt-12 flex cursor-pointer items-center justify-between border border-black/10 rounded-full pl-6 pr-2 py-2 w-fit hover:border-black/30 transition-colors bg-white">
              <span className="text-sm font-bold uppercase tracking-widest text-black mr-6">
                Mission and History
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-105">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedExhibitionPreview />

      <section className="bg-[color:var(--paper)] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-12 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Featured works</p>
            <h2 className="font-display text-5xl font-bold tracking-tight text-black">Circulating</h2>
          </div>
          <div className="glass-card rounded-[2.5rem] py-6 px-2 bg-white">
            <CirculatingMarquee items={artifacts} />
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--paper)] pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-10 animate-stagger-fade">
          <Link
            href="/exhibitions"
            className="group cursor-pointer glass-card rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40">Explore</p>
              <h3 className="mt-4 font-display text-4xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">Exhibitions</h3>
              <p className="mt-4 text-sm text-black/60 leading-relaxed">Browse current and historical showcases curated from The Met timeline.</p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 self-end" />
          </Link>
          <Link
            href="/artists"
            className="group cursor-pointer glass-card rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40">Discover</p>
              <h3 className="mt-4 font-display text-4xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">Artists</h3>
              <p className="mt-4 text-sm text-black/60 leading-relaxed">Learn about the creators shaping painting, sculpture, fashion, and modern art.</p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 self-end" />
          </Link>
          <Link
            href="/visit"
            className="group cursor-pointer glass-card rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40">Plan</p>
              <h3 className="mt-4 font-display text-4xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">Your Visit</h3>
              <p className="mt-4 text-sm text-black/60 leading-relaxed">
                See hours, ticket pricing, and directions to {museumInfo.addressLines[0]}.
              </p>
            </div>
            <ArrowUpRight className="h-6 w-6 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 self-end" />
          </Link>
        </div>
      </section>
    </div>
  );
}
