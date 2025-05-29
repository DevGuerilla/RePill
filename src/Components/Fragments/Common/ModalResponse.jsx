import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, X, AlertTriangle } from "lucide-react";

const ModalResponse = ({
  isOpen,
  onClose,
  type = "success",
  message,
  onConfirm,
  confirmText = "OK",
  showCountdown = false,
  countdownSeconds = 3,
}) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      if (showCountdown && type === "success") {
        setTimeLeft(countdownSeconds);
      } else {
        setTimeLeft(null);
      }
    } else {
      document.body.style.overflow = "unset";
      setTimeLeft(null);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, type, showCountdown, countdownSeconds]);

  useEffect(() => {
    if (
      !isOpen ||
      !showCountdown ||
      type !== "success" ||
      timeLeft === null ||
      timeLeft <= 0
    )
      return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimeout(() => onConfirm(), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isOpen, type, onConfirm, showCountdown]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500 w-16 h-16 mb-3" />;
      case "error":
        return <XCircle className="text-red-500 w-16 h-16 mb-3" />;
      case "warning":
        return <AlertTriangle className="text-yellow-500 w-16 h-16 mb-3" />;
      default:
        return <CheckCircle className="text-green-500 w-16 h-16 mb-3" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Berhasil";
      case "error":
        return "Gagal";
      case "warning":
        return "Peringatan";
      default:
        return "Notifikasi";
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500 hover:bg-green-600 focus:ring-green-500/50";
      case "error":
        return "bg-red-500 hover:bg-red-600 focus:ring-red-500/50";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500/50";
      default:
        return "bg-primary hover:bg-primary-hover focus:ring-primary/50";
    }
  };

  const getButtonText = () => {
    if (
      showCountdown &&
      type === "success" &&
      timeLeft !== null &&
      timeLeft > 0
    ) {
      return `${confirmText} (${timeLeft})`;
    }
    return confirmText;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-lg"
        onClick={type !== "success" ? onClose : undefined}
        aria-hidden="true"
      ></div>

      <div className="flex items-center justify-center w-full h-full px-4">
        <div
          className="relative bg-white rounded-lg p-6 w-[90%] max-w-md shadow-2xl z-10 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {type !== "success" && (
            <div className="absolute top-3 right-3">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          )}

          <div className="flex flex-col items-center justify-center mb-6 mt-2 pt-2">
            {getIcon()}

            <h3
              className={`text-xl font-semibold text-center ${getTitleColor()}`}
            >
              {getTitle()}
            </h3>

            <p className="text-center mt-3 text-slate-700 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onConfirm}
            className={`w-full py-3 ${getButtonColor()} text-white rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 font-medium focus:outline-none focus:ring-2`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalResponse;
