import { useState } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useEditSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateSupplier = async (id, supplierData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await SupplierService.updateSupplier(id, supplierData);
      setSuccess(true);
      console.log("Supplier updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating supplier:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat memperbarui supplier."] });
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
    updateSupplier,
    loading,
    error,
    success,
    resetState,
  };
};
