import { useState, useEffect } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useDetailMedicine = (uuid) => {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedicineDetail = async (medicineUuid) => {
    if (!medicineUuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await MedicineService.getMedicineById(medicineUuid);
      setMedicine(response);
      console.log("Medicine detail fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching medicine detail:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil detail obat");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (uuid) {
      fetchMedicineDetail(uuid);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchMedicineDetail(uuid);
    }
  }, [uuid]);

  return {
    medicine,
    loading,
    error,
    refetch,
  };
};
