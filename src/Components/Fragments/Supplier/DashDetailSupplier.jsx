import React from "react";
import { useDetailSupplier } from "../../../Hooks/useDetailSupplier";
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
  Calendar,
  User,
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
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
      <div className="max-w-6xl w-full mx-auto space-y-6">
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
                  Informasi lengkap supplier {supplier.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={refetch}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* Main Profile Layout */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
            {/* Left Side - Supplier Avatar */}
            <div className="lg:col-span-2 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-200">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl bg-primary flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-white font-bold text-7xl">
                    {supplier?.name?.charAt(0)?.toUpperCase() || "S"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Supplier Information */}
            <div className="lg:col-span-3 p-8 flex items-center justify-center">
              <div className="w-full">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="pb-6 border-b border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Informasi Supplier
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Detail lengkap informasi supplier
                    </p>
                  </div>

                  {/* Information Display with cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="space-y-6">
                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <Truck className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Nama Perusahaan
                          </span>
                        </div>
                        <div className="ml-2">
                          <span className="text-lg font-medium text-gray-900">
                            {supplier?.name || "-"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Email
                          </span>
                        </div>
                        <div className="ml-2">
                          <span className="text-lg font-medium text-gray-900">
                            {supplier?.email || "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <Phone className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Kontak
                          </span>
                        </div>
                        <div className="ml-2">
                          <span className="text-lg font-medium text-gray-900">
                            {supplier?.contact || "-"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Alamat
                          </span>
                        </div>
                        <div className="ml-2">
                          <span className="text-sm font-medium text-gray-900">
                            {supplier?.address || "-"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary-light rounded-lg">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            Terdaftar
                          </span>
                        </div>
                        <div className="ml-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(supplier?.created_at)}
                          </span>
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
    </div>
  );
};

export default DashDetailSupplier;
