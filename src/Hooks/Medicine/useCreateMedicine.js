import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useCreateMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createMedicine = async (medicineData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await MedicineService.createMedicine(medicineData);
      setSuccess(true);
      console.log("Medicine created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating medicine:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat membuat obat."] });
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
    createMedicine,
    loading,
    error,
    success,
    resetState,
  };
};
