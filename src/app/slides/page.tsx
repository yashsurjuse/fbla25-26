"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SlidesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f4]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-black hover:text-[#e4002b] transition-colors font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" /> Return to main site
        </Link>
        <h1 className="font-display font-bold text-xl text-black hidden sm:block"></h1>
        <div className="w-[150px] hidden sm:block"></div> {/* Spacer to center title */}
      </header>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 lg:min-w-[360px] lg:max-w-md border-b lg:border-b-0 lg:border-r border-black/10 bg-white flex flex-col p-8 shrink-0 lg:overflow-y-auto">
          <h2 className="font-display text-4xl font-bold mb-6 text-black tracking-tight">FBLA 25-26 Website Design</h2>
          <p className="text-black/70 mb-10 text-base leading-relaxed">
            Choose a presentation format to view our slides.
          </p>
          
          <div className="flex flex-col gap-5">
            <a 
              href="https://canva.link/fblawebdesign" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col p-6 rounded-2xl border border-black/10 hover:border-black/30 hover:shadow-xl transition-all bg-gradient-to-br from-white to-black/5"
            >
              <h3 className="font-bold text-xl text-black mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Canva Presentation
                  <span className="bg-[#e4002b] text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">Preferred</span>
                </span>
                <span className="text-[#e4002b] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">&rarr;</span>
              </h3>
              <p className="text-sm text-black/60 font-medium">View our slides with interactive elements and animations on Canva.</p>
            </a>

            <a 
              href="https://1drv.ms/p/c/472066a6a3bb27e4/IQAU5GOP4q4lQr-Xj_yhL5t9AR5MS45PEh2yZPa1tmEiYSY?e=nwI4vL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col p-6 rounded-2xl border border-black/10 hover:border-black/30 hover:shadow-xl transition-all bg-gradient-to-br from-white to-black/5"
            >
              <h3 className="font-bold text-xl text-black mb-2 flex items-center justify-between">
                PowerPoint Presentation 
                <span className="text-[#e4002b] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">&rarr;</span>
              </h3>
              <p className="text-sm text-black/60 font-medium">View the standard PowerPoint version of our slides.</p>
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-[#e9e3dd] p-4 sm:p-8 flex items-center justify-center min-h-[60vh] lg:min-h-0">
          <div className="w-full h-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-black/10 flex flex-col relative">
            <div className="bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest flex justify-between items-center z-10 shrink-0">
              <span>Judge Notes</span>
              <span className="opacity-50">PDF Viewer</span>
            </div>
            {/* We'll use an iframe or embed */}
            <div className="flex-1 relative w-full h-full bg-[#333]">
              <iframe 
                src="/FBLA 25-26 Website Design Judge Notes Google Docs.pdf" 
                className="absolute inset-0 w-full h-full border-0"
                title="FBLA Judge Notes"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
