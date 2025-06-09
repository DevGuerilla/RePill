import React, { useState, useEffect } from "react";
import { Save, User, Mail, AtSign, Shield, Edit, X } from "lucide-react";

const ProfileForm = ({
  profile,
  onUpdate,
  isEditing,
  loading,
  onEditingChange,
}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
  });

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
      await onUpdate(formData);
      onEditingChange(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isEditing) {
    return (
      <div className="w-full">
        <div className="space-y-8">
          {/* Header with Edit Button */}
          <div className="pb-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Informasi Pribadi
              </h1>
              <p className="text-gray-600 mt-2">
                Detail akun dan informasi personal
              </p>
            </div>
            <button
              onClick={() => onEditingChange(true)}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profil
            </button>
          </div>

          {/* Information Display with cards - centered container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Nama Lengkap
                  </span>
                </div>
                <div className="ml-2">
                  <span className="text-lg font-medium text-gray-900">
                    {profile?.fullname || "-"}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <AtSign className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Username
                  </span>
                </div>
                <div className="ml-2">
                  <span className="text-lg font-medium text-gray-900">
                    @{profile?.username || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Email
                  </span>
                </div>
                <div className="ml-2">
                  <span className="text-lg font-medium text-gray-900">
                    {profile?.email || "-"}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Role
                  </span>
                </div>
                <div className="ml-2">
                  <span className="text-lg font-medium text-gray-900 capitalize">
                    {profile?.role?.name || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-8">
        {/* Header with Cancel Button */}
        <div className="pb-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Informasi</h1>
            <p className="text-gray-600 mt-2">Perbarui informasi akun Anda</p>
          </div>
          <button
            onClick={() => onEditingChange(false)}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Batal
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
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
  );
};

export default ProfileForm;
