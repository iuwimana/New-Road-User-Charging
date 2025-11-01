import React, { useState, useEffect } from 'react';
import declarationService from '../../../../services/RevenuRessources/declarationServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import * as InsuranceService from '../../../../services/RevenuRessources/InsuranceServices';
import { toast } from 'react-toastify';
import DeclarationForm from './paymentClaimForm';
import Pagination from '../../../common/pagination';
import Modal from '../../../common/ModalDesign';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const DeclarationTable = () => {
  const [declarations, setDeclarations] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fiscalyearID, setfiscalyearID] = useState(null);
  const [fiscalyear, setfiscalyear] = useState('');
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeclaration, setCurrentDeclaration] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fiscalResponse, insurancesResponse] = await Promise.all([
          FiscalYear.getFiscalyears(),
          InsuranceService.getAllInsurances()
        ]);

        if (!fiscalResponse?.data?.length) {
          toast.error('No fiscal years found');
          return;
        }

        setInsurances(insurancesResponse.data || []);
        const firstFiscalId = fiscalResponse.data[0].fiscalyearid;
        setfiscalyearID(firstFiscalId);
        setfiscalyear(fiscalResponse.data[0].fiscalyear);

        const declarationsData = await declarationService.getAllDeclarationpaymentbyfiscalyears(firstFiscalId);
        setDeclarations(declarationsData || []);
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = declarations.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.reablefirstname?.toLowerCase().includes(searchLower) ||
      item.reablemiddlename?.toLowerCase().includes(searchLower) ||
      item.reablelastname?.toLowerCase().includes(searchLower) ||
      item.reableplatenumber?.toLowerCase().includes(searchLower) ||
      item.roadname?.toLowerCase().includes(searchLower) ||
      item.companyname?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddNew = () => {
    setCurrentDeclaration(null);
    setIsModalOpen(true);
  };

  const handleEdit = (declaration) => {
    toast.info(`payed success full`)
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this declaration?')) {
      try {
        await declarationService.deleteDeclaration(id);
        setDeclarations(declarations.filter(item => item.DeclarationID !== id));
        toast.success('Declaration deleted successfully');
      } catch (error) {
        toast.error('Failed to delete declaration');
      }
    }
  };

  const handleSuccess = (result, isUpdate) => {
    if (isUpdate) {
      setDeclarations(declarations.map(item => 
        item.DeclarationID === result.DeclarationID ? result : item
      ));
    } else {
      setDeclarations([result, ...declarations]);
    }
    setIsModalOpen(false);
    toast.success(`Declaration ${isUpdate ? 'updated' : 'created'} successfully`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2> Claimed payment from Accident compensation in {fiscalyear}</h2>
          
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search declarations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Plate Number</th>
                  <th>Accident Date</th>
                  <th>Road</th>
                  <th>Coordinates</th>
                  <th>Insurance Company</th>
                  <th>Total Payed</th>
                  <th>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.declarationid}>
                    
                    <td>{item.reablefirstname}</td>
                    <td>{item.reablemiddlename || '-'}</td>
                    <td>{item.reablelastname}</td>
                    <td>{item.reableplatenumber}</td>
                    <td>{new Date(item.accidentdate).toLocaleDateString()}</td>
                    <td>{item.roadname}</td>
                    <td>{item.locationcoordinate || 'N/A'}</td>
                    <td>{item.companyname}</td>
                    <td>{item.totaldamagecost}</td>
                    <td >
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-primary btn-sm-compact"
                        onClick={() => handleEdit(item)}
                      >
                        Pay
                      </button></div></td>
                      
                      
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentDeclaration ? 'Edit Declaration' : 'New Declaration'}
      >
        <DeclarationForm
          declaration={currentDeclaration}
          fiscalyearId={fiscalyearID}
          insurances={insurances}
          onSuccess={handleSuccess}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DeclarationTable;