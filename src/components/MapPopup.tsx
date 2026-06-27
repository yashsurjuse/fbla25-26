"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut } from "lucide-react";

type Building = "MET" | "MET_CLOISTERS";
type Floor = "GROUND" | "1" | "1M" | "2" | "3" | "4" | "5";

interface MapPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialBuilding?: Building;
}

export default function MapPopup({ isOpen, onClose, initialBuilding = "MET" }: MapPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [building, setBuilding] = useState<Building>(initialBuilding);
  const [floor, setFloor] = useState<Floor>("1");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Drag to pan state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const MET_FLOORS: Floor[] = ["5", "4", "3", "2", "1M", "1", "GROUND"];
  const CLOISTERS_FLOORS: Floor[] = ["1", "GROUND"];

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setBuilding(initialBuilding);
      setFloor(initialBuilding === "MET" ? "1" : "1");
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        document.body.style.overflow = "";
        setIsZoomed(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialBuilding]);

  useEffect(() => {
    if (!isZoomed) {
      setTranslateX(0);
      setTranslateY(0);
    }
  }, [isZoomed]);

  if (!isOpen && !isAnimating) return null;
  if (!mounted) return null;

  const imageSrc = `/MET-MAP/Floor-${floor}-${building}.png`;

  const handleBuildingChange = (b: Building) => {
    setBuilding(b);
    setFloor(b === "MET" ? "1" : "1");
    setIsZoomed(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setStartX(e.pageX - translateX);
    setStartY(e.pageY - translateY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    e.preventDefault();
    setTranslateX(e.pageX - startX);
    setTranslateY(e.pageY - startY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - translateX);
    setStartY(e.touches[0].pageY - translateY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isZoomed) return;
    setTranslateX(e.touches[0].pageX - startX);
    setTranslateY(e.touches[0].pageY - startY);
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-4 sm:p-8 transition-all duration-300 ${
        isAnimating ? "bg-black/80 opacity-100" : "bg-transparent opacity-0"
      }`}
    >
      <div
        className={`relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl h-[90vh] transition-all duration-300 transform ${
          isAnimating ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6 bg-[#fcfcfc]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12">
              <img src="/TheMetFill.webp" alt="The Met" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-black">Inside the Museum</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Sidebar Controls */}
          <div className="flex w-full lg:w-72 flex-col border-r border-gray-200 bg-gray-50 p-4 lg:p-6 overflow-y-auto shrink-0 max-h-[35vh] lg:max-h-none">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Select Building
            </h3>
            <div className="mb-8 flex flex-col gap-2">
              <button
                onClick={() => handleBuildingChange("MET")}
                className={`rounded-xl px-4 py-3 text-left font-bold transition-all ${
                  building === "MET"
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                The Met Fifth Avenue
              </button>
              <button
                onClick={() => handleBuildingChange("MET_CLOISTERS")}
                className={`rounded-xl px-4 py-3 text-left font-bold transition-all ${
                  building === "MET_CLOISTERS"
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                The Met Cloisters
              </button>
            </div>

            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              Select Floor
            </h3>
            <div className="flex flex-col gap-2">
              {(building === "MET" ? MET_FLOORS : CLOISTERS_FLOORS).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFloor(f);
                    setIsZoomed(false);
                  }}
                  className={`rounded-lg px-4 py-2.5 text-left font-semibold transition-all ${
                    floor === f
                      ? "bg-[color:var(--accent)] text-white"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  Floor {f}
                </button>
              ))}
            </div>
          </div>

          {/* Map Viewer */}
          <div className="relative flex-1 bg-[#e9e3dd] overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Toolbar */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-lg hover:bg-gray-100 transition-colors"
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                {isZoomed ? "Zoom Out" : "Zoom In"}
              </button>
            </div>

            <div
              className={`w-full h-full relative overflow-hidden flex items-center justify-center select-none ${
                isZoomed ? "cursor-grab active:cursor-grabbing touch-none" : "cursor-zoom-in"
              }`}
              onMouseDown={isZoomed ? handleMouseDown : undefined}
              onMouseLeave={isZoomed ? handleMouseUp : undefined}
              onMouseUp={isZoomed ? handleMouseUp : undefined}
              onMouseMove={isZoomed ? handleMouseMove : undefined}
              onTouchStart={isZoomed ? handleTouchStart : undefined}
              onTouchEnd={isZoomed ? handleTouchEnd : undefined}
              onTouchMove={isZoomed ? handleTouchMove : undefined}
              onClick={() => {
                if (!isZoomed) setIsZoomed(true);
              }}
            >
              <img
                src={imageSrc}
                alt={`Map of ${building} - Floor ${floor}`}
                draggable={false}
                className={`max-w-full max-h-full object-contain pointer-events-none select-none ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
                style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${isZoomed ? 1.75 : 1})` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
