import React from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";
import ProfileForm from "../../Components/Fragments/Auth/ProfileForm";
import { useProfile } from "../../Hooks/useProfile";
import { X } from "lucide-react";

const DashboardProfile = () => {
  const { profile, loading, error, getProfileImageUrl } = useProfile();
  const navigate = useNavigate();
  const profileImageUrl = getProfileImageUrl(profile?.image);

  const handleEditClick = () => {
    navigate("/dashboard/profile/edit");
  };

  return (
    <DashboardLayout title="Profil Saya">
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-8">
        <div className="max-w-6xl w-full mx-auto space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Profile Layout - Horizontal */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
              {/* Left Side - Image Only */}
              <div className="lg:col-span-2 bg-gray-50 p-8 flex items-center justify-center border-r border-gray-200">
                <div className="relative">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-64 h-64 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-64 h-64 rounded-2xl bg-primary flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-white font-bold text-7xl">
                        {profile?.fullname?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Profile Information */}
              <div className="lg:col-span-3 p-8 flex items-center justify-center">
                <div className="w-full">
                  <ProfileForm
                    profile={profile}
                    loading={loading}
                    onEditClick={handleEditClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;
