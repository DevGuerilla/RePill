import React, { useState } from "react";
import ModalConfirmation from "../Common/ModalConfirmation";
import ModalResponse from "../Common/ModalResponse";
import { useMedicine } from "../../../Hooks/Medicine/useMedicine";

const DeleteMedicineModal = ({ isOpen, onClose, onSuccess, medicine }) => {
  const { deleteMedicine, loading } = useMedicine();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  const handleConfirmDelete = async () => {
    try {
      await deleteMedicine(medicine.uuid);
      setResponseType("success");
      setResponseMessage(
        `Obat "${medicine.name}" berhasil dihapus dari sistem.`
      );
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error deleting medicine:", error);
      setResponseType("error");
      setResponseMessage(
        error.message ||
          "Terjadi kesalahan saat menghapus obat. Silakan coba lagi."
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

  if (!isOpen || !medicine) return null;

  return (
    <>
      {/* Confirmation Modal */}
      {!showResponseModal && (
        <ModalConfirmation
          isOpen={true}
          onClose={onClose}
          onConfirm={handleConfirmDelete}
          title="Hapus Obat"
          message={
            <>
              Apakah Anda yakin ingin menghapus obat{" "}
              <span className="font-semibold text-gray-900">
                "{medicine.name}"
              </span>
              ?
              <br />
              <br />
              <span className="text-sm text-red-600">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
                data yang terkait dengan obat ini.
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

export default DeleteMedicineModal;
