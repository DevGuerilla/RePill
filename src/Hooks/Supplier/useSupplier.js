import { useState, useEffect, useCallback } from "react";
import SupplierService from "../../Services/Supplier/SupplierService";

export const useSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
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

  const fetchSuppliers = useCallback(async (params = {}) => {
    console.log("useSupplier: Starting fetch suppliers");
    setLoading(true);
    setError(null);

    try {
      const response = await SupplierService.getAllSuppliers(params);
      console.log("useSupplier: Suppliers fetched successfully", response);

      if (response && response.data) {
        setSuppliers(Array.isArray(response.data) ? response.data : []);
        setPagination({
          currentPage: response.current_page || 1,
          lastPage: response.last_page || 1,
          total: response.total || 0,
          perPage: response.per_page || 5,
          from: response.from || 0,
          to: response.to || 0,
        });
      } else {
        setSuppliers([]);
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
    pagination,
    fetchSuppliers,
    refetch,
    deleteSupplier,
  };
};
