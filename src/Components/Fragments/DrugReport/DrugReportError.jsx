import React from "react";
import { AlertCircle } from "lucide-react";

const DrugReportError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="p-1 bg-red-100 rounded">
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Terjadi Kesalahan
          </h3>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default DrugReportError;
