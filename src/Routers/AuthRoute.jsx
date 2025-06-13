import React from "react";
import Login from "../Pages/Auth/LoginPage";
import TermsConditionsPage from "../Pages/Legal/TermsConditionsPage";
import PrivacyPolicyPage from "../Pages/Legal/PrivacyPolicyPage";

export const authRoutes = [
  {
    path: "/masuk",
    element: <Login />,
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
