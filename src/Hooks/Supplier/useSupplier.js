import { useState, useEffect, useCallback } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuppliers = useCallback(async (params = {}) => {
    console.log("useSupplier: Starting fetch suppliers");
    setLoading(true);
    setError(null);

    try {
      const data = await SupplierService.getAllSuppliers(params);
      console.log("useSupplier: Suppliers fetched successfully");
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("useSupplier: Error fetching suppliers:", err);
      const errorMessage = err.message || "Gagal mengambil data supplier";
      setError(errorMessage);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSupplier = useCallback(async (uuid) => {
    setLoading(true);
    setError(null);

    try {
      await SupplierService.deleteSupplier(uuid);
      setSuppliers((prev) => prev.filter((supplier) => supplier.uuid !== uuid));
    } catch (err) {
      const errorMessage = err.message || "Gagal menghapus supplier";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  useEffect(() => {
    console.log("useSupplier: Component mounted, fetching suppliers");
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    loading,
    error,
    refetch,
    deleteSupplier,
  };
};
