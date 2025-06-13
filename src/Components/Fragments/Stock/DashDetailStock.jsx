import React from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router";

const DashDetailStock = ({ id, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { stock, loading, error, refetch } = useDetailStock(id);

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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
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
            <div className="p-6 space-y-4 flex-1">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pantauan status dan ketersediaan stok dalam sistem manajemen
                  farmasi terkini
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
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
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Kategori Stok</span>
                <span className="text-sm font-medium text-gray-900">
                  Inventaris Utama
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Jumlah Tersedia</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-primary mr-1">
                    {stock.qty}
                  </span>
                  <span className="text-sm text-gray-600">unit</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Status Monitoring</span>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-600">
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            {/* Section Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Info className="h-5 w-5 text-primary" />
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
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

                {/* Stock Quantity and Last Updated */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stock Quantity Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Jumlah Stok
                          </p>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-gray-900">
                              {stock.qty}
                            </span>
                            <span className="text-lg text-gray-600 ml-2">
                              unit
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Ketersediaan stok saat ini dalam inventaris
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Last Updated Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Calendar className="h-6 w-6 text-indigo-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Terakhir Diperbarui
                          </p>
                          <p className="text-sm font-bold text-gray-900 break-words leading-tight">
                            {formatDate(stock.updated_at)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Waktu pembaruan data stok dalam sistem
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Card - Full Width */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Deskripsi Obat
                        </p>
                        <p className="text-lg font-bold text-gray-900 break-words leading-relaxed">
                          {stock.medicine?.description ||
                            "Tidak ada deskripsi tersedia untuk obat ini"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Informasi tambahan mengenai komposisi, kegunaan, dan
                          cara penggunaan obat
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
    </div>
  );
};

export default DashDetailStock;
