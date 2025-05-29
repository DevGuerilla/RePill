import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectError,
  clearError,
  selectIsAuthenticated,
} from "../../Redux/Features/Auth/AuthStore";
import AuthLayout from "../../Components/Layouts/Auth/AuthLayouts";
import ResetPasswordForm from "../../Components/Fragments/Auth/ResetPasswordForm";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";

/**
 * Halaman Reset Password
 */
const ResetPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
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

  const handleResetPasswordSuccess = (response) => {
    setIsResetPasswordSuccess(true);
    setModalMessage(response?.message);
    setModalType("success");
    setShowCountdown(true);
    setShowModal(true);
  };

  const handleResetPasswordError = (error) => {
    setIsResetPasswordSuccess(false);
    setModalMessage(
      error?.message || "Gagal mengubah kata sandi. Silakan coba lagi."
    );
    setModalType("error");
    setShowCountdown(false);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    dispatch(clearError());

    if (modalType === "success" && isResetPasswordSuccess) {
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
        title="Ubah Kata Sandi"
        subtitle={
          <div className="text-sm text-slate-600 leading-relaxed">
            <strong>Hampir selesai!</strong>
            <br />
            Buat kata sandi baru yang aman untuk akses sistem RePill Anda.
          </div>
        }
      >
        <ResetPasswordForm
          onResetPasswordSuccess={handleResetPasswordSuccess}
          onResetPasswordError={handleResetPasswordError}
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

export default ResetPassword;
