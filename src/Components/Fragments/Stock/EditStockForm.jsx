import React, { useState, useEffect } from "react";
import { Package, Hash, X, Calendar } from "lucide-react";
import { useEditStock } from "../../../Hooks/Stock/useEditStock";
import AuthInput from "../../Elements/Inputs/AuthInput";

const EditStockForm = ({
  stock,
  onSuccess,
  onError,
  onCancel,
  isModal = false,
}) => {
  const { updateStock, loading, errors, message, success } = useEditStock();
  const [formData, setFormData] = useState({
    medicine_id: "",
    qty: 1,
    expired_at: "",
  });

  useEffect(() => {
    if (stock) {
      // Format the expired_at date for input field
      const expiredDate = stock.expired_at
        ? new Date(stock.expired_at).toISOString().split("T")[0]
        : "";

      setFormData({
        medicine_id: stock.medicine_id || "",
        qty: stock.qty || 1,
        expired_at: expiredDate,
      });
    }
  }, [stock]);

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
      // Format expired_at for submission
      const submitData = {
        ...formData,
        expired_at: formData.expired_at ? formData.expired_at : "",
      };

      const response = await updateStock(stock.uuid, submitData);

      if (response.success !== false && response.status !== 422) {
        if (onSuccess) onSuccess();
      } else {
        console.log("Validation errors:", errors);
      }
    } catch (error) {
      console.error("EditStockForm: Error submitting form:", error);
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
          <h2 className="text-xl font-semibold text-gray-900">Edit Stok</h2>
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
        {/* Medicine Info Display */}
        {stock?.medicine && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-blue-900">
                  {stock.medicine.name}
                </div>
                <div className="text-sm text-blue-600">
                  Kode: {stock.medicine.code} • Jenis: {stock.medicine.type}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{errors.general[0]}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || success || !formData.expired_at}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Memperbarui..." : "Perbarui Stok"}
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

export default EditStockForm;
