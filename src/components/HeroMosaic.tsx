"use client";

import { useState } from "react";
import Link from "next/link";

const HERO_CELLS = [
  { img: "https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg", title: "Self-Portrait with a Straw Hat", artist: "Vincent van Gogh" },
  { img: "https://images.metmuseum.org/CRDImages/ao/original/DP231460.jpg", title: "Reliquary: Seated Figure", artist: "Kota peoples" },
  { img: "https://images.metmuseum.org/CRDImages/ep/original/DP346474.jpg", title: "Wheat Field with Cypresses", artist: "Vincent van Gogh" },
  { img: "https://images.metmuseum.org/CRDImages/ci/original/DT426.jpg", title: "Ball Gown", artist: "House of Worth" },
  { img: "https://images.metmuseum.org/CRDImages/eg/original/DP-24216-003.jpg", title: "Sphinx of Hatshepsut", artist: "Egyptian Art" },
  
  { img: "https://images.metmuseum.org/CRDImages/ep/original/DP-13139-001.jpg", title: "The Death of Socrates", artist: "Jacques-Louis David" },
  { img: "https://images.metmuseum.org/CRDImages/as/original/DP291187.jpg", title: "Standing Bodhisattva", artist: "Gandhara" },
  { img: "https://images.metmuseum.org/CRDImages/ad/original/DP215410.jpg", title: "Washington Crossing the Delaware", artist: "Emanuel Leutze" },
  { img: "https://images.metmuseum.org/CRDImages/aa/original/DP256970.jpg", title: "Armor of Henry II", artist: "French" },
  { img: "https://images.metmuseum.org/CRDImages/cl/original/DP118991.jpg", title: "The Unicorn Rests in a Garden", artist: "South Netherlandish" },
  
  { img: "https://images.metmuseum.org/CRDImages/gr/original/DP132634.jpg", title: "Marble Statue of Aphrodite", artist: "Greek" },
  { img: "https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg", title: "The Harvesters", artist: "Pieter Bruegel" },
  { img: "https://images.metmuseum.org/CRDImages/is/original/DT5434.jpg", title: "Shah Jahan on Horseback", artist: "Mughal" },
  { img: "https://images.metmuseum.org/CRDImages/gr/original/DP123903.jpg", title: "Bronze Statue of Eros Sleeping", artist: "Greek" },
  { img: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg", title: "Under the Wave off Kanagawa", artist: "Katsushika Hokusai" },

  { img: "https://images.metmuseum.org/CRDImages/ep/original/DP353257.jpg", title: "Young Woman with a Water Pitcher", artist: "Johannes Vermeer" },
  { img: "https://images.metmuseum.org/CRDImages/is/web-large/DT200627.jpg", title: "Akbar With Lion and Calf", artist: "Govardhan" },
  { img: "https://images.metmuseum.org/CRDImages/gr/web-large/DP-17469-001.jpg", title: "Terracotta hydria", artist: "Iliupersis Painter" },
  { img: "https://images.metmuseum.org/CRDImages/aa/web-large/DP-38099-003.jpg", title: "Armor of King Henry VIII", artist: "English" },
  { img: "https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg", title: "Study of a Young Woman", artist: "Johannes Vermeer" },
];

function HeroCell({ cell, index }: { cell: (typeof HERO_CELLS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative w-full h-full overflow-hidden bg-[#e9e3dd] ${hovered ? "z-[6]" : "z-0"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={cell.img}
        alt={cell.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: hovered ? "scale(1.15)" : "scale(1.02)" }}
        loading={index < 10 ? "eager" : "lazy"}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{cell.artist}</p>
        <p className="mt-1 text-sm font-semibold text-white leading-snug line-clamp-2">{cell.title}</p>
      </div>
    </div>
  );
}

export default function HeroMosaic() {
  return (
    <section className="relative h-[100vh] w-full bg-[#e9e3dd] pt-[84px] overflow-hidden">
      <div className="absolute inset-0 top-[84px] p-1 grid grid-cols-2 md:grid-cols-6 grid-rows-3 gap-1 bg-[#e9e3dd]">
        {HERO_CELLS.slice(0, 18).map((cell, i) => (
          <HeroCell key={i} cell={cell} index={i} />
        ))}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 top-[84px] bg-black/40 z-[5] pointer-events-none" />

      {/* Center Text Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-10 pt-[84px]">
        <h1 className="font-display text-[clamp(3.5rem,7vw,7rem)] font-black leading-[0.85] tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)] text-center">
          ART.<br />
          HISTORY.<br />
          CULTURE.<br />
          <span className="text-[#E4002B]">EXPLORE</span><br />
          THE MET.
        </h1>
        <Link
          href="/visit"
          className="pointer-events-auto mt-10 rounded-[2rem] bg-white px-8 py-3 text-sm font-bold tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          PLAN YOUR VISIT
        </Link>
      </div>
    </section>
  );
}
