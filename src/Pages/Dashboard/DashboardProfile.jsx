import React, { useState } from "react";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";
import ProfileForm from "../../Components/Fragments/Auth/ProfileForm";
import { useProfile } from "../../Hooks/useProfile";
import { Camera, X } from "lucide-react";

const DashboardProfile = () => {
  const { profile, loading, error, updateProfile, uploadProfilePicture } =
    useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    try {
      setUploading(true);
      await uploadProfilePicture(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "default.png") return null;

    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  };

  const profileImageUrl = getImageUrl(profile?.image);

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

                  {isEditing && (
                    <label className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-full cursor-pointer hover:bg-primary-hover transition-colors shadow-lg">
                      <Camera className="h-6 w-6" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  )}

                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
                        <p className="mt-2 text-sm">Mengunggah...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Profile Information */}
              <div className="lg:col-span-3 p-8 flex items-center justify-center">
                <div className="w-full">
                  <ProfileForm
                    profile={profile}
                    onUpdate={updateProfile}
                    isEditing={isEditing}
                    loading={loading}
                    onEditingChange={setIsEditing}
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
