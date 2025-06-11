import { useState, useEffect } from "react";
import SupplierService from "../Services/Supplier/SupplierService";

export const useSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await SupplierService.getAllSuppliers();
      setSuppliers(response);
      console.log("Suppliers fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setError(
        error.message || "Terjadi kesalahan saat mengambil data supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteSupplier = async (uuid) => {
    try {
      await SupplierService.deleteSupplier(uuid);
      setSuppliers((prev) => prev.filter((supplier) => supplier.uuid !== uuid));
      console.log("Supplier deleted successfully");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      setError(error.message || "Terjadi kesalahan saat menghapus supplier");
      throw error;
    }
  };

  const refetch = () => {
    fetchSuppliers();
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    loading,
    error,
    refetch,
    deleteSupplier,
  };
};
