import React from "react";
import Modal from "../../../common/ModalDesign"; // same modal component used for declarations
import DamagedItemForm from "./DamagedItemForm";

const AddDamagedItemModal = ({ isOpen, onClose, declaration, onSuccess }) => {
  if (!isOpen) return null; // don't render if modal closed

  return (
    <Modal
      title="Add Damaged Road Item"
      isOpen={isOpen}
      onClose={onClose}
      size="modal-xl"
    >
      
      <div className="add-damaged-item-modal">
        
        <DamagedItemForm
          declaration={declaration}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default AddDamagedItemModal;
