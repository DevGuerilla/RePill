import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  clearError,
  selectIsAuthenticated,
} from "../../Redux/Features/Auth/AuthStore";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";
import RegisterForm from "../../Components/Fragments/Auth/RegisterForm";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";

/**
 * Halaman Register
 */
const Register = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated && !isRegisterSuccess && !showModal) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isRegisterSuccess, showModal]);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setModalType("error");
      setShowCountdown(false);
      setShowModal(true);
    }
  }, [error]);

  const handleRegisterSuccess = (response) => {
    setIsRegisterSuccess(true);
    setModalMessage(
      response?.message ||
        "Pendaftaran berhasil! Akun Anda akan diverifikasi oleh administrator."
    );
    setModalType("success");
    setShowCountdown(true);
    setShowModal(true);
  };

  const handleRegisterError = (error) => {
    setIsRegisterSuccess(false);
    setModalMessage(error?.message || "Pendaftaran gagal. Silakan coba lagi.");
    setModalType(error?.type === "validation" ? "warning" : "error");
    setShowCountdown(false);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType === "success" && isRegisterSuccess) {
      navigate("/masuk");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType !== "success") {
      setIsRegisterSuccess(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Daftar ke RePill"
        subtitle={
          <div className="text-sm text-slate-600 leading-relaxed">
            <strong>Bergabung dengan Sistem Kesehatan Digital!</strong>
            <br />
            Buat akun untuk mengakses sistem manajemen stok obat Puskesmas.
          </div>
        }
      >
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onRegisterError={handleRegisterError}
        />
      </AuthLayout>

      <ModalResponse
        isOpen={showModal}
        onClose={handleModalClose}
        type={modalType}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        confirmText={modalType === "success" ? "Lanjutkan ke Login" : "Tutup"}
        showCountdown={showCountdown}
        countdownSeconds={3}
      />
    </>
  );
};

export default Register;
