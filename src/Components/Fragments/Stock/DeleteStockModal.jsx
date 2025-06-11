import React, { useState } from "react";
import ModalConfirmation from "../Common/ModalConfirmation";
import ModalResponse from "../Common/ModalResponse";
import { useStock } from "../../../Hooks/Stock/useStock";

const DeleteStockModal = ({ isOpen, onClose, onSuccess, stock }) => {
  const { deleteStock, loading } = useStock();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState("success");
  const [responseMessage, setResponseMessage] = useState("");

  const handleConfirmDelete = async () => {
    try {
      await deleteStock(stock.uuid);
      setResponseType("success");
      setResponseMessage(
        `Stok obat "${
          stock.medicine?.name || "Tidak diketahui"
        }" berhasil dihapus dari sistem.`
      );
      setShowResponseModal(true);
    } catch (error) {
      console.error("Error deleting stock:", error);
      setResponseType("error");
      setResponseMessage(
        error.message ||
          "Terjadi kesalahan saat menghapus stok. Silakan coba lagi."
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

  if (!isOpen || !stock) return null;

  return (
    <>
      {/* Confirmation Modal */}
      {!showResponseModal && (
        <ModalConfirmation
          isOpen={true}
          onClose={onClose}
          onConfirm={handleConfirmDelete}
          title="Hapus Stok"
          message={
            <>
              Apakah Anda yakin ingin menghapus stok obat{" "}
              <span className="font-semibold text-gray-900">
                "{stock.medicine?.name || "Tidak diketahui"}"
              </span>{" "}
              dengan jumlah{" "}
              <span className="font-semibold text-gray-900">
                {stock.qty} unit
              </span>
              ?
              <br />
              <br />
              <span className="text-sm text-red-600">
                Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
                data stok yang terkait.
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

export default DeleteStockModal;
