import React from 'react';
import Modal from '../../common/ModalDesign';
//import InsuranceForm from './InsuranceForm';

const UpdateInsuranceModal = ({ isOpen, onClose, onSuccess, insurance }) => {
  return (
    <Modal title="Update Insurance" isOpen={isOpen} onClose={onClose} size="modal-lg">
      <InsuranceForm
        insurance={insurance}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    </Modal>
  );
};

export default UpdateInsuranceModal;
