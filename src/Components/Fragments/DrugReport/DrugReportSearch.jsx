import React from "react";
import { Search } from "lucide-react";

const DrugReportSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
          <Search className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Pencarian
        </h3>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cari obat berdasarkan nama, kategori, atau tipe transaksi..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white"
        />
      </div>
    </div>
  );
};

export default DrugReportSearch;
