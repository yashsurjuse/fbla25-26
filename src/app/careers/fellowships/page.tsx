import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fellowships | Careers | The Metropolitan Museum of Art",
  description: "Learn about fellowship programs for scholars and researchers at The Met.",
};

export default function FellowshipsPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="relative w-full h-[40vh] min-h-[350px]">
        <Image
          src="https://images.metmuseum.org/CRDImages/ep/original/DP-19296-001.jpg"
          alt="Fellowships at The Met"
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
              Fellowships
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Immersive research and professional opportunities for scholars from around the world.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:px-10 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Art History and Conservation Fellowships</h2>
            <p className="text-black/75 leading-relaxed mb-4">
              The Met provides a unique environment for art historians, conservators, and scientists to pursue independent research projects. Fellows are fully integrated into the life of the Museum and given unprecedented access to the collections, libraries, and staff expertise.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Program Details</h2>
            <p className="text-black/75 leading-relaxed mb-4">
              Fellowships typically last for one year, beginning in September. We offer both predoctoral and postdoctoral opportunities across all collection areas, including the Jane and Morgan Whitney Fellowships, the Andrew W. Mellon Fellowships, and the Slifka Foundation Interdisciplinary Fellowships.
            </p>
          </div>
        </div>

        <div className="bg-[#ece7de] p-8 sm:p-12 rounded-3xl text-center shadow-sm border border-black/5">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black border-b border-black/10 pb-4">
            How to Apply
          </h2>
          <p className="text-black/75 leading-relaxed mb-6">
            Fellowship applications usually open in late summer, with deadlines in early November. Visit our Workday portal for detailed instructions on current openings.
          </p>
          <a href="https://metmuseum.wd5.myworkdayjobs.com/en-US/metmuseumcareers" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors">
            View Fellowship Openings
          </a>
        </div>
      </section>
    </div>
  );
}
