import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";

const UpdateOutcomeModal = ({ show, onHide, outcome, refresh, subprogramid, fiscalYearId }) => {
  const [OutcomeId, setOutcomeId] = useState(0);
      const [SubProgramId, setSubProgramId] = useState(subprogramid);
      const [OutComeName, setOutcomeName] = useState('');
      const [Description, setDescription] = useState('');
      const [FiscalYearID, setFiscalYearID] = useState(fiscalYearId  );

  useEffect(() => {
    if (outcome) {
      setOutcomeName(outcome.outcomename);
      setDescription(outcome.outcomedescription);
    }
  }, [outcome]);

  const handleUpdate = async () => {
    if (!OutComeName) return toast.warning("Outcome name is required");
    try {
      
       await Outcome.addoutcome(OutcomeId, SubProgramId, OutComeName, FiscalYearID, Description);
      toast.success("Outcome updated successfully!");
      refresh();
      onHide();
    } catch {
      toast.error("Failed to update outcome.");
    }
  };

  if (!outcome) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-warning text-white">
        <Modal.Title>Update Outcome</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Outcome Name</Form.Label>
            <Form.Control
              type="text"
              value={OutComeName}
              onChange={(e) => setOutcomeName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
      
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOutcomeModal;
