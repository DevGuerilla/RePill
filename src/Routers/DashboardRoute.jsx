import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardUser from "../Pages/Dashboard/DashboardUser";
import DashboardDetailUser from "../Pages/Dashboard/DashboardDetailUser";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import DashboardProfileEdit from "../Pages/Dashboard/DashboardProfileEdit";

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
    path: "/dashboard/user/:uuid",
    element: <DashboardDetailUser />,
  },
  {
    path: "/dashboard/profile",
    element: <DashboardProfile />,
  },
  {
    path: "/dashboard/profile/edit",
    element: <DashboardProfileEdit />,
  },
  // Add more dashboard routes here as needed
];
