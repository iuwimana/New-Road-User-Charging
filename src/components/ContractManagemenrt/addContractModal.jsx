import React, { Component } from 'react';
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

class AddContractModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {
                roodid: 0,
                maintenancetypeid: 0,
                startDate: null,
                endDate: null,
                maintenanceDuration: 0,
                projectlength: 0,
                measurementid: 0,
                targetid: 0,
                amount: 0,
                contractorid: 0,
                description: '',
                length: 0,
                company: 0,
                evaluationamount: 0,
                evaluationDuration: 0,
                evaluationdescription: 0,
                evaluationstartDate: null,
                evaluationendDate: null,
                evaluationrefnumber: '',
                projectid: 0,
                contractid: 0,
                refnumber: '',
                supervisionContracts: [],
            },
            newTeamMember: {
                teamMembers: [], // Store added members here
                currentMember: {
                    // Temporary input storage
                    name: '',
                    role: 'Inspector',
                },
            },
            contractors: [],
            measurements: [],
            maintenances: [],
            roads: [],
            targets: [],
            currentSupervisionContract: {
                company: '',
                amount: '',
                startDate: null,
                endDate: null,
                description: '',
                teamMembers: [],
            },

            showSupervisionForm: false,
            showAddTeamForm: false,
            // ... rest of your existing state
            data: {
                RevenueCorrectionId: 0,
                borderid: 0,
                bordername: '',
                RevenueProductId: 0,
                RevenuePaymentId: 0,
                CorrectionDate: '',
                RefNumber: {},
                TransactionDetails: {},
                Deposit: {},
                PoRef: {},
                DocId: {},
            },
            GivenDate: '',
            value: 1,
            currencyid: 0,
            currencyname: '',
            revenuproductid: 0,
            revenuepaymentid: 0,
            revenuproductname: '',
            activeon: '',
            CurrentDate: '',
            isactif: true,
            nametochek: 'sibo',
            fiscalyearsid: 0,
            fiscalyear: '',
            loadData: [],
            sources: [],
            user: {},
            ParsedData: [],
            borders: [],
            TableRows: [],
            Values: [],
            product: [],
            payment: [],
            paymentModes: [],
            errors: {},
            currentPage: 1,
            pageSize: 5,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }

    async populateBanks() {
        try {
            const { data: contractors } = await Contractor.getcontractors();
            const { data: measurements } = await Measurement.getmeasurements();
            const { data: maintenances } = await Maintenance.getmaintenances();
            const { data: roads } = await Road.getroads();
            const { data: targets } = await Target.gettargets();

            this.setState({ contractors, measurements, maintenances, roads, targets });

            const { data: fiscalyear } = await FiscalYear.getFiscalyears();
            const response = await FiscalYear.getFiscalyears();

            if (response) {
                const fiscalYears = response.data;
                this.setState({ data: response });
                const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                //this.setState({ fiscalyearid, fiscalyear });
                this.setState({ fiscalyearsid, fiscalyear });
            } else {
                toast.error('No Fiscal year find......' + fiscalyear);
            }
        } catch (ex) {
            toast.error('Loading issues......' + ex);
        }
    }

    async componentDidMount() {
        try {
            await this.populateBanks();
            if (this.props.fiscalyearcontracttypeid) {
                this.setState((prevState) => ({
                    formData: {
                        ...prevState.formData,
                        fiscalyearid: this.state.fiscalyearsid,
                        contracttypeid: this.props.fiscalyearcontracttypeid,
                    },
                }));
            }
        } catch (ex) {
            toast.error('An Error Occurred while fetching revenue payment data: ' + ex);
        }
    }
    // ... keep all your existing lifecycle methods ...

    // 2. Modified handleChange
    handleChange = (arg1, arg2) => {
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

        // 3. Add evaluationDuration to numeric fields
        const numericFields = [
            'roodid',
            'maintenancetypeid',
            'measurementid',
            'targetid',
            'contractorid',
            'projectlength',
            'amount',
            'maintenanceDuration',
            'evaluationDuration', // Add this
        ];

        // Convert numeric values
        let parsedValue = value;
        if (numericFields.includes(name)) {
            parsedValue = value === '' ? '' : Number(value);
            if (isNaN(parsedValue)) parsedValue = '';
        }

        this.setState(
            (prevState) => {
                const newFormData = {
                    ...prevState.formData,
                    [name]: parsedValue,
                };

                // 4. Fixed date calculations
                const calculateEndDate = (startField, durationField, endField) => {
                    if (newFormData[startField] instanceof Date && typeof newFormData[durationField] === 'number' && newFormData[durationField] > 0) {
                        const endDate = new Date(newFormData[startField]);
                        endDate.setMonth(endDate.getMonth() + newFormData[durationField]);
                        newFormData[endField] = endDate;
                    } else {
                        newFormData[endField] = null;
                    }
                };

                // Handle maintenance dates
                if (name === 'startDate' || name === 'maintenanceDuration') {
                    calculateEndDate('startDate', 'maintenanceDuration', 'endDate');
                }

                // Handle evaluation dates
                if (name === 'evaluationstartDate' || name === 'evaluationDuration') {
                    calculateEndDate('evaluationstartDate', 'evaluationDuration', 'evaluationendDate');
                }

                return { formData: newFormData };
            },
            () => {
                // Toast notifications
                let displayValue;
                const currentValue = this.state.formData[name];

                if (currentValue instanceof Date) {
                    displayValue = currentValue.toLocaleDateString('en-GB');
                } else if (currentValue === null) {
                    displayValue = 'Not set';
                } else {
                    displayValue = currentValue;
                }

                let message = `Field updated: ${name} → ${displayValue}`;

                // Add both end dates to toast
                if (this.state.formData.endDate) {
                    message += `\nMaint. End: ${this.state.formData.endDate.toLocaleDateString('en-GB')}`;
                }
                if (this.state.formData.evaluationendDate) {
                    message += `\nEval. End: ${this.state.formData.evaluationendDate.toLocaleDateString('en-GB')}`;
                }
                message += `\nlist of contract ${JSON.stringify(this.state.formData)}`;

                // toast.info(message);
            }
        );
    };
    handleSupervisionChange = (e) => {
        const { name, value } = e.target;
        setCurrentSupervisionContract((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    handleSupervisionChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            currentSupervisionContract: {
                ...prevState.currentSupervisionContract,
                [name]: value,
            },
        }));
    };

    handleSupervisionDateChange = (date, field) => {
        this.setState((prevState) => ({
            currentSupervisionContract: {
                ...prevState.currentSupervisionContract,
                [field]: date,
            },
        }));
    };

    handleTeamMemberChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newTeamMember: {
                ...prevState.newTeamMember,
                currentMember: {
                    ...prevState.newTeamMember.currentMember,
                    [name]: value,
                },
            },
        }));
    };

    handleAddSupervisionContract = () => {
        if (this.state.currentSupervisionContract.company.trim()) {
            this.setState((prevState) => ({
                formData: {
                    ...prevState.formData,
                    supervisionContracts: [...prevState.formData.supervisionContracts, prevState.currentSupervisionContract],
                },
                currentSupervisionContract: {
                    company: '',
                    amount: '',
                    startDate: null,
                    endDate: null,
                    description: '',
                    teamMembers: [],
                },
                showSupervisionForm: false,
            }));
        }
    };

    handleRemoveSupervisionContract = (index) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                supervisionContracts: prevState.formData.supervisionContracts.filter((_, i) => i !== index),
            },
        }));
    };

    handleAddTeamMember = () => {
        this.setState((prevState) => {
            const name = prevState.newTeamMember.currentMember.name.trim();

            // Only proceed if name is not empty
            if (!name) return null;

            return {
                newTeamMember: {
                    teamMembers: [
                        ...prevState.newTeamMember.teamMembers,
                        {
                            id: Date.now(),
                            ...prevState.newTeamMember.currentMember,
                        },
                    ],
                    currentMember: {
                        name: '',
                        role: 'Inspector',
                    },
                },
            };
        });
    };
    handleRemoveTeamMember = (id) => {
        this.setState((prevState) => ({
            newTeamMember: {
                ...prevState.newTeamMember,
                teamMembers: prevState.newTeamMember.teamMembers.filter((member) => member.id !== id),
            },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        // Show loading state
        this.setState({ isSubmitting: true });

        try {
            // Validate required fields
            const requiredFields = ['roodid', 'maintenancetypeid', 'startDate', 'maintenanceDuration', 'projectlength', 'measurementid', 'targetid', 'amount', 'contractorid'];
            const errors = {};
            requiredFields.forEach((field) => {
                if (!this.state.formData[field]) {
                    errors[field] = 'This field is required';
                }
            });

            if (Object.keys(errors).length > 0) {
                this.setState({ errors });
                throw new Error('Please fill all required fields');
            }

            // Ensure fiscalyearid is set
            const formData = {
                ...this.state.formData,
                fiscalyearid: this.state.formData.fiscalyearsid || this.state.fiscalyearsid,
                contracttypeid: this.props.fiscalyearcontracttypeid,
            };
            const teamMembersArray = Array.isArray(this.state.newTeamMember) ? this.state.newTeamMember : [];
            if (!this.state.formData || !this.state.newTeamMember) {
                throw new Error('Form data and team members are required');
            }
            // Validate required fields

            // Submit data
            const result = await Contract.saveContractWorkflow(
                this.state.formData,
                this.state.newTeamMember.teamMembers // Ensure proper structure
            );
            toast.success(`Contract successfully`);

            // ✅ Call onSave if provided
            if (this.props.onSave) {
                this.props.onSave(result);
            }

            // ✅ Close modal
            if (this.props.onClose) {
                this.props.onClose();
            }
        } catch (ex) {
            console.error('Submission error:', ex);

            // Enhanced error handling
            if (ex.response) {
                switch (ex.response.status) {
                    case 400:
                        toast.error(`Validation error: ${ex.response.data.error || ex.response.data}`);
                        this.setState({
                            errors: {
                                ...this.state.errors,
                                form: ex.response.data.error || 'Invalid form data',
                            },
                        });
                        break;

                    case 409:
                        toast.error(`Conflict: ${ex.response.data.error || ex.response.data}`);
                        this.setState({
                            errors: {
                                ...this.state.errors,
                                form: ex.response.data.error || 'Resource already exists',
                            },
                        });
                        break;

                    default:
                        toast.error(`Server error: ${ex.response.data?.error || 'Please try again later'}`);
                }
            } else {
                toast.error(`Error: ${ex.message || 'Failed to submit form'}`);
            }
        } finally {
            // Reset loading state
            this.setState({ isSubmitting: false });
        }
    };

    // ... keep all your other existing methods ...

    render() {
        if (!this.props.show) return null;
        const { formData, currentSupervisionContract, newTeamMember, showSupervisionForm, showAddTeamForm } = this.state;
        const payment = this.state.payment;
        const product = this.state.product;
        const borders = this.state.borders;

        return (
            <Modal
                isOpen={true}
                toggle={this.props.onClose}
                className="custom-centered-modal" // Changed from fullscreen-modal
                contentClassName="h-100"
                backdrop="static"
                keyboard={false}
                style={{
                    maxWidth: '90%', // Controls the maximum width
                    width: '1200px', // Fixed width or use percentage
                    margin: 'auto', // Centers the modal
                }}
            >
                <ModalHeader toggle={this.props.onClose} className="bg-light border-bottom-0" style={{ padding: '1rem' }}>
                    <h5 className="modal-title">Register New Contract</h5>
                </ModalHeader>

                <ModalBody
                    style={{
                        padding: '0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: 'calc(100vh - 200px)', // Limit height to prevent modal going off screen
                    }}
                >
                    <div
                        style={{
                            padding: '20px',
                            flex: '1',
                            overflowY: 'auto',
                        }}
                    >
                        {/* Main Contract Form Fields */}
                        <div className="form-row">
                            <div className="form-group ">
                                <label htmlFor="title">road to maintain</label>

                                <select name="roodid" value={this.state.formData.roodid} onChange={this.handleChange} className="form-control" required>
                                    <option value="">Select Road</option>
                                    {this.state.roads.map((road) => (
                                        <option key={road.roodid} value={road.roodid}>
                                            {road.roodname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="amount">maintenancetype </label>
                                <div className="amount-input">
                                    <select name="maintenancetypeid" value={this.state.formData.maintenancetypeid} onChange={this.handleChange} className="form-control" required>
                                        <option value="">Select maintenance type</option>
                                        {this.state.maintenances.map((maintenance) => (
                                            <option key={maintenance.maintenancetypeid} value={maintenance.maintenancetypeid}>
                                                {maintenance.maintenancetypename}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="refnumber">Contract Ref Number</label>
                                <input
                                    type="text"
                                    id="refnumber"
                                    name="refnumber"
                                    value={this.state.formData.refnumber}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Enter reference number"
                                    required
                                />
                            </div>
                        </div>
                        {/* Fix DatePicker components */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Date</label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={(date) => this.handleChange(date, 'startDate')}
                                    selectsStart
                                    startDate={formData.startDate}
                                    endDate={formData.endDate}
                                    placeholderText="Pick start date"
                                    dateFormat="MM/dd/yyyy"
                                    className="date-picker"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Maintenance Duration (Months)</label>
                                <input
                                    type="number"
                                    name="maintenanceDuration"
                                    value={this.state.formData.maintenanceDuration}
                                    onChange={this.handleChange}
                                    min="1"
                                    step="1"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group amount-group">
                                <label htmlFor="amount">projectlength </label>
                                <div className="amount-input">
                                    <input type="number" id="projectlength" name="projectlength" value={formData.projectlength} onChange={this.handleChange} min="0" step="1" required />
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="amount">measurement</label>
                                <div className="amount-input">
                                    <select name="measurementid" value={this.state.formData.measurementid} onChange={this.handleChange} className="form-control" required>
                                        <option value="">Select measurements unity</option>
                                        {this.state.measurements.map((maintenance) => (
                                            <option key={maintenance.measurementid} value={maintenance.measurementid}>
                                                {maintenance.measurementname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group amount-group">
                                <label htmlFor="amount">target </label>
                                <div className="amount-input">
                                    <select name="targetid" value={this.state.formData.targetid} onChange={this.handleChange} className="form-control" required>
                                        <option value="">Select target </option>
                                        {this.state.targets.map((maintenance) => (
                                            <option key={maintenance.targetid} value={maintenance.targetid}>
                                                Output:{maintenance.outputname} with target:{maintenance.targetname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="amount">Contract Amount (Rwf)</label>
                                <div className="amount-input">
                                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={this.handleChange} min="0" step="0.01" required />
                                </div>
                            </div>
                        </div>

                        <div className="form-group ">
                            <label htmlFor="amount">Contractor </label>
                            <div className="amount-input">
                                <select name="contractorid" value={this.state.formData.contractorid} onChange={this.handleChange} className="form-control" required>
                                    <option value="">Select contractors</option>
                                    {this.state.contractors.map((maintenance) => (
                                        <option key={maintenance.contractorid} value={maintenance.contractorid}>
                                            {maintenance.contractorname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="supervisionDescription">Description</label>
                            <textarea
                                id="supervisionDescription"
                                name="description"
                                placeholder="Enter supervision contract details..."
                                value={this.state.formData.description}
                                onChange={this.handleChange}
                                rows="3"
                            />
                        </div>

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
                                        <label htmlFor="company">Company Name</label>
                                        {/**
                                         * 
                                         * <input type="text" id="company" name="company" value={currentSupervisionContract.company} onChange={this.handleSupervisionChange} required />

                                         * 
                                         */}

                                        <select name="company" value={this.state.formData.company} onChange={this.handleChange} className="form-control" required>
                                            <option value="">Select supervisor contractors</option>
                                            {this.state.contractors.map((maintenance) => (
                                                <option key={maintenance.contractorid} value={maintenance.contractorid}>
                                                    {maintenance.contractorname}
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
                                                value={this.state.formData.evaluationrefnumber}
                                                onChange={this.handleChange}
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
                                            value={this.state.formData.evaluationamount}
                                            onChange={this.handleChange}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Evaluation startDate</label>
                                            <DatePicker
                                                selected={this.state.formData.evaluationstartDate}
                                                onChange={(date) => this.handleChange(date, 'evaluationstartDate')}
                                                selectsStart
                                                startDate={this.state.formData.evaluationstartDate}
                                                endDate={this.state.formData.evaluationendDate}
                                                placeholderText="Pick start date"
                                                dateFormat="MM/dd/yyyy"
                                                className="date-picker"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Evaluation Duration</label>
                                            <input
                                                type="number"
                                                name="evaluationDuration"
                                                value={this.state.formData.evaluationDuration}
                                                onChange={this.handleChange}
                                                min="1"
                                                step="1"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/*  
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea id="evaluationdescription" name="evaluationdescription" value={this.state.formData.evaluationdescription} onChange={this.handleChange} rows="3" />
                                    </div>
                                    {/* Team Members Section */}
                                    <div className="team-members-section">
                                        <h5>Team Members</h5>

                                        {currentSupervisionContract.teamMembers.length > 0 && (
                                            <ul className="team-members-list">
                                                {currentSupervisionContract.teamMembers.map((member) => (
                                                    <li key={member.id} className="team-member-item">
                                                        <span>
                                                            {member.name} ({member.role})
                                                        </span>{' '}
                                                        <button type="button" className="remove-btn small " onClick={() => this.handleRemoveTeamMember(member.id)} style={{ color: 'red' }}>
                                                            Remove
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {showAddTeamForm ? (
                                            <>
                                                <div className="add-team-form">
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Member Name</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={this.state.newTeamMember.currentMember.name}
                                                                onChange={this.handleTeamMemberChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="role">Role</label>
                                                            <select id="role" name="role" value={this.state.newTeamMember.currentMember.role} onChange={this.handleTeamMemberChange}>
                                                                <option value="Inspector">Inspector</option>
                                                                <option value="Engineer">Engineer</option>
                                                                <option value="Supervisor">Supervisor</option>
                                                                <option value="Manager">Manager</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="btn btn-primary" onClick={this.handleAddTeamMember}>
                                                        Add Member
                                                    </button>
                                                </div>

                                                {this.state.newTeamMember.teamMembers.map((member) => (
                                                    <div key={member.id} className="team-member-card">
                                                        <h4>{member.name}</h4>
                                                        <p>Role: {member.role}</p>
                                                        <button type="button" onClick={() => this.handleRemoveTeamMember(member.id)}>
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <button type="button" className="btn btn-outline-primary" onClick={() => this.setState({ showAddTeamForm: true })}>
                                                + Add Team Member
                                            </button>
                                        )}
                                    </div>
                                    {/** 

                                        <div className="form-actions">
                                            <button type="button" className="btn btn-primary" onClick={this.handleAddSupervisionContract}>
                                                Save Supervision Contract
                                            </button>
                                            <button type="button" className="btn btn-secondary" onClick={() => this.setState({ showSupervisionForm: false })}>
                                                Cancel
                                            </button>
                                        </div>
                                        */}
                                </div>
                            )}

                            {!showSupervisionForm && (
                                <button type="button" className="add-supervision-btn btn btn-outline-primary" onClick={() => this.setState({ showSupervisionForm: true })}>
                                    + Add Supervision Contract
                                </button>
                            )}
                        </div>

                        {/** 

                            <button type="submit" className="btn btn-primary">
                                Submit Contract
                            </button>
                            */}

                        <div style={{ height: '70vh', overflowY: 'auto' }}></div>
                    </div>
                </ModalBody>

                <ModalFooter className="bg-light border-top-0" style={{ padding: '1rem' }}>
                    <Button color="primary" onClick={this.handleSubmit} style={{ minWidth: '120px' }}>
                        Save contract
                    </Button>
                    <Button color="secondary" onClick={this.props.onClose} style={{ minWidth: '120px' }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

AddContractModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddContractModal;

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
