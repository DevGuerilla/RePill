import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useCreateMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const createMedicine = async (medicineData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await MedicineService.createMedicine(medicineData);
      console.log("Create medicine response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Obat berhasil dibuat");
        setSuccess(true);
        return response;
      } else {
        setMessage(response.message || "Terjadi kesalahan saat membuat obat");
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error creating medicine:", error);
      setMessage("Ada yang error, silahkan coba lagi.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setErrors({});
    setMessage("");
    setSuccess(false);
    setLoading(false);
  };

  return {
    createMedicine,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
