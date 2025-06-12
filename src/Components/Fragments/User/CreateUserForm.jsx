import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  UserPlus,
  X,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useCreateUser } from "../../../Hooks/User/useCreateUser";
import AuthInput from "../../Elements/Inputs/AuthInput";

const CreateUserForm = ({ onSuccess, onError, onCancel, isModal = false }) => {
  const { createUser, loading, errors, message, success } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [roleFieldFocused, setRoleFieldFocused] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role_id: "",
  });

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const token = sessionStorage.getItem("auth_token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/roles`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRoles(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

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
      const response = await createUser(formData);

      if (response.success !== false && response.status !== 422) {
        setFormData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
          role_id: "",
        });
        if (onSuccess) onSuccess();
      } else {
        console.log("Validation errors:", errors);
      }
    } catch (error) {
      console.error("CreateUserForm: Error submitting form:", error);
    }
  };

  const getFieldError = (fieldName) => {
    if (errors[fieldName] && Array.isArray(errors[fieldName])) {
      return errors[fieldName][0];
    }
    return null;
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

          {/* Role Selection Field */}
          <div className="mb-2 lg:mb-3 transform transition duration-200 ease-in-out hover:translate-y-[-1px]">
            <label
              htmlFor="role_id"
              className={`block font-semibold mb-0.5 lg:mb-1 text-sm transition-all duration-300 ${
                getFieldError("role_id")
                  ? "text-red-600"
                  : roleFieldFocused
                  ? "text-primary transform scale-105 origin-left"
                  : "text-slate-800"
              }`}
            >
              Role Pengguna
            </label>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 z-10 ${
                  getFieldError("role_id")
                    ? "text-red-500"
                    : roleFieldFocused
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                <Shield size={22} strokeWidth={2} />
              </span>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                onFocus={() => setRoleFieldFocused(true)}
                onBlur={() => setRoleFieldFocused(false)}
                disabled={loadingRoles}
                className={`w-full border rounded-md text-sm text-slate-700 placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-12 appearance-none cursor-pointer ${
                  getFieldError("role_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : roleFieldFocused
                    ? "shadow-md border-primary focus:ring-primary focus:border-primary"
                    : "border-gray-300"
                } ${loadingRoles ? "opacity-50 cursor-not-allowed" : ""}`}
                required
              >
                <option value="" disabled className="text-gray-300">
                  {loadingRoles ? "Memuat role..." : "Pilih role pengguna"}
                </option>
                {roles.map((role) => (
                  <option
                    key={role.uuid}
                    value={role.uuid}
                    className="text-slate-700"
                  >
                    {role.name}
                  </option>
                ))}
              </select>
              <span
                className={`absolute inset-y-0 right-4 flex items-center pointer-events-none transition-colors duration-300 ${
                  getFieldError("role_id")
                    ? "text-red-500"
                    : roleFieldFocused
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                <ChevronDown size={22} strokeWidth={2} />
              </span>
            </div>
            {getFieldError("role_id") && (
              <div className="mt-1 lg:mt-1.5 transition-all duration-300 ease-in-out">
                <p className="text-red-600 text-xs font-medium">
                  {getFieldError("role_id")}
                </p>
              </div>
            )}
          </div>

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
