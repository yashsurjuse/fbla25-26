import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Internships | Careers | The Metropolitan Museum of Art",
  description: "Explore internship opportunities for students and recent graduates at The Met.",
};

export default function InternshipsPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="relative w-full h-[40vh] min-h-[350px]">
        <Image
          src="https://images.metmuseum.org/CRDImages/ep/original/DP-19363-001.jpg"
          alt="Internships at The Met"
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
              Internships
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Gain hands-on experience and professional development in one of the world's most renowned art museums.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:px-10 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Undergraduate and Graduate Internships</h2>
            <p className="text-black/75 leading-relaxed mb-4">
              The Met offers paid opportunities for college and graduate students to explore museum careers and gain professional experience during the summer and academic year. Interns work in over 40 departments—from curatorial and conservation to education and marketing.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-black/75">
              <li>Summer Internships (10 weeks, June to August)</li>
              <li>Academic Year Internships (Part-time, September to April)</li>
              <li>Spring/Fall Semesters available for course credit</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">High School Internships</h2>
            <p className="text-black/75 leading-relaxed">
              Designed for high school students interested in art, design, and museum professions. Participants connect with art, meet museum professionals, and build crucial skills. Programs include the Summer High School Internship and the after-school Teen Friday program.
            </p>
          </div>
        </div>

        <div className="bg-[#ece7de] p-8 sm:p-12 rounded-3xl text-center shadow-sm border border-black/5">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black border-b border-black/10 pb-4">
            How to Apply
          </h2>
          <p className="text-black/75 leading-relaxed mb-6">
            Applications for our programs open periodically throughout the year. All available internship positions are posted on our Workday portal.
          </p>
          <a href="https://metmuseum.wd5.myworkdayjobs.com/en-US/metmuseumcareers" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
