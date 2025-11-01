import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateInspectionPlan } from "../../../services/ContractManagement/ContractSetting/inspectionplanServices";

const UpdateInspectionPlanModal = ({ isOpen, toggle, plan, refresh }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(plan || {});
  }, [plan]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateInspectionPlan(
      formData.inspectionplanid,
      formData.contractid,
      formData.startfrom_location,
      formData.endat_location,
      formData.expectedoutput,
      formData.inspectiondate,
      formData.status
    );
    refresh();
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Inspection Plan</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Start Location</Label>
            <Input name="startfrom_location" value={formData.startfrom_location || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>End Location</Label>
            <Input name="endat_location" value={formData.endat_location || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Expected Output</Label>
            <Input type="textarea" name="expectedoutput" value={formData.expectedoutput || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input type="date" name="inspectiondate" value={formData.inspectiondate || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input type="select" name="status" value={formData.status || "planned"} onChange={handleChange}>
              <option value="planned">Planned</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Update</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateInspectionPlanModal;
