import React from "react";
import { StrictMode } from "react";
import "../index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import { authRoutes } from "./AuthRoute";
import { dashboardRoutes } from "./DashboardRoute";
import NotFound from "../Pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/masuk" replace />,
  },
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
