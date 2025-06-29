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

      if (Array.isArray(response)) {
        setRoles(response);
      } else if (response.success === false) {
        setError(response.message || "Gagal mengambil data role");
        setRoles([]);
      } else {
        setRoles([]);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data role");
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    refetch: fetchRoles,
  };
};

export const useRole = (uuid) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRole = async (roleUuid) => {
    if (!roleUuid) return;

    setLoading(true);
    setError(null);

    try {
      const response = await RoleService.getRoleById(roleUuid);

      if (response.success === false) {
        setError(response.message || "Gagal mengambil data role");
      } else {
        setRole(response);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uuid) {
      fetchRole(uuid);
    }
  }, [uuid]);

  return {
    role,
    loading,
    error,
    refetch: () => fetchRole(uuid),
  };
};
