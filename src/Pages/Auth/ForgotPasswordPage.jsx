import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  clearError,
  selectIsAuthenticated,
} from "../../Redux/Features/Auth/AuthStore";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";
import ForgotPasswordForm from "../../Components/Fragments/Auth/ForgotPasswordForm";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";

/**
 * Halaman Lupa Password
 */
const ForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isForgotPasswordSuccess, setIsForgotPasswordSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      setModalType("error");
      setShowCountdown(false);
      setShowModal(true);
    }
  }, [error]);

  const handleForgotPasswordSuccess = (response) => {
    setIsForgotPasswordSuccess(true);
    setModalMessage(response?.message);
    setModalType("success");
    setShowCountdown(true);
    setShowModal(true);
  };

  const handleForgotPasswordError = (error) => {
    setIsForgotPasswordSuccess(false);
    setModalMessage(
      error?.message || "Gagal mengirim email reset. Silakan coba lagi."
    );
    setModalType("error");
    setShowCountdown(false);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType === "success" && isForgotPasswordSuccess) {
      navigate("/masuk");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearError());
  };

  return (
    <>
      <AuthLayout
        title="Lupa Kata Sandi"
        subtitle={
          <div className="text-sm text-slate-600 leading-relaxed">
            <strong>Tidak masalah!</strong>
            <br />
            Kami akan membantu Anda mengakses kembali sistem manajemen stok
            obat.
          </div>
        }
      >
        <ForgotPasswordForm
          onForgotPasswordSuccess={handleForgotPasswordSuccess}
          onForgotPasswordError={handleForgotPasswordError}
        />
      </AuthLayout>

      <ModalResponse
        isOpen={showModal}
        onClose={handleModalClose}
        type={modalType}
        message={modalMessage}
        onConfirm={handleModalConfirm}
        confirmText={modalType === "success" ? "Kembali ke Login" : "Tutup"}
        showCountdown={showCountdown}
        countdownSeconds={5}
      />
    </>
  );
};

export default ForgotPassword;
