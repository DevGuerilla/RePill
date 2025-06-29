import React, { useState } from "react";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  Hash,
  Calendar,
  Filter,
  Search,
} from "lucide-react";

const PredictionTable = ({ data, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="h-3 w-3" />;
      case "high":
        return <TrendingUp className="h-3 w-3" />;
      case "medium":
        return <Clock className="h-3 w-3" />;
      case "low":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "urgent":
        return "Mendesak";
      case "high":
        return "Tinggi";
      case "medium":
        return "Sedang";
      case "low":
        return "Rendah";
      default:
        return "Tidak Diketahui";
    }
  };

  const getStockStatusColor = (ratio) => {
    if (ratio < 0.5) return "text-red-600";
    if (ratio < 1) return "text-orange-600";
    if (ratio < 2) return "text-yellow-600";
    return "text-green-600";
  };

  // Filter and sort data
  const filteredData = data
    .filter((item) => {
      const matchesSearch =
        item.medicine_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.medicine_code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || item.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "days_until_empty") {
        return a.days_until_empty - b.days_until_empty;
      }
      if (sortBy === "need_to_buy") {
        return b.need_to_buy - a.need_to_buy;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div
          className="flex justify-center items-center h-64"
          role="status"
          aria-label="Memuat data prediksi"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto"></div>
            <p
              className="mt-4 text-gray-600 font-medium"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Memuat data prediksi...
            </p>
            <span className="sr-only">Memuat...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header with Filters */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3
                className="font-semibold text-gray-900"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
              >
                Rekomendasi Pembelian
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
              >
                {filteredData.length} dari {data.length} obat
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search - Made wider */}
            <div className="relative sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama obat atau kode obat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white hover:border-primary min-h-[44px]"
              />
            </div>

            {/* Priority Filter - Enhanced styling */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white hover:border-primary cursor-pointer min-h-[44px]"
              >
                <option value="all">Semua Prioritas</option>
                <option value="urgent">Mendesak</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Sort By - Enhanced styling */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-52 pl-4 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white hover:border-primary cursor-pointer min-h-[44px]"
              >
                <option value="priority">Prioritas</option>
                <option value="days_until_empty">Hari Tersisa</option>
                <option value="need_to_buy">Kebutuhan Beli</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {/* Mobile Card View */}
      <div className="block xl:hidden">
        <div className="divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <article
                key={item.medicine_id}
                className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
                role="article"
                aria-label={`Obat ${item.medicine_name}`}
              >
                <div className="space-y-4">
                  {/* Header Row - Medicine Info + Priority */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {item.medicine_name?.charAt(0)?.toUpperCase() || "M"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                            {item.medicine_name}
                          </h4>
                          <p className="text-sm text-gray-500 font-mono">
                            {item.medicine_code}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                              item.priority
                            )}`}
                          >
                            {getPriorityIcon(item.priority)}
                            <span className="ml-1">
                              {getPriorityLabel(item.priority)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Current Stock */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Stok Saat Ini
                        </span>
                        <Hash className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-gray-900">
                          {item.current_stock} unit
                        </div>
                        <div
                          className={`text-sm font-medium ${getStockStatusColor(
                            item.stock_ratio
                          )}`}
                        >
                          Rasio: {item.stock_ratio.toFixed(2)}x
                        </div>
                      </div>
                    </div>

                    {/* Usage Info */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Penggunaan
                        </span>
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">
                            {item.total_used_30_days}
                          </span>{" "}
                          unit / 30 hari
                        </div>
                        <div className="text-xs text-primary">
                          Prediksi:{" "}
                          <span className="font-medium">
                            {item.predicted_monthly_need}
                          </span>{" "}
                          unit
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Rekomendasi
                        </span>
                        <ShoppingCart className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          Stok ideal:{" "}
                          <span className="font-medium">
                            {item.recommended_stock}
                          </span>{" "}
                          unit
                        </div>
                        {item.need_to_buy > 0 ? (
                          <div className="text-sm font-medium text-orange-600">
                            Perlu beli: {item.need_to_buy} unit
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-green-600">
                            Stok mencukupi
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time Status */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Status Waktu
                        </span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {item.days_until_empty} hari tersisa
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="flex flex-col items-center">
                <Package className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada data ditemukan
                </h3>
                <p className="text-gray-500">
                  {searchTerm || priorityFilter !== "all"
                    ? "Tidak ada obat yang sesuai dengan filter"
                    : "Belum ada data prediksi tersedia"}
                </p>
              </div>
            </div>
          )}
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
                    <Package className="h-4 w-4" />
                    Informasi Obat
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Penggunaan & Prediksi
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Stok Saat Ini
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Rekomendasi
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Status & Waktu
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.medicine_id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    {/* Medicine Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow">
                            <span className="text-white font-semibold text-sm">
                              {item.medicine_name?.charAt(0)?.toUpperCase() ||
                                "M"}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.medicine_name}
                          </div>
                          <div className="text-sm text-gray-500 font-mono">
                            {item.medicine_code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Usage & Prediction */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">
                            {item.total_used_30_days}
                          </span>{" "}
                          unit / 30 hari
                        </div>
                        <div className="text-sm text-gray-500">
                          Rata-rata:{" "}
                          <span className="font-medium">
                            {item.average_daily_usage.toFixed(2)}
                          </span>{" "}
                          unit/hari
                        </div>
                        <div className="text-sm text-primary">
                          Prediksi bulanan:{" "}
                          <span className="font-medium">
                            {item.predicted_monthly_need}
                          </span>{" "}
                          unit
                        </div>
                      </div>
                    </td>

                    {/* Current Stock */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-gray-900">
                          {item.current_stock} unit
                        </div>
                        <div
                          className={`text-sm font-medium ${getStockStatusColor(
                            item.stock_ratio
                          )}`}
                        >
                          Rasio: {item.stock_ratio.toFixed(2)}x
                        </div>
                      </div>
                    </td>

                    {/* Recommendation */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          Stok ideal:{" "}
                          <span className="font-medium">
                            {item.recommended_stock}
                          </span>{" "}
                          unit
                        </div>
                        {item.need_to_buy > 0 ? (
                          <div className="text-sm font-medium text-orange-600">
                            Perlu beli: {item.need_to_buy} unit
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-green-600">
                            Stok mencukupi
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {getPriorityIcon(item.priority)}
                          <span className="ml-1">
                            {getPriorityLabel(item.priority)}
                          </span>
                        </span>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.days_until_empty} hari tersisa
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Package className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Tidak ada data ditemukan
                      </h3>
                      <p className="text-gray-500">
                        {searchTerm || priorityFilter !== "all"
                          ? "Tidak ada obat yang sesuai dengan filter"
                          : "Belum ada data prediksi tersedia"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
