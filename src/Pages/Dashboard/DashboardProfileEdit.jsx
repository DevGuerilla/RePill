import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";
import { useProfile } from "../../Hooks/useProfile";
import ProfileService from "../../Services/Profile/ProfileService";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";
import { X, User, Mail, AtSign, Save } from "lucide-react";

const DashboardProfileEdit = () => {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    getProfileImageUrl,
    refetch,
  } = useProfile();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  // Inisialisasi form data ketika profile sudah tersedia
  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || "",
        username: profile.username || "",
        email: profile.email || "",
      });
      console.log("Mengisi form dengan data profil:", profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Data yang akan dikirim - ensure proper format
      const dataToSubmit = {
        fullname: formData.fullname.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
      };

      console.log(
        "Mengirim permintaan update profil dengan data:",
        dataToSubmit
      );

      // Kirim permintaan update
      const response = await ProfileService.updateProfile(dataToSubmit);
      console.log("Update profil berhasil, response:", response);

      // Force refresh the data
      sessionStorage.removeItem("user_data");
      sessionStorage.setItem("profile_updated", "true");

      // Set modal success
      setModalType("success");
      setModalMessage("Profil berhasil diperbarui");
      setShowModal(true);

      // After successful update, force a complete page reload
      // This ensures all data is refreshed from the server
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Gagal memperbarui profil");

      // Set modal error
      setModalType("error");
      setModalMessage(err.message || "Gagal memperbarui profil");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Define handleModalConfirm
  const handleModalConfirm = () => {
    setShowModal(false);
    if (modalType === "success") {
      // Force a full page reload to get fresh data
      window.location.href = "/dashboard/profile";
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  const profileImageUrl = getProfileImageUrl(profile?.image);

  if (profileLoading) {
    return (
      <DashboardLayout title="Edit Profil">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Profil">
      {/* Modal Response */}
      <ModalResponse
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        showCountdown={modalType === "success"}
        countdownSeconds={3}
      />

      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
        <div className="max-w-6xl w-full mx-auto space-y-6">
          {/* Error Message */}
          {(error || profileError) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700">
                    {error || profileError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Profile Layout - Horizontal */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
              {/* Left Side - Image Only */}
              <div className="lg:col-span-2 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-200">
                <div className="relative">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-64 h-64 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-64 h-64 rounded-2xl bg-primary flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-white font-bold text-7xl">
                        {profile?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Profile Edit Form */}
              <div className="lg:col-span-3 p-8 flex items-center justify-center">
                <div className="w-full">
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="pb-6 border-b border-gray-200">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          Edit Informasi Pribadi
                        </h1>
                        <p className="text-gray-600 mt-2">
                          Perbarui detail akun dan informasi personal Anda
                        </p>
                      </div>
                    </div>

                    {/* Edit Form */}
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-8 max-w-3xl mx-auto"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            <div className="p-2 bg-primary-light rounded-lg">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-lg"
                            placeholder="Masukkan nama lengkap"
                            required
                          />
                        </div>

                        <div className="space-y-4">
                          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            <div className="p-2 bg-primary-light rounded-lg">
                              <AtSign className="h-4 w-4 text-primary" />
                            </div>
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-lg"
                            placeholder="Masukkan username"
                            required
                          />
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            <div className="p-2 bg-primary-light rounded-lg">
                              <Mail className="h-4 w-4 text-primary" />
                            </div>
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-lg"
                            placeholder="Masukkan email"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfileEdit;
