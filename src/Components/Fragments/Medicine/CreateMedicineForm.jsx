import React, { useState, useEffect } from "react";
import { Pill, Package, Building, FileText, Hash, X } from "lucide-react";
import { useCreateMedicine } from "../../../Hooks/Medicine/useCreateMedicine";
import SupplierService from "../../../Services/Supplier/SupplierService";
import AuthInput from "../../Elements/Inputs/AuthInput";
import AuthSelect from "../../Elements/Inputs/AuthSelect";

const CreateMedicineForm = ({
  onSuccess,
  onError,
  onCancel,
  isModal = false,
}) => {
  const { createMedicine, loading, errors, message, success } =
    useCreateMedicine();
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

  const fetchSuppliers = async () => {
    setLoadingSuppliers(true);
    try {
      const response = await SupplierService.getAllSupplier();
      setSuppliers(response || []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoadingSuppliers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "code") {
      // Handle code formatting with MED- prefix
      let formattedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

      // Always ensure MED- prefix
      if (!formattedValue.startsWith("MED")) {
        formattedValue = "MED-" + formattedValue.replace(/^MED-?/, "");
      } else if (
        formattedValue.startsWith("MED") &&
        !formattedValue.startsWith("MED-")
      ) {
        formattedValue = "MED-" + formattedValue.substring(3);
      }

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    // Initialize code with MED- prefix if empty
    if (!formData.code) {
      setFormData((prev) => ({
        ...prev,
        code: "MED-",
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMedicine(formData);

      if (response.success !== false && response.status !== 422) {
        setFormData({
          code: "",
          name: "",
          description: "",
          type: "tablet",
          supplier_id: "",
        });
        if (onSuccess) onSuccess();
      } else {
        console.log("Validation errors:", errors);
      }
    } catch (error) {
      console.error("CreateMedicineForm: Error submitting form:", error);
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
            <Pill className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tambah Obat Baru
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
          {/* Code Field */}
          <AuthInput
            id="code"
            type="text"
            label="Kode Obat"
            placeholder="MED-XXXXX (contoh: MED-12345)"
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
          <AuthSelect
            id="type"
            label="Jenis Obat"
            value={formData.type}
            onChange={handleChange}
            options={medicineTypes}
            placeholder="Pilih jenis obat"
            icon={Package}
            error={getFieldError("type")}
          />

          {/* Supplier Field */}
          <AuthSelect
            id="supplier_id"
            label="Supplier"
            value={formData.supplier_id}
            onChange={handleChange}
            options={suppliers.map((supplier) => ({
              value: supplier.uuid,
              label: supplier.name,
            }))}
            placeholder="Pilih supplier"
            icon={Building}
            error={getFieldError("supplier_id")}
            loading={loadingSuppliers}
          />

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
              disabled={loading || success}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Menyimpan..." : "Simpan Obat"}
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

export default CreateMedicineForm;
