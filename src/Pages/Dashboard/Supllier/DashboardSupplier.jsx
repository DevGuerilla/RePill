import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashSupplier from "../../../Components/Fragments/Supplier/DashSupplier";
import CreateSupplierModal from "../../../Components/Fragments/Supplier/CreateModalSupplier";
import EditSupplierModal from "../../../Components/Fragments/Supplier/EditModalSupplier";
import DeleteSupplierModal from "../../../Components/Fragments/Supplier/DeleteSupplierModal";
import { useSupplier } from "../../../Hooks/Supplier/useSupplier";
import {
  Plus,
  RefreshCw,
  Search,
  AlertCircle,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardSupplier = () => {
  const { suppliers, loading, error, pagination, fetchSuppliers } =
    useSupplier();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uuid) => {
    const supplierToDelete = suppliers.find(
      (supplier) => supplier.uuid === uuid
    );
    if (supplierToDelete) {
      setSelectedSupplier(supplierToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddSupplier = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    fetchSuppliers({ page: currentPage });
  };

  const handleEditSuccess = () => {
    fetchSuppliers({ page: currentPage });
  };

  const handleDeleteSuccess = () => {
    fetchSuppliers({ page: currentPage });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSuppliers({ page });
  };

  const handleRefresh = () => {
    fetchSuppliers({ page: currentPage });
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSupplier(null);
  };

  useEffect(() => {
    console.log("🎯 DashboardSupplier: Component state:", {
      suppliersCount: suppliers.length,
      loading,
      error,
      hasToken: !!sessionStorage.getItem("auth_token"),
    });
  }, [suppliers, loading, error]);

  return (
    <DashboardLayout title="Manajemen Supplier">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-lg shadow">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manajemen Supplier
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola dan pantau seluruh supplier sistem aplikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                    loading ? "animate-spin" : "group-hover:rotate-45"
                  }`}
                />
                Perbarui Data
              </button>
              <button
                onClick={handleAddSupplier}
                className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg group border-2 border-primary hover:border-primary-hover"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Tambah Supplier
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-light rounded-lg">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pencarian</h3>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari supplier berdasarkan nama perusahaan, email, atau kontak..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-1 bg-red-100 rounded">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Terjadi Kesalahan
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Suppliers Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Supplier
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pagination.total}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Semua supplier terdaftar
                </p>
              </div>
              <div className="p-3 bg-primary-light rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Active Suppliers Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Supplier Aktif
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {suppliers.filter((s) => s.status === "active").length ||
                    suppliers.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Halaman {pagination.currentPage}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Current Page Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Halaman Saat Ini
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pagination.currentPage} / {pagination.lastPage}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Menampilkan {pagination.from}-{pagination.to}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search Results Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Hasil Pencarian
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredSuppliers.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supplier yang ditemukan
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Table */}
        <DashSupplier
          suppliers={filteredSuppliers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pagination={pagination}
        />

        {/* Pagination */}
        {pagination.lastPage > 1 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan {pagination.from} sampai {pagination.to} dari{" "}
                {pagination.total} supplier
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Sebelumnya
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {[...Array(pagination.lastPage)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
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
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.lastPage}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Berikutnya
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Supplier Modal */}
        <CreateSupplierModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCreateSuccess}
        />

        {/* Edit Supplier Modal */}
        <EditSupplierModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
          supplier={selectedSupplier}
        />

        {/* Delete Supplier Modal */}
        <DeleteSupplierModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSuccess={handleDeleteSuccess}
          supplier={selectedSupplier}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardSupplier;
