import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashStock from "../../../Components/Fragments/Stock/DashStock";
import CreateStockModal from "../../../Components/Fragments/Stock/CreateStockModal";
import EditStockModal from "../../../Components/Fragments/Stock/EditStockModal";
import DeleteStockModal from "../../../Components/Fragments/Stock/DeleteStockModal";
import { useStock } from "../../../Hooks/Stock/useStock";
import {
  Plus,
  RefreshCw,
  Search,
  AlertCircle,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const DashboardStock = () => {
  const { stocks, loading, error, refetch } = useStock();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.medicine?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.medicine?.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.medicine?.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (uuid) => {
    const stockToDelete = stocks.find((stock) => stock.uuid === uuid);
    if (stockToDelete) {
      setSelectedStock(stockToDelete);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddStock = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleEditSuccess = () => {
    refetch();
  };

  const handleDeleteSuccess = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStock(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStock(null);
  };

  useEffect(() => {
    console.log("🎯 DashboardStock: Component state:", {
      stocksCount: stocks.length,
      loading,
      error,
      hasToken: !!sessionStorage.getItem("auth_token"),
    });
  }, [stocks, loading, error]);

  const getStockStats = () => {
    const totalStock = stocks.reduce((sum, stock) => sum + stock.qty, 0);
    const lowStock = stocks.filter(
      (stock) => stock.qty <= 10 && stock.qty > 0
    ).length;
    const outOfStock = stocks.filter((stock) => stock.qty === 0).length;
    const inStock = stocks.filter((stock) => stock.qty > 10).length;

    return { totalStock, lowStock, outOfStock, inStock };
  };

  const { totalStock, lowStock, outOfStock, inStock } = getStockStats();

  return (
    <DashboardLayout title="Manajemen Stok">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-lg shadow">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manajemen Stok
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola dan pantau seluruh stok obat sistem aplikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={refetch}
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
                onClick={handleAddStock}
                className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg group border-2 border-primary hover:border-primary-hover"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Tambah Stok
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
              placeholder="Cari stok berdasarkan nama obat, kode, atau jenis..."
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
          {/* Total Stock Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Item Stok
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stocks.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Jenis obat terdaftar
                </p>
              </div>
              <div className="p-3 bg-primary-light rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Total Stock Quantity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Unit Stok
                </p>
                <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
                <p className="text-xs text-gray-500 mt-1">Unit tersedia</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Stok Menipis
                </p>
                <p className="text-2xl font-bold text-gray-900">{lowStock}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Perlu restok segera
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Hasil Pencarian
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredStocks.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Stok ditemukan</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Table */}
        <DashStock
          stocks={filteredStocks}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Create Stock Modal */}
        <CreateStockModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleCreateSuccess}
        />

        {/* Edit Stock Modal */}
        <EditStockModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
          stock={selectedStock}
        />

        {/* Delete Stock Modal */}
        <DeleteStockModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSuccess={handleDeleteSuccess}
          stock={selectedStock}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardStock;
