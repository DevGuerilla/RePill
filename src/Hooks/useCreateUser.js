import { useState } from "react";
import UserService from "../Services/User/UserService";

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await UserService.createUser(userData);
      setSuccess(true);
      console.log("User created successfully:", response);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        // API returns validation errors in data.data
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        // API returns general error message
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        // Network or other errors
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat membuat pengguna."] });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    createUser,
    loading,
    error,
    success,
    resetState,
  };
};
