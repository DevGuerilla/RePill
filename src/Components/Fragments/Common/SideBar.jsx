import React from "react";
import { NavLink } from "react-router";
import { ChevronLeft, ChevronRight, X, Pill } from "lucide-react";
import { useSidebar } from "../../../Context/SidebarContext";

const SidebarDashboard = ({ menuItems }) => {
  const sidebarContext = useSidebar();

  // Handle case where context is undefined
  if (!sidebarContext) {
    console.error("SidebarDashboard must be used within a SidebarProvider");
    return null;
  }

  const { expanded, toggleSidebar, isMobile, isOpen } = sidebarContext;

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
      </aside>
    </>
  );
};

export default SidebarDashboard;
