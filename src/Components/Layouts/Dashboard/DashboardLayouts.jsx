import React from "react";
import Navbar from "../../Fragments/Common/Navbar";
import { SidebarProvider } from "../../../Context/SidebarContext";
import SidebarDashboard from "../../Fragments/Common/SideBar";
import { sidebarItems } from "../../../Context/SidebarItem";

const DashboardLayout = ({ children, title = "Dashboard" }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white">
        <div className="flex">
          <SidebarDashboard menuItems={sidebarItems} />

          <div className="flex-1 flex flex-col w-full min-w-0">
            <Navbar title={title} />
            <main
              className="flex-1 p-3 sm:p-4 lg:p-6 mt-[78px] bg-white overflow-x-hidden"
              role="main"
              aria-label={`${title} content`}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
