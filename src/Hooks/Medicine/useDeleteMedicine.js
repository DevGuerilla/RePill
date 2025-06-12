import { useState } from "react";
import MedicineService from "../../Services/Medicine/MedicineService";

export const useDeleteMedicine = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const deleteMedicine = async (uuid) => {
    setLoading(true);
    setErrors({});
    setMessage("");

    try {
      const response = await MedicineService.deleteMedicine(uuid);
      console.log("Medicine deleted successfully:", response);
      setMessage("Obat berhasil dihapus");
      return response;
    } catch (error) {
      console.error("Error deleting medicine:", error);
      setMessage("Ada yang error, silahkan coba lagi.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteMedicine,
    loading,
    errors,
    message,
  };
};
