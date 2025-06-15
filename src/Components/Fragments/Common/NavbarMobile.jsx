import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { LogIn, UserPlus, LogOut, ChevronDown } from "lucide-react";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../Redux/Features/Auth/AuthStore";
import { useProfile } from "../../../Hooks/Profile/useProfile";
import { logout } from "../../../Services/Auth/AuthService";
import {
  logoutStart,
  logoutSuccess,
  logoutFailure,
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
      <span className="text-white font-semibold text-xs">{initials}</span>
    </div>
  );
};

const NavbarMobile = ({ title = "RePill", showAuthButtons = true }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { profile, fetchProfile } = useProfile();

  // Use the same user logic as Navbar
  const currentUser = profile || user;
  const displayName = currentUser?.fullname || currentUser?.name || "User";
  const displayUsername = currentUser?.username || "";
  const displayRole = currentUser?.role?.name || "User";

  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === "default.png") return null;

    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = import.meta.env.VITE_BASE_API_URL.replace("/api/v1", "");
    return `${baseUrl}/storage/profiles/${imagePath}`;
  };

  const profileImageUrl = getImageUrl(currentUser?.image);

  // Fetch profile if authenticated but no user data
  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      fetchProfile();
    }
  }, [isAuthenticated, currentUser, fetchProfile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    navigate("/masuk");
  };

  const handleRegister = () => {
    navigate("/daftar");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleDashboard = () => {
    const userRole = currentUser?.role?.name?.toLowerCase();
    switch (userRole) {
      case "admin":
        navigate("/dashboard");
        break;
      case "apoteker":
        navigate("/scan");
        break;
      case "restocker":
        navigate("/restocker");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      await logout();
      dispatch(logoutSuccess());
      navigate("/masuk");
      setShowUserDropdown(false);
    } catch (error) {
      dispatch(logoutFailure(error.message));
      // Still navigate to login even if logout fails
      navigate("/masuk");
      setShowUserDropdown(false);
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const isLoginPage = location.pathname === "/masuk";
  const isRegisterPage = location.pathname === "/daftar";

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-sm">
      {/* Left Section - Logo/Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={isAuthenticated ? handleDashboard : handleHome}
          className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-lg font-bold text-gray-800">{title}</span>
        </button>
      </div>

      {/* Right Section - User Profile or Auth Buttons */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          // User Profile Section with Dropdown
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleUserDropdown}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-800 truncate max-w-20">
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
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-lg object-cover border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <InitialsAvatar
                name={displayName}
                className={`w-8 h-8 rounded-lg ${
                  profileImageUrl ? "hidden" : "flex"
                }`}
              />
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  showUserDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown */}
            {showUserDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500">@{displayUsername}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            )}
          </div>
        ) : (
          // Auth buttons for non-authenticated users
          showAuthButtons && (
            <>
              {/* Login Button */}
              {!isLoginPage && (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Masuk</span>
                </button>
              )}

              {/* Register Button */}
              {!isRegisterPage && (
                <button
                  onClick={handleRegister}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-all duration-300"
                >
                  <UserPlus size={16} />
                  <span className="hidden sm:inline">Daftar</span>
                </button>
              )}
            </>
          )
        )}
      </div>
    </nav>
  );
};

export default NavbarMobile;
