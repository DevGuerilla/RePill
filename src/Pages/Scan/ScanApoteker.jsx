import React, { useState, useRef, useEffect } from "react";
import Quagga from "quagga";
import { useApoteker } from "../../Hooks/Apoteker/useApoteker";
import ModalResponse from "../../Components/Fragments/Common/ModalResponse";
import NavbarMobile from "../../Components/Fragments/Common/NavbarMobile";
import {
  Camera,
  CameraOff,
  RotateCcw,
  QrCode,
  Package,
  Hash,
  ArrowUpDown,
  Send,
  AlertCircle,
  Info,
  Eye,
} from "lucide-react";

const ScanApoteker = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isFocused, setIsFocused] = useState({
    barcode: false,
    qty: false,
    type: false,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });
  const scannerRef = useRef(null);

  const {
    isLoading,
    error,
    message,
    success,
    formData,
    submitScan,
    updateFormData,
    resetForm,
  } = useApoteker();

  useEffect(() => {
    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

  // Watch for success/error state changes to trigger modal
  useEffect(() => {
    if (success && message) {
      showModal("success", message);
    } else if (error && !success) {
      showModal("error", error);
    }
  }, [success, error, message]);

  const initializeScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            facingMode: "environment",
            aspectRatio: { ideal: 16 / 9 },
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        frequency: 10,
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.log(err);
          alert("Tidak dapat menginisialisasi scanner: " + err.message);
          setIsCameraOpen(false);
          return;
        }
        console.log("Scanner initialized");
        Quagga.start();
        setIsScanning(true);
      }
    );

    Quagga.onDetected((data) => {
      const barcode = data.codeResult.code;
      console.log("Barcode detected:", barcode);

      // Play success sound
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2n3/LDdSIF"
      );
      audio.play().catch(() => {});

      updateFormData("barcode", barcode);
      stopScanner();
    });

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute("width")),
          parseInt(drawingCanvas.getAttribute("height"))
        );

        if (result.boxes) {
          drawingCtx.strokeStyle = "red";
          drawingCtx.lineWidth = 2;
          result.boxes
            .filter((box) => box !== result.box)
            .forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "red",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          drawingCtx.strokeStyle = "blue";
          drawingCtx.lineWidth = 2;
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "blue",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          drawingCtx.strokeStyle = "green";
          drawingCtx.lineWidth = 3;
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            {
              color: "green",
              lineWidth: 3,
            }
          );
        }
      }
    });
  };

  const showModal = (type, message) => {
    setModalState({
      isOpen: true,
      type,
      message,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "success",
      message: "",
    });
  };

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      setTimeout(() => {
        initializeScanner();
      }, 300);
    } catch (err) {
      showModal("error", "Tidak dapat mengakses kamera");
      setIsCameraOpen(false);
    }
  };

  const stopScanner = () => {
    if (isScanning) {
      Quagga.stop();
      setIsScanning(false);
    }
    setIsCameraOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.barcode) {
      showModal("warning", "Silakan scan barcode terlebih dahulu");
      return;
    }

    await submitScan();
  };

  const handleModalConfirm = () => {
    closeModal();
    if (modalState.type === "success") {
      resetForm();
    }
  };

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Mobile Navbar */}
      <NavbarMobile title="Scan Apoteker" showAuthButtons={false} />

      <div className="max-w-lg mx-auto p-6 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
            <QrCode className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Scan Barcode
          </h1>
          <p className="text-slate-600">
            Pindai barcode untuk mengelola stok obat
          </p>
        </div>

        {/* Camera Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          {!isCameraOpen ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-2xl mb-6">
                <Camera className="h-10 w-10 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Mulai Scanning
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Pastikan barcode terlihat jelas dan pencahayaan cukup
              </p>
              <button
                onClick={openCamera}
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Camera className="h-5 w-5 mr-2" />
                Buka Kamera
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div
                  ref={scannerRef}
                  className="absolute inset-0 w-full h-full bg-black rounded-t-2xl"
                  style={{ minHeight: "300px" }}
                >
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative">
                        <div
                          className="border-2 border-red-500 bg-transparent animate-pulse rounded-lg"
                          style={{
                            width: "280px",
                            height: "120px",
                            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-400 rounded-tl"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-400 rounded-tr"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-400 rounded-bl"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-400 rounded-br"></div>
                        </div>
                        <div className="absolute inset-0 overflow-hidden">
                          <div
                            className="w-full h-0.5 bg-red-400 animate-pulse"
                            style={{
                              animation: "scanLine 2s linear infinite",
                              marginTop: "60px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-slate-50">
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={stopScanner}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <CameraOff className="h-4 w-4 mr-2" />
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      stopScanner();
                      setTimeout(() => openCamera(), 500);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-500 text-white font-medium rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </button>
                </div>

                {isScanning && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Petunjuk Scanning:</p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Arahkan kamera ke barcode</li>
                          <li>• Pastikan barcode dalam frame merah</li>
                          <li>• Gunakan pencahayaan yang cukup</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Detail Transaksi
          </h3>

          {/* Barcode Input */}
          <div className="mb-6">
            <label
              htmlFor="barcode"
              className={`block font-semibold mb-2 text-sm transition-all duration-300 ${
                isFocused.barcode ? "text-primary" : "text-slate-800"
              }`}
            >
              Barcode
            </label>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 ${
                  isFocused.barcode ? "text-primary" : "text-gray-400"
                }`}
              >
                <QrCode size={20} strokeWidth={2} />
              </span>
              <input
                id="barcode"
                type="text"
                value={formData.barcode}
                onChange={(e) => updateFormData("barcode", e.target.value)}
                onFocus={() => handleFocus("barcode")}
                onBlur={() => handleBlur("barcode")}
                className={`w-full border rounded-xl text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 py-4 pl-12 pr-4 font-mono bg-slate-50 ${
                  isFocused.barcode
                    ? "shadow-md border-primary focus:ring-primary focus:border-primary"
                    : "border-gray-300"
                }`}
                placeholder="Hasil scan akan muncul di sini..."
                readOnly
              />
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-6">
            <label
              htmlFor="qty"
              className={`block font-semibold mb-2 text-sm transition-all duration-300 ${
                isFocused.qty ? "text-primary" : "text-slate-800"
              }`}
            >
              Jumlah
            </label>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 ${
                  isFocused.qty ? "text-primary" : "text-gray-400"
                }`}
              >
                <Hash size={20} strokeWidth={2} />
              </span>
              <input
                id="qty"
                type="number"
                min="1"
                value={formData.qty}
                onChange={(e) =>
                  updateFormData("qty", parseInt(e.target.value))
                }
                onFocus={() => handleFocus("qty")}
                onBlur={() => handleBlur("qty")}
                className={`w-full border rounded-xl text-sm text-slate-700 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 py-4 pl-12 pr-4 text-center font-semibold ${
                  isFocused.qty
                    ? "shadow-md border-primary focus:ring-primary focus:border-primary"
                    : "border-gray-300"
                }`}
                placeholder="Masukkan jumlah"
              />
            </div>
          </div>

          {/* Type Select */}
          <div className="mb-6">
            <label
              htmlFor="type"
              className={`block font-semibold mb-2 text-sm transition-all duration-300 text-slate-800`}
            >
              Tipe Transaksi
            </label>
            <div className="relative">
              <span
                className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 pointer-events-none text-gray-400`}
              >
                <ArrowUpDown size={20} strokeWidth={2} />
              </span>
              <select
                id="type"
                value={formData.type}
                disabled
                className={`w-full border rounded-xl text-sm text-slate-700 focus:outline-none transition-all duration-300 py-4 pl-12 pr-4 appearance-none bg-gray-100 border-gray-300 cursor-not-allowed`}
              >
                <option value="out">Keluar (Out)</option>
              </select>
              <div
                className={`absolute inset-y-0 right-4 flex items-center pointer-events-none transition-colors duration-300 text-gray-400`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Tipe transaksi sudah ditetapkan untuk keluar (out)
            </p>
          </div>

          {/* Error/Success Message */}
          {(error || message) && (
            <div
              className={`mb-6 p-4 rounded-xl border ${
                success
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{message || error}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.barcode}
            className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                Memproses...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Transaksi
              </>
            )}
          </button>
        </form>
      </div>

      <ModalResponse
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={handleModalConfirm}
        type={modalState.type}
        message={modalState.message}
        showCountdown={modalState.type === "success"}
        countdownSeconds={3}
      />

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scanLine {
          0% {
            transform: translateY(-60px);
          }
          50% {
            transform: translateY(60px);
          }
          100% {
            transform: translateY(-60px);
          }
        }
      `}</style>
    </div>
  );
};

export default ScanApoteker;
