import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileService from "../../Services/Profile/ProfileService";
import {
  selectIsAuthenticated,
  selectUser,
  updateUser,
} from "../../Redux/Features/Auth/AuthStore";

export const useProfile = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cache untuk profile
  const cacheRef = useRef({ data: null, timestamp: 0 });
  const initialLoadRef = useRef(false);

  const fetchProfile = useCallback(
    async (force = false) => {
      if (!isAuthenticated) return;

      // Check cache first (5 minute cache)
      const now = Date.now();
      if (
        !force &&
        cacheRef.current.data &&
        now - cacheRef.current.timestamp < 300000
      ) {
        setProfile(cacheRef.current.data);
        return;
      }

      // Only show loading on initial load or forced refresh
      if (!initialLoadRef.current || force) {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await ProfileService.getProfile();
        if (response.success) {
          const profileData = response.data;
          setProfile(profileData);

          // Update Redux store untuk navbar
          dispatch(updateUser(profileData));

          // Cache the result
          cacheRef.current = {
            data: profileData,
            timestamp: now,
          };

          // Remove profile_updated flag after successful fetch
          sessionStorage.removeItem("profile_updated");
        } else {
          setError(response.message || "Gagal mengambil data profil");
        }
      } catch (err) {
        const errorMessage = err.message || "Gagal mengambil data profil";
        setError(errorMessage);
      } finally {
        setLoading(false);
        initialLoadRef.current = true;
      }
    },
    [isAuthenticated, dispatch]
  );

  const getProfileImageUrl = useCallback((imagePath) => {
    if (!imagePath || imagePath === "default.png") return null;

    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  }, []);

  const refetch = useCallback(
    (force = false) => {
      fetchProfile(force);
    },
    [fetchProfile]
  );

  // Check for profile updates on component mount and route changes
  useEffect(() => {
    if (isAuthenticated) {
      const profileUpdated = sessionStorage.getItem("profile_updated");
      if (profileUpdated) {
        fetchProfile(true); // Force refresh if profile was updated
      } else {
        fetchProfile();
      }
    } else if (user) {
      setProfile(user);
    }
  }, [isAuthenticated, user, fetchProfile]);

  // Listen for storage changes (profile updates from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "profile_updated" && e.newValue) {
        fetchProfile(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchProfile]);

  return {
    profile: profile || user,
    loading,
    error,
    fetchProfile,
    getProfileImageUrl,
    refetch,
  };
};
