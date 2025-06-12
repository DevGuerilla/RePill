import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useEditMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateMedicine = async (uuid, medicineData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await MedicineService.updateMedicine(uuid, medicineData);
      console.log("Update medicine response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Obat berhasil diperbarui");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat memperbarui obat"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
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
    updateMedicine,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
