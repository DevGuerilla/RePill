import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashMedicine from "../../../Components/Fragments/Medicine/DashMedicine";
import CreateMedicineModal from "../../../Components/Fragments/Medicine/CreateMedicineModal";
import EditMedicineModal from "../../../Components/Fragments/Medicine/EditMedicineModal";
import DeleteMedicineModal from "../../../Components/Fragments/Medicine/DeleteMedicineModal";
import { useMedicine } from "../../../Hooks/Medicine/useMedicine";
import {
  Plus,
  RefreshCw,
  Search,
  AlertCircle,
  Pill,
  Package,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DashboardMedicine = () => {
  const { medicines, loading, error, pagination, fetchMedicines } =
    useMedicine();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uuid) => {
    const medicineToDelete = medicines.find(
      (medicine) => medicine.uuid === uuid
    );
    if (medicineToDelete) {
      setSelectedMedicine(medicineToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddMedicine = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    fetchMedicines({ page: currentPage });
  };

  const handleEditSuccess = () => {
    fetchMedicines({ page: currentPage });
  };

  const handleDeleteSuccess = () => {
    fetchMedicines({ page: currentPage });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMedicines({ page });
  };

  const handleRefresh = () => {
    fetchMedicines({ page: currentPage });
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMedicine(null);
  };

  useEffect(() => {
    console.log("🎯 DashboardMedicine: Component state:", {
      medicinesCount: medicines.length,
      loading,
      error,
      hasToken: !!sessionStorage.getItem("auth_token"),
    });
  }, [medicines, loading, error]);

  const getTypeCounts = () => {
    const counts = {};
    medicines.forEach((medicine) => {
      const type = medicine.type || "unknown";
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };

  const typeCounts = getTypeCounts();

  return (
    <DashboardLayout title="Manajemen Obat">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-lg shadow">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manajemen Obat
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola dan pantau seluruh obat sistem aplikasi
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
                onClick={handleAddMedicine}
                className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg group border-2 border-primary hover:border-primary-hover"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Tambah Obat
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
              placeholder="Cari obat berdasarkan nama, kode, jenis, atau supplier..."
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
          {/* Total Medicines Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Obat
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pagination.total}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Semua obat terdaftar
                </p>
              </div>
              <div className="p-3 bg-primary-light rounded-lg">
                <Pill className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Tablet Count Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Obat Tablet
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {typeCounts.tablet || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Halaman {pagination.currentPage}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
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
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="h-6 w-6 text-green-600" />
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
                  {filteredMedicines.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Obat yang ditemukan
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Table */}
        <DashMedicine
          medicines={filteredMedicines}
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
                {pagination.total} obat
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

        {/* Create Medicine Modal */}
        <CreateMedicineModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCreateSuccess}
        />

        {/* Edit Medicine Modal */}
        <EditMedicineModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
          medicine={selectedMedicine}
        />

        {/* Delete Medicine Modal */}
        <DeleteMedicineModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSuccess={handleDeleteSuccess}
          medicine={selectedMedicine}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardMedicine;
