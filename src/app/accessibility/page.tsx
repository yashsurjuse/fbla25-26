import { Metadata } from "next";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Accessibility | The Metropolitan Museum of Art",
  description: "Information about accessibility, accommodations, and programs for visitors with disabilities.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-[#ece7de] border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Accessibility
          </h1>
          <p className="mt-6 text-xl text-black/80 leading-relaxed max-w-3xl">
            The Met is committed to ensuring that its facilities, programs, and services are accessible to all audiences.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 mb-12">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black border-b border-black/10 pb-4">
            General Access and Accommodations
          </h2>
          <div className="prose prose-lg prose-black max-w-none">
            <p>
              Visitors with disabilities may use mobility devices, including manual and electric wheelchairs, mobility scooters, and manually powered mobility aids (such as walkers, canes, and crutches) in all areas open to public pedestrian use. 
            </p>
            <p>
              Wheelchairs are available at the coat checks at all Museum locations on a first-come, first-served basis. Advance reservations are not available.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5">
          <h2 className="text-3xl font-display font-semibold mb-8 text-black">
            Frequently Asked Questions
          </h2>
          
          <Accordion title="Are service animals permitted?">
            Service animals are welcome at The Met. The Americans with Disabilities Act defines a service animal as any guide dog, signal dog, or other animal individually trained to provide assistance to an individual with a disability. Emotional support animals are not permitted.
          </Accordion>

          <Accordion title="Is there accessible parking?">
            A limited number of parking spaces for visitors with disabilities are available in the Museum's parking garage. The clearance is six feet, six inches (6' 6"). To access these spaces, please display a valid disability parking permit.
          </Accordion>

          <Accordion title="Are there large-print labels?">
            Large-print labels for many special exhibitions are available on your own device. Look for the QR codes located at the entrance to participating exhibitions.
          </Accordion>

          <Accordion title="Are Audio Guides available?">
            Yes, free Audio Guide devices are available with a valid ID at the Audio Guide desk in the Great Hall. The devices feature volume control and standard 3.5mm headphone jacks. Neck loops for hearing aids with T-switches are available upon request.
          </Accordion>

          <Accordion title="Do you offer ASL interpretation?">
            Sign language interpretation is available free of charge for Museum events and programs. Please provide at least two weeks' notice to request interpretation by emailing access@metmuseum.org.
          </Accordion>
          
          <Accordion title="Are there quiet spaces in the museum?">
            The Met can be a busy and sensory-rich environment. If you need a quiet space, we recommend visiting the galleries early in the day (10:00 AM) or exploring quieter areas such as the Astor Chinese Garden Court or the European Sculpture Court.
          </Accordion>
        </div>

        <div className="mt-12 bg-black text-white p-8 sm:p-12 rounded-3xl flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">Need further assistance?</h2>
            <p className="text-white/80">Our Access team is here to help plan your visit.</p>
          </div>
          <a href="mailto:access@metmuseum.org" className="mt-6 sm:mt-0 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
            Contact Access Team
          </a>
        </div>
      </section>
    </div>
  );
}
