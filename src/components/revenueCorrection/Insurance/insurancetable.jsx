import React, { useState, useEffect } from 'react';
import * as InsuranceService from '../../../services/RevenuRessources/InsuranceServices';
import { toast } from 'react-toastify';
import AddInsuranceModal from './addInsuranceModal';
import UpdateInsuranceModal from './updateInsuranceModal';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const InsuranceTable = () => {
  const [insurances, setInsurances] = useState([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const fetchInsurances = async () => {
    try {
      const response = await InsuranceService.getAllInsurances();
      if (response && response.data) {
        setInsurances(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch insurance records.');
    }
  };

  useEffect(() => {
    fetchInsurances();
  }, []);

  const filtered = insurances.filter((i) => {
    const company = i.companyname?.toLowerCase() || '';
    const policy = i.policynumber?.toLowerCase() || '';
    const searchTerm = search.toLowerCase();
    return company.includes(searchTerm) || policy.includes(searchTerm);
  });

  const handleAdd = () => {
    setSelectedInsurance(null);
    setShowAddModal(true);
  };

  const handleUpdate = (insurance) => {
    setSelectedInsurance(insurance);
    setShowUpdateModal(true);
  };

  const handleDelete = async (insuranceid) => {
    if (!window.confirm('Are you sure you want to delete this insurance?')) return;
    

    try {
      await InsuranceService.deleteInsurance(insuranceid);
      toast.success('Insurance deleted successfully!');
      fetchInsurances();
    } catch (error) {
      toast.error('Failed to delete insurance.');
    }
  };

  const handleSuccess = (isUpdate = false) => {
    toast.success(isUpdate ? 'Insurance updated successfully!' : 'Insurance added successfully!');
    setShowAddModal(false);
    setShowUpdateModal(false);
    fetchInsurances();
  };

  return (
    <div className="p-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h3>Insurance Company Management</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus-circle me-1"></i> Add New Insurance
        </button>
      </header>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by company name or policy number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead className="table-light text-center">
          <tr>
            <th>Company Name</th>
            <th>Policy Number</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((i) => (
              <tr key={i.insuranceid}>
                <td>{i.companyname}</td>
                <td>{i.policynumber}</td>
                <td>{i.startdate?.split('T')[0]}</td>
                <td>{i.enddate?.split('T')[0]}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" size="sm">
                      Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleUpdate(i)}>Update</Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => handleDelete(i.insuranceid)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No insurance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddModal && (
        <AddInsuranceModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showUpdateModal && (
        <UpdateInsuranceModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          insurance={selectedInsurance}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default InsuranceTable;
