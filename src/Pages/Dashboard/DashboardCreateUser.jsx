import React from "react";
import DashboardLayout from "../../Components/Layouts/Dashboard/DashboardLayouts";
import DashCreateUser from "../../Components/Fragments/User/DashCreateUser";

const DashboardCreateUser = () => {
  return (
    <DashboardLayout title="Tambah Pengguna">
      <DashCreateUser />
    </DashboardLayout>
  );
};

export default DashboardCreateUser;
