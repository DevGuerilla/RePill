import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import ProfileService from "../Services/Profile/ProfileService";
import { loginSuccess } from "../Redux/Features/Auth/AuthStore";

export const useProfile = () => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching profile data...");
      const response = await ProfileService.getProfile();
      console.log("Profile response:", response);

      // Menangani berbagai format respons
      let userData;

      if (response.data && response.data.user) {
        userData = response.data.user; // Format: { data: { user: {...} } }
      } else if (response.data) {
        userData = response.data; // Format: { data: {...} }
      } else {
        userData = response; // Format: {...}
      }

      if (!userData) {
        throw new Error("Gagal memuat data profil: Format data tidak valid");
      }

      console.log("Setting profile state with:", userData);
      setProfile(userData);

      // Ambil token dari session storage
      const token = sessionStorage.getItem("auth_token");

      // Perbarui Redux store dengan data user dan token terbaru
      dispatch(
        loginSuccess({
          user: userData,
          token: token,
        })
      );
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      const errorMessage = err.message || "Gagal mengambil data profil";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Fungsi pembantu untuk mendapatkan URL lengkap gambar
  const getProfileImageUrl = useCallback((imagePath) => {
    // Kembalikan null jika path gambar tidak ada atau gambar default
    if (!imagePath || imagePath === "default.png") return null;

    // Jika path gambar sudah dimulai dengan "http", itu sudah URL lengkap, jadi kembalikan apa adanya
    if (imagePath.startsWith("http")) return imagePath;

    // Untuk path relatif, buat URL lengkap dengan menggabungkan URL API dasar dengan path gambar
    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  }, []);

  useEffect(() => {
    // Check if profile was just updated
    const wasProfileUpdated =
      sessionStorage.getItem("profile_updated") === "true";

    // Always fetch profile on mount or after update
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      // Force fetch after update or on initial load
      if (wasProfileUpdated || !profile) {
        console.log("Forcing profile refresh");
        // Clear any cached user data
        sessionStorage.removeItem("user_data");
        // Clear update flag
        if (wasProfileUpdated) {
          sessionStorage.removeItem("profile_updated");
        }
        // Fetch fresh data
        fetchProfile();
      }
    }
  }, [fetchProfile, profile]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    refetch: fetchProfile,
    getProfileImageUrl,
  };
};
