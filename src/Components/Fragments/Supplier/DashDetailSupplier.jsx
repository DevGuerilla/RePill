import React from "react";
import { useDetailSupplier } from "../../../Hooks/Supplier/useDetailSupplier";
import {
  Truck,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  Building2,
  Globe,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";

const DashDetailSupplier = ({ id, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { supplier, loading, error, refetch } = useDetailSupplier(id);

  const handleBack = () => {
    navigate("/dashboard/supplier");
  };

  const handleEdit = () => {
    if (onEdit && supplier) {
      onEdit(supplier);
    }
  };

  const handleDelete = () => {
    if (onDelete && supplier) {
      onDelete();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Memuat detail supplier...
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
              <h1 className="text-2xl font-bold text-gray-900">
                Detail Supplier
              </h1>
              <p className="text-gray-600 mt-1">Informasi detail supplier</p>
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

  if (!supplier) {
    return (
      <div className="text-center py-12">
        <Truck className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Supplier tidak ditemukan
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Supplier yang Anda cari tidak tersedia.
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
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Detail Supplier
              </h1>
              <p className="text-gray-600 mt-1">
                Informasi lengkap dan terperinci mengenai supplier{" "}
                <span className="font-semibold text-primary">
                  {supplier.name}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refetch}
              className="inline-flex items-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-45 transition-transform duration-200" />
              Perbarui Data
            </button>
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-4 py-2.5 border-2 border-blue-200 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <Edit className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Ubah Supplier
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2.5 border-2 border-red-200 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-lg group"
            >
              <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Hapus Supplier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout - More Symmetrical */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            {/* Profile Header */}
            <div className="relative bg-gradient-to-br from-primary via-primary-hover to-blue-600 p-8 text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-4 border-white/30 shadow-xl">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {supplier?.name || "Supplier"}
                </h2>
                <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Star className="h-4 w-4 text-yellow-300 mr-2" />
                  <span className="text-white text-sm font-medium">
                    Mitra Terpercaya
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-3 max-w-xs mx-auto">
                  Supplier resmi yang telah bekerja sama dalam menyediakan
                  produk berkualitas tinggi
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="p-6 space-y-4 flex-1">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Informasi status dan kinerja supplier dalam sistem manajemen
                  farmasi
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Status Kemitraan</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                  Aktif
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">Kategori</span>
                <span className="text-sm font-medium text-gray-900">
                  Supplier Utama
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">
                  Peringkat Kualitas
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">5.0</span>
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
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Informasi Kontak & Alamat
                  </h3>
                  <p className="text-sm text-gray-600">
                    Detail lengkap kontak perusahaan dan alamat untuk keperluan
                    komunikasi bisnis
                  </p>
                </div>
              </div>
            </div>

            {/* Information Cards Grid - More Symmetrical */}
            <div className="p-6 flex-1">
              <div className="grid grid-cols-1 gap-6 h-full">
                {/* Company Name Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Nama Perusahaan
                        </p>
                        <p className="text-lg font-bold text-gray-900 break-words leading-tight">
                          {supplier?.name || "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Identitas resmi perusahaan supplier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Mail className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Surel Perusahaan
                          </p>
                          <p className="text-lg font-bold text-gray-900 break-words leading-tight">
                            {supplier?.email || "-"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Alamat surel resmi untuk komunikasi bisnis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Phone className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Nomor Telepon
                          </p>
                          <p className="text-lg font-bold text-gray-900 break-words leading-tight">
                            {supplier?.contact || "-"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Kontak langsung untuk keperluan mendesak
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Card - Full Width */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 border border-gray-200 rounded-xl hover:border-orange-300 transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <MapPin className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Alamat Lengkap
                        </p>
                        <p className="text-lg font-bold text-gray-900 break-words leading-relaxed">
                          {supplier?.address || "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Lokasi fisik perusahaan untuk pengiriman dan kunjungan
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

export default DashDetailSupplier;
