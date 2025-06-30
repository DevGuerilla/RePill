import { useState } from "react";
import { useDispatch } from "react-redux";
import ProfileService from "../../Services/Profile/ProfileService";
import { updateUser } from "../../Redux/Features/Auth/AuthStore";

export const useEditProfile = () => {
  const dispatch = useDispatch();
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

        // Update Redux store immediately
        if (response.data) {
          dispatch(updateUser(response.data));
        }

        // Set flag for profile update
        sessionStorage.setItem("profile_updated", "true");

        // Trigger storage event for other components
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "profile_updated",
            newValue: "true",
          })
        );

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
