import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Menu, ChevronDown, Home, LogOut } from "lucide-react";
import { useSidebar } from "../../../Context/SidebarContext";
import useLogout from "../../../Hooks/useLogout";
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
    <div
      className={`flex items-center justify-center bg-gray-200 ${className}`}
    >
      <span className="text-gray-600 font-medium">{initials}</span>
    </div>
  );
};

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const sidebarContext = useSidebar();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { isLoading, handleLogout } = useLogout();

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            className="flex items-center space-x-3 hover:bg-gray-100 rounded-full py-2 px-3 transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {user?.profile_picture?.previewUrl ? (
              <img
                src={user.profile_picture.previewUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <InitialsAvatar
                name={user?.name || "User"}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-700">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-gray-500">{user?.role?.name}</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
              <a
                href="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Beranda
              </a>
              <button
                onClick={onLogout}
                disabled={isLoading}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 group transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-12" />
                <span className="transition-all duration-200 group-hover:ml-1">
                  {isLoading ? "Memproses..." : "Keluar akun"}
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
