import React from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import ProfileForm from "../../../Components/Fragments/Profile/ProfileForm";
import { useProfile } from "../../../Hooks/Profile/useProfile";
import { X } from "lucide-react";

const DashboardProfile = () => {
  const { profile, loading, error, getProfileImageUrl } = useProfile();
  const navigate = useNavigate();
  const profileImageUrl = getProfileImageUrl(profile?.image);

  const handleEditClick = () => {
    navigate("/dashboard/profile/edit");
  };

  if (loading) {
    return (
      <DashboardLayout title="Profil Saya">
        <div
          className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
          role="status"
          aria-label="Memuat data profil"
        >
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary" />
          <span className="sr-only">Memuat...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profil Saya">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-4 sm:py-8">
        <div className="max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">
          {/* Error Message */}
          {error && (
            <div
              className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-xs sm:text-sm text-red-700 break-words">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Profile Layout - Horizontal */}
          <main className="bg-white rounded-lg border border-gray-200 overflow-hidden mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-5 min-h-[400px] sm:min-h-[500px]">
              {/* Left Side - Image Only */}
              <section
                className="xl:col-span-2 bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center border-b xl:border-b-0 xl:border-r border-gray-200"
                aria-label="Foto profil"
              >
                <div className="relative">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt={`Foto profil ${profile?.fullname || "pengguna"}`}
                      className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center border-4 border-white shadow-xl"
                      role="img"
                      aria-label={`Avatar untuk ${
                        profile?.fullname || "pengguna"
                      }`}
                    >
                      <span
                        className="text-white font-bold text-3xl sm:text-5xl lg:text-7xl"
                        style={{ fontSize: "clamp(1.875rem, 8vw, 4.375rem)" }}
                      >
                        {profile?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {/* Right Side - Profile Information */}
              <section
                className="xl:col-span-3 p-4 sm:p-6 lg:p-8 flex items-center justify-center"
                aria-label="Informasi profil"
              >
                <div className="w-full">
                  <ProfileForm
                    profile={profile}
                    loading={loading}
                    onEditClick={handleEditClick}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;
