import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import declarationService from '../../../../services/RevenuRessources/declarationServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import * as InsuranceService from '../../../../services/RevenuRessources/InsuranceServices';
import * as RoadService from '../../../../services/ContractManagement/RoadRefference/road';

const DeclarationForm = ({ declaration, onSuccess, onClose, fiscalyearId, insurances }) => {
  const [formData, setFormData] = useState({
    DeclarationID: declaration?.declarationid || 0,
  firstname: declaration?.reablefirstname || '',
    middlename: declaration?.reablemiddlename || '',
    lastname: declaration?.reablelastname || '',
    platenumber: declaration?.reableplatenumber || '',
    AccidentDate: declaration?.accidentdate?.split('T')[0] || '',
    AccidentRoad: declaration?.accidentroad || '',
    LocationCoordinate: declaration?.locationcoordinate || '',
    FiscalYearID: declaration?.fiscalyearid || fiscalyearId || '',
    InsuranceID: declaration?.insuranceid || 1
  });

  const [submitting, setSubmitting] = useState(false);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [roadOptions, setRoadOptions] = useState([]);
  const [fiscalYears, setFiscalYears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fiscalResponse, insurancesResponse, roadResponse] = await Promise.all([
          FiscalYear.getFiscalyears(),
          InsuranceService.getAllInsurances(),
          RoadService.getroads()
        ]);

        setInsuranceOptions(insurancesResponse.data || []);
        setRoadOptions(roadResponse.data || []);
        setFiscalYears(fiscalResponse.data || []);

        if (!fiscalResponse.data?.length) {
          toast.error('No fiscal years found');
          return;
        }

      } catch (error) {
        toast.error('Failed to load required data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (declaration) {
      setFormData({
        DeclarationID: declaration.declarationid,
        firstname: declaration.firstname,
        middlename: declaration.middlename,
        lastname: declaration.lastname,
        platenumber: declaration.platenumber,
        AccidentDate: declaration.accidentdate.split('T')[0],
        AccidentRoad: declaration.accidentroad,
        LocationCoordinate: declaration.locationcoordinate,
        FiscalYearID: declaration.fiscalyearid,
        InsuranceID: declaration.insuranceid
      });
    }
  }, [declaration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      'InsuranceID'
    ];
    
    if (requiredFields.some(field => !formData[field])) {
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
        AccidentRoad: parseInt(formData.AccidentRoad)
      };

      const result = await declarationService.saveDeclaration(payload);
      onSuccess(result, formData.DeclarationID > 0);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save declaration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
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
            {roadOptions.map(road => (
              <option key={road.roodid} value={road.roodid}>
                {road.roodname}
              </option>
            ))}
          </select>
        </div>

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

        <div className="col-md-6">
          <label className="form-label">Insurance Company*</label>
          <select
            className="form-select"
            name="InsuranceID"
            value={formData.InsuranceID}
            onChange={handleChange}
            required
          >
            <option value="">Select Insurance</option>
            {insuranceOptions.map(insurance => (
              <option key={insurance.insuranceid} value={insurance.insuranceid}>
                {insurance.companyname}
              </option>
            ))}
          </select>
        </div>

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
            {fiscalYears.map(fy => (
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
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : (formData.DeclarationID ? 'Update' : 'Save')}
        </button>
      </div>
    </form>
  );
};

export default DeclarationForm;