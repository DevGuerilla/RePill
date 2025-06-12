import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useCreateStock = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const createStock = async (stockData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await StockService.createStock(stockData);
      console.log("Create stock response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Stok berhasil dibuat");
        setSuccess(true);
        return response;
      } else {
        setMessage(response.message || "Terjadi kesalahan saat membuat stok");
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error creating stock:", error);
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
    createStock,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
