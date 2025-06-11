import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashDetailUser from "../../../Components/Fragments/User/DashDetailUser";
import EditUserModal from "../../../Components/Fragments/User/EditUserModal";
import DeleteUserModal from "../../../Components/Fragments/User/DeleteUserModal";
import { useDetailUser } from "../../../Hooks/User/useDetailUser";

const DashboardDetailUser = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { user } = useDetailUser(uuid);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    // Refresh the current user data
    window.location.reload(); // Simple refresh, could be improved with refetch
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    navigate("/dashboard/user");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout title="Detail Pengguna">
      <DashDetailUser uuid={uuid} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        user={user}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSuccess={handleDeleteSuccess}
        user={user}
      />
    </DashboardLayout>
  );
};

export default DashboardDetailUser;
