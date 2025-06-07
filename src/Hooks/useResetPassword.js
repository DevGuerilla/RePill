import { useState } from "react";

const useResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

    if (!formData.password) {
      errors.password = "Kata sandi tidak boleh kosong";
    } else if (formData.password.length < 6) {
      errors.password = "Kata sandi minimal 6 karakter";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Konfirmasi kata sandi tidak boleh kosong";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Konfirmasi kata sandi tidak sesuai";
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
            "Kata sandi berhasil diubah! Anda akan diarahkan ke halaman login.",
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
      password: "",
      confirmPassword: "",
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

export default useResetPassword;
