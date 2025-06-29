import React from "react";
import { useNavigate } from "react-router";
import {
  Edit,
  Trash2,
  Package,
  Calendar,
  Pill,
  MoreVertical,
  Eye,
  Hash,
} from "lucide-react";

const DashStock = ({ stocks, loading, onEdit, onDelete, pagination }) => {
  const navigate = useNavigate();

  const handleViewDetail = (stockId) => {
    navigate(`/dashboard/stock/${stockId}`);
  };

  const handleRowClick = (stockId, event) => {
    if (event.target.closest("button")) {
      return;
    }
    handleViewDetail(stockId);
  };

  const getTypeLabel = (type) => {
    const types = {
      tablet: "Tablet",
      capsule: "Kapsul",
      bottle: "Botol",
    };
    return types[type] || type;
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      tablet: "bg-blue-100 text-blue-800 border-blue-200",
      capsule: "bg-green-100 text-green-800 border-green-200",
      bottle: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStockStatus = (qty) => {
    if (qty === 0) {
      return {
        status: "Habis",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    } else if (qty <= 10) {
      return {
        status: "Menipis",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      };
    } else {
      return {
        status: "Tersedia",
        color: "bg-green-100 text-green-800 border-green-200",
      };
    }
  };

  const getExpirationStatus = (expiredAt) => {
    const now = new Date();
    const expirationDate = new Date(expiredAt);
    const timeDiff = expirationDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return {
        status: "Kedaluwarsa",
        color: "bg-red-100 text-red-800 border-red-200",
        textColor: "text-red-800",
      };
    } else if (daysDiff <= 30) {
      return {
        status: "Hampir Kedaluwarsa",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        textColor: "text-orange-800",
      };
    } else if (daysDiff <= 90) {
      return {
        status: "Perlu Perhatian",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        textColor: "text-yellow-800",
      };
    } else {
      return {
        status: "Masih Lama",
        color: "bg-green-100 text-green-800 border-green-200",
        textColor: "text-green-800",
      };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div
          className="flex justify-center items-center h-64"
          role="status"
          aria-label="Memuat data stok"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p
              className="mt-4 text-gray-600 font-medium"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Memuat data stok...
            </p>
            <span className="sr-only">Memuat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!stocks || stocks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-16">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Package className="h-8 w-8 text-gray-500" />
          </div>
          <h3
            className="font-semibold text-gray-900 mb-2"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
          >
            Tidak ada stok ditemukan
          </h3>
          <p
            className="text-gray-500 max-w-md mx-auto"
            style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
          >
            Belum ada data stok yang tersedia atau tidak ada yang sesuai dengan
            kriteria pencarian Anda.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatExpirationDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Daftar Stok Obat
              </h3>
              <p className="text-sm text-gray-600">
                Kelola semua stok obat sistem
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pagination && (
              <span className="px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
                {stocks.length} dari {pagination.total} stok
              </span>
            )}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block xl:hidden">
        <div className="divide-y divide-gray-200">
          {stocks.map((stock, index) => {
            const stockStatus = getStockStatus(stock.qty);
            const expirationStatus = getExpirationStatus(stock.expired_at);

            return (
              <article
                key={stock.uuid}
                className="p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={(e) => handleRowClick(stock.uuid, e)}
                role="button"
                tabIndex={0}
                aria-label={`Stok ${stock.medicine?.name}`}
              >
                {/* Mobile Layout */}
                <div className="space-y-4">
                  {/* Header Row - Avatar + Name + Stock Status */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {stock.medicine?.name?.charAt(0)?.toUpperCase() || "S"}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                            {stock.medicine?.name || "Nama tidak tersedia"}
                          </h4>
                          <p className="text-sm text-gray-500 truncate">
                            {stock.medicine?.description ||
                              "Tidak ada deskripsi"}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${stockStatus.color}`}
                          >
                            {stockStatus.status}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {stock.qty} unit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                            <Hash className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Kode
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-mono">
                          {stock.medicine?.code || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-white rounded-md flex-shrink-0">
                            <Package className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Jenis
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${getTypeBadgeColor(
                            stock.medicine?.type
                          )}`}
                        >
                          <Package className="h-3 w-3 mr-1" />
                          {getTypeLabel(stock.medicine?.type)}
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
                            Kadaluarsa
                          </span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-sm font-medium ${expirationStatus.textColor}`}
                          >
                            {formatExpirationDate(stock.expired_at)}
                          </span>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${expirationStatus.color}`}
                            >
                              {expirationStatus.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetail(stock.uuid);
                      }}
                      className="inline-flex items-center justify-center px-3 py-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                      aria-label="Lihat detail stok"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      Detail
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit && onEdit(stock);
                      }}
                      className="inline-flex items-center justify-center px-3 py-2 text-primary hover:text-primary-hover bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                      aria-label="Edit stok"
                    >
                      <Edit className="h-4 w-4 mr-1.5" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete && onDelete(stock.uuid);
                      }}
                      className="inline-flex items-center justify-center px-3 py-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium min-h-[40px]"
                      aria-label="Hapus stok"
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
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
                    <Hash className="h-4 w-4" />
                    Kode & Jenis
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Stok & Status
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tanggal Kadaluarsa
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocks.map((stock, index) => {
                const stockStatus = getStockStatus(stock.qty);
                const expirationStatus = getExpirationStatus(stock.expired_at);
                return (
                  <tr
                    key={stock.uuid}
                    onClick={(e) => handleRowClick(stock.uuid, e)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow">
                            <span className="text-white font-semibold text-sm">
                              {stock.medicine?.name?.charAt(0)?.toUpperCase() ||
                                "M"}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {stock.medicine?.name || "Nama tidak tersedia"}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {stock.medicine?.description ||
                              "Tidak ada deskripsi"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500 font-mono">
                          {stock.medicine?.code || "-"}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${getTypeBadgeColor(
                            stock.medicine?.type
                          )}`}
                        >
                          <Package className="h-3 w-3 mr-1" />
                          {getTypeLabel(stock.medicine?.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-gray-900">
                          {stock.qty} unit
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${stockStatus.color}`}
                        >
                          {stockStatus.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 text-gray-400 mr-2" />
                        <div>
                          <div
                            className={`font-medium ${expirationStatus.textColor}`}
                          >
                            {formatExpirationDate(stock.expired_at)}
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${expirationStatus.color} mt-1`}
                          >
                            {expirationStatus.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(stock.uuid);
                          }}
                          className="inline-flex items-center p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Lihat detail stok"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(stock);
                          }}
                          className="inline-flex items-center p-2 text-primary hover:text-primary-hover bg-primary-light hover:bg-primary-light/80 rounded-lg transition-colors"
                          title="Edit stok"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(stock.uuid);
                          }}
                          className="inline-flex items-center p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Hapus stok"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashStock;
