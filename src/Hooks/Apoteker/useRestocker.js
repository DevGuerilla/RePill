import { useState, useEffect } from "react";
import RestockerService from "../../Services/Restocker/RestockerService";

export const useRestocker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [formData, setFormData] = useState({
    barcode: "",
    type: "in",
    qty: 1,
    medicine_id: "",
    expired_at: "",
  });

  const fetchMedicines = async () => {
    setLoadingMedicines(true);
    try {
      const response = await RestockerService.getAllMedicines();
      console.log("Medicines fetched:", response);

      if (Array.isArray(response)) {
        setMedicines(response);
      } else {
        setMedicines([]);
        console.error("Failed to fetch medicines: Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setMedicines([]);
    } finally {
      setLoadingMedicines(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const submitScan = async () => {
    setIsLoading(true);
    setError(null);
    setMessage("");
    setSuccess(false);

    try {
      // Prepare payload based on type
      const payload = {
        barcode: formData.barcode,
        type: formData.type,
        qty: formData.qty,
      };

      // Only include medicine_id and expired_at if type is "in"
      if (formData.type === "in") {
        if (formData.medicine_id) {
          payload.medicine_id = formData.medicine_id;
        }
        if (formData.expired_at) {
          payload.expired_at = formData.expired_at;
        }
      }

      const response = await RestockerService.scanBarcode(payload);
      console.log("Scan barcode response:", response);

      if (response.success !== false && response.status !== 422) {
        const successMessage = "Barcode berhasil diproses";
        setMessage(successMessage);
        setSuccess(true);
        return { success: true, message: successMessage, data: response };
      } else {
        const errorMessage =
          response.message || "Terjadi kesalahan saat memproses barcode";
        setMessage(errorMessage);
        setError(errorMessage);
        return { success: false, message: errorMessage, data: response };
      }
    } catch (error) {
      console.error("Error processing barcode:", error);
      const errorMessage = "Ada yang error, silahkan coba lagi.";
      setMessage(errorMessage);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Clear medicine_id and expired_at when type changes to "out"
      if (field === "type" && value === "out") {
        newData.medicine_id = "";
        newData.expired_at = "";
      }

      return newData;
    });
  };

  const resetForm = () => {
    setFormData({
      barcode: "",
      type: "in",
      qty: 1,
      medicine_id: "",
      expired_at: "",
    });
    setError(null);
    setMessage("");
    setSuccess(false);
  };

  return {
    isLoading,
    error,
    message,
    success,
    formData,
    medicines,
    loadingMedicines,
    submitScan,
    updateFormData,
    resetForm,
    fetchMedicines,
  };
};
