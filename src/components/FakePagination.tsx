type FakePaginationProps = {
  totalPages: number;
  currentPage: number;
  label: string;
  onPageChange: (page: number) => void;
};

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function FakePagination({
  totalPages,
  currentPage,
  label,
  onPageChange,
}: FakePaginationProps) {
  const [showGoToModal, setShowGoToModal] = useState(false);
  const [goToInput, setGoToInput] = useState("");
  
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const middlePages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav aria-label={`${label} pagination`} className="mx-auto mt-16 flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-10">
      <div className="inline-flex max-w-full items-stretch gap-2 overflow-x-auto scrollbar-hide rounded-full border border-white/50 bg-white/60 p-2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/80 px-6 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-white hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
        >
          <span aria-hidden>‹</span>
          <span>Back</span>
        </button>

        {start > 1 ? (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/80 text-sm font-bold text-black transition-all hover:bg-white hover:shadow-md"
            >
              1
            </button>
            <button 
              onClick={() => setShowGoToModal(true)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/80 text-sm font-bold text-black/50 transition-all hover:bg-white hover:text-black hover:shadow-md"
            >
              ...
            </button>
          </>
        ) : null}

        {middlePages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all ${
              page === currentPage
                ? "bg-black text-white shadow-lg scale-105"
                : "border border-white/30 bg-white/80 text-black hover:bg-white hover:shadow-md"
            }`}
          >
            {page}
          </button>
        ))}

        {end < totalPages ? (
          <>
          <button 
            onClick={() => setShowGoToModal(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/80 text-sm font-bold text-black/50 transition-all hover:bg-white hover:text-black hover:shadow-md"
          >
            ...
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/80 text-sm font-bold text-black transition-all hover:bg-white hover:shadow-md"
          >
            {totalPages}
          </button>
          </>
        ) : null}

        <button
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/80 px-6 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-white hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
        >
          <span>Next</span>
          <span aria-hidden>›</span>
        </button>
      </div>

      {showGoToModal && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-6 shadow-2xl">
            <h3 className="mb-4 font-display text-xl font-bold text-black">Go to page</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const pageNum = parseInt(goToInput, 10);
                if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
                  onPageChange(pageNum);
                  setShowGoToModal(false);
                  setGoToInput("");
                }
              }}
              className="flex gap-2"
            >
              <input 
                type="number" 
                min={1} 
                max={totalPages}
                value={goToInput}
                onChange={(e) => setGoToInput(e.target.value)}
                placeholder={`1 - ${totalPages}`}
                className="flex-1 rounded-lg border border-black/20 bg-black/5 px-4 py-2 text-black focus:border-black focus:outline-none"
                autoFocus
              />
              <button type="submit" className="rounded-lg bg-black px-6 py-2 font-semibold text-white hover:bg-black/80">Go</button>
            </form>
            <button 
              onClick={() => setShowGoToModal(false)}
              className="mt-4 w-full rounded-lg py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition"
            >
              Cancel
            </button>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
