import React from "react";
import { Modal, Button } from "react-bootstrap";

const ViewOutcomeModal = ({ show, onHide, outcome }) => {
  if (!outcome) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>Outcome Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Name:</strong> {outcome.outcomename}
        </p>
        <p>
          <strong>Fiscal Year:</strong> {outcome.fiscalyear}
        </p>
        <p>
          <strong>Description:</strong> {outcome.outcomedescription}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOutcomeModal;
