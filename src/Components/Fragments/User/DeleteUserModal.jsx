import React, { useState } from "react";
import ModalConfirmation from "../Common/ModalConfirmation";
import ModalResponse from "../Common/ModalResponse";
import { useUser } from "../../../Hooks/User/useUser";

const DeleteUserModal = ({ isOpen, onClose, onSuccess, user }) => {
  const { deleteUser, loading } = useUser();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(user.uuid);
      setResponseType("success");
      setResponseMessage(
        `Pengguna "${user.fullname}" berhasil dihapus dari sistem.`
      );
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setResponseType("error");
      setResponseMessage(
        error.message ||
          "Terjadi kesalahan saat menghapus pengguna. Silakan coba lagi."
      );
      setShowResponseModal(true);
    }
  };

  const handleResponseConfirm = () => {
    setShowResponseModal(false);
    if (responseType === "success") {
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 300);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <>
      {/* Confirmation Modal */}
      {!showResponseModal && (
        <ModalConfirmation
          isOpen={true}
          onClose={onClose}
          onConfirm={handleConfirmDelete}
          title="Hapus Pengguna"
          message={
            <>
              Apakah Anda yakin ingin menghapus pengguna{" "}
              <span className="font-semibold text-gray-900">
                "{user.fullname}"
              </span>
              ?
              <br />
              <br />
              <span className="text-sm text-red-600">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
                data yang terkait dengan pengguna ini.
              </span>
            </>
          }
          confirmText="Ya, Hapus"
          cancelText="Batal"
          type="danger"
          loading={loading}
        />
      )}

      {/* Response Modal */}
      <ModalResponse
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        onConfirm={handleResponseConfirm}
        type={responseType}
        message={responseMessage}
        showCountdown={responseType === "success"}
        countdownSeconds={3}
      />
    </>
  );
};

export default DeleteUserModal;
