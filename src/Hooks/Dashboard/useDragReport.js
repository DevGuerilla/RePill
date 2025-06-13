import { useState, useEffect, useCallback } from "react";
import DrugReportService from "../../Services/DrugReport/DrugReportService";

export const useDrugReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("daily");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });
  const [summary, setSummary] = useState({
    totalUsage: 0,
    totalDrugs: 0,
    averageUsage: 0,
    topDrug: null,
  });

  const fetchDrugReport = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response = await DrugReportService.getDrugUsageReport(
          period,
          page,
          pagination.limit
        );

        if (response.success) {
          const apiData = response.data;

          // Transform API data to match component expectations
          const transformedData = apiData.data.map((item) => ({
            id: item.uuid,
            drugName: item.stock.medicine.name,
            category: item.stock.medicine.type,
            usageCount: item.qty,
            lastUsed: new Date(item.created_at).toLocaleDateString("id-ID"),
            type: item.type,
          }));

          setData(transformedData);

          // Set pagination from Laravel pagination format
          setPagination({
            currentPage: apiData.current_page,
            totalPages: apiData.last_page,
            totalItems: apiData.total,
            limit: apiData.per_page,
          });

          // Calculate summary from the data
          const uniqueDrugs = new Set(
            transformedData.map((item) => item.drugName)
          );
          const totalUsage = transformedData.reduce(
            (sum, item) => sum + item.usageCount,
            0
          );
          const drugUsageMap = {};

          transformedData.forEach((item) => {
            if (!drugUsageMap[item.drugName]) {
              drugUsageMap[item.drugName] = 0;
            }
            drugUsageMap[item.drugName] += item.usageCount;
          });

          const topDrug = Object.entries(drugUsageMap).reduce(
            (max, [name, usage]) => (usage > max.usage ? { name, usage } : max),
            { name: null, usage: 0 }
          );

          setSummary({
            totalUsage,
            totalDrugs: uniqueDrugs.size,
            averageUsage:
              uniqueDrugs.size > 0 ? totalUsage / uniqueDrugs.size : 0,
            topDrug: topDrug.name ? topDrug : null,
          });
        } else {
          setError(response.message || "Gagal mengambil data laporan obat");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data");
        console.error("useDrugReport error:", err);
      } finally {
        setLoading(false);
      }
    },
    [period, pagination.limit]
  );

  useEffect(() => {
    fetchDrugReport(1);
  }, [period]);

  const changePeriod = (newPeriod) => {
    setPeriod(newPeriod);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const changePage = (page) => {
    fetchDrugReport(page);
  };

  return {
    data,
    loading,
    error,
    period,
    pagination,
    summary,
    changePeriod,
    changePage,
    refetch: () => fetchDrugReport(pagination.currentPage),
  };
};
