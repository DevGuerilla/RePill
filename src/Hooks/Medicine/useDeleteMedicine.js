import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useDeleteMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMedicine = async (uuid) => {
    setLoading(true);
    setError(null);

    try {
      const response = await MedicineService.deleteMedicine(uuid);
      console.log("Medicine deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting medicine:", error);
      setError(error.message || "Terjadi kesalahan saat menghapus obat");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMedicine,
    loading,
    error,
  };
};
