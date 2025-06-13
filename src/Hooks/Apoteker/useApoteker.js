import { useState } from "react";
import ApotekerService from "../../Services/Apoteker/ApotekerService";

export const useApoteker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    barcode: "",
    type: "out",
    qty: 1,
  });

  const submitScan = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await ApotekerService.scanBarcode(formData);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      barcode: "",
      type: "out",
      qty: 1,
    });
    setError(null);
  };

  return {
    isLoading,
    error,
    formData,
    submitScan,
    updateFormData,
    resetForm,
  };
};
