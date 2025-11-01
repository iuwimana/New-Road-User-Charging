import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ViewOutputModal = ({ show, handleClose, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>View Output Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <strong>Output Name:</strong> {data.outputname}
        </p>
        <p>
          <strong>Outcomen Name:</strong> {data.outcomename}
        </p>
        <p>
          <strong>Outcome Fiscal Year:</strong> {data.fiscalyear}
        </p>
       
       
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOutputModal;
