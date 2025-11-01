import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ViewInspectionPlanModal = ({ show, handleClose, plan }) => {
  if (!plan) return null;

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Inspection Plan Details - ID: {plan.inspection_plan_id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Contract Details</h5>
        <ul>
          <li><strong>Description:</strong> {plan.contractdiscription}</li>
          <li><strong>Budget:</strong> {plan.budget}</li>
          <li><strong>Start Date:</strong> {plan.startdate}</li>
          <li><strong>End Date:</strong> {plan.enddate}</li>
          <li><strong>Reference Number:</strong> {plan.refnumber}</li>
        </ul>

        <h5>Planned Activities</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Activity Type</th>
              <th>Name</th>
              <th>Description</th>
              <th>Contract Activity Desc</th>
            </tr>
          </thead>
          <tbody>
            {plan.activities && plan.activities.length > 0 ? (
              plan.activities.map((a) => (
                <tr key={a.plan_activity_id}>
                  <td>{a.activity_id}</td>
                  <td>{a.activitytypeid}</td>
                  <td>{a.activity_name}</td>
                  <td>{a.activity_description}</td>
                  <td>{a.contractactivity_description}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center">No activities</td></tr>
            )}
          </tbody>
        </Table>

        <h5>Descriptors</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Descriptor ID</th>
              <th>Activity Type</th>
              <th>Description</th>
              <th>Threshold</th>
              <th>Weight</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plan.descriptors && plan.descriptors.length > 0 ? (
              plan.descriptors.map((d) => (
                <tr key={d.plan_descriptor_id}>
                  <td>{d.descriptor_id}</td>
                  <td>{d.activitytypeid}</td>
                  <td>{d.description}</td>
                  <td>{d.threshold}</td>
                  <td>{d.weight}</td>
                  <td>{d.active ? "Active" : "Inactive"}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={6} className="text-center">No descriptors</td></tr>
            )}
          </tbody>
        </Table>

        <h5>Team Members</h5>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {plan.team && plan.team.length > 0 ? (
              plan.team.map((t, idx) => (
                <tr key={idx}>
                  <td>{t.inspector_name}</td>
                  <td>{t.role}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={2} className="text-center">No team members</td></tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewInspectionPlanModal;
