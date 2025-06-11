import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useEditStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStock = async (uuid, stockData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await StockService.updateStock(uuid, stockData);
      setSuccess(true);
      console.log("Stock updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating stock:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat memperbarui stok."] });
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
    updateStock,
    loading,
    error,
    success,
    resetState,
  };
};
