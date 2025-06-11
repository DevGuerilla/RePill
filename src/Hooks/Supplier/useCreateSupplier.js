import { useState } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useCreateSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createSupplier = async (supplierData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await SupplierService.createSupplier(supplierData);
      setSuccess(true);
      console.log("Supplier created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating supplier:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat membuat supplier."] });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    createSupplier,
    loading,
    error,
    success,
    resetState,
  };
};
