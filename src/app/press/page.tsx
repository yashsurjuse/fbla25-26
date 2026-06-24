import { Metadata } from "next";
import Link from "next/link";
import pressReleases from "@/data/press_releases.json";

export const metadata: Metadata = {
  title: "Press | The Metropolitan Museum of Art",
  description: "Press releases, news, and media contacts for The Metropolitan Museum of Art.",
};

export default function PressPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Press Room
          </h1>
          <p className="mt-6 text-xl text-black/80 leading-relaxed max-w-3xl">
            Welcome to the online press room for The Metropolitan Museum of Art. Here you will find the latest news, press releases, exhibition announcements, and contact information for the Communications Department.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-display text-4xl font-semibold border-b border-black/10 pb-4 text-black">Latest Press Releases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressReleases.map((pr: any) => (
                <Link key={pr.slug} href={`/press/${pr.slug}`} className="flex flex-col bg-white rounded-3xl shadow-sm border border-black/5 hover:border-black/20 hover:shadow-md transition-all cursor-pointer group overflow-hidden">
                  <div className="relative h-48 w-full bg-black/5">
                    {pr.image ? (
                      <img src={pr.image} alt={pr.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-sm font-semibold text-black/50 mb-2">{pr.date}</div>
                    <h3 className="font-display text-2xl font-semibold text-black group-hover:text-[#e4002b] transition-colors mb-3 leading-tight">
                      {pr.title}
                    </h3>
                    <p className="text-black/70 text-sm sm:text-base line-clamp-3 mb-6 flex-1">
                      {pr.summary}
                    </p>
                    <span className="text-sm font-bold text-black border-b border-black self-start pb-0.5 group-hover:text-black/60 group-hover:border-black/60 transition-colors">
                      Read Release &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
          </div>

          <div className="space-y-8">
            <div className="bg-black text-white p-8 rounded-3xl">
              <h3 className="font-display text-2xl font-semibold mb-4">Press Contacts</h3>
              <div className="space-y-6 text-white/80">
                <div>
                  <div className="font-semibold text-white">General Inquiries</div>
                  <a href="mailto:communications@metmuseum.org" className="hover:underline hover:text-white !text-white">communications@metmuseum.org</a>
                  <div className="mt-1">212-570-3951</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Image Requests</div>
                  <a href="mailto:image.requests@metmuseum.org" className="hover:underline hover:text-white !text-white">image.requests@metmuseum.org</a>
                </div>
              </div>
            </div>

            <div className="bg-[#ece7de] p-8 rounded-3xl border border-black/5">
              <h3 className="font-display text-2xl font-semibold mb-4 text-black">Media Resources</h3>
              <ul className="space-y-4 text-black/80 font-medium">
                <li>
                  <a href="/press/image-library" className="hover:text-black hover:underline flex items-center gap-2 !text-black">
                    <span>&rarr;</span> High-Res Image Library
                  </a>
                </li>
                <li>
                  <a href="/press/filming-policy" className="hover:text-black hover:underline flex items-center gap-2 !text-black">
                    <span>&rarr;</span> Filming & Photography Policy
                  </a>
                </li>
                <li>
                  <a href="/about/history" className="hover:text-black hover:underline flex items-center gap-2 !text-black">
                    <span>&rarr;</span> Fact Sheet & History
                  </a>
                </li>
                <li>
                  <a href="mailto:communications@metmuseum.org?subject=Press%20Pass%20Request" className="hover:text-black hover:underline flex items-center gap-2 !text-black">
                    <span>&rarr;</span> Request Press Pass
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
