import React, { useState, useEffect } from 'react';
import declarationService from '../../../../services/RevenuRessources/declarationService';
import { toast } from 'react-toastify';
import DeclarationForm from './declarationForm';
import Pagination from '../../../common/pagination';
import Modal from '../../../common/ModalDesign';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const DeclarationTable = () => {
  const [declarations, setDeclarations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeclaration, setCurrentDeclaration] = useState(null);

  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        const data = await declarationService.getAllDeclarations();
        if (data) setDeclarations(data);
      } catch (error) {
        toast.error('Failed to load declarations');
      } finally {
        setLoading(false);
      }
    };
    fetchDeclarations();
  }, []);

  const filteredItems = declarations.filter(item => {
    const name = item.ItemName || '';
    const price = item.ItemPrice || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.toString().includes(searchTerm)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddNew = () => {
    setCurrentDeclaration(null);
    setIsModalOpen(true);
  };

  const handleEdit = (declaration) => {
    setCurrentDeclaration(declaration);
    setIsModalOpen(true);
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
      setDeclarations([...declarations, result]);
    }
    setIsModalOpen(false);
    toast.success(`Declaration ${isUpdate ? 'updated' : 'created'} successfully`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Declarations</h2>
          <button className="btn btn-primary" onClick={handleAddNew}>
            Add New Declaration
          </button>
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
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Item Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.DeclarationID}>
                    <td>{item.DeclarationID}</td>
                    <td>{item.ItemName}</td>
                    <td>{item.ItemPrice}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.DeclarationID)}
                      >
                        Delete
                      </button>
                    </td>
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
          onSuccess={handleSuccess}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DeclarationTable;