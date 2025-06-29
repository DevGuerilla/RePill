import React from "react";
import { User, Mail, AtSign, Shield, Edit } from "lucide-react";

const ProfileForm = ({ profile, loading, onEditClick }) => {
  return (
    <div className="w-full">
      <div className="space-y-6 sm:space-y-8">
        <header className="pb-4 sm:pb-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)" }}
            >
              Informasi Pribadi
            </h1>
            <p
              className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Detail akun dan informasi personal
            </p>
          </div>
          <button
            onClick={onEditClick}
            aria-label="Edit profil pengguna"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors min-h-[44px] w-full sm:w-auto"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profil
          </button>
        </header>

        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          aria-label="Informasi profil pengguna"
        >
          <div className="space-y-4 sm:space-y-6">
            <article className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
              <header className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Nama Lengkap
                </span>
              </header>
              <div className="ml-2 flex-1 flex items-center">
                <span
                  className="text-base sm:text-lg font-medium text-gray-900 break-words"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
                >
                  {profile?.fullname || "-"}
                </span>
              </div>
            </article>

            <article className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
              <header className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                  <AtSign className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Username
                </span>
              </header>
              <div className="ml-2 flex-1 flex items-center">
                <span
                  className="text-base sm:text-lg font-medium text-gray-900 break-all"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
                >
                  @{profile?.username || "-"}
                </span>
              </div>
            </article>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <article className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
              <header className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Email
                </span>
              </header>
              <div className="ml-2 flex-1 flex items-center">
                <span
                  className="text-base sm:text-lg font-medium text-gray-900 break-all"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
                >
                  {profile?.email || "-"}
                </span>
              </div>
            </article>

            <article className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
              <header className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-primary-light rounded-lg flex-shrink-0">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Role
                </span>
              </header>
              <div className="ml-2 flex-1 flex items-center">
                <span
                  className="text-base sm:text-lg font-medium text-gray-900 capitalize"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}
                >
                  {profile?.role?.name || "-"}
                </span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileForm;
