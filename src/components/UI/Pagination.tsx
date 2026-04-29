import type { PaginationProps } from "../../types/product";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    hasNext,
    hasPrev,
}: PaginationProps) {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-between mt-6">
            {/* Prev Button */}
            <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Prev
            </button>

            {/* Page Info */}
            <div className="text-sm text-gray-600 ">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={!hasNext}
                className="px-4 py-2 text-sm rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                Next
            </button>
        </div>
    );
}