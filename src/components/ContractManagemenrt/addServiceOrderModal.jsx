import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import * as ServiceOrderService from '../../services/ContractManagement/ContractSetting/serviceOrdersServices';
import * as ContractService from '../../services/ContractManagement/ContractSetting/contractservice'; // service to fetch contracts

const AddServiceOrderModal = ({ isOpen, toggle, refresh, contractType }) => {
  const [formData, setFormData] = useState({
    serviceorderid: 0,
    contractid: contractType || '',   // 👈 initialize with passed contractType
    description: '',
    expectedoutput: '',
    startdate: '',
    enddate: '',
    plannedbudget: 0,
    actualcost: 0,
    progresspercent: 0,
    status: 'Planned',
    remarks: '',
  });

  useEffect(() => {
    if (contractType) {
      setFormData((prev) => ({ ...prev, contractid: contractType }));
    }
  }, [contractType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ServiceOrderService.saveServiceOrder(formData);
      toast.success('Service order added successfully');
      toggle();
      refresh();
    } catch (error) {
      toast.error('Failed to add service order');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add Service Order</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          {/* Contract field as read-only textbox */}
          <FormGroup>
            <Label>Contract</Label>
            <Input
              type="text"
              name="contractid"
              value={formData.contractid}
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input type="text" name="description" value={formData.description} onChange={handleChange} required />
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
            <Label>Remarks</Label>
            <Input type="textarea" name="remarks" value={formData.remarks} onChange={handleChange} />
          </FormGroup>

          <Button type="submit" color="primary">Save</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};
export default AddServiceOrderModal;
