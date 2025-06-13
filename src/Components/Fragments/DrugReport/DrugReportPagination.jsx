import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DrugReportPagination = ({ pagination, onPageChange }) => {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan{" "}
          <span className="font-medium">
            {(pagination.currentPage - 1) * pagination.limit + 1}
          </span>{" "}
          sampai{" "}
          <span className="font-medium">
            {Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalItems
            )}
          </span>{" "}
          dari <span className="font-medium">{pagination.totalItems}</span>{" "}
          transaksi
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Sebelumnya
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {[...Array(pagination.totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={`page-${page}`}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === pagination.currentPage
                      ? "bg-primary text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Berikutnya
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrugReportPagination;
