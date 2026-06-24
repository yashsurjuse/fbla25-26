import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "High-Resolution Image Library | Press | The Metropolitan Museum of Art",
  description: "Download high-resolution images for press and editorial use.",
};

const pressImages = [
  { id: 1, title: "The Met Fifth Avenue Exterior", url: "https://cdn.sanity.io/images/cctd4ker/production/3f24056c69dc0374665a30f7787024d4e08f849f-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 2, title: "The Great Hall", url: "https://cdn.sanity.io/images/cctd4ker/production/201492f88a42d5c13dbcabbf79520a3c8a36e751-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 3, title: "The Met Cloisters", url: "https://cdn.sanity.io/images/cctd4ker/production/d25918d32e91614f036dc86e1e6624c790860b0b-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 4, title: "European Paintings Gallery", url: "https://cdn.sanity.io/images/cctd4ker/production/17308c995fb6ca1441655fd1bbfa540b20fc7093-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 5, title: "The Charles Engelhard Court", url: "https://cdn.sanity.io/images/cctd4ker/production/1421654e887b123f803467dc6f4f82ff77a915dd-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 6, title: "Asian Art Gallery", url: "https://cdn.sanity.io/images/cctd4ker/production/faa31bd035c2df01bca661cac8934bdfd331b28d-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 7, title: "Temple of Dendur", url: "https://cdn.sanity.io/images/cctd4ker/production/a56b5ff19bc515b19343cefb343afb8dd323cc78-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 8, title: "Greek and Roman Art", url: "https://cdn.sanity.io/images/cctd4ker/production/83100b590676a73c594316ef9b773588aacd7300-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 9, title: "Arms and Armor Court", url: "https://cdn.sanity.io/images/cctd4ker/production/5f1166f560eedf7957467f6d3346b460d48c4a6a-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 10, title: "The American Wing", url: "https://cdn.sanity.io/images/cctd4ker/production/8a74fa97cc00d08a3ea26a042bab5bc6dfb4e2a8-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 11, title: "Islamic Art Gallery", url: "https://cdn.sanity.io/images/cctd4ker/production/12f42a251bfd2f79c72a28712d369c4e2351a049-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 12, title: "Musical Instruments", url: "https://cdn.sanity.io/images/cctd4ker/production/cc2e2443d1815abb80bd98c978f539d46bcb38b8-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 13, title: "Modern and Contemporary", url: "https://cdn.sanity.io/images/cctd4ker/production/00c6c30771901a6238b8c2a990405a51ce84158c-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 14, title: "Costume Institute", url: "https://cdn.sanity.io/images/cctd4ker/production/dba30c5c3a2889f7130dd033391e0773a43638c1-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" },
  { id: 15, title: "Medieval Art", url: "https://cdn.sanity.io/images/cctd4ker/production/279f7fd3af413e3f03737dedfea527fe55810af7-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format" }
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
