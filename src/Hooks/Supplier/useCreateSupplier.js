import { useState } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useCreateSupplier = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const createSupplier = async (supplierData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await SupplierService.createSupplier(supplierData);
      console.log("Create supplier response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Supplier berhasil dibuat");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat membuat supplier"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
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
    createSupplier,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
