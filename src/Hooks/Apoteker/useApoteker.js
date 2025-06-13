import { useState, useEffect } from "react";
import ApotekerService from "../../Services/Apoteker/ApotekerService";

export const useApoteker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    barcode: "",
    type: "out",
    qty: 1,
  });

  const submitScan = async () => {
    setIsLoading(true);
    setError(null);
    setMessage("");
    setSuccess(false);

    try {
      const response = await ApotekerService.scanBarcode(formData);
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
    // Prevent changing type for apoteker - always keep it as "out"
    if (field === "type") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      barcode: "",
      type: "out", // Always reset to "out" for apoteker
      qty: 1,
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
    submitScan,
    updateFormData,
    resetForm,
  };
};
