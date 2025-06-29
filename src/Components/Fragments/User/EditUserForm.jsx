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
        role_id: user.role_id || user.role?.uuid || "",
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
      return;
    }

    try {
      const dataToSubmit = {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        role_id: formData.role_id,
      };

      const response = await updateUser(user.uuid, dataToSubmit);

      if (response.success !== false && response.status !== 422) {
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (onError) onError(error.message);
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
      <header className="flex items-center justify-between mb-4 sm:mb-6 p-4 sm:p-6 pb-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <h2
            className="font-semibold text-gray-900"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Edit Pengguna
          </h2>
        </div>
        {isModal && onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Tutup modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          </button>
        )}
      </header>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="mb-2 lg:mb-3">
            <label
              htmlFor="role_id"
              className={`block font-semibold mb-0.5 lg:mb-1 text-sm transition-all duration-300 ${
                getFieldError("role_id") ? "text-red-600" : "text-slate-800"
              }`}
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
            >
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                disabled={rolesLoading}
                className={`w-full border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-1 transition-all duration-300 py-3 sm:py-3.5 pl-10 sm:pl-12 pr-10 appearance-none min-h-[44px] ${
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
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
            </div>
            {getFieldError("role_id") && (
              <p
                className="mt-1 text-red-600 font-medium"
                style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.75rem)" }}
              >
                {getFieldError("role_id")}
              </p>
            )}
          </div>

          {message && !success && (
            <div
              className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4"
              role="alert"
            >
              <div className="flex items-start gap-2">
                <div className="p-1 bg-red-100 rounded flex-shrink-0">
                  <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-medium text-red-800"
                    style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  >
                    {Object.keys(errors).length > 0
                      ? "Validasi Gagal"
                      : "Terjadi Kesalahan"}
                  </h3>
                  <p
                    className="text-red-600"
                    style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                  >
                    {message}
                  </p>
                  {Object.keys(errors).length > 0 && (
                    <div className="mt-2">
                      <p
                        className="text-red-600 mb-2"
                        style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                      >
                        Detail kesalahan:
                      </p>
                      <ul
                        className="text-red-600 list-disc list-inside space-y-1"
                        style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                      >
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

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || success || rolesLoading}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px] order-2 sm:order-1"
            >
              {loading ? "Memperbarui..." : "Perbarui Pengguna"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px] order-1 sm:order-2"
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
