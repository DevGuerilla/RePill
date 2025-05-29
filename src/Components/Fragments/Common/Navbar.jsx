import React from "react";
import { Link } from "react-router";
import { LogOut, Loader2, User } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../Redux/Features/Auth/AuthStore";
import useLogout from "../../../Hooks/useLogout";

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { isLoading, handleLogout } = useLogout();

  // Handler untuk logout
  const onLogout = () => {
    handleLogout(
      (response) => {
        setTimeout(() => {
          window.location.href = "/masuk";
        }, 1000);
      },
      (error) => {
        console.error("Logout gagal:", error);
        setTimeout(() => {
          window.location.href = "/masuk";
        }, 2000);
      }
    );
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary font-bold text-xl">
                SAPA
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-slate-700 hover:text-slate-800 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Beranda
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="border-transparent text-slate-700 hover:text-slate-800 hover:border-slate-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user && (
                  <div className="flex items-center text-sm text-slate-600">
                    <User size={16} className="mr-1" />
                    <span>{user.name || user.username}</span>
                  </div>
                )}
                <button
                  onClick={onLogout}
                  disabled={isLoading}
                  className="flex items-center text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-1" size={16} />
                  ) : (
                    <LogOut className="mr-1" size={16} />
                  )}
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                to="/masuk"
                className="text-primary hover:text-primary-hover font-medium text-sm"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
