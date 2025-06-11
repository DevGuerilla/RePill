import { useState, useEffect } from "react";
import RoleService from "../../Services/Role/RoleService";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await RoleService.getAllRoles();
      setRoles(response);
      console.log("Roles fetched successfully:", response);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError(error.message || "Terjadi kesalahan saat mengambil data role");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    refetch,
  };
};
