import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const DrugReportPagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { currentPage, totalPages, totalItems, limit } = pagination;

  // Generate page numbers to display (max 3 pages)
  const getDisplayedPages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const displayedPages = getDisplayedPages();
  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, totalItems);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Info Text - Left side on desktop */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 order-2 lg:order-1">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">{from}</span> sampai{" "}
            <span className="font-semibold text-gray-900">{to}</span> dari{" "}
            <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
            transaksi
          </div>

          {/* Mobile only additional info */}
          <div className="text-xs text-gray-500 text-center sm:hidden">
            Halaman {currentPage} dari {totalPages}
          </div>
        </div>

        {/* Pagination Controls - Right side on desktop */}
        <div className="order-1 lg:order-2">
          <nav
            className="flex items-center justify-center gap-1"
            aria-label="Pagination"
          >
            {/* First Page Button */}
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Halaman pertama"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous Button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-2">
              {displayedPages.map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                    page === currentPage
                      ? "bg-primary text-white border-2 border-primary shadow-md transform scale-105"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400"
                  }`}
                  aria-label={`Halaman ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page Button */}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              aria-label="Halaman terakhir"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DrugReportPagination;
