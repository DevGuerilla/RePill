import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";
import EditUserForm from "../../Components/Fragments/Auth/EditUserForm";
import { useDetailUser } from "../../Hooks/useDetailUser";
import { ArrowLeft } from "lucide-react";

const DashboardEditUser = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useDetailUser(uuid);

  const handleSuccess = () => {
    navigate(`/dashboard/user/${uuid}`);
  };

  const handleCancel = () => {
    navigate(`/dashboard/user/${uuid}`);
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Pengguna">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Memuat data pengguna...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Pengguna">
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
                Edit Pengguna
              </h1>
              <p className="text-gray-600 mt-1">
                Perbarui informasi pengguna {user?.fullname}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <EditUserForm
          user={user}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isModal={false}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardEditUser;
