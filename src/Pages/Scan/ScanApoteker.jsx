import React, { useState, useRef, useEffect } from "react";
import Quagga from "quagga";
import { useApoteker } from "../../Hooks/Apoteker/useApoteker";

const ScanApoteker = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  const { isLoading, error, formData, submitScan, updateFormData, resetForm } =
    useApoteker();

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

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

      // Play success sound (optional)
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2n3/LDdSIF"
      );
      audio.play().catch(() => {});

      // Update form data with scanned barcode
      updateFormData("barcode", barcode);

      // Stop scanning after successful detection
      stopScanner();
    });

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        // Clear previous drawings
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

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      // Small delay to ensure the DOM element is rendered
      setTimeout(() => {
        initializeScanner();
      }, 300);
    } catch (err) {
      alert("Tidak dapat mengakses kamera");
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
      alert("Silakan scan barcode terlebih dahulu");
      return;
    }

    const result = await submitScan();
    if (result) {
      alert("Berhasil memproses barcode");
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Scan Barcode</h1>

        {/* Camera Section */}
        <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
          {!isCameraOpen ? (
            <div className="p-6">
              <button
                onClick={openCamera}
                className="w-full bg-blue-500 text-white py-4 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                📱 Buka Kamera Scanner
              </button>
              <p className="text-center text-sm text-gray-600 mt-3">
                Pastikan barcode terlihat jelas di dalam kamera
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Scanner Container - Full width with proper aspect ratio */}
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <div
                  ref={scannerRef}
                  className="absolute inset-0 w-full h-full bg-black"
                  style={{
                    minHeight: "300px",
                  }}
                >
                  {/* Scanning Overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Scanning Frame */}
                      <div className="relative">
                        <div
                          className="border-2 border-red-500 bg-transparent animate-pulse"
                          style={{
                            width: "280px",
                            height: "120px",
                            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          {/* Corner indicators */}
                          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-400"></div>
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-400"></div>
                          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-400"></div>
                          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-400"></div>
                        </div>

                        {/* Scanning line animation */}
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

              {/* Control Buttons */}
              <div className="p-4 bg-gray-50">
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={stopScanner}
                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    ❌ Tutup Scanner
                  </button>
                  <button
                    onClick={() => {
                      stopScanner();
                      setTimeout(() => openCamera(), 500);
                    }}
                    className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  >
                    🔄 Reset
                  </button>
                </div>

                {isScanning && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      📋 Arahkan kamera ke barcode
                      <br />
                      🔍 Pastikan barcode berada dalam frame merah
                      <br />
                      💡 Gunakan pencahayaan yang cukup
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              📋 Barcode
            </label>
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => updateFormData("barcode", e.target.value)}
              className="w-full border rounded-lg px-3 py-3 bg-gray-100 font-mono text-sm"
              placeholder="Hasil scan akan muncul di sini..."
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              🔢 Jumlah
            </label>
            <input
              type="number"
              min="1"
              value={formData.qty}
              onChange={(e) => updateFormData("qty", parseInt(e.target.value))}
              className="w-full border rounded-lg px-3 py-3 text-center text-lg font-semibold"
              placeholder="1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              📋 Tipe Transaksi
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateFormData("type", e.target.value)}
              className="w-full border rounded-lg px-3 py-3 text-sm font-medium"
            >
              <option value="out">📤 Keluar (Out)</option>
              <option value="in">📥 Masuk (In)</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <div className="flex items-center">
                <span className="text-lg mr-2">⚠️</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !formData.barcode}
            className="w-full bg-blue-500 text-white py-4 px-4 rounded-lg font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "⏳ Memproses..." : "✅ Submit Transaksi"}
          </button>
        </form>
      </div>

      {/* Custom CSS for scan line animation */}
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
