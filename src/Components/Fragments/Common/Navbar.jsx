import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import { useSidebar } from "../../../Context/SidebarContext";
import { useProfile } from "../../../Hooks/Profile/useProfile";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../Redux/Features/Auth/AuthStore";

const InitialsAvatar = ({ name, className }) => {
  const initials = useMemo(() => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  }, [name]);

  return (
    <div className={`flex items-center justify-center bg-primary ${className}`}>
      <span className="text-white font-semibold">{initials}</span>
    </div>
  );
};

const Navbar = ({ title }) => {
  const sidebarContext = useSidebar();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { profile, refetch } = useProfile();

  // Memoize user data untuk menghindari re-render
  const currentUser = useMemo(() => profile || user, [profile, user]);

  const userInfo = useMemo(
    () => ({
      displayName: currentUser?.fullname || currentUser?.name || "User",
      displayUsername: currentUser?.username || "",
      displayRole: currentUser?.role?.name || "User",
    }),
    [currentUser]
  );

  const getImageUrl = useMemo(() => {
    return (imagePath) => {
      if (!imagePath || imagePath === "default.png") return null;
      if (imagePath.startsWith("http")) return imagePath;
      const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
      return `${baseUrl}/storage/profiles/${imagePath}`;
    };
  }, []);

  const profileImageUrl = useMemo(
    () => getImageUrl(currentUser?.image),
    [currentUser?.image, getImageUrl]
  );

  if (!sidebarContext) {
    console.error("Navbar must be used within a SidebarProvider");
    return null;
  }

  const { expanded, toggleSidebar, isMobile } = sidebarContext;

  // Listen for profile updates
  useEffect(() => {
    const handleFocus = () => {
      if (sessionStorage.getItem("profile_updated")) {
        refetch(true);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && sessionStorage.getItem("profile_updated")) {
        refetch(true);
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch]);

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
        <div className="flex items-center space-x-3 py-2 px-3">
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
            name={userInfo.displayName}
            className={`w-10 h-10 rounded-xl shadow-sm ${
              profileImageUrl ? "hidden" : "flex"
            }`}
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-800">
              {userInfo.displayName}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">
                @{userInfo.displayUsername}
              </span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-primary font-medium capitalize">
                {userInfo.displayRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
