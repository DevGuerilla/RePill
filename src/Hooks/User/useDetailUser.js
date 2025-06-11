import { useState, useEffect } from "react";
import UserService from "../../Services/User/UserService";

export const useDetailUser = (uuid) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetail = async (userUuid) => {
    if (!userUuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await UserService.getUserById(userUuid);
      setUser(response);
      console.log("User detail fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching user detail:", error);
      setError(
        error.message || "Terjadi kesalahan saat mengambil detail pengguna"
      );
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (uuid) {
      fetchUserDetail(uuid);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchUserDetail(uuid);
    }
  }, [uuid]);

  return {
    user,
    loading,
    error,
    refetch,
  };
};
