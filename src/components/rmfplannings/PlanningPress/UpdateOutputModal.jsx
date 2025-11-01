import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Output from "../../../services/RMFPlanning/outputService";
import { FaEdit } from "react-icons/fa";

const UpdateOutputModal = ({ show, handleClose, data, OutComeId, onUpdated }) => {
  const [formData, setFormData] = useState({
    OutPutId: 0,
    OutPutName: "",
  });
  const [loading, setLoading] = useState(false);

  // Prefill form when modal opens
  useEffect(() => {
    if (data) {
      setFormData({
        OutPutId: data.outputid || 0,
        OutPutName: data.outputname || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!formData.OutPutName.trim()) {
      toast.warning("Output name cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      await Output.addoutput(formData.OutPutId, OutComeId, formData.OutPutName);
      toast.success("✅ Output updated successfully!");
      handleClose();
      if (onUpdated) onUpdated(); // 🔄 refresh parent table
    } catch (error) {
      console.error("❌ Error updating output:", error);
      toast.error("Failed to update output!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md" backdrop="static">
      <Modal.Header
        closeButton
        className="bg-warning text-dark shadow-sm border-0"
      >
        <Modal.Title>
          <FaEdit className="me-2" />
          Update Output
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
                placeholder="Enter new output name..."
                className="shadow-sm"
              />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-light border-0 d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          className="px-4 rounded-pill shadow-sm"
        >
          Cancel
        </Button>
        <Button
          variant="warning"
          onClick={handleUpdate}
          disabled={loading}
          className="px-4 rounded-pill shadow-sm d-flex align-items-center gap-2 text-dark"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" />
              Updating...
            </>
          ) : (
            <>
              <FaEdit /> Update Output
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOutputModal;
