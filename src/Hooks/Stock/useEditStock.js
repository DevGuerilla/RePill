import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useEditStock = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateStock = async (uuid, stockData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await StockService.updateStock(uuid, stockData);
      console.log("Update stock response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Stok berhasil diperbarui");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat memperbarui stok"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error updating stock:", error);
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
    updateStock,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
