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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
} from "lucide-react";

const DashboardStock = () => {
  const { stocks, loading, error, pagination, fetchStocks } = useStock();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    fetchStocks({ page: currentPage });
  };

  const handleEditSuccess = () => {
    fetchStocks({ page: currentPage });
  };

  const handleDeleteSuccess = () => {
    fetchStocks({ page: currentPage });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchStocks({ page });
  };

  const handleRefresh = () => {
    fetchStocks({ page: currentPage });
  };

  const getStockStats = () => {
    const totalStock = stocks.reduce((sum, stock) => sum + stock.qty, 0);
    const lowStock = stocks.filter(
      (stock) => stock.qty <= 10 && stock.qty > 0
    ).length;
    const outOfStock = stocks.filter((stock) => stock.qty === 0).length;
    const inStock = stocks.filter((stock) => stock.qty > 10).length;

    // Calculate expiration-related stats
    const now = new Date();
    const expiredStock = stocks.filter((stock) => {
      const expirationDate = new Date(stock.expired_at);
      return expirationDate < now;
    }).length;

    const expiringStock = stocks.filter((stock) => {
      const expirationDate = new Date(stock.expired_at);
      const timeDiff = expirationDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff > 0 && daysDiff <= 30;
    }).length;

    return {
      totalStock,
      lowStock,
      outOfStock,
      inStock,
      expiredStock,
      expiringStock,
    };
  };

  const {
    totalStock,
    lowStock,
    outOfStock,
    inStock,
    expiredStock,
    expiringStock,
  } = getStockStats();

  // Generate page numbers to display (max 3 pages)
  const getDisplayedPages = () => {
    const { currentPage, lastPage } = pagination;

    if (lastPage <= 3) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (currentPage === 1) {
      return [1, 2, 3];
    }

    if (currentPage === lastPage) {
      return [lastPage - 2, lastPage - 1, lastPage];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  // Enhanced Responsive Pagination Component
  const ResponsivePagination = () => {
    if (pagination.lastPage <= 1) return null;

    const displayedPages = getDisplayedPages();
    const { currentPage, lastPage } = pagination;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Info Text - Left side on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 order-2 lg:order-1">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Menampilkan{" "}
              <span className="font-semibold text-gray-900">
                {pagination.from}
              </span>{" "}
              sampai{" "}
              <span className="font-semibold text-gray-900">
                {pagination.to}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-900">
                {pagination.total}
              </span>{" "}
              stok
            </div>

            {/* Mobile only additional info */}
            <div className="text-xs text-gray-500 text-center sm:hidden">
              Halaman {currentPage} dari {lastPage}
            </div>
          </div>

          {/* Pagination Controls - Right side on desktop */}
          <div className="order-1 lg:order-2">
            <nav
              className="flex items-center justify-center gap-1"
              aria-label="Pagination"
            >
              {/* First Page Button */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label="Halaman pertama"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {displayedPages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                      page === currentPage
                        ? "bg-primary text-white border-2 border-primary shadow-md transform scale-105"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400"
                    }`}
                    aria-label={`Halaman ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page Button */}
              <button
                onClick={() => handlePageChange(lastPage)}
                disabled={currentPage === lastPage}
                className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                aria-label="Halaman terakhir"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout title="Manajemen Stok">
      <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-0">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title Section - Left side */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary rounded-lg shadow flex-shrink-0">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Manajemen Stok
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Kelola dan pantau seluruh stok obat sistem aplikasi
                </p>
              </div>
            </div>

            {/* Action Buttons - Right side */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md group order-2 sm:order-1"
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
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg group border-2 border-primary hover:border-primary-hover order-1 sm:order-2"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Tambah Stok
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Pencarian
            </h3>
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
              <div className="p-1 bg-red-100 rounded flex-shrink-0">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Total Item Stok
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {pagination.total || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Jenis obat terdaftar
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-primary-light rounded-lg self-start sm:self-auto flex-shrink-0">
                <Package className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Total Unit Stok
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {totalStock}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Halaman {pagination.currentPage}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg self-start sm:self-auto flex-shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Stok Kedaluwarsa
                </p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">
                  {expiredStock}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Perlu segera ditangani
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-red-100 rounded-lg self-start sm:self-auto flex-shrink-0">
                <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Hampir Kedaluwarsa
                </p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">
                  {expiringStock}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Dalam 30 hari ke depan
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg self-start sm:self-auto flex-shrink-0">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
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
          pagination={pagination}
        />

        {/* Responsive Pagination */}
        <ResponsivePagination />

        {/* Modals */}
        <CreateStockModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />

        <EditStockModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
          stock={selectedStock}
        />

        <DeleteStockModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={handleDeleteSuccess}
          stock={selectedStock}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardStock;
