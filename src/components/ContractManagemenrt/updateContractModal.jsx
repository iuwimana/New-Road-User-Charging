import React, { Component, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import * as Target from '../../services/RMFPlanning/targetService';
import * as Road from '../../services/ContractManagement/RoadRefference/road';
import * as Maintenance from '../../services/ContractManagement/ContractSetting/maintenanceTypeService';
import * as Measurement from '../../services/ContractManagement/ContractSetting/measurementService';
import * as Contractor from '../../services/ContractManagement/ContractSetting/ContractorService';
import * as Contract from '../../services/ContractManagement/ContractSetting/contractservice';
import { toast } from 'react-toastify';
import * as auth from '../../services/authService';
import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';
import * as FiscalYear from '../../services/RMFPlanning/fiscalYearService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
import { format, parseISO } from 'date-fns';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import './styles.css';

const UpdateProjectModal = ({ show, onClose, projectData, onUpdate }) => {

       const [formData, setFormData] = useState({
  contractid: projectData?.contractid || 0,
  roadid: projectData?.roadid || 0,
  roadname: projectData?.roadname || '',
  maintenancetypeid: projectData?.maintenancetypeid || 0,
  maintenancetypename: projectData?.maintenancetypename || '',
  startDate: projectData?.startdate ? new Date(projectData.startdate) : null,
  endDate: projectData?.enddate ? new Date(projectData.enddate) : null,
  projectlength: projectData?.contractlength || 0,
  measurementid: projectData?.measurementid || 0,
  targetid: projectData?.targetid || 0,
  budget: Number(projectData?.contractbudget) || 0,
  contractorid: projectData?.contractorid || 0,
  description: projectData?.contractdiscription || '',
  contractrefnumber: projectData?.contractrefnumber || '',
  status: projectData?.status || 'Pending',
  

  // evaluation / supervision
//contrac  evaluation_contractorname 
//Output:{maintenance.outputname} with target:{maintenance.targetname}
  company: 0,
  evaluationamount: Number(projectData?.evaluationamount) || 0,
  evaluationstartDate: projectData?.evaluationstartdate ? new Date(projectData.evaluationstartdate) : null,
  evaluationendDate: projectData?.evaluationenddate ? new Date(projectData.evaluationenddate) : null,
  evaluationdescription: projectData?.evaluationdescription || '',
  evaluationrefnumber: projectData?.evaluationrefnumber || '',

  // nested supervision contracts
  supervisionContracts: projectData?.supervisionContracts || [],

  // 🔑 ensure durations default to 1 month (not undefined)
  maintenanceDuration: projectData?.startdate && projectData?.enddate
    ? ((new Date(projectData.enddate).getFullYear() - new Date(projectData.startdate).getFullYear()) * 12 +
       (new Date(projectData.enddate).getMonth() - new Date(projectData.startdate).getMonth()))
    : 1,

  evaluationDuration: projectData?.evaluationstartdate && projectData?.evaluationenddate
    ? ((new Date(projectData.evaluationenddate).getFullYear() - new Date(projectData.evaluationstartdate).getFullYear()) * 12 +
       (new Date(projectData.evaluationenddate).getMonth() - new Date(projectData.evaluationstartdate).getMonth()))
    : 1,
});
useEffect(() => {
  if (projectData) {
    setFormData((prev) => ({
      ...prev,
      company: projectData.evaluation_contractorid || "",
    }));
  }
}, [projectData]);
    {/** 
    const [formData, setFormData] = useState({
  contractid: projectData?.contractid || 0,
  roadid: projectData?.roadid || 0,
  roadname: projectData?.roadname || '',
  maintenancetypeid: projectData?.maintenancetypeid || 0,
  maintenancetypename: projectData?.maintenancetypename || '',
  startDate: projectData?.startdate ? new Date(projectData.startdate) : null,
  endDate: projectData?.enddate ? new Date(projectData.enddate) : null,
  projectlength: projectData?.contractlength || 0,
  measurementid: projectData?.measurementid || 0,
  targetid: projectData?.targetid || 0,
  budget: Number(projectData?.contractbudget) || 0,
  contractorid: projectData?.contractorid || 0,
  description: projectData?.contractdiscription || '',
  status: projectData?.status || 'Pending',

  // evaluation / supervision
//contrac  evaluation_contractorname
  company: projectData?.evaluation_contractid || 0,
  evaluationamount: Number(projectData?.evaluationamount) || 0,
  evaluationstartDate: projectData?.evaluationstartdate ? new Date(projectData.evaluationstartdate) : null,
  evaluationendDate: projectData?.evaluationenddate ? new Date(projectData.evaluationenddate) : null,
  evaluationdescription: projectData?.evaluationdescription || '',

  // nested supervision contracts
  supervisionContracts: projectData?.supervisionContracts || [],

  // 🔑 ensure durations default to 1 month (not undefined)
  maintenanceDuration: projectData?.startdate && projectData?.enddate
    ? ((new Date(projectData.enddate).getFullYear() - new Date(projectData.startdate).getFullYear()) * 12 +
       (new Date(projectData.enddate).getMonth() - new Date(projectData.startdate).getMonth()))
    : 1,

  evaluationDuration: projectData?.evaluationstartdate && projectData?.evaluationenddate
    ? ((new Date(projectData.evaluationenddate).getFullYear() - new Date(projectData.evaluationstartdate).getFullYear()) * 12 +
       (new Date(projectData.evaluationenddate).getMonth() - new Date(projectData.evaluationstartdate).getMonth()))
    : 1,
});
*/}
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [contractors, setContractors] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [roads, setRoads] = useState([]);
    const [targets, setTargets] = useState([]);
    {/** 
    const [currentSupervisionContract, setCurrentSupervisionContract] = useState({
        company: '',
        amount: '',
        startDate: null,
        endDate: null,
        description: '',
        teamMembers: [],
    });*/}
    const [showSupervisionForm, setShowSupervisionForm] = useState(false);
    const [showAddTeamForm, setShowAddTeamForm] = useState(false);

    const [newTeamMember, setNewTeamMember] = useState({
  currentMember: { name: '', role: 'Inspector' },
  teamMembers: Array.isArray(projectData?.evaluationteam)
    ? projectData.evaluationteam.map(member => ({
        id: member.evaluationteamid,
        name: member.fullname,
        role: member.role,
      }))
    : [],
});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: contractors }, { data: measurements }, { data: maintenances }, { data: roads }, { data: targets }] = await Promise.all([
                    Contractor.getcontractors(),
                    Measurement.getmeasurements(),
                    Maintenance.getmaintenances(),
                    Road.getroads(),
                    Target.gettargets(),
                ]);

                setContractors(contractors);
                setMeasurements(measurements);
                setMaintenances(maintenances);
                setRoads(roads);
                setTargets(targets);

                // Preserve existing team members from projectData
                if (projectData.evaluationteam) {
                    setNewTeamMember((prev) => ({
                        ...prev,
                        teamMembers: projectData.evaluationteam.map((member) => ({
                            id: member.evaluationteamid,
                            name: member.fullname,
                            role: member.role,
                        })),
                    }));
                }
                // Calculate initial maintenance duration from projectData
    if (projectData.startdate && projectData.enddate) {
        const startDate = new Date(projectData.startdate);
        const endDate = new Date(projectData.enddate);
        const monthsDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12 
                               + (endDate.getMonth() - startDate.getMonth());
        
        setFormData(prev => ({
            ...prev,
            maintenanceDuration: monthsDifference > 0 ? monthsDifference : 1
        }));
    }

    // Calculate initial evaluation duration from projectData
    if (projectData.evaluationstartdate && projectData.evaluationenddate) {
        const evalStartDate = new Date(projectData.evaluationstartdate);
        const evalEndDate = new Date(projectData.evaluationenddate);
        const evalMonthsDifference = (evalEndDate.getFullYear() - evalStartDate.getFullYear()) * 12 
                                   + (evalEndDate.getMonth() - evalStartDate.getMonth());
        
        setFormData(prev => ({
            ...prev,
            evaluationDuration: evalMonthsDifference > 0 ? evalMonthsDifference : 1
        }));
    }
            } catch (ex) {
                toast.error('Error loading data: ' + ex.message);
            }
        };

        fetchData();
    }, [projectData.evaluationteam]); // Add dependency
    const handleChange = (arg1, arg2) => {
    let name, value;

    // Handle DatePicker changes
    if (arg1 instanceof Date || arg1 === null) {
        name = arg2;
        value = arg1;
    }
    // Handle regular input changes
    else {
        const e = arg1;
        name = e.target.name;
        value = e.target.value;
    }

    // Define numeric fields
    const numericFields = [
        'roadid',
        'maintenancetypeid',
        'measurementid',
        'targetid',
        'contractorid',
        'projectlength',
        'budget',
        'maintenanceDuration',
        'evaluationDuration',
        'evaluationamount',
        'company'
    ];

    // Convert numeric values
    let parsedValue = value;
    if (numericFields.includes(name)) {
        parsedValue = value === '' ? '' : Number(value);
        if (isNaN(parsedValue)) parsedValue = '';
    }

    // Update formData with automatic date calculations
    setFormData(prevFormData => {
        const newFormData = {
            ...prevFormData,
            [name]: parsedValue,
        };

        // Function to calculate end date
        const calculateEndDate = (startField, durationField, endField) => {
            if (newFormData[startField] instanceof Date && 
                typeof newFormData[durationField] === 'number' && 
                newFormData[durationField] > 0) {
                const endDate = new Date(newFormData[startField]);
                endDate.setMonth(endDate.getMonth() + newFormData[durationField]);
                return endDate;
            }
            return null;
        };

        // Handle maintenance dates
        if (name === 'startDate' || name === 'maintenanceDuration') {
            newFormData.endDate = calculateEndDate('startDate', 'maintenanceDuration', 'endDate');
        }

        // Handle evaluation dates
        if (name === 'evaluationstartDate' || name === 'evaluationDuration') {
            newFormData.evaluationendDate = calculateEndDate('evaluationstartDate', 'evaluationDuration', 'evaluationendDate');
        }

        return newFormData;
    });

    // Optional: Toast notifications for debugging
    setTimeout(() => {
        let displayValue;
        const currentValue = formData[name];

        if (currentValue instanceof Date) {
            displayValue = currentValue.toLocaleDateString('en-GB');
        } else if (currentValue === null) {
            displayValue = 'Not set';
        } else {
            displayValue = currentValue;
        }

        let message = `Field updated: ${name} → ${displayValue}`;

        // Add both end dates to toast
        if (formData.endDate) {
            message += `\nMaint. End: ${formData.endDate.toLocaleDateString('en-GB')}`;
        }
        if (formData.evaluationendDate) {
            message += `\nEval. End: ${formData.evaluationendDate.toLocaleDateString('en-GB')}`;
        }
        
        // Uncomment for debugging
        // toast.info(message);
    }, 0);
};

    const handleDateChange = (date, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date,
        }));
    };

    const handleTeamMemberChange = (e) => {
        const { name, value } = e.target;
        setNewTeamMember((prev) => ({
            ...prev,
            currentMember: {
                ...prev.currentMember,
                [name]: value,
            },
        }));
    };

    const handleAddTeamMember = () => {
        if (newTeamMember.currentMember.name.trim() === '') return;

        const member = {
            ...newTeamMember.currentMember,
            id: Date.now(),
        };

        setNewTeamMember((prev) => ({
            currentMember: { name: '.', role: 'Inspector' },
            teamMembers: [...prev.teamMembers, member],
        }));
    };

    const handleRemoveTeamMember = (id) => {
        setNewTeamMember((prev) => ({
            ...prev,
            teamMembers: prev.teamMembers.filter((member) => member.id !== id),
        }));
    };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading state
    setIsSubmitting(true);
    setErrors({});

    try {
        // Validate required fields
        const requiredFields = [
            'roadid', 'maintenancetypeid', 'startDate', 
            'maintenanceDuration', 'projectlength', 'measurementid',
            'targetid', 'budget', 'contractorid'
        ];

        const validationErrors = {};
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field] === 0 || formData[field] === '') {
                validationErrors[field] = 'This field is required';
            }
        });

        // Validate evaluation fields if supervision form is shown
        if (showSupervisionForm) {
            const evaluationRequiredFields = [
                'company', 'evaluationamount', 'evaluationstartDate', 
                'evaluationDuration'
            ];
            
            evaluationRequiredFields.forEach(field => {
                if (!formData[field] || formData[field] === 0 || formData[field] === '') {
                    validationErrors[field] = 'This field is required for supervision contract';
                }
            });
        }

        // Validate dates
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            validationErrors.startDate = 'Start date cannot be after end date';
        }

        if (formData.evaluationstartDate && formData.evaluationendDate && formData.evaluationstartDate > formData.evaluationendDate) {
            validationErrors.evaluationstartDate = 'Evaluation start date cannot be after end date';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            throw new Error(`Please fix the validation errors:.....${JSON.stringify(validationErrors)}`);
        }

        // Validate team members if supervision form is shown
        if (showSupervisionForm && newTeamMember.teamMembers.length === 0) {
            setErrors({ teamMembers: 'At least one team member is required for supervision contract' });
            throw new Error('Please add at least one team member');
        }

        // Prepare the data for submission
        const submissionData = {
            // Main contract data
            contractid: projectData.contractid,
            projectid: formData.contractid,
            roadid: formData.roadid,
            maintenancetypeid: formData.maintenancetypeid,
            startdate: formData.startDate ? formData.startDate.toISOString() : null,
            enddate: formData.endDate ? formData.endDate.toISOString() : null,
            maintenanceDuration: formData.maintenanceDuration,
            projectlength: formData.projectlength,
            measurementid: formData.measurementid,
            targetid: formData.targetid,
            budget: formData.budget,
            contractorid: formData.contractorid,
            description: formData.description,
            status: formData.status,

            // Evaluation/supervision data
            evaluationid: projectData.evaluationid || 0,
            evaluationamount: formData.evaluationamount,
            evaluationDuration: formData.evaluationDuration,
            evaluationdescription: formData.evaluationdescription,
            evaluationstartdate: formData.evaluationstartDate ? formData.evaluationstartDate.toISOString() : null,
            evaluationenddate: formData.evaluationendDate ? formData.evaluationendDate.toISOString() : null,
            company: formData.company,
            evaluationrefnumber: formData.evaluationrefnumber,
            
            // Additional data from original projectData that might be needed
            contractrefnumber: projectData.contractrefnumber,
            fiscalyearid: projectData.fiscalyearid,
            projecttypeid: projectData.projecttypeid,
            projectref: projectData.projectref
        };

        // Prepare team members data
        const teamMembersData = newTeamMember.teamMembers.map(member => ({
            evaluationteamid: member.id, // Use the preserved ID if it exists
            fullname: member.name,
            role: member.role
        }));

        // Call your API service
        const result = await Contract.saveContractWorkflow(
            submissionData,
            teamMembersData
        );
        console.log(`...............submissionData:->${JSON.stringify(submissionData)} and teamMembersData:->${JSON.stringify(teamMembersData)}`)
        // Handle success
        toast.success('Project updated successfully!');
        //toast.info(`...............submissionData:->${JSON.stringify(submissionData)} and teamMembersData:->${JSON.stringify(submissionData)}`)
        // If you need to update parent component
        if (onUpdate) {
            onUpdate(result.data); // Assuming your API returns the updated data
        }
        
        // Close the modal
        onClose();

    } catch (ex) {
        console.error('Submission error:', ex);

        // Enhanced error handling
        if (ex.response) {
            switch (ex.response.status) {
                case 400:
                    toast.error(`Validation error: ${ex.response.data.error || ex.response.data}`);
                    setErrors(prev => ({
                        ...prev,
                        form: ex.response.data.error || 'Invalid form data',
                    }));
                    break;

                case 409:
                    toast.error(`Conflict: ${ex.response.data.error || ex.response.data}`);
                    setErrors(prev => ({
                        ...prev,
                        form: ex.response.data.error || 'Resource already exists',
                    }));
                    break;

                default:
                    toast.error(`Server error: ${ex.response.data?.error || 'Please try again later'}`);
            }
        } else {
            toast.error(`Error: ${ex.message || 'Failed to submit form'}`);
        }
    } finally {
        // Reset loading state
        setIsSubmitting(false);
    }
};

    return (
        <Modal
            isOpen={show}
            toggle={onClose}
            className="custom-centered-modal"
            contentClassName="h-100"
            backdrop="static"
            keyboard={false}
            style={{
                maxWidth: '90%',
                width: '1200px',
                margin: 'auto',
            }}
        >
            <ModalHeader toggle={onClose} className="bg-light border-bottom-0" style={{ padding: '1rem' }}>
                Update Project
            </ModalHeader>
            <form onSubmit={handleSubmit}>
            <ModalBody
                style={{
                    padding: '0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 'calc(100vh - 200px)',
                }}
            >
                <div
                    style={{
                        padding: '20px',
                        flex: '1',
                        overflowY: 'auto',
                    }}
                >
                    
                        {/* Main Contract Form */}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Road to Maintain</label>
                                <select name="roadid" value={formData.roadid} onChange={handleChange} className="form-control" required>
                                    <option value="">Select Road</option>
                                    {roads.map((road) => (
                                        <option key={road.roodid} value={road.roodid}>
                                            {road.roodname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Maintenance Type</label>
                                <select name="maintenancetypeid" value={formData.maintenancetypeid} onChange={handleChange} className="form-control" required>
                                    <option value="">Select Maintenance Type</option>
                                    {maintenances.map((maintenance) => (
                                        <option key={maintenance.maintenancetypeid} value={maintenance.maintenancetypeid}>
                                            {maintenance.maintenancetypename}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contractrefnumber">Contract Ref Number</label>
                                <input
                                    type="text"
                                    id="contractrefnumber"
                                    name="contractrefnumber"
                                    value={formData.contractrefnumber}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter reference number"
                                    required
                                />
                            </div>
                        </div>
                           

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Start Dates</label>
                                <DatePicker selected={formData.startDate} onChange={(date) => handleChange(date, 'startDate')} className="form-control" dateFormat="MM/dd/yyyy" required />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Maintenance Duration (Months)</label>
                                <input
                                    type="number"
                                    name="maintenanceDuration"
                                    value={
                                        (new Date(formData.endDate).getFullYear() - new Date(formData.startDate).getFullYear()) * 12 +
                                        (new Date(formData.endDate).getMonth() - new Date(formData.startDate).getMonth())
                                    }
                                    onChange={handleChange}
                                    className="form-control"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Project Length</label>
                                <input type="number" name="projectlength" value={formData.projectlength} onChange={handleChange} className="form-control" min="0" required />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Measurement Unit</label>
                                <select name="measurementid" value={formData.measurementid} onChange={handleChange} className="form-control" required>
                                    <option value="">Select Unit</option>
                                    {measurements.map((measurement) => (
                                        <option key={measurement.measurementid} value={measurement.measurementid}>
                                            {measurement.measurementname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Target</label>
                                <select name="targetid" value={formData.targetid} onChange={handleChange} className="form-control" required>
                                    <option value="">Select Target</option>
                                    {targets.map((target) => (
                                        <option key={target.targetid} value={target.targetid}>
                                            {target.targetname}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label>Contract Amount (Rwf)</label>
                                <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="form-control" min="0" step="0.01" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Contractor</label>
                            <select name="contractorid" value={formData.contractorid} onChange={handleChange} className="form-control" required>
                                <option value="">Select Contractor</option>
                                {contractors.map((contractor) => (
                                    <option key={contractor.contractorid} value={contractor.contractorid}>
                                        {contractor.contractorname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/** 

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="form-control" required>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        */}

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="3" />
                        </div>

                        {/* Supervision Contracts Section */}
                        <div className="supervision-contracts-section">
                            <h3>Supervision Contracts</h3>

                            {formData.supervisionContracts.length > 0 && (
                                <div className="supervision-contracts-list">
                                    {formData.supervisionContracts.map((contract, index) => (
                                        <div key={index} className="supervision-contract-card">
                                            {/* ... contract card content ... */}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showSupervisionForm && (
                                <div
                                    className="supervision-form"
                                    style={{
                                        padding: '20px',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '5px',
                                        margin: '20px 0',
                                    }}
                                >
                                    <h4>Add Supervision Contract</h4>
                                    <div className="form-group">
                                        <label >Company Name {formData.company}-{projectData.evaluation_contractorid}</label>
                                        <select name="company" value={formData.company} onChange={handleChange} className="form-control" required>
                                            <option value="">Select supervisor contractors</option>
                                            {contractors.map((contractor) => (
                                                <option key={contractor.contractorid} value={contractor.contractorid}>
                                                    {contractor.contractorname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="evaluationrefnumber">Evaluation Ref Number</label>
                                            <input
                                                type="text"
                                                id="evaluationrefnumber"
                                                name="evaluationrefnumber"
                                                value={formData.evaluationrefnumber}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter evaluation ref number"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="amount">Contract Amount (Rwf)</label>
                                        <input
                                            type="number"
                                            id="evaluationamount"
                                            name="evaluationamount"
                                            value={formData.evaluationamount}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            required
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Evaluation startDate</label>
                                            <DatePicker
                                                selected={formData.evaluationstartDate}
                                                onChange={(date) => handleChange(date, 'evaluationstartDate')}
                                                selectsStart
                                                startDate={formData.evaluationstartDate}
                                                endDate={formData.evaluationstartDate}
                                                placeholderText="Pick start date"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Evaluation Duration</label>

                                            <input
                                                type="number"
                                                name="evaluationDuration"
                                                value={
                                                    (new Date(formData.evaluationendDate).getFullYear() - new Date(formData.evaluationstartDate).getFullYear()) * 12 +
                                                    (new Date(formData.evaluationendDate).getMonth() - new Date(formData.evaluationstartDate).getMonth())
                                                }
                                                onChange={handleChange}
                                                className="form-control"
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/** 
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea 
                                            id="evaluationdescription" 
                                            name="evaluationdescription" 
                                            value={formData.evaluationdescription} 
                                            onChange={handleChange} 
                                            rows="3" 
                                            className="form-control"
                                        />
                                    </div>
                                    */}
                                    {/* Team Members Section */}
                                    <div className="team-members-section">
                                        <h5>Team Members</h5>

                                        {/* Display existing team members */}
                                        {newTeamMember.teamMembers.length > 0 && (
                                            <div className="team-members-list" style={{ marginBottom: '15px' }}>
                                                <h6>Existing Team Members:</h6>
                                                {newTeamMember.teamMembers.map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="team-member-item"
                                                        style={{
                                                            padding: '8px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            marginBottom: '5px',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <span>
                                                            {member.name} ({member.role})
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleRemoveTeamMember(member.id)}
                                                            style={{ padding: '2px 8px', fontSize: '12px' }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {showAddTeamForm ? (
                                            <>
                                                <div className="add-team-form" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="name">Member Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={newTeamMember.currentMember.name}
                                                                onChange={handleTeamMemberChange}
                                                                required
                                                                className="form-control"
                                                                placeholder="Enter full name"
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="role">Role</label>
                                                            <select id="role" name="role" value={newTeamMember.currentMember.role} onChange={handleTeamMemberChange} className="form-control">
                                                                <option value="Inspector">Inspector</option>
                                                                <option value="Engineer">Engineer</option>
                                                                <option value="Supervisor">Supervisor</option>
                                                                <option value="Manager">Manager</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={handleAddTeamMember}>
                                                        Add Member
                                                    </button>
                                                    <button type="button" className="btn btn-secondary btn-sm ml-2" onClick={() => setShowAddTeamForm(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowAddTeamForm(true)}>
                                                + Add New Team Member
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {!showSupervisionForm && (
                                <button type="button" className="add-supervision-btn btn btn-outline-primary" onClick={() => setShowSupervisionForm(true)}>
                                    + Add Supervision Contract
                                </button>
                            )}
                        </div>

                        <ModalFooter>
    <Button 
        color="primary" 
        type="submit"
        disabled={isSubmitting}
    >
        {isSubmitting ? (
            <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Saving...
            </>
        ) : (
            'Save Changes'
        )}
    </Button>
    <Button 
        color="secondary" 
        onClick={onClose}
        disabled={isSubmitting}
    >
        Cancel
    </Button>
</ModalFooter>
                    
                </div>
            </ModalBody>
            </form>
        </Modal>
    );
};

export default UpdateProjectModal;

const styles = `
/* Enhanced Table Styles */
/* CSS Variables for consistent theming */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #f8f9fa;
  --accent-color: #4a90e2;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --border-color: #dee2e6;
  --text-color: #333;
  --text-light: #6c757d;
  --hover-bg: #e9ecef;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Base Layout Structure */
.mailbox-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mailbox-layout {
  display: flex;
  flex: 1;
  min-height: 0; /* Crucial for proper flex behavior */
}

/* Sidebar Styles */
.sidebar-panel {
  width: 250px;
  background-color: var(--secondary-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1rem;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem;
  min-height: 0;
}

/* Main Content Area */
.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
}

.content-scrollable {
  flex: 1;
  padding: 1rem;
  overflow-y: yes;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Project Component Specific Styles */
.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0;
}

.responsive-table {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  background: white;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 600px;
}

.styled-table thead tr {
  background-color: var(--primary-color);
  color: white;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  text-align: left;
}

.styled-table tbody tr {
  transition: background-color 0.2s;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f8f8f8;
}

.styled-table tbody tr:hover {
  background-color: #e9f7fe;
}

/* Card Styles */
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.card-header {
  padding: 0.75rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding: 1.25rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  transition: all 0.15s ease-in-out;
  gap: 0.5rem;
}

.btn-primary {
  color: white;
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.btn-primary:hover {
  background-color: #3a80d2;
  border-color: #3a80d2;
}

.btn-success {
  color: white;
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.btn-danger {
  color: white;
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.btn-secondary {
  color: white;
  background-color: #6c757d;
  border-color: #6c757d;
}

/* Table Controls */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}


/* Table Styles */
.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solidrgb(13, 13, 14);
    background-color:rgb(18, 18, 19);
}

.table-container {
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

.responsive-table {
    overflow-x: auto;
    margin-top: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.styled-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.9rem;
    min-width: 600px;
}

.styled-table thead tr {
    background-color: #2c3e50;
    color: blue;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr {
    transition: all 0.2s ease;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f8f9fa;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #2c3e50;
}

.styled-table tbody tr:hover {
    background-color: #e9f7fe;
    transform: translateX(2px);
}


/* Status Badges */
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  min-width: 60px;
  text-align: center;
}

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .mailbox-layout {
    flex-direction: column;
  }
  
  .sidebar-panel {
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}

@media (max-width: 768px) {
  .styled-table {
    font-size: 0.8rem;
    min-width: 100%;
  }
  
  .styled-table th,
  .styled-table td {
    padding: 8px 12px;
  }
  
  .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .table-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 526px) {
  .content-scrollable {
    padding: 0.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
  
  .btn {
    width: 100%;
  }
}

/* Empty State Styles */
.no-data-message {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-style: italic;
}
/* In your CSS file */
.modal-dialog {
    max-width: 90%; /* Adjust this to fit your needs */
}

.modal-content {
    min-height: 500px; /* You can set a custom minimum height */
}
   /* Custom CSS for modal */
.custommodal .modal-content {
    background-color: #ffffff; /* Change to your desired background color */
    max-height: 80vh;
}

/* Ensure modal dialog size */
.custommodal .modal-dialog {
    max-width: 90%;  /* Adjust width */
    width: 80%;      /* Adjust width */
    margin: 30px auto; /* Optional: adds margin for centering */
}

/* Custom modal sizing */
.modal-90w {
  width: 100%;
  max-width: 9200px;
}

/* Better scrolling for modal body */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

/* Improved footer spacing */
.modal-footer {
  padding: 1rem 1.5rem;
}

`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
