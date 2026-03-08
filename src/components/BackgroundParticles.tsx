'use client';

import Particles from "./Particles";

const BACKGROUND_COLORS = ["#ffffff", "#ffffff"];

export default function BackgroundParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Particles
        particleColors={BACKGROUND_COLORS}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        className="h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#02040a]/85 via-[#02040a]/70 to-[#02040a]" />
    </div>
  );
}
