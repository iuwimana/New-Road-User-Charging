import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as SubProgram from "../../../services/RMFPlanning/subProgramService";

const AddSubProgramModal = ({ show, onHide, refresh, fiscalYearid }) => {
  const [subprogramname, setSubprogramname] = useState("");
  const [description, setDescription] = useState("");
  const[subprogramid,setsubprogramid]= useState(0);

  const handleSave = async () => {
    if (!subprogramname) return toast.warning("SubProgram name is required");
    try {
      await SubProgram.addsubprogram(subprogramid, fiscalYearid,subprogramname, description);
      toast.success("SubProgram added successfully!");
      refresh();
      onHide();
    } catch {
      toast.error("Failed to add subprogram.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Add New SubProgram</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>SubProgram Name</Form.Label>
            <Form.Control
              type="text"
              value={subprogramname}
              onChange={(e) => setSubprogramname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubProgramModal;
