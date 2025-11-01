import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import * as BankStatement from '../../../services/RevenuRessources/Bankstatementservice';
import './collection.css'
const DiscrepancyModal = ({ isOpen, toggle, duplicateGroupId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const { data } = await BankStatement.getDiscrepancydetail(duplicateGroupId);
        //console.log(`...${JSON.stringify(data)}`);
        setRecords(data || []);
      } catch (error) {
        toast.error('Failed to load discrepancy details: ' + error);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen && duplicateGroupId) {
      fetchDetails();
    }
  }, [isOpen, duplicateGroupId]);

  const handleCheckChange = (recordId, type) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [recordId]: prev[recordId] === type ? null : type,
    }));

    toast.info(
      `${type} selected for ${recordId} ${
        selectedOptions[recordId] === type ? '(unmarked)' : ''
      }`
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      fullscreen // Makes modal fullscreen
      className="custom-fullscreen-modal" // Additional styling for fullscreen
    >
      <ModalHeader toggle={toggle}>
        🧾 Discrepancy Details — Group {duplicateGroupId}
      </ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : records.length === 0 ? (
          <p className="text-center text-muted">No records found.</p>
        ) : (
          <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>Duplication</th>
                  <th>Product</th>
                  <th>Tax Center</th>
                  <th>NFR Advice</th>
                  <th>NFR Name</th>
                  <th>NFR Amount</th>
                  <th>NFR Date</th>
                  <th>Bank Date</th>
                  <th>Bank Advice</th>
                  <th>Bank Name</th>
                  <th>Bank Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, index) => {
                  const recordKey = index;
                  const selected = selectedOptions[recordKey];
                  return (
                    <tr key={index}>
                      <td>{r.duplicate_count}</td>
                      <td>{r.revenueproductname}</td>
                      <td>{r.paymentreceipttaxcenter}</td>
                      <td>{r.advice || '-'}</td>
                      <td>{r.name || '-'}</td>
                      <td>{r.amount || 0}</td>
                      <td>{r.paymentdate}</td>
                      <td>{r.paymentreceiptpaymentdate || '-'}</td>
                      <td>{r.paymentreceiptadvice || '-'}</td>
                      <td>{r.paymentreceiptname || '-'}</td>
                      <td>{r.paymentreceiptamount || 0}</td>
                      <td>
                        <div className="d-flex flex-column align-items-start">
                          {['Duplicate', 'Unpaid On', 'Incompatible'].map((type) => (
                            <label className="form-check mb-1" key={type}>
                              <input
                                type="checkbox"
                                className="form-check-input me-1"
                                checked={selected === type}
                                onChange={() => handleCheckChange(recordKey, type)}
                              />
                              <span className="form-check-label">{`As ${type}`}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DiscrepancyModal;
