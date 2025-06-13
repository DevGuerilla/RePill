import { useState, useEffect } from "react";
import DashboardService from "../../Services/Dashboard/DashboardService";

const useDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentReports, setRecentReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, reportsResponse] = await Promise.all([
        DashboardService.getDashboardStats(),
        DashboardService.getRecentReports(),
      ]);

      if (statsResponse.success === false) {
        throw new Error(statsResponse.message);
      }
      if (reportsResponse.success === false) {
        throw new Error(reportsResponse.message);
      }

      setDashboardStats(statsResponse.data);
      setRecentReports(reportsResponse.data);
    } catch (err) {
      setError(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    dashboardStats,
    recentReports,
    loading,
    error,
    refetch,
  };
};

export default useDashboard;
