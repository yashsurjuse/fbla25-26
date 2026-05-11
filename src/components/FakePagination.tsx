type FakePaginationProps = {
  totalPages: number;
  currentPage: number;
  label: string;
  onPageChange: (page: number) => void;
};

export default function FakePagination({
  totalPages,
  currentPage,
  label,
  onPageChange,
}: FakePaginationProps) {
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
            <span className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/70">
              ...
            </span>
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
          <span className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/70">
            ...
          </span>
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
    </nav>
  );
}
