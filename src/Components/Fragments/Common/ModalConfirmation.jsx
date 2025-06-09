import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ModalConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  message = "Apakah Anda yakin ingin melanjutkan?",
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  type = "warning",
  loading = false,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <AlertTriangle className="text-red-500 w-12 h-12" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500 w-12 h-12" />;
      default:
        return <AlertTriangle className="text-blue-500 w-12 h-12" />;
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 focus:ring-red-500/50";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500/50";
      default:
        return "bg-primary hover:bg-primary-hover focus:ring-primary/50";
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl z-10">
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          {getIcon()}
          <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 px-4 ${getConfirmButtonColor()} text-white rounded-lg transition-colors disabled:opacity-50 font-medium focus:outline-none focus:ring-2`}
          >
            {loading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
