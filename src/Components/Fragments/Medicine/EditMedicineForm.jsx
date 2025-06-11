import React, { useState, useEffect } from "react";
import { Pill, Package, Building, FileText, Hash, X } from "lucide-react";
import { useEditMedicine } from "../../../Hooks/Medicine/useEditMedicine";
import SupplierService from "../../../Services/Supplier/SupplierService";
import AuthInput from "../../Elements/Inputs/AuthInput";

const EditMedicineForm = ({
  medicine,
  onSuccess,
  onError,
  onCancel,
  isModal = false,
}) => {
  const { updateMedicine, loading, error, success } = useEditMedicine();
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "tablet",
    supplier_id: "",
  });

  const medicineTypes = [
    { value: "tablet", label: "Tablet" },
    { value: "capsule", label: "Kapsul" },
    { value: "bottle", label: "Botol" },
  ];

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (medicine) {
      setFormData({
        code: medicine.code || "",
        name: medicine.name || "",
        description: medicine.description || "",
        type: medicine.type || "tablet",
        supplier_id: medicine.supplier_id || "",
      });
    }
  }, [medicine]);

  const fetchSuppliers = async () => {
    setLoadingSuppliers(true);
    try {
      const response = await SupplierService.getAllSuppliers();
      setSuppliers(response || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoadingSuppliers(false);
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
      await updateMedicine(medicine.uuid, formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) {
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.data
            ? Object.values(error.response.data.data).flat().join(", ")
            : "Terjadi kesalahan saat memperbarui obat");
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
            <Pill className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Edit Obat</h2>
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
          {/* Code Field */}
          <AuthInput
            id="code"
            type="text"
            label="Kode Obat"
            placeholder="Masukkan kode obat"
            value={formData.code}
            onChange={handleChange}
            icon={Hash}
            error={getFieldError("code")}
          />

          {/* Name Field */}
          <AuthInput
            id="name"
            type="text"
            label="Nama Obat"
            placeholder="Masukkan nama obat"
            value={formData.name}
            onChange={handleChange}
            icon={Pill}
            error={getFieldError("name")}
          />

          {/* Type Field */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="type"
              className="block font-semibold mb-0.5 lg:mb-1 text-sm text-slate-800"
            >
              Jenis Obat
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-4 ${
                  getFieldError("type")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              >
                {medicineTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            {getFieldError("type") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("type")}
              </p>
            )}
          </div>

          {/* Supplier Field */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="supplier_id"
              className="block font-semibold mb-0.5 lg:mb-1 text-sm text-slate-800"
            >
              Supplier
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="supplier_id"
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                disabled={loadingSuppliers}
                className={`w-full border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-4 ${
                  getFieldError("supplier_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              >
                <option value="">
                  {loadingSuppliers ? "Memuat supplier..." : "Pilih supplier"}
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.uuid} value={supplier.uuid}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            {getFieldError("supplier_id") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("supplier_id")}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="description"
              className="block font-semibold mb-0.5 lg:mb-1 text-sm text-slate-800"
            >
              Deskripsi
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Masukkan deskripsi obat"
                value={formData.description}
                onChange={handleChange}
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-4 resize-none ${
                  getFieldError("description")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("description") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("description")}
              </p>
            )}
          </div>

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
              disabled={loading || success}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Memperbarui..." : "Perbarui Obat"}
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

export default EditMedicineForm;
