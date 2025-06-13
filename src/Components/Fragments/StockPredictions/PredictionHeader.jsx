import React from "react";
import { TrendingUp, RefreshCw, BarChart3, AlertTriangle } from "lucide-react";

const PredictionHeader = ({ loading, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Prediksi Stok Obat
            </h1>
            <p className="text-gray-600 mt-1">
              Analisis dan rekomendasi pembelian berdasarkan pola penggunaan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                loading ? "animate-spin" : "group-hover:rotate-45"
              }`}
            />
            {loading ? "Memperbarui..." : "Perbarui Data"}
          </button>

          <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Analisis Prediktif
            </span>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">
              Tentang Prediksi Stok
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              Prediksi ini berdasarkan analisis pola penggunaan 30 hari
              terakhir. Rekomendasi pembelian dihitung dengan mempertimbangkan
              rata-rata penggunaan harian dan target stok aman untuk 2 bulan ke
              depan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionHeader;
