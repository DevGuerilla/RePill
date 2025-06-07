import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Features/Auth/AuthStore";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";

const Dashboard = () => {
  const user = useSelector(selectUser);

  return (
    <DashboardLayout title="Dashboard">
      <div>cuki</div>
    </DashboardLayout>
  );
};

export default Dashboard;
