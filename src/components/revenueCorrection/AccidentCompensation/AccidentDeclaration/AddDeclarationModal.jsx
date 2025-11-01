import React from 'react';
import Modal from '../../../common/ModalDesign';
import DeclarationForm from './declarationForm';
import './addDeclarationModal.css';

const AddDeclarationModal = ({ isOpen, onClose, onSuccess }) => {
  return (
    <Modal title="Add New Declaration" isOpen={isOpen} onClose={onClose} size="modal-xl" >
        <div className="add-declaration-modal">
      <DeclarationForm onClose={onClose} onSuccess={onSuccess} />
      </div>
    </Modal>
  );
};

export default AddDeclarationModal;
