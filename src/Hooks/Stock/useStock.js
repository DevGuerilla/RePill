import { useState, useEffect } from "react";
import StockService from "../../Services/Stock/StockService";

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStocks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await StockService.getAllStocks();
      setStocks(response);
      console.log("Stocks fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching stocks:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil data stok");
    } finally {
      setLoading(false);
    }
  };

  const deleteStock = async (uuid) => {
    try {
      await StockService.deleteStock(uuid);
      setStocks((prev) => prev.filter((stock) => stock.uuid !== uuid));
      console.log("Stock deleted successfully");
    } catch (error) {
      console.error("Error deleting stock:", error);
      setError(error.message || "Terjadi kesalahan saat menghapus stok");
      throw error;
    }
  };

  const refetch = () => {
    fetchStocks();
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return {
    stocks,
    loading,
    error,
    refetch,
    deleteStock,
  };
};
