"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { useRef, useState } from "react";

const previewVideoSrc =
  "https://rr3---sn-j5caxoxu-hh0s.googlevideo.com/videoplayback/expire/1782251264/ei/n6o6aqn_O_3Pp-oPyc3N-QU/ip/172.71.164.122/id/o-ALqLL0WSbFsrdhGA0HJuN_R1OugFh5lkELL1HNSdowEk/source/youtube/requiressl/yes/xpc/EgVo2aDSNQ%3D%3D/rms/au,au/ctier/A/pfa/5/hightc/yes/siu/1/bui/ARmQxEW8KRUgTDZqVPhpttGUbcVDbGW0PjCJcKI_uVSDikdBrKUObfDKftBrsjCpL9EX6cWN5w/spc/SQ-umsMXSgU_RnrMmQlRusHy_DUnSeUQgt7VcMTc5zziJR1jsism5BRWiw/vprv/1/svpuc/1/mime/video%2Fmp4/rqh/1/gir/yes/clen/41506985/dur/198.565/lmt/1781301013617508/itag/137/keepalive/yes/fexp/51565116,51565681,51987687,51993077/txp/5309224/sparams/expire,ei,ip,id,itag,source,requiressl,xpc,ctier,pfa,hightc,siu,bui,spc,vprv,svpuc,mime,rqh,gir,clen,dur,lmt/sig/AHEqNM4wRAIgU64OgW4mnvfkeVwC9eo6cNF3uC6hqFbdjLfc8ZuFdiwCIFELvWVbAHPEqhnEB7U-ggQzAm1vsEKz5T0LYBuI5r9Y/redirect_counter/1/rm/sn-4g5eke7z/rrc/104/req_id/d1a06362557aa3ee/cms_redirect/yes/cmsv/e/cps/100/ipbypass/yes/met/1782229678,/mh/T4/mip/74.90.233.58/mm/31/mn/sn-j5caxoxu-hh0s/ms/au/mt/1782228594/mv/u/mvi/3/pcm2cms/yes/pl/20/lsparams/cps,ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl,rms/lsig/APaTxxMwRAIgE2KWBy8exBCm73tuklucC7pN7wRriTdOwwdH3WLaHfICIGFe5XGp88BZreAjgQY6PpD-AZmtrpZp2NwDttjo-o2H";

export default function FeaturedExhibitionPreview() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleEnter = () => {
    setIsHovering(true);
    if (!videoRef.current) {
      return;
    }

    const playPromise = videoRef.current.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Some browsers block autoplay interactions until a direct media gesture.
      });
    }
  };

  const handleLeave = () => {
    setIsHovering(false);
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
  };

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  const handleNavigate = () => {
    router.push("/visit");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push("/visit");
    }
  };

  return (
    <section className="bg-[#e9e3dd] py-16 text-black sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-4xl font-semibold uppercase tracking-[0.02em]">Featured Exhibition</h2>
          <span className="inline-flex border border-black bg-black px-4 py-2 text-lg font-semibold uppercase tracking-[0.08em] text-white">
            Ongoing
          </span>
        </div>

        <div
          role="link"
          tabIndex={0}
          aria-label="Plan your visit"
          draggable={false}
          onClick={handleNavigate}
          onKeyDown={handleKeyDown}
          onDragStart={(event) => event.preventDefault()}
          className={`relative block overflow-hidden border-[0.5px] border-black/20 bg-black transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHovering ? "cursor-none shadow-[0_18px_38px_rgba(0,0,0,0.28)]" : "cursor-pointer"
          }`}
          style={{ cursor: isHovering ? "none" : "pointer" }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMove}
        >
          <div
            className={`pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovering ? "opacity-0" : "opacity-10"
            }`}
            aria-hidden
          />

          <video
            ref={videoRef}
            src={previewVideoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            className={`aspect-[16/6] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHovering ? "scale-[1.02]" : "scale-100"
            }`}
            style={{ cursor: isHovering ? "none" : "pointer" }}
          />

          <div
            className={`pointer-events-none absolute z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl font-semibold text-black shadow-[0_12px_26px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-300 ease-out md:flex ${
              isHovering ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
            aria-hidden
          >
            <span className="-rotate-12">Tickets</span>
          </div>
        </div>

        <div className="border-b border-black/20 py-7">
          <div className="grid gap-6 lg:grid-cols-[0.33fr_0.47fr_0.2fr] lg:items-start">
            <h3 className="font-display text-5xl font-semibold leading-[0.9] sm:text-6xl">RAPHAEL: SUBLIME POETRY</h3>
            <p className="pt-1 text-lg leading-snug text-black/90 sm:text-xl">
              This landmark exhibition explores Raphael&apos;s sublime and poetic approach to painting, showcasing his masterful drawings, portraits, and religious works that defined the High Renaissance.
            </p>
            <p className="pt-1 text-base text-black/85 sm:text-lg">
              Out of Public:
              <br />
              <span className="font-semibold text-black">March 29, 2026</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <Link href="/exhibitions" className="swoop-link inline-flex items-center gap-2 text-lg font-semibold uppercase tracking-[0.06em] text-black sm:text-xl">
            View Details
            <span className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-black text-base leading-none" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
