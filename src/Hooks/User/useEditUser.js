import { useState } from "react";
import UserService from "../../Services/User/UserService";

export const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const updateUser = async (uuid, userData) => {
    setLoading(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    try {
      const response = await UserService.updateUser(uuid, userData);
      console.log("Update user response:", response);

      if (response.success !== false && response.status !== 422) {
        setMessage("Pengguna berhasil diperbarui");
        setSuccess(true);
        return response;
      } else {
        setMessage(
          response.message || "Terjadi kesalahan saat memperbarui pengguna"
        );
        if (response.data) {
          setErrors(response.data);
        }
        return response;
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
    updateUser,
    loading,
    errors,
    message,
    success,
    resetState,
  };
};
