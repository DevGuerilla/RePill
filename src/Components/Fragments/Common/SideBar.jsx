import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, X, Pill, LogOut } from "lucide-react";
import { useSidebar } from "../../../Context/SidebarContext";
import useLogout from "../../../Hooks/Auth/useLogout";
import ModalConfirmation from "./ModalConfirmation";
import ModalResponse from "./ModalResponse";

const SidebarDashboard = ({ menuItems }) => {
  const navigate = useNavigate();
  const sidebarContext = useSidebar();
  const { isLoading, handleLogout } = useLogout();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  // Handle case where context is undefined
  if (!sidebarContext) {
    console.error("SidebarDashboard must be used within a SidebarProvider");
    return null;
  }

  const { expanded, toggleSidebar, isMobile, isOpen } = sidebarContext;

  const handleLogoutClick = () => {
    setShowConfirmModal(true);
  };

  const onLogout = () => {
    setShowConfirmModal(false);
    handleLogout(
      (response) => {
        setResponseType("success");
        setResponseMessage(
          "Berhasil keluar dari akun. Anda akan diarahkan ke halaman login."
        );
        setShowResponseModal(true);
      },
      (error) => {
        console.error("Logout gagal:", error);
        setResponseType("error");
        setResponseMessage("Gagal keluar dari akun. Silakan coba lagi.");
        setShowResponseModal(true);
      }
    );
  };

  const handleResponseModalConfirm = () => {
    setShowResponseModal(false);
    if (responseType === "success") {
      setTimeout(() => {
        navigate("/masuk");
      }, 500);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed" : "sticky top-0"}
          h-screen
          bg-white
          pt-5
          flex flex-col
          justify-between
          transition-all duration-300 ease-in-out
          ${expanded ? "w-64" : "w-20"}
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          z-30
          border-r border-gray-200
        `}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 transition-all duration-300 relative">
            <div className="flex items-center">
              <div className="bg-primary rounded-lg p-2">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <h2
                className={`text-primary text-2xl font-bold transition-opacity duration-300 ml-3
                  ${
                    expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
              >
                RePill
              </h2>
            </div>

            {/* Mobile close button */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={24} className="text-gray-600" />
              </button>
            )}

            {/* Desktop toggle button */}
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className={`
                  absolute -right-3 top-[70px] -translate-y-1/2 
                  p-1.5 rounded-full 
                  bg-white border border-gray-200 
                  text-gray-500 hover:text-gray-700 
                  shadow-sm hover:shadow 
                  transition-all duration-200
                `}
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              >
                {expanded ? (
                  <ChevronLeft size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 px-4 mt-8">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "font-semibold bg-primary text-white"
                      : "text-black hover:bg-primary-light"
                  } 
                  ${expanded ? "" : "justify-center"}
                  group hover:scale-105 transform`
                }
              >
                <item.icon
                  className={`text-xl ${expanded ? "" : "text-2xl"}`}
                  aria-hidden="true"
                />

                {expanded ? (
                  <span>{item.label}</span>
                ) : (
                  <div
                    className={`
                    absolute left-full ml-2 
                    px-2 py-1 
                    bg-primary text-white 
                    text-sm rounded-md 
                    opacity-0 group-hover:opacity-100 
                    transition-all duration-300 
                    scale-0 group-hover:scale-100 
                    origin-left 
                    whitespace-nowrap
                    z-50
                  `}
                  >
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="px-4 pb-6">
          <div
            className={`
              bg-red-50 rounded-lg p-3 border border-red-200
              transition-all duration-200 hover:shadow-md hover:bg-red-100 hover:scale-105
              ${expanded ? "" : "flex justify-center"}
            `}
          >
            <button
              onClick={handleLogoutClick}
              disabled={isLoading}
              className={`
                flex items-center gap-3 
                text-red-600 hover:text-red-700
                ${expanded ? "" : "justify-center"}
                group transition-all duration-200 transform hover:scale-105 active:scale-95
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                w-full
              `}
            >
              <LogOut
                className={`${
                  expanded ? "text-lg" : "text-xl"
                } transition-all duration-200 group-hover:scale-110`}
                aria-hidden="true"
              />

              {expanded ? (
                <span className="font-medium text-sm transition-all duration-200 group-hover:scale-105">
                  {isLoading ? "Memproses..." : "Keluar Akun"}
                </span>
              ) : (
                <div
                  className={`
                  absolute left-full ml-2 
                  px-2 py-1 
                  bg-red-500 text-white 
                  text-sm rounded-md 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-300 
                  scale-0 group-hover:scale-100 
                  origin-left 
                  whitespace-nowrap
                  z-50
                `}
                >
                  {isLoading ? "Memproses..." : "Keluar Akun"}
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      <ModalConfirmation
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={onLogout}
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari akun? Anda perlu login kembali untuk mengakses dashboard."
        confirmText="Ya, Keluar"
        cancelText="Batal"
        type="warning"
        loading={isLoading}
      />

      <ModalResponse
        isOpen={showResponseModal}
        onClose={handleResponseModalConfirm}
        onConfirm={handleResponseModalConfirm}
        type={responseType}
        message={responseMessage}
        confirmText="OK"
        showCountdown={responseType === "success"}
        countdownSeconds={3}
      />
    </>
  );
};

export default SidebarDashboard;
