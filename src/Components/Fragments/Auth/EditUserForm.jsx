import React, { useState, useEffect } from "react";
import { User, Mail, Shield, UserPlus, X, ChevronDown } from "lucide-react";
import { useEditUser } from "../../../Hooks/User/useEditUser";
import { useRoles } from "../../../Hooks/Role/useRole";
import AuthInput from "../../Elements/Inputs/AuthInput";

const EditUserForm = ({
  user,
  onSuccess,
  onError,
  onCancel,
  isModal = false,
}) => {
  const { updateUser, loading, errors, message, success } = useEditUser();
  const { roles, loading: rolesLoading } = useRoles();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    role_id: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        role_id: user.role_id || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uuid) {
      console.error("User UUID is required for update");
      return;
    }

    try {
      const dataToSubmit = {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        role_id: formData.role_id,
      };

      if (formData.password && formData.password.trim()) {
        dataToSubmit.password = formData.password;
        dataToSubmit.confirm_password = formData.confirm_password;
      }

      const response = await updateUser(user.uuid, dataToSubmit);

      if (response.success !== false && response.status !== 422) {
        if (onSuccess) onSuccess();
      } else {
        // Error handling is done in the hook
        console.log("Validation errors:", errors);
      }
    } catch (error) {
      console.error("EditUserForm: Error submitting form:", error);
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
          <h2 className="text-xl font-semibold text-gray-900">Edit Pengguna</h2>
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

          {/* Role Selection */}
          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="role_id"
              className={`block font-semibold mb-0.5 lg:mb-1 text-sm transition-all duration-300 ${
                getFieldError("role_id") ? "text-red-600" : "text-slate-800"
              }`}
            >
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                disabled={rolesLoading}
                className={`w-full border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-300 py-3.5 pl-12 pr-10 appearance-none ${
                  getFieldError("role_id")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              >
                <option value="">Pilih Role</option>
                {roles.map((role) => (
                  <option key={role.uuid} value={role.uuid}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {getFieldError("role_id") && (
              <p className="mt-1 text-red-600 text-xs font-medium">
                {getFieldError("role_id")}
              </p>
            )}
          </div>

          {/* General Error */}
          {message && !success && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <div className="p-1 bg-red-100 rounded">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    {Object.keys(errors).length > 0
                      ? "Validasi Gagal"
                      : "Terjadi Kesalahan"}
                  </h3>
                  <p className="text-sm text-red-600">{message}</p>
                  {Object.keys(errors).length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-red-600 mb-2">
                        Detail kesalahan:
                      </p>
                      <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                        {Object.entries(errors).map(([field, fieldErrors]) => (
                          <li key={field}>
                            <strong className="capitalize">
                              {field.replace("_", " ")}:
                            </strong>{" "}
                            {fieldErrors[0]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || success || rolesLoading}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Memperbarui..." : "Perbarui Pengguna"}
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

export default EditUserForm;
