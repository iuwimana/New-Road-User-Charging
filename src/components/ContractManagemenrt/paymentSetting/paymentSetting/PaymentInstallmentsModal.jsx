import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";

import {
  getInstallmentsBySettingId,
  addInstallment,
} from "../../../../services/ContractManagement/ContractSetting/contractpaymentService";

const PaymentInstallmentsModal = ({ isOpen, toggle, setting }) => {
  const [installments, setInstallments] = useState([]);
  const [form, setForm] = useState({
    installment_number: "",
    percent_amount: "",
    due_days: "",
  });

  const fetchInstallments = async () => {
    try {
      const res = await getInstallmentsBySettingId(setting.id);
      setInstallments(res || []);
      
    } catch (err) {
      toast.error("Failed to fetch installments");
      setInstallments([]);
    }
  };

  useEffect(() => {
    if (setting?.id) {
      fetchInstallments();
    }
  }, [setting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInstallment({
        ...form,
        payment_setting_id: setting.id,
        paymenttype: "normal payment", // default enforced
      });
      toast.success("Installment added successfully");
      setForm({
        installment_number: "",
        percent_amount: "",
        due_days: "",
      });
      fetchInstallments();
    } catch (err) {
      toast.error("Failed to add installment");
    }
  };

  return (
    <Modal show={isOpen} onHide={toggle} size="lg">
      <ModalHeader closeButton>
        Payment Installments – {setting?.contract_refnumber}
      </ModalHeader>
      <ModalBody>
        {/* 🔹 Card Form */}
        <div className="card mb-4">
          <div className="card-body">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <FormGroup className="col-md-4">
                  <FormLabel>Installment #</FormLabel>
                  <FormControl
                    type="number"
                    name="installment_number"
                    value={form.installment_number}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="col-md-4">
                  <FormLabel>Percent Amount (%)</FormLabel>
                  <FormControl
                    type="number"
                    name="percent_amount"
                    value={form.percent_amount}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="col-md-4">
                  <FormLabel>Due Days</FormLabel>
                  <FormControl
                    type="number"
                    name="due_days"
                    value={form.due_days}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <Button type="submit" variant="primary" className="mt-3">
                + Add Installment
              </Button>
            </Form>
          </div>
        </div>

        {/* 🔹 Table of Existing Installments */}
        <Table bordered hover responsive className="table-light">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Installment Number #</th>
              <th>Percent Amount</th>
              <th>Remaining Amount</th>
              <th>Due Days</th>
              <th>Type of payment</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {installments.length > 0 ? (
              installments.map((i, idx) => (
                <tr key={i.id}>
                  <td>{idx + 1}</td>
                  <td>{i.installment_number}</td>
                  <td>{i.percent_amount}%</td>
                  <td>{i.remainamount}</td>
                  <td>{i.due_days}</td>
                  <td>{i.typeofpayment}</td>
                  <td>{new Date(i.created_at).toLocaleDateString()} </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No installments found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentInstallmentsModal;
