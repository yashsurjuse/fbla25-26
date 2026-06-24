import { Metadata } from "next";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Conservation | The Met",
  description: "Conservation",
};

export default function Page() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-10">
        
      <div className="relative w-full h-[50vh] min-h-[400px] mb-16 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
        <img src="https://images.metmuseum.org/CRDImages/an/original/DP-43237-001.jpg" alt="Conservation Hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl shadow-black/50 drop-shadow-md">
              Conservation
            </h1>
        </div>
      </div>
    
        <div className="prose prose-lg prose-black max-w-none mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-3xl font-display font-semibold mt-16 mb-6 text-black">Curatorial</h2>
        <p className="mb-6 leading-relaxed text-black/80">Curatorial departments study, exhibit, and care for over two million objects in The Met Collection.</p>
        <h2 className="text-3xl font-display font-semibold mt-16 mb-6 text-black">Conservation and Scientific Research</h2>
        <p className="mb-6 leading-relaxed text-black/80">Conservators and scientists collaborate with curators to study, preserve, and conserve the works in The Met Collection.</p>
        </div>
        
      </div>
    </div>
  );
}
