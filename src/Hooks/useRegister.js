import { useState } from "react";

const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
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

    if (!formData.username.trim()) {
      errors.username = "Username tidak boleh kosong";
    } else if (formData.username.length < 3) {
      errors.username = "Username minimal 3 karakter";
    }

    if (!formData.fullName.trim()) {
      errors.fullName = "Nama lengkap tidak boleh kosong";
    }

    if (!formData.email.trim()) {
      errors.email = "Email tidak boleh kosong";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

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

    // Simulate API call - replace with actual API call later
    setTimeout(() => {
      try {
        // Simulate successful registration
        const response = {
          message: "Pendaftaran berhasil! Silakan login dengan akun baru Anda.",
          data: {
            username: formData.username,
            fullName: formData.fullName,
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
      username: "",
      fullName: "",
      email: "",
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

export default useRegister;
