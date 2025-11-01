import React, { useState, useEffect } from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addInspectionPlan } from "../../../../services/ContractManagement/ContractSetting/inspectionplanServices";

const AddInspectionPlanModal = ({ isOpen, toggle, refresh,contractId }) => {
  const [formData, setFormData] = useState({
    inspectionplanid:0,
    contractid: contractId || 0,   // initialize from props
    startfrom_location: "",
    endat_location: "",
    expectedoutput: "",
    inspectiondate: "",
    status:"planned"
  });

  // If contractId changes dynamically, update formData
  useEffect(() => {
    setFormData(prev => ({ ...prev, contractId }));
  }, [contractId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInspectionPlan(
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
      <ModalHeader toggle={toggle}>Add Inspection Plans</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
           {/** <Label>Contract ID</Label> */}
            <Input type="hidden" name="contractId" value={formData.contractId} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Start Location</Label>
            <Input name="startfrom_location" value={formData.startfrom_location} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>End Location</Label>
            <Input name="endat_location" value={formData.endat_location} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Expected Output</Label>
            <Input type="textarea" name="expectedoutput" value={formData.expectedoutput} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input type="date" name="inspectiondate" value={formData.inspectiondate} onChange={handleChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddInspectionPlanModal;
