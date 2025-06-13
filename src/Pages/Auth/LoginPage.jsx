import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  clearError,
  selectIsAuthenticated,
} from "../../Redux/Features/Auth/AuthStore";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";
import LoginForm from "../../Components/Fragments/Auth/LoginForm";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";

/**
 * Halaman Login
 */
const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !isLoginSuccess && !showModal) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isLoginSuccess, showModal]);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setModalType("error");
      setShowCountdown(false);
      setShowModal(true);
    }
  }, [error]);

  const handleLoginSuccess = (response) => {
    setIsLoginSuccess(true);
    setModalMessage(
      response?.message ||
        "Selamat datang di RePill! Sistem manajemen stok obat siap digunakan."
    );
    setModalType("success");
    setShowCountdown(true);
    setShowModal(true);
  };

  const handleLoginError = (error) => {
    setIsLoginSuccess(false);
    setModalMessage(error?.message || "Login gagal. Silakan coba lagi.");
    setModalType(error?.type === "validation" ? "warning" : "error");
    setShowCountdown(false);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType === "success" && isLoginSuccess) {
      navigate("/");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType !== "success") {
      setIsLoginSuccess(false);
    }
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
        confirmText={modalType === "success" ? "Masuk ke Dashboard" : "Tutup"}
        showCountdown={showCountdown}
        countdownSeconds={3}
      />
    </>
  );
};

export default Login;
