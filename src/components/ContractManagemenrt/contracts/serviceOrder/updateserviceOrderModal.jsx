import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as ContractActivityService from "../../../../services/ContractManagement/ContractSetting/contractActivityServices";
import * as ContractService from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as ActivityTypeService from "../../../../services/ContractManagement/ContractSetting/activityTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";

const UpdateContractActivityModal = ({ show, handleClose, refreshData, selectedActivity }) => {
  const [formData, setFormData] = useState({
    contractactivityid: 0,
    contractid: 0,
    activitytypeid: 0,
    activityname: "",
    description: "",
    expectedoutput: "",
    startdate: "",
    enddate: "",
    plannedbudget: 0,
    actualcost: 0,
    progresspercent: 0,
    status: "Planned",
    remarks: "",
  });

  const [contracts, setContracts] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);

  // Fetch contracts and activity types
  useEffect(() => {
    async function fetchData() {
      try {
        const fiscalYears = await FiscalYear.getFiscalyears();
        if (fiscalYears) {
          const fiscalyearid = fiscalYears.data[0].fiscalyearid;
          const contractsData = await ContractService.getcontractByfiscalyear(fiscalyearid);
          if (contractsData) {
            setContracts(Array.isArray(contractsData.data) ? contractsData.data : []);
          }
        }

        const activityTypesData = await ActivityTypeService.getActivityTypes();
        setActivityTypes(activityTypesData);
      } catch (error) {
        toast.error("Failed to load contracts or activity types. " + error);
      }
    }
    fetchData();
  }, []);

  // Pre-fill when selectedActivity changes
  useEffect(() => {
    if (selectedActivity) {
      setFormData({
        contractactivityid: selectedActivity.contractactivityid || 0,
      contractid: selectedActivity.contractid || 0,
      activitytypeid: selectedActivity.activitytypeid || 0,
      activityname: selectedActivity.activityname || "",
      description: selectedActivity.description || "",
      expectedoutput: selectedActivity.expectedoutput || "",
      startdate: selectedActivity.startdate ? selectedActivity.startdate.split("T")[0] : selectedActivity.startdate,
      enddate: selectedActivity.enddate ? selectedActivity.enddate.split("T")[0] : selectedActivity.enddate,
      plannedbudget: selectedActivity.plannedbudget || 0,
      actualcost: selectedActivity.actualcost || 0,
      progresspercent: selectedActivity.progresspercent || 0,
      status: selectedActivity.status || "Planned",
      remarks: selectedActivity.remarks || "",
      });
    }
  }, [selectedActivity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      toast.success("Contract Activity updated successfully!"+JSON.stringify(formData));
      await ContractActivityService.saveContractActivity(formData);
      toast.success("Contract Activity updated successfully!");
      refreshData();
      handleClose();
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Contract Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Contract</Form.Label>
            <Form.Select
              name="contractid"
              value={formData.contractid}
              onChange={handleChange}
            >
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
            <Form.Select
              name="activitytypeid"
              value={formData.activitytypeid}
              onChange={handleChange}
            >
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
            <Form.Control
              type="text"
              name="activityname"
              value={formData.activityname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Planned Budget</Form.Label>
            <Form.Control
              type="number"
              name="plannedbudget"
              value={formData.plannedbudget}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
            />
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
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateContractActivityModal;
