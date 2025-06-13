import { useState, useEffect, useCallback } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useMedicine = () => {
  const [medicines, setMedicines] = useState([]);
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

  const fetchMedicines = useCallback(async (params = {}) => {
    console.log("useMedicine: Starting fetch medicines");
    setLoading(true);
    setError(null);

    try {
      const response = await MedicineService.getAllMedicines(params);
      console.log("useMedicine: Medicines fetched successfully", response);

      if (response && response.data) {
        setMedicines(Array.isArray(response.data) ? response.data : []);
        setPagination({
          currentPage: response.current_page || 1,
          lastPage: response.last_page || 1,
          total: response.total || 0,
          perPage: response.per_page || 5,
          from: response.from || 0,
          to: response.to || 0,
        });
      } else {
        setMedicines([]);
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
      console.error("useMedicine: Error fetching medicines:", err);
      const errorMessage = err.message || "Gagal mengambil data obat";
      setError(errorMessage);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMedicine = useCallback(async (uuid) => {
    setLoading(true);
    setError(null);

    try {
      await MedicineService.deleteMedicine(uuid);
      setMedicines((prev) => prev.filter((medicine) => medicine.uuid !== uuid));
    } catch (err) {
      const errorMessage = err.message || "Gagal menghapus obat";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useMedicine: Component mounted, fetching medicines");
    fetchMedicines();
  }, [fetchMedicines]);

  return {
    medicines,
    loading,
    error,
    pagination,
    fetchMedicines,
    deleteMedicine,
    refetch: fetchMedicines,
  };
};
