import React from "react";
import { StrictMode } from "react";
import "../index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import { authRoutes } from "./AuthRoute";
import { dashboardRoutes } from "./DashboardRoute";
import NotFound from "../Pages/404";
import Login from "../Pages/Auth/LoginPage";
import { apotekerRoutes } from "./ApotekerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  ...authRoutes,
  ...dashboardRoutes,
  ...apotekerRoutes,
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
