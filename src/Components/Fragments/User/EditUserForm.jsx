import React, { useState, useEffect } from "react";
import { Save, X, User, Mail, AtSign, Shield } from "lucide-react";
import ModalConfirmation from "../Common/ModalConfirmation";
import ModalResponse from "../Common/ModalResponse";

const EditUserForm = ({ user, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    role_id: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  const roles = [
    { id: 1, name: "admin", label: "Administrator" },
    { id: 2, name: "user", label: "User" },
    { id: 3, name: "moderator", label: "Moderator" },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        role_id: user.role?.id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.fullname.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.role_id
    ) {
      setResponseType("error");
      setResponseMessage("Semua field wajib diisi dengan lengkap.");
      setShowResponseModal(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmModal(false);

    try {
      await onSave(formData);

      setResponseType("success");
      setResponseMessage("Data pengguna berhasil diperbarui!");
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error updating user:", error);

      let errorMessage = "Gagal memperbarui data pengguna. Silakan coba lagi.";

      if (error.status === 422 && error.data) {
        const errors = [];
        Object.values(error.data).forEach((fieldErrors) => {
          if (Array.isArray(fieldErrors)) {
            errors.push(...fieldErrors);
          }
        });
        errorMessage = errors.join(" ");
      } else if (error.message) {
        errorMessage = error.message;
      }

      setResponseType("error");
      setResponseMessage(errorMessage);
      setShowResponseModal(true);
    }
  };

  const handleResponseConfirm = () => {
    setShowResponseModal(false);
    if (responseType === "success") {
      onCancel(); // Close the form on success
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Pengguna
                </h2>
                <p className="text-sm text-gray-600">
                  Perbarui informasi pengguna
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="p-2 bg-primary-light rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="p-2 bg-primary-light rounded-lg">
                  <AtSign className="h-4 w-4 text-primary" />
                </div>
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm"
                placeholder="Masukkan username"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm"
                placeholder="Masukkan email"
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                Role *
              </label>
              <select
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors bg-white text-sm"
                required
              >
                <option value="">Pilih Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ModalConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        title="Konfirmasi Perubahan"
        message={`Apakah Anda yakin ingin menyimpan perubahan data pengguna "${formData.fullname}"?`}
        confirmText="Ya, Simpan"
        cancelText="Batal"
        type="warning"
        loading={loading}
      />

      {/* Response Modal */}
      <ModalResponse
        isOpen={showResponseModal}
        onClose={handleResponseConfirm}
        type={responseType}
        message={responseMessage}
        onConfirm={handleResponseConfirm}
        showCountdown={responseType === "success"}
        countdownSeconds={3}
      />
    </>
  );
};

export default EditUserForm;
