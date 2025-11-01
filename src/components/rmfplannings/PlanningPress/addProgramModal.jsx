import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Program from '../../../services/RMFPlanning/programServices';

const AddProgramModal = ({ show, onHide, refresh,fiscalYearid }) => {
  const [programname, setProgramname] = useState("");
  const [description, setDescription] = useState("");
  const[ProgramId,setprogramid]= useState(0);

  const handleSave = async () => {
    if (!programname) return toast.warning("Program name is required");
    try {
      await Program.addprogram(ProgramId,programname, description ,fiscalYearid);
      toast.success("Program added successfully!");
      refresh();
      onHide();
    } catch {
      toast.error("Failed to add program.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Add New Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              type="text"
              value={programname}
              onChange={(e) => setProgramname(e.target.value)}
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
export default AddProgramModal;
