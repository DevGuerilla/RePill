import React from "react";
import Dashboard from "../Pages/Dashboard/Common/Dashboard";
import DashboardUser from "../Pages/Dashboard/User/DashboardUser";
import DashboardDetailUser from "../Pages/Dashboard/User/DashboardDetailUser";
import DashboardProfile from "../Pages/Dashboard/Profile/DashboardProfile";
import DashboardProfileEdit from "../Pages/Dashboard/Profile/DashboardProfileEdit";
import DashboardSupplier from "../Pages/Dashboard/Supllier/DashboardSupplier";
import DashboardDetailSupplier from "../Pages/Dashboard/Supllier/DashboardDetailSupplier";
import DashboardMedicine from "../Pages/Dashboard/Medicine/DashboardMedicine";
import DashboardDetailMedicine from "../Pages/Dashboard/Medicine/DashboardDetailMedicine";
import DashboardStock from "../Pages/Dashboard/Stock/DashboardStock";
import DashboardDetailStock from "../Pages/Dashboard/Stock/DashboardDetailStock";
import DashboardDrugReport from "../Pages/Dashboard/DrugReport/DashboardDrugReport";

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
    path: "/dashboard/drug-report",
    element: <DashboardDrugReport />,
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
    path: "/dashboard/medicine",
    element: <DashboardMedicine />,
  },
  {
    path: "/dashboard/medicine/:uuid",
    element: <DashboardDetailMedicine />,
  },
  {
    path: "/dashboard/profile",
    element: <DashboardProfile />,
  },
  {
    path: "/dashboard/profile/edit",
    element: <DashboardProfileEdit />,
  },
  {
    path: "/dashboard/stock",
    element: <DashboardStock />,
  },
  {
    path: "/dashboard/stock/:uuid",
    element: <DashboardDetailStock />,
  },
];
