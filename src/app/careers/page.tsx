import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | The Metropolitan Museum of Art",
  description: "Join the dedicated team of professionals at The Metropolitan Museum of Art.",
};

export default function CareersPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Careers
          </h1>
          <p className="mt-6 text-xl text-black/80 leading-relaxed max-w-3xl">
            The Metropolitan Museum of Art is one of the world's largest and finest art museums. Our mission is to connect people to creativity, knowledge, and ideas through art. We employ a diverse team of over 2,000 professionals across various disciplines to bring this mission to life.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-black/5 flex flex-col">
            <h2 className="font-display text-3xl font-semibold mb-4 text-black">Current Openings</h2>
            <p className="text-black/80 mb-8 flex-1">
              Explore our current job opportunities across all departments, including Curatorial, Education, Security, Facilities, Technology, and Administration. We are an equal opportunity employer committed to diversity and inclusion.
            </p>
            <a href="/careers/openings" className="inline-block w-full text-center bg-black text-white px-6 py-4 rounded-full font-semibold hover:bg-black/80 transition-colors">
              View All Openings &rarr;
            </a>
          </div>

          <div className="bg-[#ece7de] p-8 sm:p-10 rounded-3xl shadow-sm border border-black/5 flex flex-col">
            <h2 className="font-display text-3xl font-semibold mb-4 text-black">Internships</h2>
            <p className="text-black/80 mb-8 flex-1">
              The Met offers paid internship opportunities for undergraduate and graduate students, as well as recent graduates. Interns gain hands-on experience and insight into museum professions.
            </p>
            <a href="/careers/internships" className="inline-block w-full text-center border-2 border-black text-black px-6 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
              Learn About Internships &rarr;
            </a>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-black/5 flex flex-col">
            <h2 className="font-display text-3xl font-semibold mb-4 text-black">Fellowships</h2>
            <p className="text-black/80 mb-8 flex-1">
              The Museum hosts a vibrant community of scholars from around the world. We offer an array of fellowships for predoctoral and postdoctoral researchers in art history, conservation, and scientific research.
            </p>
            <a href="/careers/fellowships" className="inline-block w-full text-center border-2 border-black text-black px-6 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
              Fellowship Programs &rarr;
            </a>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-black/5 flex flex-col">
            <h2 className="font-display text-3xl font-semibold mb-4 text-black">Volunteer</h2>
            <p className="text-black/80 mb-8 flex-1">
              Volunteers are an essential part of The Met community. We offer various volunteer roles, including guiding tours, assisting visitors at information desks, and providing administrative support.
            </p>
            <a href="/careers/volunteer" className="inline-block w-full text-center border-2 border-black text-black px-6 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
              Become a Volunteer &rarr;
            </a>
          </div>

        </div>

        <div className="mt-16 bg-black text-white p-8 sm:p-12 rounded-3xl">
          <h2 className="font-display text-3xl font-bold mb-4">Equal Opportunity Employer</h2>
          <p className="text-white/80 leading-relaxed">
            The Metropolitan Museum of Art provides equal opportunity to all employees and applicants for employment without regard to race, color, religion, creed, sex, sexual orientation, national origin, ancestry, age, mental or physical disability, pregnancy, alienage or citizenship status, marital status or domestic partner status, genetic information, genetic predisposition or carrier status, gender identity, HIV status, military status and any other category protected by law in all employment decisions.
          </p>
        </div>
      </section>
    </div>
  );
}
