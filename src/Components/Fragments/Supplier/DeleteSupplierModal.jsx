import React, { useState } from "react";
import ModalConfirmation from "../Common/ModalConfirmation";
import ModalResponse from "../Common/ModalResponse";
import { useSupplier } from "../../../Hooks/Supplier/useSupplier";

const DeleteSupplierModal = ({ isOpen, onClose, onSuccess, supplier }) => {
  const { deleteSupplier, loading } = useSupplier();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  const handleConfirmDelete = async () => {
    try {
      await deleteSupplier(supplier.uuid);
      setResponseType("success");
      setResponseMessage(
        `Supplier "${supplier.name}" berhasil dihapus dari sistem.`
      );
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      setResponseType("error");
      setResponseMessage(
        error.message ||
          "Terjadi kesalahan saat menghapus supplier. Silakan coba lagi."
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

  if (!isOpen || !supplier) return null;

  return (
    <>
      {/* Confirmation Modal */}
      {!showResponseModal && (
        <ModalConfirmation
          isOpen={true}
          onClose={onClose}
          onConfirm={handleConfirmDelete}
          title="Hapus Supplier"
          message={
            <>
              Apakah Anda yakin ingin menghapus supplier{" "}
              <span className="font-semibold text-gray-900">
                "{supplier.name}"
              </span>
              ?
              <br />
              <br />
              <span className="text-sm text-red-600">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
                data yang terkait dengan supplier ini.
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

export default DeleteSupplierModal;
