import React from "react";
import Login from "../Pages/Auth/LoginPage";
import Register from "../Pages/Auth/RegisterPage";
import ForgotPassword from "../Pages/Auth/ForgotPasswordPage";
import ResetPassword from "../Pages/Auth/ResetPasswordPage";
import TermsConditionsPage from "../Pages/Legal/TermsConditionsPage";
import PrivacyPolicyPage from "../Pages/Legal/PrivacyPolicyPage";

export const authRoutes = [
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
];
