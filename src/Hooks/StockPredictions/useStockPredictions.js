import { useState, useEffect } from "react";
import StockPredictionsService from "../../Services/StockPredictions/StockPredictionsService";

export const useStockPredictions = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [urgentPurchases, setUrgentPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await StockPredictionsService.getStockPredictions();

      if (response.success) {
        setData(response.data.recommendations || []);
        setSummary(response.data.summary || {});
        setUrgentPurchases(response.data.urgent_purchases || []);
      } else {
        setError(response.message || "Gagal mengambil data prediksi stok");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const refetch = () => {
    fetchPredictions();
  };

  return {
    data,
    summary,
    urgentPurchases,
    loading,
    error,
    refetch,
  };
};
