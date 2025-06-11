import { useState } from "react";
import UserService from "../../Services/User/UserService";

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (uuid, userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await UserService.updateUser(uuid, userData);
      setSuccess(true);
      console.log("User updated successfully:", response);
      return response;
    } catch (error) {
      console.error("Error updating user:", error);

      // Handle validation errors from API
      if (error.response?.data?.data) {
        setError(error.response.data.data);
      } else if (error.response?.data?.message) {
        setError({ general: [error.response.data.message] });
      } else if (error.message) {
        setError({ general: [error.message] });
      } else {
        setError({ general: ["Terjadi kesalahan saat memperbarui pengguna."] });
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
    updateUser,
    loading,
    error,
    success,
    resetState,
  };
};
