import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Openings | Careers | The Metropolitan Museum of Art",
  description: "View current job openings and career opportunities at The Met.",
};

export default function OpeningsPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="relative w-full h-[40vh] min-h-[350px]">
        <Image
          src="https://cdn.sanity.io/images/cctd4ker/production/8a74fa97cc00d08a3ea26a042bab5bc6dfb4e2a8-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format"
          alt="Career Openings at The Met"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">
            <Link href="/careers" className="text-sm font-semibold text-white/80 hover:text-white mb-6 inline-block">
              &larr; Back to Careers
            </Link>
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Career Openings
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Join the team that makes The Met one of the world's greatest cultural institutions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:px-10 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 text-center">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black">Search Current Openings</h2>
          <p className="text-black/75 leading-relaxed mb-8 max-w-2xl mx-auto">
            The Metropolitan Museum of Art is an equal opportunity employer. We offer competitive salaries, excellent benefits, and a dynamic work environment. All current open positions, internships, and fellowships are listed on our Workday portal.
          </p>
          <a 
            href="https://metmuseum.wd5.myworkdayjobs.com/en-US/metmuseumcareers" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-10 py-5 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors text-lg"
          >
            Go to Workday Jobs Portal
          </a>
        </div>
      </section>
    </div>
  );
}
