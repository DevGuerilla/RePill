import React from "react";
import { Activity, Calendar, RefreshCw } from "lucide-react";

const DrugReportHeader = ({
  period,
  periodOptions,
  loading,
  onPeriodChange,
  onRefresh,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-lg shadow">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Laporan Penggunaan Obat
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor dan analisis penggunaan obat dalam sistem
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="block w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-0 outline-none text-sm transition-colors bg-white hover:border-primary appearance-none cursor-pointer min-w-[120px]"
              disabled={loading}
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
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

          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 transition-transform duration-200 ${
                loading ? "animate-spin" : "group-hover:rotate-45"
              }`}
            />
            Perbarui Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrugReportHeader;
