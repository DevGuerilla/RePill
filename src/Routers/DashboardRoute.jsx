import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardUser from "../Pages/Dashboard/DashboardUser";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/user",
    element: <DashboardUser />,
  },
  {
    path: "/dashboard/profile",
    element: <DashboardProfile />,
  },
  // Add more dashboard routes here as needed
];
