import { useState, useEffect, useCallback } from "react";
import UserService from "../Services/User/UserService";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(
    async (params = {}) => {
      console.log("useUser: Starting fetch users");
      setLoading(true);
      setError(null);

      try {
        const data = await UserService.getAllUsers(params);
        console.log("useUser: Users fetched successfully");
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("useUser: Error fetching users:", err);
        const errorMessage = err.message || "Gagal mengambil data pengguna";
        setError(errorMessage);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [] // Remove dependencies to prevent infinite loop
  );

  const createUser = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const newUser = await UserService.createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      const errorMessage = err.message || "Gagal membuat pengguna baru";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (uuid, userData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await UserService.updateUser(uuid, userData);
      setUsers((prev) =>
        prev.map((user) => (user.uuid === uuid ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      const errorMessage = err.message || "Gagal memperbarui pengguna";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (uuid) => {
    setLoading(true);
    setError(null);

    try {
      await UserService.deleteUser(uuid);
      setUsers((prev) => prev.filter((user) => user.uuid !== uuid));
    } catch (err) {
      const errorMessage = err.message || "Gagal menghapus pengguna";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useUser: Component mounted, fetching users");
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
};
