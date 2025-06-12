import { useState } from "react";
import StockService from "../../Services/Stock/StockService";

export const useDeleteStock = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const deleteStock = async (uuid) => {
    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const response = await StockService.deleteStock(uuid);
      console.log("Stock deleted successfully:", response);
      setMessage("Stok berhasil dihapus");
      return response;
    } catch (error) {
      console.error("Error deleting stock:", error);
      setMessage("Ada yang error, silahkan coba lagi.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStock,
    loading,
    errors,
    message,
  };
};
