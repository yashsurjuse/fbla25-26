import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Volunteer | Careers | The Metropolitan Museum of Art",
  description: "Discover volunteer opportunities at The Met.",
};

export default function VolunteerPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24 text-black">
      <section className="relative w-full h-[40vh] min-h-[350px]">
        <Image
          src="https://cdn.sanity.io/images/cctd4ker/production/17308c995fb6ca1441655fd1bbfa540b20fc7093-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format"
          alt="Volunteer at The Met"
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
              Volunteer
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Join a dedicated community of volunteers who help make The Met a welcoming and inspiring place for all.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 sm:px-6 lg:px-10 space-y-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-black/5 space-y-8">
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Make an Impact</h2>
            <p className="text-black/75 leading-relaxed mb-4">
              Volunteers are vital to The Met, enhancing the visitor experience and supporting behind-the-scenes work across numerous departments. Whether you are greeting international visitors, assisting at the membership desk, or helping in the libraries, your time and enthusiasm make a tangible difference.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold mb-3 text-black">Volunteer Roles</h2>
            <ul className="list-disc pl-5 space-y-2 text-black/75">
              <li>Visitor Experience Volunteers: Greet and orient visitors in the Great Hall.</li>
              <li>Guided Tour Volunteers: Lead conversational tours of the collection (requires extensive training).</li>
              <li>Special Events Volunteers: Assist during festivals, late nights, and member previews.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#ece7de] p-8 sm:p-12 rounded-3xl text-center shadow-sm border border-black/5">
          <h2 className="text-3xl font-display font-semibold mb-6 text-black border-b border-black/10 pb-4">
            How to Apply
          </h2>
          <p className="text-black/75 leading-relaxed mb-6">
            We periodically recruit for new volunteer classes. Please check our Workday portal for active volunteer listings and application requirements.
          </p>
          <a href="https://metmuseum.wd5.myworkdayjobs.com/en-US/metmuseumcareers" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-black !text-white font-semibold rounded-full hover:bg-black/80 transition-colors">
            View Volunteer Openings
          </a>
        </div>
      </section>
    </div>
  );
}
