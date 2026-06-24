import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Metropolitan Museum of Art",
  description: "Terms and Conditions of use for The Metropolitan Museum of Art website.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <section className="bg-[#f3f4f4] border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black sm:text-6xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-sm text-black/60 uppercase tracking-widest">
            Last Updated: June 2026
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="prose prose-lg prose-black max-w-none">
          <p className="lead font-medium text-black/80">
            Welcome to the website of The Metropolitan Museum of Art. By using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          
          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">1. Use of the Site</h2>
          <p>
            The Metropolitan Museum of Art ("The Met") provides this website to support its mission to connect people to creativity, knowledge, and ideas through art. You may use the site for personal, educational, and non-commercial purposes only.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">2. Intellectual Property and Open Access</h2>
          <p>
            The Met is committed to providing open access to images of art in the public domain. Images of artworks in the Museum's collection that the Museum believes to be in the public domain, or those to which the Museum waives any copyright it might have, are designated as Open Access and made available under Creative Commons Zero (CC0).
          </p>
          <p>
            All other text, images, marks, logos, and other content of the site are the property of The Met or used with permission, and are protected by copyright and other laws.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">3. User Submissions</h2>
          <p>
            Any comments, feedback, or other submissions you provide to The Met through this site shall be considered non-confidential and the property of The Met. The Met reserves the right to use, reproduce, modify, or distribute such submissions for any purpose without restriction or compensation.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">4. Links to Third-Party Sites</h2>
          <p>
            This website may contain links to third-party websites. The Met does not control those sites and is not responsible for their content. The inclusion of links does not imply endorsement by The Met.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">5. Disclaimer of Warranties</h2>
          <p>
            This website and its content are provided "as is" without any warranties of any kind, either express or implied, including warranties of merchantability or fitness for a particular purpose. The Met does not warrant that the site will be uninterrupted or error-free.
          </p>

          <h2 className="font-display text-2xl font-bold mt-10 mb-4 border-b border-black/10 pb-2">6. Limitation of Liability</h2>
          <p>
            The Met, its trustees, officers, employees, and agents shall not be liable for any damages arising out of or in connection with your use of this site or any information contained herein.
          </p>

          <div className="mt-16 bg-[#f3f4f4] p-6 rounded-xl border border-black/10 text-sm text-black/70">
            <strong>Note:</strong> This is a mock Terms and Conditions page generated for the FBLA 2025-2026 Web Application competition. This does not represent the official legal policies of The Metropolitan Museum of Art.
          </div>
        </div>
      </section>
    </div>
  );
}
