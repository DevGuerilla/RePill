import { useState, useEffect } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useDetailSupplier = (id) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplierDetail = async (supplierId) => {
    if (!supplierId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await SupplierService.getSupplierById(supplierId);
      setSupplier(response);
      console.log("Supplier detail fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching supplier detail:", error);
      setError(
        error.message || "Terjadi kesalahan saat mengambil detail supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (id) {
      fetchSupplierDetail(id);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSupplierDetail(id);
    }
  }, [id]);

  return {
    supplier,
    loading,
    error,
    refetch,
  };
};
