import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Filming & Photography Policy | Press | The Metropolitan Museum of Art",
  description: "Official guidelines for personal, editorial, and commercial photography and filming at The Met.",
};

export default function FilmingPolicyPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="relative w-full h-[40vh] min-h-[350px]">
        <Image
          src="https://images.metmuseum.org/CRDImages/md/original/DP359502.jpg"
          alt="Filming Policy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">
            <Link href="/press" className="text-sm font-semibold !text-white/80 hover:!text-white mb-6 inline-block">
              &larr; Back to Press Room
            </Link>
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Filming & Photography Policy
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Detailed rules and authorization pipelines for filming, audio recording, and commercial photography across Museum locations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:px-10 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Personal Photography</h2>
            <p className="text-black/75 leading-relaxed">
              Handheld cameras, video recording devices, and mobile phones are permitted for personal, non-commercial use in permanent collection galleries. The use of flash, tripods, monopods, selfie sticks, and auxiliary lighting is strictly prohibited at all times.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Editorial & News Filming</h2>
            <p className="text-black/75 leading-relaxed">
              Broadcast journalists and media outlets must receive advance clearance from the Communications Department prior to filming inside Museum galleries or exteriors. Press escorts are required for all news filming crews.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Commercial Filming & Photography</h2>
            <p className="text-black/75 leading-relaxed">
              Commercial projects, fashion shoots, television programs, and feature films require a filming permit and are subject to location fees. The Museum reviews requests on an individual basis, prioritizing proposals that align with its educational and cultural mission.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black border-b border-black/10 pb-4">
            Request Authorization
          </h2>
          <p className="text-black/75 leading-relaxed mb-6">
            To submit a filming proposal, request a press crew pass, or inquire about commercial rates, please contact our filming coordinator at least three weeks in advance.
          </p>
          <div className="bg-[#ece7de] p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="font-bold block text-black">Need a Filming Permit?</span>
              <span className="text-sm text-black/70">Submit a detailed project proposal to begin the review process.</span>
            </div>
            <a href="mailto:filming@metmuseum.org?subject=Filming%20or%20Photography%20Permit%20Request" className="px-6 py-3 bg-black hover:bg-black/80 !text-white font-semibold rounded-full text-sm transition-colors text-center w-full sm:w-auto">
              Submit Filming Proposal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
