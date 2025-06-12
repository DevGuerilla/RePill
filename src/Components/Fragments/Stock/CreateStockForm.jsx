import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  Hash,
  X,
  ChevronDown,
  Building,
  Phone,
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
  });
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoadingMedicines(true);
    try {
      const response = await MedicineService.getAllMedicines();
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
      const response = await createStock(formData);

      if (response.success !== false && response.status !== 422) {
        setFormData({
          medicine_id: "",
          qty: 1,
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
            <div className="relative">
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
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-12 ${
                  getFieldError("medicine_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>

              {/* Enhanced Dropdown List */}
              {showDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-72 overflow-y-auto">
                  {loadingMedicines ? (
                    <div className="p-6 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
                      <p className="text-sm font-medium">
                        Memuat daftar obat...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Mohon tunggu sebentar
                      </p>
                    </div>
                  ) : filteredMedicines.length > 0 ? (
                    <>
                      <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-hover px-4 py-3 text-xs font-semibold text-white border-b border-primary-light">
                        <div className="flex items-center justify-between">
                          <span>
                            Pilih Obat ({filteredMedicines.length} tersedia)
                          </span>
                          <Package className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredMedicines.map((medicine, index) => (
                          <div
                            key={medicine.uuid}
                            onClick={() => handleMedicineSelect(medicine)}
                            className={`p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 group ${
                              index === 0 ? "bg-blue-25" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-hover transition-colors">
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
                                    <p className="text-sm text-gray-500 font-mono mt-0.5">
                                      {medicine.code}
                                    </p>
                                  </div>
                                </div>

                                {medicine.description && (
                                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                                    {medicine.description}
                                  </p>
                                )}

                                <div className="flex items-center gap-3 text-xs">
                                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                    <Package className="h-3 w-3 mr-1" />
                                    {medicine.type}
                                  </span>
                                  {medicine.supplier?.name && (
                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                      <Building className="h-3 w-3 mr-1" />
                                      {medicine.supplier.name}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="ml-3 flex-shrink-0">
                                <div className="w-8 h-8 bg-gray-100 group-hover:bg-primary group-hover:text-white rounded-full flex items-center justify-center transition-all duration-200">
                                  <ChevronDown className="h-4 w-4 transform -rotate-90" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        {searchTerm
                          ? "Obat Tidak Ditemukan"
                          : "Mulai Pencarian"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {searchTerm
                          ? `Tidak ada obat yang cocok dengan "${searchTerm}"`
                          : "Ketik nama atau kode obat untuk mencari"}
                      </p>
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
              disabled={loading || success || !formData.medicine_id}
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
