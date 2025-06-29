import { useState, useEffect, useCallback } from "react";
import UserService from "../../Services/User/UserService";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 10,
    from: 0,
    to: 0,
  });

  const fetchUsers = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await UserService.getAllUsers(params);

        if (response && response.data) {
          setUsers(Array.isArray(response.data) ? response.data : []);
          setPagination({
            currentPage: response.current_page || 1,
            lastPage: response.last_page || 1,
            total: response.total || 0,
            perPage: response.per_page || 10,
            from: response.from || 0,
            to: response.to || 0,
          });
        } else {
          setUsers([]);
          setPagination({
            currentPage: 1,
            lastPage: 1,
            total: 0,
            perPage: 10,
            from: 0,
            to: 0,
          });
        }
      } catch (err) {
        const errorMessage = err.message || "Gagal mengambil data pengguna";
        setError(errorMessage);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [setUsers, setPagination]
  );

  const createUser = useCallback(
    async (userData) => {
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
    },
    [setUsers]
  );

  const updateUser = useCallback(
    async (uuid, userData) => {
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
    },
    [setUsers]
  );

  const deleteUser = useCallback(
    async (uuid) => {
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
    },
    [setUsers]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    refetch: fetchUsers,
  };
};
