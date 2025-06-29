import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import DashboardLayout from "../../../Components/Layouts/Dashboard/DashboardLayouts";
import DashDetailMedicine from "../../../Components/Fragments/Medicine/DashDetailMedicine";
import EditMedicineModal from "../../../Components/Fragments/Medicine/EditMedicineModal";
import DeleteMedicineModal from "../../../Components/Fragments/Medicine/DeleteMedicineModal";
import { useDetailMedicine } from "../../../Hooks/Medicine/useDetailMedicine";

const DashboardDetailMedicine = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { medicine } = useDetailMedicine(uuid);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (medicine) => {
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
    navigate("/dashboard/medicine");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout title="Detail Obat">
      {/* Remove extra padding since component handles its own responsive spacing */}
      <div className="-mx-4 sm:mx-0">
        <DashDetailMedicine
          id={uuid}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Edit Medicine Modal */}
      <EditMedicineModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        medicine={medicine}
      />

      {/* Delete Medicine Modal */}
      <DeleteMedicineModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onSuccess={handleDeleteSuccess}
        medicine={medicine}
      />
    </DashboardLayout>
  );
};

export default DashboardDetailMedicine;
