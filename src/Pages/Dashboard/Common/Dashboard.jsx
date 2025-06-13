import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Redux/Features/Auth/AuthStore";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import useDashboard from "../../../Hooks/Dashboard/useDashboard";
import WelcomeSection from "../../../Components/Fragments/Dashboard/WelcomeSection";
import StatsCards from "../../../Components/Fragments/Dashboard/StatsCards";
import TransactionChart from "../../../Components/Fragments/Dashboard/TransactionChart";
import RecentUsers from "../../../Components/Fragments/Dashboard/RecentUsers";
import RecentMedicines from "../../../Components/Fragments/Dashboard/RecentMedicines";
import RecentTransactions from "../../../Components/Fragments/Dashboard/RecentTransactions";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const { dashboardStats, recentReports, loading, error } = useDashboard();

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Kesalahan: {error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <WelcomeSection />

        {/* Stats Cards */}
        <StatsCards dashboardStats={dashboardStats} />

        {/* Transaction Chart */}
        <TransactionChart dashboardStats={dashboardStats} />

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentUsers users={recentReports?.users} />
          <RecentMedicines medicines={recentReports?.medicines} />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions transactions={recentReports?.transactions} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
