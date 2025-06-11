import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useDeleteStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStock = async (uuid) => {
    setLoading(true);
    setError(null);

    try {
      const response = await StockService.deleteStock(uuid);
      console.log("Stock deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting stock:", error);
      setError(error.message || "Terjadi kesalahan saat menghapus stok");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStock,
    loading,
    error,
  };
};
