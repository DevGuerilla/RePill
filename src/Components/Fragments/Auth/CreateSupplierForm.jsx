import React, { useState } from "react";
import { Truck, Mail, Phone, MapPin, X } from "lucide-react";
import { useCreateSupplier } from "../../../Hooks/useCreateSupplier";
import AuthInput from "../../Elements/Inputs/AuthInput";

const CreateSupplierForm = ({
  onSuccess,
  onError,
  onCancel,
  isModal = false,
}) => {
  const { createSupplier, loading, error, success } = useCreateSupplier();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

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
      await createSupplier(formData);
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) {
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.data
            ? Object.values(error.response.data.data).flat().join(", ")
            : "Terjadi kesalahan saat membuat supplier");
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
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tambah Supplier Baru
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
          {/* Name Field */}
          <AuthInput
            id="name"
            type="text"
            label="Nama Perusahaan"
            placeholder="Masukkan nama perusahaan"
            value={formData.name}
            onChange={handleChange}
            icon={Truck}
            error={getFieldError("name")}
          />

          {/* Email Field */}
          <AuthInput
            id="email"
            type="email"
            label="Email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={getFieldError("email")}
          />

          {/* Contact Field */}
          <AuthInput
            id="contact"
            type="tel"
            label="Kontak"
            placeholder="Masukkan nomor kontak"
            value={formData.contact}
            onChange={handleChange}
            icon={Phone}
            error={getFieldError("contact")}
          />

          {/* Address Field */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="address"
              className="block font-semibold mb-0.5 lg:mb-1 text-sm text-slate-800"
            >
              Alamat
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="address"
                name="address"
                rows={3}
                placeholder="Masukkan alamat lengkap"
                value={formData.address}
                onChange={handleChange}
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-4 resize-none ${
                  getFieldError("address")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />
            </div>
            {getFieldError("address") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("address")}
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
              {loading ? "Menyimpan..." : "Simpan Supplier"}
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

export default CreateSupplierForm;
