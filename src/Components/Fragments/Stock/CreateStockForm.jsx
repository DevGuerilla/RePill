import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  Hash,
  X,
  ChevronDown,
  Building,
  Phone,
  Calendar,
} from "lucide-react";
import { useCreateStock } from "../../../Hooks/Stock/useCreateStock";
import MedicineService from "../../../Services/Medicine/MedicineService";
import AuthInput from "../../Elements/Inputs/AuthInput";

const CreateStockForm = ({ onSuccess, onError, onCancel, isModal = false }) => {
  const { createStock, loading, errors, message, success } = useCreateStock();
  const [medicines, setMedicines] = useState([]);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    medicine_id: "",
    qty: 1,
    expired_at: "",
  });
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        !event.target.closest(".medicine-dropdown-container")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const fetchMedicines = async () => {
    setLoadingMedicines(true);
    try {
      const response = await MedicineService.getAllMedicine();
      setMedicines(response || []);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoadingMedicines(false);
    }
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setFormData((prev) => ({
      ...prev,
      medicine_id: medicine.uuid,
    }));
    setSearchTerm(medicine.name);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);

    if (value === "") {
      setSelectedMedicine(null);
      setFormData((prev) => ({
        ...prev,
        medicine_id: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format expired_at to ISO date string if it's provided
      const submitData = {
        ...formData,
        expired_at: formData.expired_at ? formData.expired_at : "",
      };

      const response = await createStock(submitData);

      if (response.success !== false && response.status !== 422) {
        setFormData({
          medicine_id: "",
          qty: 1,
          expired_at: "",
        });
        setSelectedMedicine(null);
        setSearchTerm("");
        if (onSuccess) onSuccess();
      } else {
        console.log("Validation errors:", errors);
      }
    } catch (error) {
      console.error("CreateStockForm: Error submitting form:", error);
    }
  };

  const getFieldError = (fieldName) => {
    if (errors[fieldName] && Array.isArray(errors[fieldName])) {
      return errors[fieldName][0];
    }
    return null;
  };

  const formContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-6 pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tambah Stok Baru
          </h2>
        </div>
        {isModal && onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Medicine Selection with Search */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="medicine_search"
              className={`block font-semibold mb-0.5 lg:mb-1 text-sm transition-all duration-300 ${
                getFieldError("medicine_id") ? "text-red-600" : "text-slate-800"
              }`}
            >
              Pilih Obat
            </label>
            <div className="relative medicine-dropdown-container">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="medicine_search"
                type="text"
                placeholder="Cari dan pilih obat berdasarkan nama atau kode..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={(e) => {
                  // Don't close if clicking on dropdown
                  if (
                    !e.relatedTarget?.closest(".medicine-dropdown-container")
                  ) {
                    setTimeout(() => setShowDropdown(false), 150);
                  }
                }}
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-12 ${
                  getFieldError("medicine_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Enhanced Dropdown List */}
              {showDropdown && (
                <div className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-80 overflow-hidden">
                  {loadingMedicines ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm font-medium">
                        Memuat daftar obat...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Mohon tunggu sebentar
                      </p>
                    </div>
                  ) : filteredMedicines.length > 0 ? (
                    <>
                      <div className="sticky top-0 bg-primary px-5 py-4 border-b border-primary-light shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-white" />
                            <span className="text-sm font-semibold text-white">
                              Pilih Obat
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium text-white border border-white/20">
                              {filteredMedicines.length} tersedia
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {filteredMedicines.map((medicine, index) => (
                          <div
                            key={medicine.uuid}
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent blur event
                              handleMedicineSelect(medicine);
                            }}
                            className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0 group ${
                              index === 0 ? "bg-slate-50" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-hover transition-colors duration-200">
                                    <span className="text-white font-bold text-sm">
                                      {medicine.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "M"}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                                      {medicine.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-mono mt-1">
                                      {medicine.code}
                                    </p>
                                  </div>
                                </div>

                                {medicine.description && (
                                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                                    {medicine.description}
                                  </p>
                                )}

                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    <Package className="h-3 w-3 mr-1" />
                                    {medicine.type}
                                  </span>
                                  {medicine.supplier?.name && (
                                    <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                                      <Building className="h-3 w-3 mr-1" />
                                      {medicine.supplier.name}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="ml-3 flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 group-hover:bg-primary group-hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200">
                                  <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        {searchTerm
                          ? "Obat Tidak Ditemukan"
                          : "Mulai Pencarian"}
                      </h4>
                      <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        {searchTerm
                          ? `Tidak ada obat yang cocok dengan pencarian "${searchTerm}"`
                          : "Ketik nama atau kode obat untuk melihat daftar obat yang tersedia"}
                      </p>
                      {searchTerm && (
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchTerm("");
                            setSelectedMedicine(null);
                            setFormData((prev) => ({
                              ...prev,
                              medicine_id: "",
                            }));
                          }}
                          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
                        >
                          Reset Pencarian
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {getFieldError("medicine_id") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("medicine_id")}
              </p>
            )}
          </div>

          {/* Enhanced Selected Medicine Display */}
          {selectedMedicine && (
            <div className="mb-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">
                      {selectedMedicine.name?.charAt(0)?.toUpperCase() || "M"}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-green-900 text-lg">
                        {selectedMedicine.name}
                      </h3>
                      <p className="text-green-700 font-mono text-sm mt-1">
                        {selectedMedicine.code}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <span className="inline-flex items-center px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                        <Package className="h-3 w-3 mr-1" />
                        Dipilih
                      </span>
                    </div>
                  </div>

                  {selectedMedicine.description && (
                    <p className="text-green-700 text-sm mb-3 leading-relaxed">
                      {selectedMedicine.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center px-3 py-1.5 bg-white border border-green-200 rounded-lg">
                      <Package className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Jenis: {selectedMedicine.type}
                      </span>
                    </div>

                    {selectedMedicine.supplier?.name && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-white border border-green-200 rounded-lg">
                        <Building className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          Supplier: {selectedMedicine.supplier.name}
                        </span>
                      </div>
                    )}

                    {selectedMedicine.supplier?.contact && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-white border border-green-200 rounded-lg">
                        <Phone className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          {selectedMedicine.supplier.contact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Quantity Field */}
          <div className="mb-2 lg:mb-3">
            <AuthInput
              id="qty"
              type="number"
              label="Jumlah Stok"
              placeholder="Masukkan jumlah stok yang akan ditambahkan"
              value={formData.qty}
              onChange={handleChange}
              icon={Hash}
              error={getFieldError("qty")}
            />
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 text-xs">
                <Hash className="h-4 w-4" />
                <span className="font-medium">
                  Tips: Masukkan jumlah stok sesuai dengan kebutuhan apotek
                </span>
              </div>
            </div>
          </div>

          {/* Expiration Date Field */}
          <div className="mb-2 lg:mb-3">
            <AuthInput
              id="expired_at"
              type="date"
              label="Tanggal Kadaluarsa"
              placeholder="Pilih tanggal kadaluarsa"
              value={formData.expired_at}
              onChange={handleChange}
              icon={Calendar}
              error={getFieldError("expired_at")}
            />
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 text-xs">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  Penting: Pastikan tanggal kadaluarsa sesuai dengan kemasan
                  obat
                </span>
              </div>
            </div>
          </div>

          {/* General Error */}
          {message && !success && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="p-1 bg-red-100 rounded">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    {Object.keys(errors).length > 0
                      ? "Validasi Gagal"
                      : "Terjadi Kesalahan"}
                  </h3>
                  <p className="text-sm text-red-600">{message}</p>
                  {Object.keys(errors).length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-red-600 mb-2">
                        Detail kesalahan:
                      </p>
                      <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                        {Object.entries(errors).map(([field, fieldErrors]) => (
                          <li key={field}>
                            <strong className="capitalize">
                              {field.replace("_", " ")}:
                            </strong>{" "}
                            {fieldErrors[0]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={
                loading ||
                success ||
                !formData.medicine_id ||
                !formData.expired_at
              }
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Menyimpan..." : "Simpan Stok"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );

  if (isModal) {
    return <>{formContent}</>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {formContent}
    </div>
  );
};

export default CreateStockForm;
