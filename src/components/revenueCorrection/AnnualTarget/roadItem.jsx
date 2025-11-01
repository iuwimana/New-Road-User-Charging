import React, { useState, useEffect } from 'react';
import roadItemService from '../../../services/RevenuRessources/roaditemServices';

import { toast } from 'react-toastify';
import RoadItemForm from './RoadItemForm';
import Pagination from '../../common/pagination';
import Modal from './RoadItemModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './modal.css';

const RoadItemTable = () => {
  const [roadItems, setRoadItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch road items
  useEffect(() => {
    const fetchRoadItems = async () => {
      try {
        const data = await roadItemService.getAllRoadItems();
        if (data) {
          setRoadItems(data);
          //toast.info(`${JSON.stringify(data)}`)
        }
      } catch (error) {
        toast.error('Failed to load road items');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoadItems();
  }, []);

  // Filter items based on search term
  // In your RoadItemTable component, update the filteredItems calculation:
  //[{"roaditemid":2,"itemname":"Asphalt Patch (1 sqm)","itemprice":"87.50"},{"roaditemid":4,"itemname":"Asphalt Patch (1 sqm)","itemprice":"87.50"},{"roaditemid":6,"itemname":"Asphalt Patch (1 sqm)","itemprice":"87.00"},{"roaditemid":3,"itemname":"Asphalt Patch (1 sqm)","itemprice":"87.00"},{"roaditemid":1,"itemname":"route light ","itemprice":"87.50"},{"roaditemid":7,"itemname":"trafic right","itemprice":"78245960.00"}]
const filteredItems = roadItems.filter(item => {
    // Safely handle possible undefined/null values
    const name = item.itemname || '';
    const price = item.itemprice || '';
    
    return (
      name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.toString().includes(searchTerm)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddNew = () => {
    setCurrentItem(null); // Null means we're creating new
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await roadItemService.deleteRoadItem(id);
        setRoadItems(roadItems.filter(item => item.RoadItemID !== id));
        toast.success('Road item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete road item');
      }
    }
  };

  const handleSuccess = (result, isUpdate) => {
    if (isUpdate) {
      setRoadItems(roadItems.map(item => 
        item.RoadItemID === result.RoadItemID ? result : item
      ));
    } else {
      setRoadItems([...roadItems, result]);
    }
    setIsModalOpen(false);
    toast.success(`Road item ${isUpdate ? 'updated' : 'created'} successfully`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Road Items</h2>
          <div>
             <button 
              className="btn btn-primary"
              onClick={handleAddNew}
            >
              Add New 
            </button>
             
            
          </div>
        </div>
        <div className="card-body">
          {/* Search Box */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or price..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Road Items Table */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(item => (
                    <tr key={item.roaditemid}>
                      <td>{item.roaditemid}</td>
                      <td>{item.itemname}</td>
                      <td>{item.itemprice}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(item)}
                        >Edit</button>

                            </td>
                            <td>
                          
                        
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item.roaditemid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No road items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentItem ? 'Edit Road Item' : 'Add New Road Item'}

      >
        <RoadItemForm
          roadItem={currentItem}
          onSuccess={(result) => handleSuccess(result, !!currentItem)}
        />
      </Modal>
    </div>
  );
};

export default RoadItemTable;