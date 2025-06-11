import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import ProfileService from "../Services/Profile/ProfileService";

export const useEditProfile = (initialData = {}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: initialData.fullname || "",
    username: initialData.username || "",
    email: initialData.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        fullname: initialData.fullname || "",
        username: initialData.username || "",
        email: initialData.email || "",
      });
    }
  }, [initialData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      setLoading(true);
      setError(null);

      try {
        // Validasi data
        if (!formData.fullname || !formData.username || !formData.email) {
          throw new Error("Semua field harus diisi");
        }

        console.log("useEditProfile: Mengirim data update profil:", formData);

        // Membuat salinan data untuk memastikan tidak ada field tambahan
        const profileDataToSend = {
          fullname: formData.fullname.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
        };

        // Panggil API update profile
        const response = await ProfileService.updateProfile(profileDataToSend);
        console.log("useEditProfile: Update berhasil:", response);

        // Return response untuk penanganan lebih lanjut
        return response;
      } catch (err) {
        console.error("useEditProfile: Error:", err);
        const errorMessage = err.message || "Gagal memperbarui profil";
        setError(errorMessage);
        throw err; // Re-throw untuk penanganan di komponen
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const handleCancel = useCallback(() => {
    navigate("/dashboard/profile");
  }, [navigate]);

  return {
    formData,
    setFormData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
