import React from 'react';
import Modal from '../../../common/ModalDesign';
import DeclarationForm from './declarationForm';
import './addDeclarationModal.css';
import { toast } from 'react-toastify';

const UpdateDeclarationModal = ({ isOpen, onClose, onSuccess, declaration }) => {
    
  return (
    <Modal
      title="Update Declaration"
      isOpen={isOpen}
      onClose={onClose}
      size="modal-xl" // large, user-friendly modal
    >
      <div className="add-declaration-modal">
        {/* DeclarationForm is reused for both Add and Update */}
        <DeclarationForm
          declaration={declaration} // prefilled data passed here
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </Modal>
  );
};

export default UpdateDeclarationModal;
