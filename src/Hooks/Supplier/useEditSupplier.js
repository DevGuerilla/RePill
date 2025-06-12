import { useState } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useEditSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateSupplier = async (uuid, supplierData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await SupplierService.updateSupplier(uuid, supplierData);
      console.log("Update supplier response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Supplier berhasil diperbarui");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat memperbarui supplier"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      setMessage("Ada yang error, silahkan coba lagi.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setErrors({});
    setMessage("");
    setSuccess(false);
    setLoading(false);
  };

  return {
    updateSupplier,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
