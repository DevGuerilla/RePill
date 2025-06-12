import { useState, useEffect } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useDetailSupplier = (uuid) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSupplierDetail = async (supplierUuid) => {
    if (!supplierUuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await SupplierService.getSupplierById(supplierUuid);
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
    if (uuid) {
      fetchSupplierDetail(uuid);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchSupplierDetail(uuid);
    }
  }, [uuid]);

  return {
    supplier,
    loading,
    error,
    refetch,
  };
};
