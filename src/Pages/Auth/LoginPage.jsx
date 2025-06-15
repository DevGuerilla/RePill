import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  clearError,
  selectIsAuthenticated,
  selectUser,
} from "../../Redux/Features/Auth/AuthStore";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";
import LoginForm from "../../Components/Fragments/Auth/LoginForm";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";

/**
 * Get redirect path based on user role
 * @param {string} role - User role name
 * @returns {string} - Redirect path
 */
const getRedirectPath = (role) => {
  if (!role) return "/dashboard"; // Default fallback

  const normalizedRole = role.toLowerCase();

  switch (normalizedRole) {
    case "admin":
      return "/dashboard";
    case "apoteker":
      return "/scan";
    case "restocker":
      return "/restocker";
    default:
      return "/dashboard"; // Default fallback for unknown roles
  }
};

/**
 * Halaman Login
 */
const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Check if already authenticated on mount
  useEffect(() => {
    if (isAuthenticated && !showModal) {
      // Get role from Redux state if user is already authenticated
      const existingRole = user?.role?.name;
      if (existingRole) {
        const rolePath = getRedirectPath(existingRole);
        console.log("Already authenticated, redirecting to:", rolePath);
        navigate(rolePath);
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, navigate, showModal, user]);

  // Handle error display
  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setModalType("error");
      setShowCountdown(false);
      setShowModal(true);
    }
  }, [error]);

  const handleLoginSuccess = (response) => {
    console.log("Login response:", response); // Debug log

    const role = response?.role;
    const path = getRedirectPath(role);

    console.log("User role:", role); // Debug log
    console.log("Redirect path:", path); // Debug log

    setIsLoginSuccess(true);
    setUserRole(role);
    setRedirectPath(path);

    // Customize message based on role
    let roleMessage = "";
    if (role) {
      const normalizedRole = role.toLowerCase();
      switch (normalizedRole) {
        case "admin":
          roleMessage = " Anda akan diarahkan ke dashboard admin.";
          break;
        case "apoteker":
          roleMessage = " Anda akan diarahkan ke halaman scan.";
          break;
        case "restocker":
          roleMessage = " Anda akan diarahkan ke halaman restocker.";
          break;
        default:
          roleMessage = " Anda akan diarahkan ke halaman utama.";
      }
    } else {
      console.warn("No role found in response"); // Debug log
    }

    setModalMessage(`Selamat datang di RePill! Login berhasil.${roleMessage}`);
    setModalType("success");
    setShowCountdown(true);
    setShowModal(true);
  };

  const handleLoginError = (error) => {
    setIsLoginSuccess(false);
    setUserRole(null);
    setRedirectPath("/dashboard");
    setModalMessage(error?.message || "Login gagal. Silakan coba lagi.");
    setModalType(error?.type === "validation" ? "warning" : "error");
    setShowCountdown(false);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    console.log("Navigating to:", redirectPath); // Debug log
    setShowModal(false);
    dispatch(clearError());

    if (modalType === "success" && isLoginSuccess) {
      navigate(redirectPath);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearError());
    setIsLoginSuccess(false);
    setUserRole(null);
    setRedirectPath("/dashboard");
  };

  // Generate dynamic confirm text based on role
  const getConfirmText = () => {
    if (modalType !== "success") return "Tutup";

    if (userRole) {
      const normalizedRole = userRole.toLowerCase();
      switch (normalizedRole) {
        case "admin":
          return "Masuk ke Dashboard";
        case "apoteker":
          return "Masuk ke Scan";
        case "restocker":
          return "Masuk ke Restocker";
        default:
          return "Masuk ke Dashboard";
      }
    }

    return "Masuk ke Dashboard";
  };

  return (
    <>
      <AuthLayout
        title="Masuk ke RePill"
        subtitle={
          <div className="text-sm text-slate-600 leading-relaxed">
            <strong>Selamat datang, Petugas Kesehatan!</strong>
            <br />
            Masuk untuk mengakses sistem manajemen stok obat Puskesmas Anda.
          </div>
        }
      >
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
      </AuthLayout>

      <ModalResponse
        isOpen={showModal}
        onClose={handleModalClose}
        type={modalType}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        confirmText={getConfirmText()}
        showCountdown={showCountdown && modalType === "success"}
        countdownSeconds={3}
      />
    </>
  );
};

export default Login;
