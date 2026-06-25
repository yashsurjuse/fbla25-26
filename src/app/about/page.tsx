import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About The Met | The Metropolitan Museum of Art",
  description: "Learn about The Metropolitan Museum of Art, our mission, history, and the collection.",
};

export default function AboutPage() {
  return (
    <div className="bg-[color:var(--paper)] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src="https://images.metmuseum.org/CRDImages/es/original/DP341255.jpg" 
          alt="The Metropolitan Museum of Art" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl shadow-black/50 drop-shadow-md text-center max-w-4xl">
            About The Met
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="prose prose-lg prose-black max-w-none mx-auto glass-card bg-white/70 backdrop-blur-2xl p-8 sm:p-12 md:p-16 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black">
            The Metropolitan Museum of Art
          </h2>
          <p className="mb-6 leading-relaxed text-black/80">
            The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online.
          </p>
          <p className="mb-6 leading-relaxed text-black/80">
            Since it was founded in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. Every day, art comes alive in the Museum's galleries and through its exhibitions and events, revealing both new ideas and unexpected connections across time and across cultures.
          </p>

          {/* Navigational Cards Grid */}
          <div className="mt-16 border-t border-black/10 pt-12">
            <h3 className="text-2xl font-display font-semibold mb-8 text-black">
              Explore More
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Mission and History", desc: "Learn about the founding and evolution of the museum.", link: "/mission" },
                { title: "Collection Areas", desc: "Browse the 19 curatorial departments.", link: "/collection-areas" },
                { title: "Careers", desc: "Join our team of dedicated professionals.", link: "/careers" },
                { title: "Press", desc: "Press releases, contacts, and news.", link: "/press" },
                { title: "Policies, Reports, and Documents", desc: "Our annual reports, strategic plans, and legal terms.", link: "/terms" },
                { title: "Contact Us", desc: "Get in touch with the Museum.", link: "/contact" }
              ].map(item => (
                <Link key={item.title} href={item.link}>
                  <div className="group h-full p-6 border border-white/60 rounded-3xl glass-card bg-white/60 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-black group-hover:text-[color:var(--accent)] transition-colors">{item.title}</h4>
                      <p className="text-sm text-black/70 mt-2">{item.desc}</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <span className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center text-black transition-all duration-300 group-hover:bg-[color:var(--accent)] group-hover:text-white shadow-sm group-hover:shadow-md">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
