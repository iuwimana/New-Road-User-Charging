import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Program from '../../../services/RMFPlanning/programServices';

const UpdateProgramModal = ({ show, onHide, program, refresh,fiscalYearid }) => {
  const [programname, setProgramname] = useState("");
  const [description, setDescription] = useState("");
  

  useEffect(() => {
    if (program) {
      setProgramname(program.programname);
      setDescription(program.description);
      
    }
  }, [program]);

  const handleUpdate = async () => {
    if (!programname) return toast.warning("Program name is required");
    try {
      await Program.addprogram(program.programid,programname,description,fiscalYearid)
      
      toast.success("Program updated successfully!");
      refresh();
      onHide();
    } catch {
      toast.error("Failed to update program.");
    }
  };

  if (!program) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-warning text-white">
        <Modal.Title>Update Program</Modal.Title>
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
          Cancel
        </Button>
        <Button variant="warning" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UpdateProgramModal;
