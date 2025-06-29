import React from "react";
import {
  Activity,
  Pill,
  Calendar,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const DashDragReport = ({ data, loading, pagination }) => {
  const getTypeLabel = (type) => {
    return type === "out" ? "Keluar" : "Masuk";
  };

  const getTypeBadgeColor = (type) => {
    return type === "out"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  const getTypeIcon = (type) => {
    return type === "out" ? (
      <TrendingDown className="h-3 w-3 mr-1" />
    ) : (
      <TrendingUp className="h-3 w-3 mr-1" />
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div
          className="flex justify-center items-center h-64"
          role="status"
          aria-label="Memuat data transaksi obat"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className="mt-4 text-gray-600 font-medium"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Memuat data transaksi obat...
            </p>
            <span className="sr-only">Memuat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-16">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Activity className="h-8 w-8 text-gray-500" />
          </div>
          <h3
            className="font-semibold text-gray-900 mb-2"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
          >
            Tidak ada transaksi ditemukan
          </h3>
          <p
            className="text-gray-500 max-w-md mx-auto"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Belum ada data transaksi obat yang tersedia atau tidak ada yang
            sesuai dengan kriteria pencarian Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Data Transaksi Obat
              </h3>
              <p className="text-sm text-gray-600">
                Riwayat transaksi masuk dan keluar obat
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pagination && (
              <span className="px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
                {data.length} dari {pagination.totalItems} transaksi
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block xl:hidden">
        <div className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <article
              key={item.id}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
              aria-label={`Transaksi ${item.drugName}`}
            >
              {/* Mobile Layout */}
              <div className="space-y-4">
                {/* Header Row - Avatar + Name + Type */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {item.drugName?.charAt(0)?.toUpperCase() || "O"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                          {item.drugName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Kategori: {item.category}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getTypeBadgeColor(
                            item.type
                          )}`}
                        >
                          {getTypeIcon(item.type)}
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Section - Better grid layout */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                          <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Jumlah
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {item.usageCount} unit
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Tanggal
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.lastUsed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden xl:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4" />
                    Informasi Obat
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Jumlah & Tipe
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tanggal Transaksi
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow">
                          <span className="text-white font-semibold text-sm">
                            {item.drugName?.charAt(0)?.toUpperCase() || "O"}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.drugName}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <div className="p-1.5 bg-gray-100 rounded mr-3">
                        <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.usageCount} unit
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full mt-1 ${getTypeBadgeColor(
                            item.type
                          )}`}
                        >
                          {getTypeIcon(item.type)}
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="p-1.5 bg-gray-100 rounded mr-3">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.lastUsed}
                        </div>
                        <div className="text-xs text-gray-500">
                          Transaksi {getTypeLabel(item.type).toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashDragReport;
