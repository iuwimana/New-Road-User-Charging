import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import * as BankStatement from "../../../services/RevenuRessources/Bankstatementservice";

const ViewUnReconcilledModal = ({ isOpen, toggle, statement }) => {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortColumn, setSortColumn] = useState({ path: "revenueproductname", order: "asc" });

  // --- Fetch archived statements by advice ---
  useEffect(() => {
  if (!statement?.advice) return;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await BankStatement.getarchivebankstatementbyadvice(statement.advice);
      // Make sure you check the correct property
      const data = response?.data || response; // depending on your service

      if (!data || data.length === 0) {
        toast.info("No archived statements found.");
        setSources([]);
      } else {
        setSources(data);
      }
    } catch (error) {
      toast.error("Error fetching archived statements: " + error);
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [statement?.advice]);

  // --- Filter, sort, paginate ---
  const getPagedData = () => {
    if (!sources) return { totalCount: 0, data: [] };

    let filtered = sources;
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = sources.filter(
        (m) =>
          m.revenueproductname?.toLowerCase().includes(lowerQuery) ||
          m.advice?.toLowerCase().includes(lowerQuery) ||
          m.name?.toLowerCase().includes(lowerQuery)
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginated = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: paginated };
  };

  const { totalCount, data: paginatedSources } = getPagedData();

  if (!statement) return null; // Safeguard

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Archived payment receipt for {statement.advice || "Unknown Advice"}
      </ModalHeader>

      <ModalBody>
        <p><strong>Product:</strong> {statement.revenueproductname}</p>
        <p><strong>Advice:</strong> {statement.advice}</p>
        <p><strong>Tax Center:</strong> {statement.taxcenter}</p>
        <p><strong>Name:</strong> {statement.name}</p>
        <p><strong>Payment Date:</strong> {statement.paymentdate}</p>
        <p><strong>Amount:</strong> {statement.amount?.toLocaleString()}</p>
        <p><strong>Account Number:</strong> {statement.accountnumber}</p>
        <p><strong>Payment Mode:</strong> {statement.paymentmodename}</p>
        <p><strong>Source of Fund:</strong> {statement.sourceoffundname}</p>
        <p><strong>Bank:</strong> {statement.bankname}</p>

        <hr />
        <h6>Archived Bank Statements</h6>

        

        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-3">
            <Spinner color="primary" />
            <span className="ms-2 text-primary">Loading archived statements...</span>
          </div>
        ) : totalCount === 0 ? (
          <p>No archived statements found.</p>
        ) : (
          <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table table-bordered table-striped table-hover align-middle">
              <thead className="table-secondary">
                <tr>
                  <th>Product</th>
                  <th>Advice</th>
                  <th>Name</th>
                  <th>Payment Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSources.map((item) => (
                  <tr key={item.bankstatementid}>
                    <td>{item.revenueproductname}</td>
                    <td>{item.advice}</td>
                    <td>{item.name}</td>
                    <td>{item.paymentdate}</td>
                    <td>{item.amount?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Simple pagination */}
            {totalCount > pageSize && (
              <div className="d-flex justify-content-between">
                <Button
                  color="secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <span className="align-self-center">
                  Page {currentPage} of {Math.ceil(totalCount / pageSize)}
                </span>
                <Button
                  color="secondary"
                  size="sm"
                  disabled={currentPage >= Math.ceil(totalCount / pageSize)}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewUnReconcilledModal;
