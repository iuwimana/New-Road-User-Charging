import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as InsuranceService from '../../../services/RevenuRessources/InsuranceServices';

const InsuranceForm = ({ insurance, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    insuranceid: insurance?.insuranceid || 0,
    companyname: insurance?.companyname || '',
    policynumber: insurance?.policynumber || '',
    startdate: insurance?.startdate?.split('T')[0] || '',
    enddate: insurance?.enddate?.split('T')[0] || '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { companyname, policynumber, startdate, enddate } = formData;

    if (!companyname || !policynumber || !startdate || !enddate) {
      toast.error('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await InsuranceService.saveInsurance(formData);
      onSuccess(formData.insuranceid > 0); // true = update, false = add
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save insurance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Company Name*</label>
          <input
            type="text"
            className="form-control"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Policy Number*</label>
          <input
            type="text"
            className="form-control"
            name="policynumber"
            value={formData.policynumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date*</label>
          <input
            type="date"
            className="form-control"
            name="startdate"
            value={formData.startdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date*</label>
          <input
            type="date"
            className="form-control"
            name="enddate"
            value={formData.enddate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : formData.insuranceid ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default InsuranceForm;
