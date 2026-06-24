import { Metadata } from "next";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Contact Us | The Metropolitan Museum of Art",
  description: "Get in touch with The Metropolitan Museum of Art.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <section className="bg-white border-b border-black/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
            Contact Information
          </h1>
          <p className="mt-6 text-xl text-black/80 leading-relaxed max-w-2xl mx-auto">
            Find the right department to assist you with your inquiry.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-16 sm:px-6 lg:px-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5">
          <Accordion title="General Inquiries">
            <p><strong>Phone:</strong> 212-535-7710</p>
            <p><strong>TTY:</strong> 212-650-2551</p>
            <p className="mt-4">
              For general questions regarding visiting the museum, hours, and guidelines, please review the Visitor Guidelines before contacting us.
            </p>
          </Accordion>

          <Accordion title="Ticketing and Admission">
            <p>For questions related to purchasing tickets online or managing group admissions:</p>
            <p className="mt-2"><strong>Email:</strong> tickets@metmuseum.org</p>
            <p><strong>Phone:</strong> 212-570-3949</p>
          </Accordion>

          <Accordion title="Membership">
            <p>If you have questions about your Membership, benefits, or how to join:</p>
            <p className="mt-2"><strong>Email:</strong> membership@metmuseum.org</p>
            <p><strong>Phone:</strong> 212-570-3753</p>
          </Accordion>

          <Accordion title="Education and Tours">
            <p>For questions regarding K-12 school programs, guided tours, and accessibility accommodations:</p>
            <p className="mt-2"><strong>Email:</strong> education@metmuseum.org</p>
            <p><strong>Accessibility specific:</strong> access@metmuseum.org</p>
          </Accordion>

          <Accordion title="Press and Media">
            <p>For all press inquiries, image requests for publication, and media passes:</p>
            <p className="mt-2"><strong>Email:</strong> communications@metmuseum.org</p>
            <p><strong>Phone:</strong> 212-570-3951</p>
          </Accordion>

          <Accordion title="Donations and Support">
            <p>To learn more about giving, corporate sponsorships, and planned gifts:</p>
            <p className="mt-2"><strong>Email:</strong> development@metmuseum.org</p>
            <p><strong>Phone:</strong> 212-650-2425</p>
          </Accordion>
        </div>

        <div className="mt-12 bg-black text-white p-8 sm:p-12 rounded-3xl text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Mail Us</h2>
          <p className="text-white/80 text-lg">
            The Metropolitan Museum of Art<br />
            1000 Fifth Avenue<br />
            New York, NY 10028
          </p>
        </div>
      </section>
    </div>
  );
}
