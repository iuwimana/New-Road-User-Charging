import React, { useState, useEffect } from "react";

import { getAllPaymentSettings, deletePaymentSetting, savePaymentSetting, getInstallmentsBySettingId } from '../../../../services/ContractManagement/ContractSetting/contractpaymentService';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addInspectionPlan } from "../../../../services/ContractManagement/ContractSetting/inspectionplanServices";
import { toast } from "react-toastify";

const AddPaymentSettingModal = ({ isOpen, toggle, refresh, contractType }) => {
  const [form, setForm] = useState({
    contract_id: 0,
    service_order_id: 0,
    source_type: "contract",
    tax_type: "inclusive",
    has_advance_payment: false,
    advance_payment_percent: 0,
    number_of_installments: 0,
  });

  // Whenever the modal opens, pre-fill contract_id and source_type
  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        contract_id: contractType || "",
        source_type: "contract",
      }));
    }
  }, [isOpen, contractType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    const id = 0; // for new records
    {/**
       id: settingData.id || 0,
      contract_id: settingData.contract_id,
      service_order_id: settingData.service_order_id,
      source_type: settingData.source_type,
      tax_type: settingData.tax_type,
      has_advance_payment: settingData.has_advance_payment,
      advance_payment_percent: settingData.advance_payment_percent,
      number_of_installments: settingData.number_of_installments,
      
      */}
    
    const res = await savePaymentSetting(    
      form
    );
    
    //toast.success(`.....${id} ..${form.contract_id}..${form.service_order_id}..${form.source_type}..${form.tax_type}..${form.has_advance_payment}..${form.advance_payment_percent}..${form.number_of_installments}`)
    // Assuming your API returns { success: true, message: "..." } or similar
   
      toast.success(res.message || "Payment setting saved successfully");
      
    
    refresh(); // reload the table or parent data
    toggle();  // close the modal
  } catch (err) {
    // Network or unexpected errors
    console.error(err);
    toast.error(
      err.response?.data?.message ||
      err.message ||
      "An unexpected error occurred. Please try again."
    );
  }
};


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Payment Setting</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            {/**<Label>Contract</Label>*/}
            <Input
              name="contract_id"
              value={form.contract_id}
              onChange={handleChange}
              hidden
            />
          </FormGroup>

          

          <FormGroup>
            <Label>Source Type</Label>
            <Input
              name="source_type"
              value={form.source_type}
              onChange={handleChange}
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Label>Tax Type</Label>
            <Input
              type="select"
              name="tax_type"
              value={form.tax_type}
              onChange={handleChange}
            >
              <option value="inclusive">Inclusive</option>
              <option value="exclusive">Exclusive</option>
            </Input>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="has_advance_payment"
                checked={form.has_advance_payment}
                onChange={handleChange}
              />
              Has Advance Payment?
            </Label>
          </FormGroup>

          <FormGroup>
            <Label>Advance Payment %</Label>
            <Input
              type="number"
              name="advance_payment_percent"
              value={form.advance_payment_percent}
              onChange={handleChange}
              disabled={!form.has_advance_payment}
            />
          </FormGroup>

          <FormGroup>
            <Label>Number of Installments</Label>
            <Input
              type="number"
              name="number_of_installments"
              value={form.number_of_installments}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPaymentSettingModal;
