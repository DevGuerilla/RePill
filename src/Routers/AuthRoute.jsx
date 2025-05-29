import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/Auth/ResetPasswordPage";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/masuk" element={<LoginPage />} />
      <Route path="/daftar" element={<RegisterPage />} />
      <Route path="/lupa-kata-sandi" element={<ForgotPasswordPage />} />
      <Route path="/reset-kata-sandi" element={<ResetPasswordPage />} />
      {/* Fallback routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default AuthRoutes;
