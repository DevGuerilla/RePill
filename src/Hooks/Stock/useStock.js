import { useState, useEffect, useCallback } from "react";
import StockService from "../../Services/Stock/StockService";

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStocks = useCallback(async (params = {}) => {
    console.log("useStock: Starting fetch stocks");
    setLoading(true);
    setError(null);

    try {
      const data = await StockService.getAllStocks(params);
      console.log("useStock: Stocks fetched successfully");
      setStocks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("useStock: Error fetching stocks:", err);
      const errorMessage = err.message || "Gagal mengambil data stok";
      setError(errorMessage);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStock = useCallback(
    async (uuid) => {
      setLoading(true);
      setError(null);

      try {
        await StockService.deleteStock(uuid);
        setStocks((prev) => prev.filter((stock) => stock.uuid !== uuid));
      } catch (err) {
        const errorMessage = err.message || "Gagal menghapus stok";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setStocks]
  );

  const refetch = useCallback(() => {
    fetchStocks();
  }, [fetchStocks]);

  useEffect(() => {
    console.log("useStock: Component mounted, fetching stocks");
    fetchStocks();
  }, [fetchStocks]);

  return {
    stocks,
    loading,
    error,
    fetchStocks,
    deleteStock,
    refetch,
  };
};
