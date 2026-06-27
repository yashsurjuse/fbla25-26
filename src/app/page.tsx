import Image from "next/image";
import Link from "next/link";
import { artifacts } from "@/data/artifacts";
import CountUpNumber from "@/components/CountUpNumber";
import CirculatingMarquee from "@/components/CirculatingMarquee";
import FeaturedExhibitionPreview from "@/components/FeaturedExhibitionPreview";
import HomeNumbersCollage from "@/components/HomeNumbersCollage";
import HeroMosaic from "@/components/HeroMosaic";
import { getImageSourceById } from "@/data/image-sources";
import { homeIntro, metStats, museumInfo } from "@/data/site";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const collageImages = [
  getImageSourceById("sphinx-hatshepsut"),
  getImageSourceById("death-of-socrates"),
  getImageSourceById("washington-crossing-delaware"),
];

export default function Home() {
  return (
    <div className="bg-[color:var(--paper)] text-[color:var(--ink)]">
      <HeroMosaic />

      <section className="bg-[#0a0a0a] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(228,0,43,0.35),transparent_60%)] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10 animate-stagger-fade">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Collection</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl font-bold">{homeIntro.collectionTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{homeIntro.collectionSummary}</p>
          </div>
          <ul className="space-y-6 self-center text-lg font-bold lg:justify-self-end bg-[#111111] border border-white/10 text-white rounded-3xl p-8 w-full max-w-sm">
            <li className="border-b border-white/10 pb-4">
              <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Admission</span>
              <div className="flex justify-between items-center">
                <span>Adults $30</span>
                <Link href="/visit" className="pill-btn px-4 py-2 text-xs uppercase tracking-wider font-bold bg-transparent border border-white/30 text-white hover:bg-white hover:!text-black transition-colors">
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
          <div className="hidden lg:block relative h-full min-h-[400px]">
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
                <article key={stat.value} className="py-4">
                  <p className="text-sm font-bold uppercase tracking-widest text-black/40">{stat.label}</p>
                  <p className="mt-2 text-6xl font-bold tracking-tight text-black">
                    <CountUpNumber to={Number(stat.value.replace(/[^0-9]/g, ""))} />
                  </p>
                  <p className="mt-2 text-sm text-black/60 leading-relaxed">{stat.detail}</p>
                </article>
              ))}
            </div>
            <Link href="/mission" className="group mt-12 pill-btn pill-btn-light px-8 py-4 w-fit justify-between">
              <span className="mr-6">Mission and History</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:scale-110 group-hover:bg-[color:var(--accent)]">
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
          <div className="py-6">
            <CirculatingMarquee items={artifacts} />
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--paper)] py-24 border-t border-black/5">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 animate-stagger-fade">
          <div className="mb-12 flex items-center justify-between border-b border-black/10 pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Plan your visit</p>
            <h2 className="font-display text-5xl font-bold tracking-tight text-black">Locations & Hours</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="glass-card no-hover flex flex-col justify-between overflow-hidden bg-white/70 backdrop-blur-xl relative">
              <div className="h-56 w-full relative z-[1]">
                <img src="https://cdn.sanity.io/images/cctd4ker/production/16b5962817050737cd8bbe4284c8e4f71a81bfa9-5120x2880.jpg" alt="The Met Fifth Avenue" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-10">
                <h3 className="font-display text-4xl font-bold mb-6">The Met Fifth Avenue</h3>
                <ul className="space-y-4 text-sm font-medium text-black/70">
                  <li className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/50">Sunday–Tuesday & Thursday</span>
                    <span className="text-black">10 am – 5 pm</span>
                  </li>
                  <li className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/50">Friday & Saturday (Extended)</span>
                    <span className="text-black">10 am – 9 pm</span>
                  </li>
                  <li className="flex justify-between text-black/40">
                    <span>Wednesday</span>
                    <span>Closed</span>
                  </li>
                </ul>
                <p className="mt-6 text-xs text-black/40 leading-relaxed italic">Closed Thanksgiving Day, December 25, January 1, and the first Monday in May.</p>
              </div>
            </article>

            <article className="glass-card no-hover flex flex-col justify-between overflow-hidden bg-white/70 backdrop-blur-xl relative">
              <div className="h-56 w-full relative z-[1]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/The_Met_Cloisters.jpg" alt="The Met Cloisters" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-10">
                <h3 className="font-display text-4xl font-bold mb-6">The Met Cloisters</h3>
                <ul className="space-y-4 text-sm font-medium text-black/70">
                  <li className="flex justify-between border-b border-black/5 pb-2">
                    <span className="text-black/50">Thursday–Tuesday</span>
                    <span className="text-black">10 am – 5 pm</span>
                  </li>
                  <li className="flex justify-between text-black/40">
                    <span>Wednesday</span>
                    <span>Closed</span>
                  </li>
                </ul>
                <p className="mt-6 text-xs text-black/40 leading-relaxed italic">Closed Thanksgiving Day, December 25, and January 1.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--paper)] pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 animate-stagger-fade">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link
              href="/exhibitions"
              className="group relative overflow-hidden cursor-pointer glass-card p-10 md:col-span-2 min-h-[340px] flex flex-col justify-end border-none"
            >
              <img src="https://cdn.sanity.io/images/cctd4ker/production/16b5962817050737cd8bbe4284c8e4f71a81bfa9-5120x2880.jpg" alt="Exhibitions" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-[800ms] scale-[1.2] group-hover:scale-100 z-[0]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[0]" />
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-white/70 transition-colors">Explore</p>
                <div className="flex items-center justify-between mt-2">
                  <h3 className="font-display text-4xl font-bold text-black group-hover:text-white transition-colors">Exhibitions</h3>
                  <div className="h-12 w-12 rounded-full bg-black/5 group-hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight className="h-6 w-6 text-black/40 group-hover:text-white" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-black/60 group-hover:text-white/80 transition-colors max-w-md">Browse current and historical showcases curated from The Met timeline.</p>
              </div>
            </Link>

            <Link
              href="/artists"
              className="group relative overflow-hidden cursor-pointer glass-card p-10 md:row-span-2 min-h-[400px] flex flex-col justify-between border-none"
            >
               <img src="https://i.8upload.com/image/4b07d12134eaee0f/49878-1105381.jpg" alt="Artists" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-[800ms] scale-[1.2] group-hover:scale-100 z-[0]" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[0]" />
               <div className="relative z-10 flex justify-end">
                  <div className="h-12 w-12 rounded-full bg-black/5 group-hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight className="h-6 w-6 text-black/40 group-hover:text-white" />
                  </div>
               </div>
               <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-white/70 transition-colors">Discover</p>
                <h3 className="mt-2 font-display text-5xl font-bold text-black group-hover:text-white transition-colors">Artists</h3>
                <p className="mt-4 text-sm text-black/60 group-hover:text-white/80 transition-colors">Learn about the creators shaping painting, sculpture, fashion, and modern art.</p>
              </div>
            </Link>

            <Link
              href="/visit"
              className="group cursor-pointer glass-card p-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/40">Plan</p>
                <h3 className="mt-2 font-display text-4xl font-bold text-black group-hover:text-[color:var(--accent)] transition-colors">Your Visit</h3>
                <p className="mt-4 text-sm text-black/60 leading-relaxed">
                  See hours, ticket pricing, and directions.
                </p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-black/30 group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 self-end" />
            </Link>

            <Link
              href="/shop"
              className="group cursor-pointer glass-card p-10 flex flex-col justify-between !bg-black text-white hover:!border-black/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Take Home</p>
                <h3 className="mt-2 font-display text-4xl font-bold text-white group-hover:text-[color:var(--accent)] transition-colors">The Shop</h3>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  Browse exclusive books, jewelry, and prints inspired by the collection.
                </p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-white/30 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 self-end" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
