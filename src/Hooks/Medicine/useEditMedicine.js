import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useEditMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateMedicine = async (uuid, medicineData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await MedicineService.updateMedicine(uuid, medicineData);
      setSuccess(true);
      console.log("Medicine updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating medicine:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat memperbarui obat."] });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    updateMedicine,
    loading,
    error,
    success,
    resetState,
  };
};
