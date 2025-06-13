import React from "react";
import { useStockPredictions } from "../../../Hooks/StockPredictions/useStockPredictions";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import PredictionHeader from "../../../Components/Fragments/StockPredictions/PredictionHeader";
import PredictionStats from "../../../Components/Fragments/StockPredictions/PredictionStats";
import PredictionTable from "../../../Components/Fragments/StockPredictions/PredictionTable";
import { AlertTriangle } from "lucide-react";

const DashboardStockPredictions = () => {
  const { data, summary, urgentPurchases, loading, error, refetch } =
    useStockPredictions();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DashboardLayout title="Prediksi Stok">
      <div className="space-y-6">
        {/* Header Section */}
        <PredictionHeader loading={loading} onRefresh={handleRefresh} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Terjadi Kesalahan
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        <PredictionStats summary={summary} />

        {/* Urgent Purchases Alert */}
        {urgentPurchases && urgentPurchases.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Pembelian Mendesak Diperlukan!
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  Terdapat {urgentPurchases.length} obat yang memerlukan
                  pembelian segera:
                </p>
                <div className="space-y-2">
                  {urgentPurchases.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white border border-red-200 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-red-900">
                          {item.medicine_name}
                        </div>
                        <div className="text-sm text-red-700">
                          Sisa: {item.current_stock} unit • Perlu:{" "}
                          {item.need_to_buy} unit
                        </div>
                      </div>
                      <div className="text-sm font-medium text-red-800">
                        {item.days_until_empty} hari lagi
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Predictions Table */}
        <PredictionTable data={data} loading={loading} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardStockPredictions;
