import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "History and Fact Sheet | The Met",
  description: "Learn about the history of The Metropolitan Museum of Art.",
};

export default function AboutHistoryPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen text-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.metmuseum.org/CRDImages/es/original/DP-14939-001.jpg"
            alt="The Met exterior"
            fill
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-20 max-w-7xl mx-auto">
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-white mb-4">
            History and Fact Sheet
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Tracing our roots from 1870 to becoming a world-renowned cultural institution.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Our Origins (1870)</h2>
              <p className="text-lg leading-relaxed text-black/80 mb-4">
                The Metropolitan Museum of Art was founded on April 13, 1870, when it was incorporated by the New York State Legislature for the purpose of establishing and maintaining a museum and library of art in the city. The founders included businessmen, financiers, leading artists, and thinkers of the day who wanted to bring art and art education to the American people.
              </p>
              <p className="text-lg leading-relaxed text-black/80">
                It first opened to the public in the Dodworth Building at 681 Fifth Avenue in 1872 before moving to its current location in Central Park, along Fifth Avenue, in 1880.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">The Fifth Avenue Building</h2>
              <p className="text-lg leading-relaxed text-black/80 mb-4">
                The original building in Central Park was designed by American architect Calvert Vaux and his collaborator Jacob Wrey Mould. Over the decades, it has undergone numerous additions and renovations by distinguished architects, notably Richard Morris Hunt (who designed the iconic Beaux-Arts Fifth Avenue facade) and the firm of McKim, Mead & White.
              </p>
              <p className="text-lg leading-relaxed text-black/80">
                Today, the Museum covers over 2 million square feet and houses collections representing more than 5,000 years of art from across the globe.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl font-semibold mb-6">Key Fact Sheet</h2>
              <ul className="space-y-4 text-lg text-black/80">
                <li className="flex gap-4">
                  <span className="font-bold text-black min-w-32">Founded:</span>
                  <span>1870</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-black min-w-32">Locations:</span>
                  <span>The Met Fifth Avenue and The Met Cloisters</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-black min-w-32">Collection Size:</span>
                  <span>Over 1.5 million objects</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-black min-w-32">Visitors:</span>
                  <span>Millions annually, representing visitors from around the world</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-black min-w-32">Mission:</span>
                  <span>To collect, preserve, study, exhibit, and stimulate appreciation for and advance knowledge of works of art that collectively represent the broadest spectrum of human achievement.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-black/10">
              <h3 className="font-display text-2xl font-semibold mb-4">Timeline</h3>
              <ul className="space-y-4">
                <li className="border-l-2 border-black pl-4">
                  <span className="block font-bold text-black text-sm">1870</span>
                  <span className="text-black/70 text-sm">Museum Incorporated</span>
                </li>
                <li className="border-l-2 border-black pl-4">
                  <span className="block font-bold text-black text-sm">1880</span>
                  <span className="text-black/70 text-sm">Opened at Central Park</span>
                </li>
                <li className="border-l-2 border-black pl-4">
                  <span className="block font-bold text-black text-sm">1938</span>
                  <span className="text-black/70 text-sm">The Met Cloisters Opens</span>
                </li>
                <li className="border-l-2 border-black pl-4">
                  <span className="block font-bold text-black text-sm">2020</span>
                  <span className="text-black/70 text-sm">150th Anniversary</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#ece7de] p-8 rounded-3xl">
              <h3 className="font-display text-xl font-semibold mb-2">Back to About</h3>
              <p className="text-black/70 mb-4 text-sm">
                Explore more about our mission, leadership, and policies.
              </p>
              <Link href="/about" className="text-sm font-semibold hover:underline">
                View About The Met &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
