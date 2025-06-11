import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useCreateStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createStock = async (stockData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await StockService.createStock(stockData);
      setSuccess(true);
      console.log("Stock created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating stock:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat membuat stok."] });
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
    createStock,
    loading,
    error,
    success,
    resetState,
  };
};
