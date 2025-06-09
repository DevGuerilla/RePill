import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileService from "../Services/Profile/ProfileService";
import { loginSuccess, selectUser } from "../Redux/Features/Auth/AuthStore";

export const useProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const [profile, setProfile] = useState(currentUser || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    console.log("useProfile: Starting fetch profile");
    setLoading(true);
    setError(null);

    try {
      const userData = await ProfileService.getProfile();
      console.log("useProfile: Profile fetched successfully");

      setProfile(userData);

      // Update Redux store with fresh user data
      dispatch(
        loginSuccess({
          user: userData,
          token: sessionStorage.getItem("auth_token"),
        })
      );
    } catch (err) {
      console.error("useProfile: Error fetching profile:", err);
      const errorMessage = err.message || "Gagal mengambil data profil";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateProfile = useCallback(
    async (profileData) => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await ProfileService.updateProfile(profileData);
        setProfile(updatedUser);

        // Update Redux store
        dispatch(
          loginSuccess({
            user: updatedUser,
            token: sessionStorage.getItem("auth_token"),
          })
        );

        return updatedUser;
      } catch (err) {
        const errorMessage = err.message || "Gagal memperbarui profil";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const uploadProfilePicture = useCallback(
    async (file) => {
      setLoading(true);
      setError(null);

      try {
        const result = await ProfileService.uploadProfilePicture(file);
        // Refresh profile after upload
        await fetchProfile();
        return result;
      } catch (err) {
        const errorMessage = err.message || "Gagal mengunggah foto profil";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchProfile]
  );

  useEffect(() => {
    // Only fetch if we have a token but no user data
    const token = sessionStorage.getItem("auth_token");
    if (token && !currentUser) {
      console.log("useProfile: Token found but no user data, fetching profile");
      fetchProfile();
    } else if (currentUser) {
      setProfile(currentUser);
    }
  }, [fetchProfile, currentUser]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    uploadProfilePicture,
    refetch: fetchProfile,
  };
};
