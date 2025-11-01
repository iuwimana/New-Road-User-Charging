import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";  // Bootstrap Form
import { toast } from "react-toastify";
import * as ContractActivity from "../../../../services/ContractManagement/ContractSetting/activityTypeService";

const AddActivityTypeModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    activitytypeid:0,
    name: "",
    description: "",
    require_shoulder: false,
    require_lane: false,
    require_lanewidth: false,
    require_classification: "ALL",
    mandatory: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    {/**
        activitytypeid,
      name,
      description,
      require_shoulder,
      require_lane,
      require_lanewidth,
      require_classification,
      mandatory */}
      
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async(e) => {
    toast.success(`....${JSON.stringify(formData)}`) 
    try {
        formData
      await ContractActivity.saveActivityType(formData); // call backend
       toast.success(`save successfull`) 
       //refreshData(); // reload parent list
       handleClose(); // close modal
    } catch (error) {
      toast.error("Save failed:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter activity type name"
            />
          </Form.Group>

          <Form.Group controlId="formDescription" className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>

          <Form.Group className="mt-2">
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
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Classification</Form.Label>
            <Form.Select
              name="require_classification"
              value={formData.require_classification}
              onChange={handleChange}
            >
              <option value="ALL">ALL</option>
              <option value="National Roads only">National Roads only</option>
              <option value="District Roads only">District Roads only</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Check
              type="checkbox"
              label="Mandatory"
              name="mandatory"
              checked={formData.mandatory}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddActivityTypeModal;
