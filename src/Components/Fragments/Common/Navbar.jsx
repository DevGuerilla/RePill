import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Menu, ChevronDown, Home, LogOut, User } from "lucide-react";
import { useSidebar } from "../../../Context/SidebarContext";
import useLogout from "../../../Hooks/useLogout";
import { useProfile } from "../../../Hooks/useProfile";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../Redux/Features/Auth/AuthStore";

const InitialsAvatar = ({ name, className }) => {
  const initials =
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className={`flex items-center justify-center bg-primary ${className}`}>
      <span className="text-white font-semibold">{initials}</span>
    </div>
  );
};

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const sidebarContext = useSidebar();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { profile, fetchProfile } = useProfile();
  const { isLoading, handleLogout } = useLogout();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Use profile data if available, fallback to Redux user
  const currentUser = profile || user;
  const displayName = currentUser?.fullname || currentUser?.name || "User";
  const displayUsername = currentUser?.username || "";
  const displayRole = currentUser?.role?.name || "User";

  // Build image URL - check if it's a full URL or just filename
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "default.png") return null;

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) return imagePath;

    // Otherwise, construct the full URL
    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  };

  const profileImageUrl = getImageUrl(currentUser?.image);

  // Handle case where context is undefined
  if (!sidebarContext) {
    console.error("Navbar must be used within a SidebarProvider");
    return null;
  }

  const { expanded, toggleSidebar, isMobile } = sidebarContext;

  // Handler untuk logout
  const onLogout = () => {
    handleLogout(
      (response) => {
        setTimeout(() => {
          navigate("/masuk");
        }, 1000);
      },
      (error) => {
        console.error("Logout gagal:", error);
        setTimeout(() => {
          navigate("/masuk");
        }, 2000);
      }
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownOpen && !event.target.closest(".user-dropdown")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Fetch profile when component mounts if authenticated
  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      fetchProfile();
    }
  }, [isAuthenticated, currentUser, fetchProfile]);

  return (
    <nav
      className={`bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center 
        fixed top-0 right-0 z-20 transition-all duration-300
        ${isMobile ? "left-0" : expanded ? "left-64" : "left-20"}`}
    >
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-1 -ml-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative user-dropdown">
          <button
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-xl py-2 px-3 transition-all duration-200 border border-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <InitialsAvatar
              name={displayName}
              className={`w-10 h-10 rounded-xl shadow-sm ${
                profileImageUrl ? "hidden" : "flex"
              }`}
            />
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">
                {displayName}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">
                  @{displayUsername}
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-primary font-medium capitalize">
                  {displayRole}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <InitialsAvatar
                    name={displayName}
                    className={`w-10 h-10 rounded-lg ${
                      profileImageUrl ? "hidden" : "flex"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500">@{displayUsername}</p>
                    <p className="text-xs text-primary font-medium capitalize">
                      {displayRole}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate("/dashboard/profile");
                  setDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <User className="w-4 h-4 mr-3" />
                Profil Saya
              </button>

              <a
                href="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Home className="w-4 h-4 mr-3" />
                Beranda
              </a>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={onLogout}
                disabled={isLoading}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 group transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:rotate-12" />
                <span className="transition-all duration-200 group-hover:ml-1">
                  {isLoading ? "Memproses..." : "Keluar Akun"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
