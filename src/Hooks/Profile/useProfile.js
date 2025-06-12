import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import ProfileService from "../../Services/Profile/ProfileService";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../Redux/Features/Auth/AuthStore";

export const useProfile = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ProfileService.getProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      const errorMessage = err.message || "Gagal mengambil data profil";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getProfileImageUrl = useCallback((imagePath) => {
    if (!imagePath || imagePath === "default.png") return null;

    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  }, []);

  const refetch = useCallback(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    } else if (user) {
      setProfile(user);
    }
  }, [isAuthenticated, user, fetchProfile]);

  return {
    profile: profile || user,
    loading,
    error,
    fetchProfile,
    getProfileImageUrl,
    refetch,
  };
};
