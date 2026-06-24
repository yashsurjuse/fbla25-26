import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission and History | The Metropolitan Museum of Art",
  description: "Learn about the founding, history, and mission of The Metropolitan Museum of Art.",
};

export default function MissionPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Mission and History
          </h1>
          <p className="mt-6 text-xl text-black/80 leading-relaxed max-w-2xl mx-auto">
            Our mission is to collect, preserve, study, exhibit, and stimulate appreciation for and advance knowledge of works of art.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5">
          <h2 className="font-display text-3xl font-semibold mb-6 text-black border-b border-black/10 pb-4">
            Our Mission Statement
          </h2>
          <div className="prose prose-lg prose-black max-w-none">
            <p className="text-xl font-medium leading-relaxed italic border-l-4 border-black/20 pl-6 my-8 text-black/70">
              "The Metropolitan Museum of Art collects, studies, conserves, and presents significant works of art across all times and cultures in order to connect people to creativity, knowledge, and ideas."
            </p>

            <h3 className="font-display text-2xl font-semibold mt-12 mb-4">A Brief History</h3>
            <p>
              The Museum was founded in 1870 by a group of American citizens—businessmen and financiers as well as leading artists and thinkers of the day—who wanted to create a museum to bring art and art education to the American people.
            </p>
            <p>
              It opened its doors on April 13, 1870, at its first location in the Dodworth Building at 681 Fifth Avenue. On March 30, 1880, after a brief move to the Douglas Mansion at 128 West 14th Street, the Museum opened to the public at its current site on Fifth Avenue and 82nd Street.
            </p>
            <p>
              The original Ruskinian Gothic building was designed by American architects Calvert Vaux and Jacob Wrey Mould. That structure is still visible as part of the Robert Lehman Wing. The iconic Beaux-Arts Fifth Avenue facade and Great Hall, designed by Richard Morris Hunt, opened to the public in December 1902.
            </p>

            <h3 className="font-display text-2xl font-semibold mt-12 mb-4">Looking to the Future</h3>
            <p>
              Today, The Met continues to grow and evolve. We are committed to expanding the narratives of art history, embracing diverse perspectives, and making our collection accessible to audiences globally through digital initiatives and community outreach.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
