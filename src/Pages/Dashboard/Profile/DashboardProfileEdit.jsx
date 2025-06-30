import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import { useProfile } from "../../../Hooks/Profile/useProfile";
import { useEditProfile } from "../../../Hooks/Profile/useEditProfile";
import ModalResponse from "../../../Components/Fragments/Common/ModalResponse";
import { X, User, Mail, AtSign } from "lucide-react";

const DashboardProfileEdit = () => {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    getProfileImageUrl,
  } = useProfile();

  const { updateProfile, loading, error, success } = useEditProfile();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || "",
        username: profile.username || "",
        email: profile.email || "",
      });
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

    try {
      const dataToSubmit = {
        fullname: formData.fullname.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
      };

      const response = await updateProfile(dataToSubmit);

      if (response.success !== false) {
        setModalType("success");
        setModalMessage("Profil berhasil diperbarui");
        setShowModal(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setModalType("error");
        setModalMessage(response.message || "Gagal memperbarui profil");
        setShowModal(true);
      }
    } catch (err) {
      setModalType("error");
      setModalMessage(err.message || "Gagal memperbarui profil");
      setShowModal(true);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (modalType === "success") {
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
        <div
          className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
          role="status"
          aria-label="Memuat data profil"
        >
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary" />
          <span className="sr-only">Memuat...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Profil">
      <ModalResponse
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        showCountdown={modalType === "success"}
        countdownSeconds={3}
      />

      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-4 sm:py-8">
        <div className="max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">
          {(error || profileError) && (
            <div
              className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-xs sm:text-sm text-red-700 break-words">
                    {error || profileError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <main className="bg-white rounded-lg border border-gray-200 overflow-hidden mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-5 min-h-[400px] sm:min-h-[500px]">
              <section
                className="xl:col-span-2 bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center border-b xl:border-b-0 xl:border-r border-gray-200"
                aria-label="Foto profil"
              >
                <div className="relative">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={`Foto profil ${profile?.fullname || "pengguna"}`}
                      className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-2xl bg-primary flex items-center justify-center border-4 border-white shadow-xl"
                      role="img"
                      aria-label={`Avatar untuk ${
                        profile?.fullname || "pengguna"
                      }`}
                    >
                      <span
                        className="text-white font-bold text-3xl sm:text-5xl lg:text-7xl"
                        style={{ fontSize: "clamp(1.875rem, 8vw, 4.375rem)" }}
                      >
                        {profile?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section
                className="xl:col-span-3 p-4 sm:p-6 lg:p-8 flex items-center justify-center"
                aria-label="Form edit profil"
              >
                <div className="w-full">
                  <div className="space-y-6 sm:space-y-8">
                    <header className="pb-4 sm:pb-6 border-b border-gray-200">
                      <h1
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900"
                        style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
                      >
                        Edit Informasi Pribadi
                      </h1>
                      <p
                        className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base"
                        style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                      >
                        Perbarui detail akun dan informasi personal Anda
                      </p>
                    </header>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-3 sm:space-y-4">
                          <label
                            htmlFor="fullname"
                            className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                          >
                            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            Nama Lengkap
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm sm:text-base min-h-[44px]"
                            placeholder="Masukkan nama lengkap"
                            required
                            aria-describedby="fullname-error"
                          />
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                          <label
                            htmlFor="username"
                            className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                          >
                            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                              <AtSign className="h-4 w-4 text-primary" />
                            </div>
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm sm:text-base min-h-[44px]"
                            placeholder="Masukkan username"
                            required
                            aria-describedby="username-error"
                          />
                        </div>

                        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                          <label
                            htmlFor="email"
                            className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                          >
                            <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                              <Mail className="h-4 w-4 text-primary" />
                            </div>
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm sm:text-base min-h-[44px]"
                            placeholder="Masukkan email"
                            required
                            aria-describedby="email-error"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 ease-in-out text-sm font-medium min-h-[44px] order-2 sm:order-1 transform shadow-sm hover:shadow-md"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={loading || success}
                          className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 text-sm font-medium min-h-[44px] order-1 sm:order-2 transform shadow-sm hover:shadow-lg"
                        >
                          {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfileEdit;
