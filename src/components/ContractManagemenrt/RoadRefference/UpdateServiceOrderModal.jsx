import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import * as ServiceOrderService from '../../services/ContractManagement/ContractSetting/serviceOrdersServices';

const UpdateServiceOrderModal = ({ isOpen, toggle, refresh, selectedOrder }) => {
  const [formData, setFormData] = useState(selectedOrder);
  //toast.success('Service order updated successfully' + JSON.stringify(selectedOrder));
  useEffect(() => {
    setFormData(selectedOrder);
  }, [selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ServiceOrderService.saveServiceOrder(formData);
      toast.success('Service order updated successfully');
      toggle();
      refresh();
    } catch (error) {
      toast.error('Failed to update service order');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Service Order</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Contract ID</Label>
            <Input type="number" name="contractid" value={formData.contractid} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Expected Output</Label>
            <Input type="text" name="expectedoutput" value={formData.expectedoutput} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Start Date</Label>
            <Input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>End Date</Label>
            <Input type="date" name="enddate" value={formData.enddate} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Planned Budget</Label>
            <Input type="number" name="plannedbudget" value={formData.plannedbudget} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Actual Cost</Label>
            <Input type="number" name="actualcost" value={formData.actualcost} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Progress (%)</Label>
            <Input type="number" name="progresspercent" value={formData.progresspercent} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input type="text" name="status" value={formData.status} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Remarks</Label>
            <Input type="textarea" name="remarks" value={formData.remarks} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" color="primary">Update</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateServiceOrderModal;
