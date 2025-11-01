import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as ContractActivity from "../../../../services/ContractManagement/ContractSetting/activityTypeService";

const ActivityTypeModal = ({ show, handleClose, refreshData, selectedActivity }) => {
  const [formData, setFormData] = useState({
    activitytypeid: 0,
    name: "",
    description: "",
    require_shoulder: false,
    require_lane: false,
    require_lanewidth: false,
    require_classification: "",
    mandatory: false,
  });

  // Load selected activity for update
  useEffect(() => {
     if (selectedActivity) {

      setFormData(selectedActivity);
    } else{
      // reset when adding new
      setFormData({
        activitytypeid: 0,
        name: "",
        description: "",
        require_shoulder: false,
        require_lane: false,
        require_lanewidth: false,
        require_classification: "",
        mandatory: false,
      });
    }
  }, [selectedActivity]);

  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await ContractActivity.saveActivityType(formData); // backend handles insert/update
      toast.success(
        formData.activitytypeid === 0
          ? "Activity Type added successfully"
          : "Activity Type updated successfully"
      );
      refreshData(); // reload parent list
      handleClose(); // close modal
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Save failed!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {formData.activitytypeid === 0 ? "Add Activity Type" : ""} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Require Shoulder"
              name="require_shoulder"
              checked={formData.require_shoulder}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Require Lane"
              name="require_lane"
              checked={formData.require_lane}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Require Lane Width"
              name="require_lanewidth"
              checked={formData.require_lanewidth}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Mandatory"
              name="mandatory"
              checked={formData.mandatory}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Classification</Form.Label>
            <Form.Control
              type="text"
              name="require_classification"
              value={formData.require_classification}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {formData.activitytypeid === 0 ? "Add" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ActivityTypeModal;
