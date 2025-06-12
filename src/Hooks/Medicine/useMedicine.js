import { useState, useEffect, useCallback } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicines = useCallback(async (params = {}) => {
    console.log("useMedicine: Starting fetch medicines");
    setLoading(true);
    setError(null);

    try {
      const data = await MedicineService.getAllMedicines(params);
      console.log("useMedicine: Medicines fetched successfully");
      setMedicines(Array.isArray(data) ? data : []);
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
    fetchMedicines,
    deleteMedicine,
    refetch: fetchMedicines,
  };
};
