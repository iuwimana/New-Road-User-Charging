import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import * as Revcor from '../../../services/RevenuRessources/revenuCorrectionService';
import './collection.css';

const RevenueCorrectionDetailsModal = ({ isOpen, toggle, summaryId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchDetails() {
      if (!summaryId || !isOpen) return; // Added isOpen check
      
      try {
        setLoading(true);
        const response = await Revcor.getrevenucorrectionDetails(summaryId);
        
        // Check if response exists and has data property
        if (response && response.data) {
          setRecords(response.data || []);
        } else {
          // Handle case where response structure is different
          console.log('Response structure:', response);
          setRecords(response || []);
          toast.warning('Unexpected response format from server');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
        toast.error(`Failed to load details: ${error.message || 'Unknown error occurred'}`);
        setRecords([]); // Reset records on error
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchDetails();
    }
  }, [summaryId, isOpen]); // Added isOpen dependency

  // Filter records by search query
  const filteredRecords = records.filter((r) =>
    Object.values(r).some((val) =>
      val ? val.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" className="custom-fullscreen-modal">
      <ModalHeader toggle={toggle} className="bg-primary text-white">
        Revenue Correction Details {summaryId && `- ID: ${summaryId}`}
      </ModalHeader>

      <ModalBody>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2">Loading details...</p>
          </div>
        ) : records.length === 0 ? (
          <p className="text-center my-4">No details found for this summary.</p>
        ) : (
          <>
            {/* Search Box */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Search in details..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-6 text-end">
                <small className="text-muted">
                  Showing {filteredRecords.length} of {records.length} records
                </small>
              </div>
            </div>

            <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <table className="table table-bordered table-striped align-middle mb-0">
                <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                  <tr>
                    <th>Doc ID</th>
                    <th>Revenue Product</th>
                    <th>Deposit</th>
                    <th>PO Ref</th>
                    <th>Ref Number</th>
                    <th>Transaction Details</th>
                    <th>Correction Date</th>
                    <th>Payment Mode</th>
                    <th>Source of Fund</th>
                    <th>Bank Name</th>
                    <th>Account Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r, index) => (
                    <tr key={r.revenuecorrectionid || index}>
                      <td>{r.docid || '-'}</td>
                      <td>{r.revenueproductname || '-'}</td>
                      <td>{r.deposit ? new Intl.NumberFormat().format(r.deposit) : '0'}</td>
                      <td>{r.poref || '-'}</td>
                      <td>{r.refnumber || '-'}</td>
                      <td>{r.transactiondetails || '-'}</td>
                      <td>{r.correctiondate ? new Date(r.correctiondate).toLocaleDateString() : '-'}</td>
                      <td>{r.paymentmodename || '-'}</td>
                      <td>{r.sourceoffundname || '-'}</td>
                      <td>{r.bankname || '-'}</td>
                      <td>{r.accountnumber || '-'}</td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && searchQuery && (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No records match your search "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RevenueCorrectionDetailsModal;