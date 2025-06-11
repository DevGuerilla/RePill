import React, { useState, useEffect } from "react";
import { Package, Search, Hash, X } from "lucide-react";
import { useCreateStock } from "../../../Hooks/Stock/useCreateStock";
import MedicineService from "../../../Services/Medicine/MedicineService";
import AuthInput from "../../Elements/Inputs/AuthInput";

const CreateStockForm = ({ onSuccess, onError, onCancel, isModal = false }) => {
  const { createStock, loading, error, success } = useCreateStock();
  const [medicines, setMedicines] = useState([]);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMedicineList, setShowMedicineList] = useState(false);
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
    setShowMedicineList(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowMedicineList(value.length > 0);

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
      await createStock(formData);
      setFormData({
        medicine_id: "",
        qty: 1,
      });
      setSelectedMedicine(null);
      setSearchTerm("");
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) {
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.data
            ? Object.values(error.response.data.data).flat().join(", ")
            : "Terjadi kesalahan saat membuat stok");
        onError(errorMessage);
      }
    }
  };

  const getFieldError = (fieldName) => {
    return error && error[fieldName] ? error[fieldName][0] : null;
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
          {/* Medicine Search Field */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="medicine_search"
              className="block font-semibold mb-0.5 lg:mb-1 text-sm text-slate-800"
            >
              Pilih Obat
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="medicine_search"
                type="text"
                placeholder="Cari obat berdasarkan nama atau kode..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowMedicineList(searchTerm.length > 0)}
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-4 ${
                  getFieldError("medicine_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />

              {/* Medicine List Dropdown */}
              {showMedicineList && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {loadingMedicines ? (
                    <div className="p-4 text-center text-gray-500">
                      Memuat obat...
                    </div>
                  ) : filteredMedicines.length > 0 ? (
                    filteredMedicines.map((medicine) => (
                      <div
                        key={medicine.uuid}
                        onClick={() => handleMedicineSelect(medicine)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {medicine.name}
                            </div>
                            <div className="text-sm text-gray-500 font-mono">
                              {medicine.code}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 capitalize">
                            {medicine.type}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada obat ditemukan
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

          {/* Selected Medicine Display */}
          {selectedMedicine && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-900">
                    {selectedMedicine.name}
                  </div>
                  <div className="text-sm text-green-600">
                    Kode: {selectedMedicine.code} • Jenis:{" "}
                    {selectedMedicine.type}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* qty Field */}
          <AuthInput
            id="qty"
            type="number"
            label="Jumlah Stok"
            placeholder="Masukkan jumlah stok"
            value={formData.qty}
            onChange={handleChange}
            icon={Hash}
            error={getFieldError("qty")}
          />

          {/* General Error */}
          {error && error.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error.general[0]}</p>
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
