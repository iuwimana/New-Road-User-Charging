import React, { useState, useEffect } from "react";
import { updateInspectionPlan } from "../../../services/ContractManagement/ContractSetting/inspectionplanServices";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import {
  getActivityTypes,
} from "../../../services/ContractManagement/ContractSetting/activityTypeService";
import {
  getInspectionPlanDetailsByPlan,
  addInspectionPlanDetail,
  deleteInspectionPlanDetail,
} from "../../../services/ContractManagement/ContractSetting/inspectionplanDetailServices";

const InspectionPlanDetailModal = ({ isOpen, toggle, plan, refresh,contractId }) => {
  const [activityTypes, setActivityTypes] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");

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
      toast.warning("Please select an activity type first");
      return;
    }
    try {
      const inspectiondetailid=0;

      await addInspectionPlanDetail(inspectiondetailid,plan.inspectionplanid, selectedActivity);
      toast.success("Activity added successfully" );
      setSelectedActivity("");
      const status="planned with Activities"
       await updateInspectionPlan(
            plan.inspectionplanid,
            contractId,
            plan.startfrom_location,
            plan.endat_location,
            plan.expectedoutput,
            plan.inspectiondate,
            status
      
            
          );

          
      loadDetails(plan.inspectionplanid);
      refresh(); // refresh parent list
    } catch (error) {
      toast.error("Failed to add activity");
    }
  };

  // Delete detail
  const handleDelete = async (inspectiondetailid) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteInspectionPlanDetail(inspectiondetailid);
      toast.success("Activity deleted successfully");
      loadDetails(plan.inspectionplanid);
      refresh();
    } catch (error) {
      toast.error("Failed to delete activity");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" backdrop="static">
      <ModalHeader toggle={toggle}>
        Inspection Plan Activities
      </ModalHeader>
      <ModalBody>
        {/* Plan Info */}
        <div className="p-3 mb-3 border rounded bg-light">
          
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Start Location</Label>
                <Input readOnly value={plan.startfrom_location || ""} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>End Location</Label>
                <Input readOnly value={plan.endat_location || ""} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Expected Output</Label>
                <Input type="textarea" rows="2" readOnly value={plan.expectedoutput || ""} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Date</Label>
                <Input readOnly value={plan.inspectiondate || ""} />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label>Status</Label>
                <Input readOnly value={plan.status || ""} />
              </FormGroup>
            </Col>
          </Row>
        </div>

        {/* Add Activity */}
        <div className="d-flex gap-2 align-items-end mt-3">
          <FormGroup className="flex-grow-1">
            <Label>Add Activity</Label>
            <Input
              type="select"
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
            >
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
        <Table bordered hover responsive>
          <thead className="table-secondary">
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
                  <td>
                    {
                      activityTypes.find(
                        (a) => a.activitytypeid === d.activitytypeid
                      )?.name || "N/A"
                    }
                  </td>
                  <td>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(d.inspectiondetailid)}
                    >
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

export default InspectionPlanDetailModal;
