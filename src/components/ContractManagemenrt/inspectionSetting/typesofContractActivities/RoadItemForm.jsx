import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import roadItemService from '../../../services/RevenuRessources/roaditemServices';

function RoadItemForm({ roadItem, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    RoadItemID: roadItem?.roaditemid || 0,
    ItemName: roadItem?.itemname || '',
    ItemPrice: roadItem?.itemprice || ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ItemPrice' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.ItemName.trim()) {
      toast.error('Item name is required');
      return;
    }
    if (formData.ItemPrice <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await roadItemService.saveRoadItem(formData);
      if (result) {
        onSuccess(result, formData.RoadItemID > 0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save road item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Item Name</label>
        <input
          type="text"
          className="form-control"
          name="ItemName"
          value={formData.ItemName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Item Price</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          className="form-control"
          name="ItemPrice"
          value={formData.ItemPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Processing...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

export default RoadItemForm;