import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, UserPlus, X } from "lucide-react";
import { useCreateUser } from "../../../Hooks/User/useCreateUser";
import AuthInput from "../../Elements/Inputs/AuthInput";

const CreateUserForm = ({ onSuccess, onError, onCancel, isModal = false }) => {
  const { createUser, loading, error, success } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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
      await createUser(formData);
      setFormData({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) {
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.data
            ? Object.values(error.response.data.data).flat().join(", ")
            : "Terjadi kesalahan saat membuat pengguna");
        onError(errorMessage);
      }
    }
  };

  const getFieldError = (fieldName) => {
    return error && error[fieldName] ? error[fieldName][0] : null;
  };

  const formContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-6 pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tambah Pengguna Baru
          </h2>
        </div>
        {isModal && onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fullname Field */}
          <AuthInput
            id="fullname"
            type="text"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.fullname}
            onChange={handleChange}
            icon={User}
            error={getFieldError("fullname")}
          />

          {/* Username Field */}
          <AuthInput
            id="username"
            type="text"
            label="Username"
            placeholder="Masukkan username"
            value={formData.username}
            onChange={handleChange}
            icon={User}
            error={getFieldError("username")}
          />

          {/* Email Field */}
          <AuthInput
            id="email"
            type="email"
            label="Email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={getFieldError("email")}
          />

          {/* Password Field */}
          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            rightIcon={showPassword ? EyeOff : Eye}
            onRightIconClick={() => setShowPassword(!showPassword)}
            error={getFieldError("password")}
          />

          {/* Confirm Password Field */}
          <AuthInput
            id="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            label="Konfirmasi Password"
            placeholder="Konfirmasi password"
            value={formData.confirm_password}
            onChange={handleChange}
            icon={Lock}
            rightIcon={showConfirmPassword ? EyeOff : Eye}
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            error={getFieldError("confirm_password")}
          />

          {/* General Error */}
          {error && error.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error.general[0]}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Menyimpan..." : "Simpan Pengguna"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );

  if (isModal) {
    return <>{formContent}</>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {formContent}
    </div>
  );
};

export default CreateUserForm;
