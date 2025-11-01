import React, { useState, useEffect } from 'react';
import { saveInspectionPlanServiceorder } from '../../../services/ContractManagement/ContractSetting/inspectionplanServiceOrderServices';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Table, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { getActivityTypes } from '../../../services/ContractManagement/ContractSetting/activityTypeService';
import {
    getInspectionPlanDetailsByPlan,
    saveInspectionPlanDetailServiceorder,
    deleteInspectionPlanDetailServiceorder,
} from '../../../services/ContractManagement/ContractSetting/inspectionplanServiceOrderServices';

const InspectionPlanDetailModal = ({ isOpen, toggle, plan, refresh, contractId }) => {
    const [activityTypes, setActivityTypes] = useState([]);
    const [details, setDetails] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');

    // Fetch activity types & inspection plan details
    useEffect(() => {
        if (isOpen && plan?.inspectionplanid) {
            loadActivityTypes();
            loadDetails(plan.inspectionplanid);
        }
    }, [isOpen, plan]);

    const loadActivityTypes = async () => {
        const res = await getActivityTypes();
        if (res) setActivityTypes(res);
    };

    const loadDetails = async (planId) => {
        const res = await getInspectionPlanDetailsByPlan(planId);
        if (res && res.data) {
            setDetails(res.data);
        } else {
            setDetails([]);
        }
    };

    // Add activity to plan
    const handleAddActivity = async () => {
        if (!selectedActivity) {
            toast.warning('Please select an activity type first');
            return;
        }
        try {
            const inspectiondetailid = 0;
            const detailData = {
                inspectiondetailid: inspectiondetailid,
                inspectionplanid: plan.inspectionplanid,
                activitytypeid: selectedActivity, // match your backend param name
            };

            await saveInspectionPlanDetailServiceorder(detailData);
            toast.success('Activity added successfully');
            setSelectedActivity('');
            const status = 'planned with Activities';
            const updatedPlan = {
                inspectionplanid: plan.inspectionplanid,
                serviceorderid: plan.serviceorderid,
                startfrom_location: plan.startfrom_location,
                endat_location: plan.endat_location,
                expectedoutput: plan.expectedoutput,
                inspectiondate: plan.inspectiondate,
                status: 'planned with Activities', // 👈 override the old status
            };
            await saveInspectionPlanServiceorder(updatedPlan);

            loadDetails(plan.inspectionplanid);
            refresh(); // refresh parent list
        } catch (error) {
            toast.error('Failed to add activity');
        }
    };

    // Delete detail
    const handleDelete = async (inspectiondetailid) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) return;
        try {
            await deleteInspectionPlanDetailServiceorder(inspectiondetailid);
            toast.success('Activity deleted successfully');
            loadDetails(plan.inspectionplanid);
            refresh();
        } catch (error) {
            toast.error('Failed to delete activity');
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg" backdrop="static">
            <ModalHeader toggle={toggle}>Inspection Plan Activities for service order</ModalHeader>
            <ModalBody>
                {/* Plan Info */}
                <div className="p-3 mb-3 border rounded bg-light">
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Start Location</Label>
                                <Input readOnly value={plan.startfrom_location || ''} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>End Location</Label>
                                <Input readOnly value={plan.endat_location || ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Expected Output</Label>
                                <Input type="textarea" rows="2" readOnly value={plan.expectedoutput || ''} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Date</Label>
                                <Input readOnly value={plan.inspectiondate || ''} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Status</Label>
                                <Input readOnly value={plan.status || ''} />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

                {/* Add Activity */}
                <div className="d-flex gap-2 align-items-end mt-3">
                    <FormGroup className="flex-grow-1">
                        <Label>Add Activity</Label>
                        <Input type="select" value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                            <option value="">-- Select activity type --</option>
                            {activityTypes.map((a) => (
                                <option key={a.activitytypeid} value={a.activitytypeid}>
                                    {a.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button color="primary" onClick={handleAddActivity}>
                        + Add
                    </Button>
                </div>

                {/* Activities Table */}
                <h6 className="mb-2">Activities</h6>
                <Table bordered hover className="custom-thead">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Activity Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center text-muted">
                                    No activities added yet
                                </td>
                            </tr>
                        ) : (
                            details.map((d, idx) => (
                                <tr key={d.inspectiondetailid}>
                                    <td>{idx + 1}</td>
                                    <td>{activityTypes.find((a) => a.activitytypeid === d.activitytypeid)?.name || 'N/A'}</td>
                                    <td>
                                        <Button size="sm" color="danger" onClick={() => handleDelete(d.inspectiondetailid)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};
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
  .custom-thead tr {
    background-color: #1a73e8 !important;
    color: white !important;
}
table.custom-thead th {
    background-color: #a3c1e9ff !important;
    color: white !important;
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
  overflow-y: auto;
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
    width: 100%;
  overflow-x: auto;
}

.responsive-table {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  background: white;
  overflow-x: auto;
  min-width: 100%;
}

.styled-table {
 min-width: 900px; /* or more depending on your column count */
  width: 100%;
  border-collapse: collapse;
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
    border-bottom: 2px solid rgb(13, 13, 14);
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
    overflow-x: auto;
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
    max-height: 90vh;
}

/* Ensure modal dialog size */
.custommodal .modal-dialog {
    max-width: 100%;  /* Adjust width */
    width: 90%;      /* Adjust width */
    margin: 30px auto; /* Optional: adds margin for centering */
}

/* Custom modal sizing */
.modal-90w {
  max-width: 9900px;
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
  .mailbox-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mailbox-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar-panel {
  width: 270px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.content-scrollable {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  min-height: 0;
}
@media (max-width: 768px) {
  .mailbox-layout {
    flex-direction: column;
  }
  
  .sidebar-panel {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default InspectionPlanDetailModal;
