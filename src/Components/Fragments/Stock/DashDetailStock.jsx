import React, { useState } from "react";
import { useDetailStock } from "../../../Hooks/Stock/useDetailStock";
import {
  Package,
  Pill,
  Building,
  ArrowLeft,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  Calendar,
  FileText,
  Hash,
  TrendingUp,
  Star,
  Boxes,
  Info,
  Award,
  Activity,
  Scan,
  X,
  Download,
  Maximize2,
} from "lucide-react";
import { useNavigate } from "react-router";

const DashDetailStock = ({ id, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { stock, loading, error, refetch } = useDetailStock(id);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  const handleBack = () => {
    navigate("/dashboard/stock");
  };

  const handleEdit = () => {
    if (onEdit && stock) {
      onEdit(stock);
    }
  };

  const handleDelete = () => {
    if (onDelete && stock) {
      onDelete();
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOpenBarcodeModal = () => {
    setIsBarcodeModalOpen(true);
  };

  const handleCloseBarcodeModal = () => {
    setIsBarcodeModalOpen(false);
  };

  const handleDownloadBarcode = () => {
    if (stock.barcode_image) {
      const link = document.createElement("a");
      link.href = stock.barcode_image;
      link.download = `barcode-${stock.medicine?.name || "medicine"}-${
        stock.barcode
      }.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Memuat detail stok...
          </p>
          <p className="text-gray-500 text-sm mt-1">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detail Stok</h1>
              <p className="text-gray-600 mt-1">Informasi detail stok obat</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Terjadi Kesalahan
              </h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={refetch}
                className="mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Stok tidak ditemukan
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Stok yang Anda cari tidak tersedia.
        </p>
        <button
          onClick={handleBack}
          className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </button>
      </div>
    );
  }

  const stockStatus = getStockStatus(stock.qty);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="p-3 bg-primary rounded-lg shadow">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detail Stok</h1>
              <p className="text-gray-600 mt-1">
                Informasi lengkap dan terperinci mengenai stok obat{" "}
                <span className="font-semibold text-primary">
                  {stock.medicine?.name}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refetch}
              className="inline-flex items-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                  loading ? "animate-spin" : "group-hover:rotate-45"
                }`}
              />
              Perbarui Data
            </button>
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2.5 border-2 border-blue-200 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <Edit className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Ubah Stok
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2.5 border-2 border-red-200 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-lg group"
            >
              <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Hapus Stok
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Stock Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            {/* Stock Header */}
            <div className="relative bg-gradient-to-br from-primary via-primary-hover to-blue-600 p-8 text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white/30 shadow-xl">
                  <Boxes className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {stock.medicine?.name || "Obat"}
                </h2>
                <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Award className="h-4 w-4 text-yellow-300 mr-2" />
                  <span className="text-white text-sm font-medium">
                    Stok Terkelola
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-3 max-w-xs mx-auto">
                  Inventaris obat yang dikelola dengan sistem manajemen stok
                  modern dan terpercaya
                </p>
              </div>
            </div>

            {/* Quick Stock Info */}
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pantauan status dan ketersediaan stok dalam sistem manajemen
                  farmasi terkini
                </p>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">
                  Status Ketersediaan
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      stock.qty > 10
                        ? "bg-green-500"
                        : stock.qty > 0
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  {stockStatus.status}
                </span>
              </div>

              {/* Barcode Section */}
              <div className="mt-auto pt-8 border-t border-gray-100 flex-1">
                <div className="text-center h-full flex flex-col">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <button
                      onClick={handleOpenBarcodeModal}
                      className="flex items-center gap-2 hover:bg-blue-50 p-2 rounded-lg transition-colors group"
                    >
                      <Scan className="h-5 w-5 text-primary group-hover:text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        Barcode Produk
                      </span>
                      <Maximize2 className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    {stock.barcode_image ? (
                      <div
                        className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-sm cursor-pointer hover:border-blue-300 transition-colors group w-full"
                        onClick={handleOpenBarcodeModal}
                      >
                        <div className="relative">
                          <img
                            src={stock.barcode_image}
                            alt={`Barcode for ${stock.medicine?.name}`}
                            className="w-full h-auto max-w-[320px] mx-auto group-hover:scale-105 transition-transform duration-200"
                            style={{ imageRendering: "pixelated" }}
                          />
                        </div>
                        <div className="mt-6 p-4 bg-gray-50 rounded-md">
                          <p className="text-sm font-mono text-gray-700 break-all">
                            {stock.barcode}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 w-full">
                        <Scan className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-500">
                          Barcode tidak tersedia
                        </p>
                        {stock.barcode && (
                          <p className="text-sm font-mono text-gray-700 mt-4 break-all">
                            {stock.barcode}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            {/* Section Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informasi Obat & Inventaris
                  </h3>
                  <p className="text-sm text-gray-600">
                    Detail lengkap obat dan informasi stok untuk keperluan
                    manajemen inventaris yang optimal
                  </p>
                </div>
              </div>
            </div>

            {/* Information Cards Grid */}
            <div className="p-6 flex-1">
              <div className="grid grid-cols-1 gap-6 h-full">
                {/* Medicine Name Card */}
                <div className="group relative">
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300 h-32 flex items-center bg-white">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                          <Pill className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Nama Obat
                        </p>
                        <p className="text-lg font-bold text-gray-900 break-words leading-tight">
                          {stock.medicine?.name || "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Identitas resmi obat dalam sistem manajemen farmasi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code and Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Medicine Code Card */}
                  <div className="group relative">
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-300 h-36 flex items-center bg-white">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center transition-colors">
                            <Hash className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Kode Obat
                          </p>
                          <p className="text-lg font-bold text-gray-900 break-words leading-tight font-mono">
                            {stock.medicine?.code || "-"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Kode unik untuk identifikasi dan pelacakan obat
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medicine Type Card */}
                  <div className="group relative">
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors duration-300 h-36 flex items-center bg-white">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center transition-colors">
                            <Package className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Jenis Obat
                          </p>
                          <span
                            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getTypeBadgeColor(
                              stock.medicine?.type
                            )}`}
                          >
                            <Package className="h-3 w-3 mr-1" />
                            {getTypeLabel(stock.medicine?.type)}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            Kategori bentuk sediaan farmasi
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stock Quantity and Expiry Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stock Quantity Card */}
                  <div className="group relative">
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors duration-300 h-36 flex items-center bg-white">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center transition-colors">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Jumlah Stok
                          </p>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-gray-900">
                              {stock.qty}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">
                              unit
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Ketersediaan stok saat ini
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expiry Date Card */}
                  <div className="group relative">
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-red-300 transition-colors duration-300 h-36 flex items-center bg-white">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center transition-colors">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Tanggal Kedaluwarsa
                          </p>
                          <p className="text-sm font-bold text-gray-900 break-words leading-tight">
                            {stock.expired_at
                              ? formatDate(stock.expired_at)
                              : "-"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Batas waktu penggunaan obat
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Card - Full Width */}
                <div className="group relative">
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-300 h-32 flex items-center bg-white">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Deskripsi Obat
                        </p>
                        <p className="text-sm font-bold text-gray-900 break-words leading-relaxed line-clamp-2">
                          {stock.medicine?.description ||
                            "Tidak ada deskripsi tersedia untuk obat ini"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Informasi tambahan mengenai komposisi dan kegunaan
                          obat
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Preview Modal */}
      {isBarcodeModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Scan className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Preview Barcode
                  </h3>
                  <p className="text-sm text-gray-600">
                    {stock.medicine?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stock.barcode_image && (
                  <button
                    onClick={handleDownloadBarcode}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download Barcode"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={handleCloseBarcodeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {stock.barcode_image ? (
                <div className="text-center">
                  {/* Large Barcode Display */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-inner mb-6">
                    <img
                      src={stock.barcode_image}
                      alt={`Barcode for ${stock.medicine?.name}`}
                      className="w-full h-auto max-w-2xl mx-auto"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>

                  {/* Barcode Number */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <p className="text-sm font-medium text-gray-500 mb-2">
                      Nomor Barcode
                    </p>
                    <p className="text-2xl font-mono font-bold text-gray-900 break-all">
                      {stock.barcode}
                    </p>
                  </div>

                  {/* Medicine Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        Nama Obat
                      </p>
                      <p className="font-semibold text-gray-900">
                        {stock.medicine?.name || "-"}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-green-600 mb-1">
                        Kode Obat
                      </p>
                      <p className="font-mono font-semibold text-gray-900">
                        {stock.medicine?.code || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Scanning Instructions */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Petunjuk Scanning
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Pastikan pencahayaan cukup terang</li>
                          <li>• Posisikan scanner sejajar dengan barcode</li>
                          <li>• Jaga jarak 5-15 cm dari barcode</li>
                          <li>• Tunggu hingga terdengar bunyi konfirmasi</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Scan className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Barcode Tidak Tersedia
                  </h4>
                  <p className="text-gray-600">
                    Barcode untuk produk ini belum tersedia dalam sistem.
                  </p>
                  {stock.barcode && (
                    <div className="mt-6 bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Nomor Barcode (Text)
                      </p>
                      <p className="font-mono font-bold text-gray-900 break-all">
                        {stock.barcode}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Scan className="h-4 w-4" />
                <span>Barcode siap untuk di-scan</span>
              </div>
              <div className="flex items-center gap-3">
                {stock.barcode_image && (
                  <button
                    onClick={handleDownloadBarcode}
                    className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                )}
                <button
                  onClick={handleCloseBarcodeModal}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashDetailStock;
