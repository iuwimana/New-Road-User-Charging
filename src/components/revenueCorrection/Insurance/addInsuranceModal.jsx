import React from 'react';
import Modal from '../../common/ModalDesign';
import InsuranceForm from './InsuranceForm';

const AddInsuranceModal = ({ isOpen, onClose, onSuccess }) => {
  return (
    <Modal title="Add New Insurance" isOpen={isOpen} onClose={onClose} size="modal-lg">
      <InsuranceForm onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
};

export default AddInsuranceModal;
