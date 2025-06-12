import { useState } from "react";
import UserService from "../../Services/User/UserService";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const createUser = async (userData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await UserService.createUser(userData);
      console.log("Create user response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Pengguna berhasil dibuat");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat membuat pengguna"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
    createUser,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
