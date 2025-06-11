import React from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardUser from "../Pages/Dashboard/DashboardUser";
import DashboardDetailUser from "../Pages/Dashboard/DashboardDetailUser";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import DashboardProfileEdit from "../Pages/Dashboard/DashboardProfileEdit";
import DashboardSupplier from "../Pages/Dashboard/DashboardSupplier";
import DashboardDetailSupplier from "../Pages/Dashboard/DashboardDetailSupplier";

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
    path: "/dashboard/supplier",
    element: <DashboardSupplier />,
  },
  {
    path: "/dashboard/supplier/:id",
    element: <DashboardDetailSupplier />,
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
