import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "High-Resolution Image Library | Press | The Metropolitan Museum of Art",
  description: "Download high-resolution images for press and editorial use.",
};

const pressImages = [
  { id: 1, title: "The Met Fifth Avenue Exterior", url: "https://images.metmuseum.org/CRDImages/es/original/DP238533.jpg" },
  { id: 2, title: "The Great Hall", url: "https://images.metmuseum.org/CRDImages/gr/original/DP333700.jpg" },
  { id: 3, title: "The Met Cloisters", url: "https://images.metmuseum.org/CRDImages/es/original/DP248871.jpg" },
  { id: 4, title: "European Paintings Gallery", url: "https://images.metmuseum.org/CRDImages/gr/original/DT276.jpg" },
  { id: 5, title: "The Charles Engelhard Court", url: "https://images.metmuseum.org/CRDImages/gr/original/DP-43517-001.jpg" },
  { id: 6, title: "Asian Art Gallery", url: "https://images.metmuseum.org/CRDImages/gr/original/DP-39853-001.jpg" },
  { id: 7, title: "Temple of Dendur", url: "https://images.metmuseum.org/CRDImages/gr/original/DP-14287-132.jpg" },
  { id: 8, title: "Greek and Roman Art", url: "https://images.metmuseum.org/CRDImages/gr/original/DP109258.jpg" },
  { id: 9, title: "Arms and Armor Court", url: "https://images.metmuseum.org/CRDImages/gr/original/DP-39819-001.jpg" },
  { id: 10, title: "The American Wing", url: "https://images.metmuseum.org/CRDImages/gr/original/DT281.jpg" },
  { id: 11, title: "Islamic Art Gallery", url: "https://images.metmuseum.org/CRDImages/ep/original/DP146455.jpg" },
  { id: 12, title: "Musical Instruments", url: "https://images.metmuseum.org/CRDImages/gr/original/DT7205.jpg" },
  { id: 13, title: "Modern and Contemporary", url: "https://images.metmuseum.org/CRDImages/ep/original/DP-25460-001.jpg" },
  { id: 14, title: "Costume Institute", url: "https://images.metmuseum.org/CRDImages/aa/original/DP-12881-004.jpg" },
  { id: 15, title: "Medieval Art", url: "https://images.metmuseum.org/CRDImages/ep/original/DP259921.jpg" }
];

export default function ImageLibraryPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Link href="/press" className="text-sm font-semibold text-black/50 hover:text-black mb-6 inline-block">
            &larr; Back to Press Room
          </Link>
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-6xl">
            High-Resolution Image Library
          </h1>
          <p className="mt-4 text-lg text-black/75">
            Official press images available for editorial use by accredited media members.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressImages.map((img) => (
            <div key={img.id} className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden flex flex-col group">
              <div className="relative h-64 w-full bg-black/5">
                <Image src={img.url} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col items-start">
                <h2 className="font-display text-xl font-semibold mb-4 text-black">{img.title}</h2>
                <a href={img.url} target="_blank" rel="noopener noreferrer" className="mt-auto px-6 py-2 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors text-sm">
                  Download High-Res
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#ece7de] p-8 sm:p-12 rounded-3xl text-center max-w-3xl mx-auto border border-black/5">
          <h3 className="font-display text-3xl font-semibold mb-4 text-black">Need a specific artwork?</h3>
          <p className="text-black/80 mb-6 text-lg">
            For specific collection objects, please use our Open Access initiative or download the complete Open Access CSV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/metmuseum/openaccess/raw/master/MetObjects.csv" className="inline-block px-8 py-4 bg-white border border-black !text-black font-semibold rounded-full hover:bg-black hover:!text-white transition-colors">
              Download Open Access CSV
            </a>
            <a href="mailto:image.requests@metmuseum.org" className="inline-block px-8 py-4 bg-black border border-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors">
              Email Image Requests
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
