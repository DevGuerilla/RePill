import React from "react";
import { StrictMode } from "react";
import "../index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import Home from "../Pages/home";
import Login from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/RegisterPage";
import ForgotPassword from "../Pages/Auth/ForgotPasswordPage";
import ResetPassword from "../Pages/Auth/ResetPasswordPage";
import TermsConditionsPage from "../Pages/Legal/TermsConditionsPage";
import PrivacyPolicyPage from "../Pages/Legal/PrivacyPolicyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/masuk",
    element: <Login />,
  },
  {
    path: "/daftar",
    element: <Register />,
  },
  {
    path: "/lupa-kata-sandi",
    element: <ForgotPassword />,
  },
  {
    path: "/ubah-kata-sandi",
    element: <ResetPassword />,
  },
  {
    path: "/syarat-ketentuan",
    element: <TermsConditionsPage />,
  },
  {
    path: "/kebijakan-privasi",
    element: <PrivacyPolicyPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
