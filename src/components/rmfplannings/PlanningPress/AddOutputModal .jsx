import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import * as Output from "../../../services/RMFPlanning/outputService";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";

const AddOutputModal = ({ show, handleClose, OutComeId, onSaved }) => {
  const [formData, setFormData] = useState({ OutPutId: 0, OutPutName: "" });
  const [loading, setLoading] = useState(false);

  const resetForm = () => setFormData({ OutPutId: 0, OutPutName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.OutPutName.trim()) {
      toast.warning("Output name is required!");
      return;
    }

    try {
      setLoading(true);
      await Output.addoutput(formData.OutPutId, OutComeId, formData.OutPutName);
      toast.success("✅ Output added successfully!");
      resetForm();
      handleClose();
      if (onSaved) onSaved(); // 🔄 Refresh parent table
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add output!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md" backdrop="static">
      <Modal.Header
        closeButton
        className="bg-primary text-white shadow-sm border-0"
      >
        <Modal.Title>
          <FaPlusCircle className="me-2" />
          Add New Output
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 bg-light">
        <div className="border rounded-3 p-3 bg-white shadow-sm">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-secondary">
                Output Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="OutPutName"
                value={formData.OutPutName}
                onChange={handleChange}
                placeholder="Enter output name..."
                className="shadow-sm"
              />
              <Form.Text muted>Provide a clear and descriptive name.</Form.Text>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-light border-0 d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={() => {
            resetForm();
            handleClose();
          }}
          className="px-4 rounded-pill shadow-sm"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
          className="px-4 rounded-pill shadow-sm d-flex align-items-center gap-2"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" />
              Saving...
            </>
          ) : (
            <>
              <FaPlusCircle /> Save Output
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOutputModal;
