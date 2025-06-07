import React from "react";
import Navbar from "../../Fragments/Common/Navbar";
import { SidebarProvider } from "../../../Context/SidebarContext";
import SidebarDashboard from "../../Fragments/Common/SideBar";
import { sidebarItems } from "../../../Context/SidebarItem";

const DashboardLayout = ({ children, title = "Dashboard" }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white">
        {/* Main content wrapper */}
        <div className="flex">
          {/* Sidebar */}
          <SidebarDashboard menuItems={sidebarItems} />

          {/* Main content area */}
          <div className="flex-1 flex flex-col ">
            <Navbar title={title} />
            <main className="flex-1 p-4 mt-[78px] bg-white">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
