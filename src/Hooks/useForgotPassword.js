import { useState } from "react";

const useForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    return errors;
  };

  const handleSubmit = (e, onSuccess, onError) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        const response = {
          message:
            "Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.",
          data: {
            email: formData.email,
          },
        };

        setIsLoading(false);
        onSuccess(response);
      } catch (error) {
        setIsLoading(false);
        onError(error);
      }
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      email: "",
    });
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    validateForm,
    resetForm,
  };
};

export default useForgotPassword;
