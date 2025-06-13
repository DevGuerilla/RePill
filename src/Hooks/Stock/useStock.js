import { useState, useEffect, useCallback } from "react";
import StockService from "../../Services/Stock/StockService";

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 5,
    from: 0,
    to: 0,
  });

  const fetchStocks = useCallback(async (params = {}) => {
    console.log("useStock: Starting fetch stocks");
    setLoading(true);
    setError(null);

    try {
      const response = await StockService.getAllStocks(params);
      console.log("useStock: Stocks fetched successfully", response);

      if (response && response.data) {
        setStocks(Array.isArray(response.data) ? response.data : []);
        setPagination({
          currentPage: response.current_page || 1,
          lastPage: response.last_page || 1,
          total: response.total || 0,
          perPage: response.per_page || 5,
          from: response.from || 0,
          to: response.to || 0,
        });
      } else {
        setStocks([]);
        setPagination({
          currentPage: 1,
          lastPage: 1,
          total: 0,
          perPage: 5,
          from: 0,
          to: 0,
        });
      }
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
    pagination,
    fetchStocks,
    deleteStock,
    refetch,
  };
};
