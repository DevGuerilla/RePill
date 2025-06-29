import { useState } from "react";
import ProfileService from "../../Services/Profile/ProfileService";

export const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await ProfileService.updateProfile(profileData);

      if (response.success !== false) {
        setSuccess(true);
        sessionStorage.removeItem("user_data");
        sessionStorage.setItem("profile_updated", "true");
        return response;
      } else {
        setError(response.message || "Gagal memperbarui profil");
        return response;
      }
    } catch (err) {
      const errorMessage = err.message || "Gagal memperbarui profil";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    updateProfile,
    loading,
    error,
    success,
    resetState,
  };
};
