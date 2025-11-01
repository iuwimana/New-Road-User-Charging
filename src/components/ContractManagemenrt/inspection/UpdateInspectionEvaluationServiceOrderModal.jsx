import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { saveInspectionPlanServiceorder } from "../../../services/ContractManagement/ContractSetting/inspectionplanServiceOrderServices";

const UpdateInspectionPlanModal = ({ isOpen, toggle, plan, refresh, contractId }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (plan) {
      setFormData({
        ...plan,
        // inject contractId because plan JSON doesn’t include it
        contractid: contractId,
        // format date for <input type="date">
        inspectiondate: plan.inspectiondate
          ? new Date(plan.inspectiondate).toISOString().split("T")[0]
          : ""
      });
    }
  }, [plan, contractId]);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveInspectionPlanServiceorder(
      formData

      
    );
    refresh();
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Inspection Plans for service order {formData.contractid }</ModalHeader>
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
            <Input type="date" name="inspectiondate" value={formData.inspectiondate } onChange={handleChange} />
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
