import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewSubProgramModal = ({ show, onHide, subProgram }) => {
  if (!subProgram) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>SubProgram Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {subProgram.subprogramname}</p>
        <p><strong>Description:</strong> {subProgram.subprogramdescription}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewSubProgramModal;
