import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import declarationService from '../../../../services/RevenuRessources/declarationServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import * as InsuranceService from '../../../../services/RevenuRessources/InsuranceServices';
import * as RoadService from '../../../../services/ContractManagement/RoadRefference/road';
import * as RevenuProduct from '../../../../services/RevenuRessources/productServices';

const DeclarationForm = ({ declaration, onSuccess, onClose, fiscalyearId }) => {
  const splitDriverName = (driverName) => {
    if (!driverName) return ['', '', ''];
    const parts = driverName.trim().split(' ');
    return [
      parts[0] || '',
      parts.length > 2 ? parts.slice(1, -1).join(' ') : '',
      parts.length > 1 ? parts[parts.length - 1] : ''
    ];
  };

  const [formData, setFormData] = useState({
    DeclarationID: declaration?.declarationid || 0,
    AccidentRoad: declaration?.roadid || '',
    firstname: declaration?.firstname || splitDriverName(declaration?.drivername)[0],
    middlename: declaration?.middlename || splitDriverName(declaration?.drivername)[1],
    lastname: declaration?.lastname || splitDriverName(declaration?.drivername)[2],
    platenumber: declaration?.platenumber || '',
    AccidentDate: declaration?.accidentdate?.split('T')[0] || '',
    LocationCoordinate: declaration?.location || '',
    FiscalYearID: declaration?.fiscalyearid || fiscalyearId || '',
    UseInsurance: declaration?.useinsurance || false,
    InsuranceID: declaration?.insuranceid || 1,
    RevenueProductID: declaration?.revenueproductid || '' // NEW FIELD
  });

  const [submitting, setSubmitting] = useState(false);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [roadOptions, setRoadOptions] = useState([]);
  const [fiscalYears, setFiscalYears] = useState([]);
  const [revenueProducts, setRevenueProducts] = useState([]); // NEW STATE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fiscalResponse, insurancesResponse, roadResponse, revenueResponse] = await Promise.all([
          FiscalYear.getFiscalyears(),
          InsuranceService.getAllInsurances(),
          RoadService.getroads(),
          RevenuProduct.getrevenuproducts() // fetch revenue products
        ]);

        setInsuranceOptions(insurancesResponse.data || []);
        setRoadOptions(roadResponse.data || []);
        setFiscalYears(fiscalResponse.data || []);
        setRevenueProducts(revenueResponse?.data || []); // set revenue products
      } catch (error) {
        toast.error('Failed to load required data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'firstname',
      'lastname',
      'platenumber',
      'AccidentDate',
      'AccidentRoad',
      'FiscalYearID',
      'RevenueProductID' // new required field
    ];

    if (requiredFields.some((field) => !formData[field])) {
      toast.error('Please fill all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        AccidentDate: new Date(formData.AccidentDate).toISOString(),
        FiscalYearID: parseInt(formData.FiscalYearID),
        InsuranceID: parseInt(formData.InsuranceID),
        AccidentRoad: parseInt(formData.AccidentRoad),
        RevenueProductID: parseInt(formData.RevenueProductID) // send as integer
      };

      const result = await declarationService.saveDeclaration(payload);

      if (typeof onSuccess === "function") {
        onSuccess(result, formData.DeclarationID > 0);
      } else {
        toast.success("Declaration saved successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save declaration' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-declaration-modal">
      <div className="row g-3">
        {/* Driver Names */}
        <div className="col-md-4">
          <label className="form-label">First Name*</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Middle Name</label>
          <input
            type="text"
            className="form-control"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Plate Number & Accident Date */}
        <div className="col-md-6">
          <label className="form-label">Plate Number*</label>
          <input
            type="text"
            className="form-control"
            name="platenumber"
            value={formData.platenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Accident Date*</label>
          <input
            type="date"
            className="form-control"
            name="AccidentDate"
            value={formData.AccidentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Road */}
        <div className="col-md-6">
          <label className="form-label">Road*</label>
          <select
            className="form-select"
            name="AccidentRoad"
            value={formData.AccidentRoad}
            onChange={handleChange}
            required
          >
            <option value="">Select Road</option>
            {roadOptions.map((road) => (
              <option key={road.roodid} value={road.roodid}>
                {road.roodname}
              </option>
            ))}
          </select>
        </div>

        {/* Coordinates */}
        <div className="col-md-6">
          <label className="form-label">Coordinates</label>
          <input
            type="text"
            className="form-control"
            name="LocationCoordinate"
            value={formData.LocationCoordinate}
            onChange={handleChange}
            placeholder="Latitude, Longitude"
          />
        </div>

        {/* Revenue Product */}
        <div className="col-md-6">
          <label className="form-label">Revenue Product*</label>
          <select
            className="form-select"
            name="RevenueProductID"
            value={formData.RevenueProductID}
            onChange={handleChange}
            required
          >
            <option value="">Select Revenue Product</option>
            {revenueProducts.map((rp) => (
              <option key={rp.revenueproductid} value={rp.revenueproductid}>
                {rp.revenueproductname}
              </option>
            ))}
          </select>
        </div>

        {/* Insurance */}
        <div className="col-md-6 d-flex align-items-center">
          <label className="form-label me-2">Use Insurance?</label>
          <input
            type="checkbox"
            name="UseInsurance"
            checked={formData.UseInsurance}
            onChange={handleChange}
            className="form-check-input"
          />
        </div>
        {formData.UseInsurance && (
          <div className="col-md-6">
            <label className="form-label">Insurance Company*</label>
            <select
              className="form-select"
              name="InsuranceID"
              value={formData.InsuranceID}
              onChange={handleChange}
            >
              <option value="">Select Insurance</option>
              {insuranceOptions.map((i) => (
                <option key={i.insuranceid} value={i.insuranceid}>
                  {i.companyname}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Fiscal Year */}
        <div className="col-md-6">
          <label className="form-label">Fiscal Year*</label>
          <select
            className="form-select"
            name="FiscalYearID"
            value={formData.FiscalYearID}
            onChange={handleChange}
            required
          >
            <option value="">Select Fiscal Year</option>
            {fiscalYears.map((fy) => (
              <option key={fy.fiscalyearid} value={fy.fiscalyearid}>
                {fy.fiscalyear}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting
            ? 'Saving...'
            : formData.DeclarationID
            ? 'Update'
            : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default DeclarationForm;
