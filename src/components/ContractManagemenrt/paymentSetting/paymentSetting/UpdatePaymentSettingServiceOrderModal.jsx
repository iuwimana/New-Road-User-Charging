import React, { useState, useEffect } from "react";
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
import { savePaymentSetting } from "../../../../services/ContractManagement/ContractSetting/contractpaymentService";
import { toast } from "react-toastify";

const UpdatePaymentSettingServiceOrderModal = ({ 
  isOpen, 
  toggle, 
  refresh, 
  selectedSetting 
}) => {
  const [form, setForm] = useState({
    id: 0,
    contract_id: 0,
    service_order_id: 0,
    source_type: "service_order",
    tax_type: "inclusive",
    has_advance_payment: false,
    advance_payment_percent: 0,
    number_of_installments: 0,
  });

  // When modal opens, load the selected setting into form
  useEffect(() => {
    if (isOpen && selectedSetting) {
      setForm({
        id: selectedSetting.id,
        contract_id: selectedSetting.contract_id || 0,
        service_order_id: selectedSetting.service_order_id || 0,
        source_type: selectedSetting.source_type || "service_order",
        tax_type: selectedSetting.tax_type || "inclusive",
        has_advance_payment: selectedSetting.has_advance_payment || false,
        advance_payment_percent: selectedSetting.advance_payment_percent || 0,
        number_of_installments: selectedSetting.number_of_installments || 0,
      });
    }
  }, [isOpen, selectedSetting]);

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

      const res = await savePaymentSetting(form);

      toast.success(res.message || "Payment setting updated successfully");

      refresh(); // reload table
      toggle();  // close modal
    } catch (err) {
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
      <ModalHeader toggle={toggle}>Update Payment Setting</ModalHeader>
      <ModalBody>
        <Form>
          <Input type="hidden" name="id" value={form.id} />

          <FormGroup>
            <Label>Source Type</Label>
            <Input
              name="source_type"
              value={form.source_type}
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
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdatePaymentSettingServiceOrderModal;
