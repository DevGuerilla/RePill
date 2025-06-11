import { useState, useEffect } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicines = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await MedicineService.getAllMedicines();
      setMedicines(response);
      console.log("Medicines fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil data obat");
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (uuid) => {
    try {
      await MedicineService.deleteMedicine(uuid);
      setMedicines((prev) => prev.filter((medicine) => medicine.uuid !== uuid));
      console.log("Medicine deleted successfully");
    } catch (error) {
      console.error("Error deleting medicine:", error);
      setError(error.message || "Terjadi kesalahan saat menghapus obat");
      throw error;
    }
  };

  const refetch = () => {
    fetchMedicines();
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return {
    medicines,
    loading,
    error,
    refetch,
    deleteMedicine,
  };
};
