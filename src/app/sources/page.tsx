"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const websiteDesignSources = [
  "American Alliance of Museums. “10 Tips for Creating an Engaging Museum Website.” American Alliance of Museums, 14 Dec. 2023, https://www.aam-us.org/2023/12/14/10-tips-for-creating-an-engaging-museum-website/.",
  "Clay. “Web Design Guide: Everything You Need to Know.” Clay, https://clay.global/blog/web-design-guide.",
  "Coursera. “Free Web Design Courses.” Coursera, https://www.coursera.org/courses?query=free&skills=Web%20Design.",
  "Creative Tim. “Books Every Web Designer Should Read.” Creative Tim Blog, https://www.creative-tim.com/blog/web-design/books-every-web-designer-should-read/.",
  "Design Resources. “Design Resources.” Designresourc.es, https://designresourc.es/.",
  "DesignRush. “Best Modern Website Designs and Trends.” DesignRush, https://www.designrush.com/best-designs/websites/trends/best-modern-website-designs.",
  "Elegant Themes. “Web Design Inspiration: The Best Website Designs.” Elegant Themes Blog, https://www.elegantthemes.com/blog/design/web-design-inspiration.",
  "Figma. “Website Layout Ideas.” Figma Resource Library, https://www.figma.com/resource-library/website-layout-ideas/.",
  "GrayGrids. “Best Free Web Design & Front-End Development Tools and Resources.” GrayGrids Blog, https://graygrids.com/blog/best-free-web-design-fronted-development-tools-and-resources.",
  "Great Learning. “Free Web Design Courses.” Great Learning, https://www.mygreatlearning.com/web-design/free-courses.",
  "LibGuides. “Evaluating Sources: Quality Web Sources.” Otis College of Art and Design Libraries, https://otis.libguides.com/quality_web_sources/types.",
  "LibGuides. “Evaluating Information Sources.” Point Loma Nazarene University Library, https://libguides.pointloma.edu/c.php?g=648535&p=4548282.",
  "Purple Rock Scissors. “10 Components Your Museum Website Needs to Succeed.” Purple Rock Scissors, https://www.purplerockscissors.com/journal/10-components-your-museum-website-needs-to-succeed.",
  "Tiller Digital. “17 Free Web Design Tools & Resources.” Tiller Digital, https://tillerdigital.com/blog/17-free-web-design-tools-resources/.",
  "Toools. “Toools: Design Tools and Resources.” Toools, https://www.toools.design/.",
  "UXtweak. “The Best Website Design Resources for 2025.” UXtweak Blog, https://blog.uxtweak.com/the-best-website-design-resources-for-2025/.",
  "Webflow. “Responsive Web Design: A Beginner’s Guide.” Webflow Blog, https://webflow.com/blog/responsive-web-design.",
  "Webflow. “Web Design Inspiration: Examples and Ideas.” Webflow Blog, https://webflow.com/blog/web-design-inspiration.",
  "Webflow. “Web Design Tools: The Best Tools for Designers.” Webflow Blog, https://webflow.com/blog/web-design-tools.",
  "WebsiteSetup. “Website Layouts: 27 Examples and Ideas.” WebsiteSetup, https://websitesetup.org/website-layouts/.",
  "“Graphic Design Forum: What Is the Best Web Design Book?” Graphic Design Forum, http://graphicdesignforum.com/t/what-is-the-best-web-design-book/28173."
];

const websiteContentSources = [
  "The Metropolitan Museum of Art. “Directions and Parking.” The Metropolitan Museum of Art, https://www.metmuseum.org/policies/directions-and-parking.",
  "The Metropolitan Museum of Art. “Educators.” The Metropolitan Museum of Art, https://www.metmuseum.org/learn/educators.",
  "The Metropolitan Museum of Art. “Museum Archives.” The Metropolitan Museum of Art, https://www.metmuseum.org/art/libraries-and-research-centers/museum-archives.",
  "The Metropolitan Museum of Art. “Art Collection Search.” The Metropolitan Museum of Art, https://www.metmuseum.org/art/collection/search.",
  "The Metropolitan Museum of Art. “The Metropolitan Museum of Art Guide.” The Metropolitan Museum of Art Publications, https://www.metmuseum.org/met-publications/the-metropolitan-museum-of-art-guide.",
  "The Metropolitan Museum of Art. “The Metropolitan Museum of Art Guide to the Collections: Prints.” The Metropolitan Museum of Art Publications, https://www.metmuseum.org/met-publications/the-metropolitan-museum-of-art-guide-to-the-collections-prints.",
  "The Metropolitan Museum of Art. “Guide to Museum Objects.” The Metropolitan Museum of Art Watson Library, https://www.metmuseum.org/-/media/files/art/watson-library/guide_metobjects.pdf?sc_lang=en.",
  "The Metropolitan Museum of Art. “Image Resources.” The Metropolitan Museum of Art, https://www.metmuseum.org/policies/image-resources.",
  "The Metropolitan Museum of Art. “How We Collect.” The Metropolitan Museum of Art Perspectives, https://www.metmuseum.org/perspectives/how-we-collect.",
  "The Metropolitan Museum of Art. “Thomas J. Watson Library Research.” The Metropolitan Museum of Art, https://www.metmuseum.org/art/libraries-and-research-centers/thomas-j-watson-library/research.",
  "The Metropolitan Museum of Art. “Behind the Scenes.” The Metropolitan Museum of Art Perspectives, https://www.metmuseum.org/perspectives/all?topic=behind-the-scenes.",
  "The Metropolitan Museum of Art. “Online Collection User Research.” The Metropolitan Museum of Art Perspectives, https://www.metmuseum.org/perspectives/online-collection-user-research.",
  "The Metropolitan Museum of Art. “Digital Collections Search.” Metropolitan Museum of Art Libraries, https://libmma.contentdm.oclc.org/digital/search.",
  "Wonderful Museums. “Met Museum Catalog.” Wonderful Museums, https://www.wonderfulmuseums.com/museum/met-museum-catalog/.",
  "Frieze. “Frieze Week Magazine New York 2025: Metropolitan Museum of Art Vanguard Council.” Frieze, https://www.frieze.com/article/frieze-week-magazine-new-york-2025-metropolitan-museum-art-vanguard-council.",
  "The Art Newspaper. “Metropolitan Museum Rockefeller Wing Renovation: Kulapat Yantrasast.” The Art Newspaper, 13 May 2025, https://www.theartnewspaper.com/2025/05/13/metropolitan-museum-rockefeller-wing-renovation-kulapat-antrasast.",
  "Wikipedia contributors. “Metropolitan Museum of Art.” Wikipedia, The Free Encyclopedia, Wikimedia Foundation, https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art."
];

export default function SourcesPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { title: "Website Design", data: websiteDesignSources },
    { title: "Website Content", data: websiteContentSources }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f4]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-black/10 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-black hover:text-[#e4002b] transition-colors font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> Return to main site
        </Link>
        <h1 className="font-display font-bold text-xl text-black">Sources</h1>
        <div className="w-[120px]"></div>
      </header>

      {/* Main content */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-12 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-black mb-4">Works Cited</h2>
          <p className="text-black/70 max-w-xl mx-auto text-sm sm:text-base">
            Sources used in the design and content creation, formatted in MLA.
          </p>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center justify-between mb-6 bg-white p-2 rounded-full border border-black/10 shadow-sm max-w-xs mx-auto w-full">
          <button 
            onClick={() => setActiveSlide(0)} 
            disabled={activeSlide === 0}
            className={`p-2 rounded-full transition-colors ${activeSlide === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/5 text-black"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-sm uppercase tracking-widest text-black">
            Slide {activeSlide + 1} of {slides.length}
          </span>
          <button 
            onClick={() => setActiveSlide(1)} 
            disabled={activeSlide === 1}
            className={`p-2 rounded-full transition-colors ${activeSlide === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-black/5 text-black"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content */}
        <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden flex flex-col">
          <h3 className="font-display text-3xl font-bold text-black mb-8 border-b border-black/10 pb-4">
            {slides[activeSlide].title}
          </h3>
          <ul className="space-y-6 overflow-y-auto pr-4 flex-1">
            {slides[activeSlide].data.map((source, idx) => (
              <li key={idx} className="text-sm sm:text-base text-black/80 leading-relaxed pl-8 -indent-8 break-words">
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
