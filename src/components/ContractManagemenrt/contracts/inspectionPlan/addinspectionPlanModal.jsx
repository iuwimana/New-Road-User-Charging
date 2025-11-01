import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as ContractActivityService from '../../../../services/ContractManagement/ContractSetting/contractActivityServices';
import * as ContractService from '../../../../services/ContractManagement/ContractSetting/contractservice';
import * as ActivityTypeService from '../../../../services/ContractManagement/ContractSetting/activityTypeService';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import * as FiscalYearContractType from '../../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';

const AddContractActivityModal = ({ show, handleClose, refreshData }) => {
    const [formData, setFormData] = useState({
        contractactivityid: 0,
        contractid: 0,
        activitytypeid: 0,
        activityname: '',
        description: '',
        expectedoutput: '',
        startdate: '',
        enddate: '',
        plannedbudget: 0,
        actualcost: 0,
        progresspercent: 0,
        status: 'Planned',
        remarks: '',
    });

    const [contracts, setContracts] = useState([]);
    const [fiscalYear, setFiscalYear] = useState([]);
    const [fiscalYearcontracttype, setFiscalYearcontracttype] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);

    // Fetch contracts and activity types
    useEffect(() => {
        async function fetchData() {
            try {
               const FiscalYears = await FiscalYear.getFiscalyears();
               
               if (FiscalYears){
                setFiscalYear(FiscalYears) 
                const fiscalyearid=FiscalYears.data[0].fiscalyearid
                
                const contractsData = await ContractService.getcontractByfiscalyear(fiscalyearid);
                
                if (contractsData){
                  setContracts(Array.isArray(contractsData.data) ? contractsData.data : []);
                  //toast.info('.....' + JSON.stringify(contractsData));
                }
              } else toast.error('No FiscalYear found.');
               

                const activityTypesData = await ActivityTypeService.getActivityTypes();
                setActivityTypes(activityTypesData);
            } catch (error) {
                toast.error('Failed to load contracts or activity types.'+error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await ContractActivityService.saveContractActivity(formData);
            toast.success('Contract Activity saved successfully!');
            refreshData();
            handleClose();
        } catch (error) {
            toast.error('Save failed!');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add Contract Activity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Contract</Form.Label>
                        <Form.Select name="contractid" value={formData.contractid} onChange={handleChange}>
                            <option value={0}>-- Select Contract --</option>
                            {Array.isArray(contracts)
                                ? contracts.map((c) => (
                                      <option key={c.contractid} value={c.contractid}>
                                          {c.contractdiscription} | {c.refnumber} | Budget: {c.contractbudget}
                                      </option>
                                  ))
                                : null}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Activity Type</Form.Label>
                        <Form.Select name="activitytypeid" value={formData.activitytypeid} onChange={handleChange}>
                            <option value={0}>-- Select Activity Type --</option>
                            {activityTypes.map((t) => (
                                <option key={t.activitytypeid} value={t.activitytypeid}>
                                    {t.name} | {t.description}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control type="text" name="activityname" value={formData.activityname} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Planned Budget</Form.Label>
                        <Form.Control type="number" name="plannedbudget" value={formData.plannedbudget} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" name="enddate" value={formData.enddate} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Status</Form.Label>
                        <Form.Select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Planned">new</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Delayed">Delayed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddContractActivityModal;
