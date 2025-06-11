import React from "react";
import CreateUserForm from "./CreateUserForm";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const DashCreateUser = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Show success message and redirect after a delay
    setTimeout(() => {
      navigate("/dashboard/user");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/dashboard/user");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tambah Pengguna Baru
            </h1>
            <p className="text-gray-600 mt-1">
              Buat akun pengguna baru untuk sistem aplikasi
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <CreateUserForm onSuccess={handleSuccess} onCancel={handleCancel} />

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-800">
              Tips Pembuatan Pengguna
            </h3>
            <ul className="mt-2 text-sm text-green-700 list-disc list-inside space-y-1">
              <li>Gunakan password yang kuat dengan minimal 8 karakter</li>
              <li>Pastikan email yang digunakan valid dan dapat diakses</li>
              <li>
                Username harus unik dan tidak boleh sama dengan pengguna lain
              </li>
              <li>Nama lengkap akan ditampilkan di profil pengguna</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCreateUser;
