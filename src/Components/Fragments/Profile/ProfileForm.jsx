import React from "react";
import { User, Mail, AtSign, Shield, Edit } from "lucide-react";

const ProfileForm = ({ profile, loading, onEditClick }) => {
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
            onClick={onEditClick}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profil
          </button>
        </div>

        {/* Information Display with cards - centered container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-light rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Nama Lengkap
                </span>
              </div>
              <div className="ml-2 flex-1 flex items-center">
                <span className="text-lg font-medium text-gray-900">
                  {profile?.fullname || "-"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-light rounded-lg">
                  <AtSign className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Username
                </span>
              </div>
              <div className="ml-2 flex-1 flex items-center">
                <span className="text-lg font-medium text-gray-900">
                  @{profile?.username || "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Email
                </span>
              </div>
              <div className="ml-2 flex-1 flex items-center">
                <span className="text-lg font-medium text-gray-900">
                  {profile?.email || "-"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 h-32 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Role
                </span>
              </div>
              <div className="ml-2 flex-1 flex items-center">
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
};

export default ProfileForm;
