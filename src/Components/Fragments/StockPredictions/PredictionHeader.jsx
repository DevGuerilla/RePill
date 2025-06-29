import React from "react";
import { TrendingUp, RefreshCw, AlertTriangle } from "lucide-react";

const PredictionHeader = ({ loading, onRefresh }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        <header className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-primary rounded-xl shadow-lg flex-shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1
              className="text-xl sm:text-2xl font-bold text-gray-900"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
            >
              Prediksi Stok Obat
            </h1>
            <p
              className="text-gray-600 mt-1 text-sm sm:text-base"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Analisis dan rekomendasi pembelian berdasarkan pola penggunaan
            </p>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md group min-h-[44px]"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                loading ? "animate-spin" : "group-hover:rotate-45"
              }`}
            />
            <span className="hidden sm:inline">
              {loading ? "Memperbarui..." : "Perbarui Data"}
            </span>
            <span className="sm:hidden">
              {loading ? "Memperbarui..." : "Perbarui"}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <h3
              className="font-semibold text-amber-800"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
            >
              Tentang Prediksi Stok
            </h3>
            <p
              className="text-amber-700 mt-1 leading-relaxed"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
            >
              Prediksi ini berdasarkan analisis pola penggunaan 30 hari
              terakhir. Rekomendasi pembelian dihitung dengan mempertimbangkan
              rata-rata penggunaan harian dan target stok aman untuk 2 bulan ke
              depan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionHeader;
