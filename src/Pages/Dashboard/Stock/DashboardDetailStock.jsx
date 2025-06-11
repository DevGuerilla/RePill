import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashDetailStock from "../../../Components/Fragments/Stock/DashDetailStock";
import EditStockModal from "../../../Components/Fragments/Stock/EditStockModal";
import DeleteStockModal from "../../../Components/Fragments/Stock/DeleteStockModal";
import { useDetailStock } from "../../../Hooks/Stock/useDetailStock";

const DashboardDetailStock = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { stock } = useDetailStock(uuid);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (stock) => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    window.location.reload();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    navigate("/dashboard/stock");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout title="Detail Stok">
      <DashDetailStock id={uuid} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Stock Modal */}
      <EditStockModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        stock={stock}
      />

      {/* Delete Stock Modal */}
      <DeleteStockModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSuccess={handleDeleteSuccess}
        stock={stock}
      />
    </DashboardLayout>
  );
};

export default DashboardDetailStock;
