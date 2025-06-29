import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDrugReport } from "../../../Hooks/Dashboard/useDragReport";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DrugReportHeader from "../../../Components/Fragments/DrugReport/DrugReportHeader";
import DrugReportSearch from "../../../Components/Fragments/DrugReport/DrugReportSearch";
import DrugReportError from "../../../Components/Fragments/DrugReport/DrugReportError";
import DrugReportStats from "../../../Components/Fragments/DrugReport/DrugReportStats";
import DashDragReport from "../../../Components/Fragments/DrugReport/DashDragReport";
import DrugReportPagination from "../../../Components/Fragments/DrugReport/DrugReportPagination";

const DashboardDrugReport = () => {
  const {
    data,
    loading,
    error,
    period,
    pagination,
    summary,
    changePeriod,
    changePage,
    refetch,
  } = useDrugReport();

  const [searchTerm, setSearchTerm] = useState("");

  const periodOptions = [
    { value: "daily", label: "Harian" },
    { value: "weekly", label: "Mingguan" },
    { value: "monthly", label: "Bulanan" },
  ];

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.drugName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    refetch();
  };

  return (
    <DashboardLayout title="Laporan Penggunaan Obat">
      <div className="space-y-4 sm:space-y-6 mt-10 sm:mt-0">
        {/* Header Section */}
        <DrugReportHeader
          period={period}
          periodOptions={periodOptions}
          loading={loading}
          onPeriodChange={changePeriod}
          onRefresh={handleRefresh}
        />

        {/* Search Section */}
        <DrugReportSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Error Message */}
        <DrugReportError error={error} />

        {/* Statistics Grid - Add mobile top margin */}
        <div className="mt-5 sm:mt-0">
          <DrugReportStats summary={summary} />
        </div>

        {/* Data Table */}
        <DashDragReport
          data={filteredData}
          loading={loading}
          pagination={pagination}
        />

        {/* Pagination */}
        <DrugReportPagination
          pagination={pagination}
          onPageChange={changePage}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardDrugReport;
