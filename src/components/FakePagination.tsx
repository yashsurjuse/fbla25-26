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
    <nav aria-label={`${label} pagination`} className="mx-auto mt-8 flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-10">
      <div className="inline-flex max-w-full items-stretch gap-2 overflow-x-auto border border-black/15 bg-white p-2">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-11 items-center gap-1 border border-black/10 bg-[#f4f4f4] px-4 text-base font-medium text-black/85 disabled:text-black/40"
        >
          <span aria-hidden>‹</span>
          <span>Back</span>
        </button>

        {start > 1 ? (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/80"
            >
              1
            </button>
            <button 
              onClick={() => setShowGoToModal(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/70 hover:bg-black/5"
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
            className={`inline-flex h-11 w-11 items-center justify-center border text-base font-semibold ${
              page === currentPage
                ? "border-black bg-black text-white"
                : "border-black/15 bg-[#f5f5f5] text-black/80"
            }`}
          >
            {page}
          </button>
        ))}

        {end < totalPages ? (
          <>
          <button 
            onClick={() => setShowGoToModal(true)}
            className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/70 hover:bg-black/5"
          >
            ...
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/80"
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
          className="inline-flex h-11 items-center gap-1 border border-black/10 bg-[#f4f4f4] px-4 text-base font-medium text-black/85 disabled:text-black/40"
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
