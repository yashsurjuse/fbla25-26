type FakePaginationProps = {
  totalPages: number;
  currentPage?: number;
  label: string;
};

export default function FakePagination({
  totalPages,
  currentPage = 1,
  label,
}: FakePaginationProps) {
  const leadingCount = Math.min(8, totalPages);
  const leadingPages = Array.from({ length: leadingCount }, (_, index) => index + 1);
  const showEllipsis = totalPages > leadingCount + 1;

  return (
    <nav aria-label={`${label} pagination`} className="mx-auto mt-8 flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-10">
      <div className="inline-flex max-w-full items-stretch gap-2 overflow-x-auto border border-black/15 bg-white p-2">
        <button
          type="button"
          aria-label="Previous page"
          className="inline-flex h-11 items-center gap-1 border border-black/10 bg-[#f4f4f4] px-4 text-base font-medium text-black/45"
        >
          <span aria-hidden>‹</span>
          <span>Back</span>
        </button>

        {leadingPages.map((page) => (
          <span
            key={page}
            className={`inline-flex h-11 w-11 items-center justify-center border text-base font-semibold ${
              page === currentPage
                ? "border-black bg-black text-white"
                : "border-black/15 bg-[#f5f5f5] text-black/80"
            }`}
          >
            {page}
          </span>
        ))}

        {showEllipsis ? (
          <span className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/70">
            ...
          </span>
        ) : null}

        {totalPages > leadingCount ? (
          <span className="inline-flex h-11 w-11 items-center justify-center border border-black/15 bg-[#f5f5f5] text-base font-semibold text-black/80">
            {totalPages}
          </span>
        ) : null}

        <button
          type="button"
          aria-label="Next page"
          className="inline-flex h-11 items-center gap-1 border border-black/10 bg-[#f4f4f4] px-4 text-base font-medium text-black/85"
        >
          <span>Next</span>
          <span aria-hidden>›</span>
        </button>
      </div>
    </nav>
  );
}
