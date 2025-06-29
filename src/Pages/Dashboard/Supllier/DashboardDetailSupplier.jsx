import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashDetailSupplier from "../../../Components/Fragments/Supplier/DashDetailSupplier";
import EditSupplierModal from "../../../Components/Fragments/Supplier/EditModalSupplier";
import DeleteSupplierModal from "../../../Components/Fragments/Supplier/DeleteSupplierModal";
import { useDetailSupplier } from "../../../Hooks/Supplier/useDetailSupplier";

const DashboardDetailSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { supplier } = useDetailSupplier(id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (supplier) => {
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
    navigate("/dashboard/supplier");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout title="Detail Supplier">
      {/* Remove extra padding since component handles its own responsive spacing */}
      <div className="-mx-4 sm:mx-0">
        <DashDetailSupplier
          id={id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Edit Supplier Modal */}
      <EditSupplierModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        supplier={supplier}
      />

      {/* Delete Supplier Modal */}
      <DeleteSupplierModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSuccess={handleDeleteSuccess}
        supplier={supplier}
      />
    </DashboardLayout>
  );
};

export default DashboardDetailSupplier;
