import { useState, useEffect } from "react";
import StockService from "../../Services/Stock/StockService";

export const useDetailStock = (uuid) => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockDetail = async (stockUuid) => {
    if (!stockUuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await StockService.getStockById(stockUuid);
      setStock(response);
      console.log("Stock detail fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching stock detail:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil detail stok");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (uuid) {
      fetchStockDetail(uuid);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchStockDetail(uuid);
    }
  }, [uuid]);

  return {
    stock,
    loading,
    error,
    refetch,
  };
};
