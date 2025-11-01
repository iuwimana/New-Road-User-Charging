import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Tabs, Tab, Row, Col, Table, Spinner } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

import * as SourceData from "../../../services/RMFPlanning/sourceoffundService";
import * as StakeholderData from "../../../services/RMFPlanning/stakeholderService";

import SourceofFund from "./sourceofFunds";
import StakeholderModal from "./stakeholder";

const ActivityModel = ({ ActivityId, ActivityName, EstimatedBudget }) => {
  const [tabKey, setTabKey] = useState("source");
  const [source, setSource] = useState([]); // ✅ initialized safely
  const [stakeholder, setStakeholder] = useState([]); // ✅ initialized safely
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState({ show: false, type: "", id: 0, name: "" });

  // ✅ Safe data fetch for both lists
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [srcRes, stkRes] = await Promise.all([
          SourceData.getactivitySourceoffundById(ActivityId),
          StakeholderData.getstakeholderById(ActivityId),
        ]);
        setSource(srcRes?.data || []);
        setStakeholder(stkRes?.data || []);
      } catch (error) {
        toast.error("Failed to load activity details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (ActivityId) fetchData();
  }, [ActivityId]);

  // ✅ Modal controls
  const openModal = (type, id = 0, name = "") => setModalData({ show: true, type, id, name });
  const closeModal = () => setModalData({ ...modalData, show: false });

  // ✅ Safe delete handler
  const deleteItem = async (type, id) => {
    try {
      if (type === "source") await SourceData.deleteactivitySourceoffund(id);
      if (type === "stakeholder") await StakeholderData.deletestakeholder(id);
      toast.success(`${type === "source" ? "Source of fund" : "Stakeholder"} deleted successfully`);
      setSource(source.filter((s) => s.activitysourceoffundid !== id));
      setStakeholder(stakeholder.filter((s) => s.stakeholderid !== id));
    } catch {
      toast.error("Error occurred while deleting. Please try again later.");
    }
  };

  // ✅ Loading indicator
  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status" />
        <div>Loading data...</div>
      </div>
    );
  }

  return (
    <>
      <Form className="mb-4">
        <Row className="mb-3">
          <Col md={3}><strong>Activity Name:</strong></Col>
          <Col>
            <Form.Control type="text" value={ActivityName || ""} readOnly />
          </Col>
        </Row>
        <Row>
          <Col md={3}><strong>Estimated Budget:</strong></Col>
          <Col>
            <Form.Control type="text" value={EstimatedBudget || ""} readOnly />
          </Col>
        </Row>
      </Form>

      <Tabs activeKey={tabKey} onSelect={setTabKey} className="mb-3">
        {/* ------------------ Source of Funds Tab ------------------ */}
        <Tab eventKey="source" title="Source of Funds">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="m-0">List of Source of Funds</h6>
            <Button variant="warning" onClick={() => openModal("source")}>
              <FcPlus /> Add New
            </Button>
          </div>

          {source?.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Source Name</th>
                  <th>Activity</th>
                  <th>Budget</th>
                  <th>Start Quarter</th>
                  <th>End Quarter</th>
                  <th>Target</th>
                  <th>Output</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {source.map((s) => (
                  <tr key={s.activitysourceoffundid}>
                    <td>{s.sourceoffundname}</td>
                    <td>{s.activityname}</td>
                    <td>{s.estimatedbudget}</td>
                    <td>{s.startingquarter}</td>
                    <td>{s.endingquarter}</td>
                    <td>{s.targetname}</td>
                    <td>{s.outputname}</td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openModal("source", s.activitysourceoffundid, s.sourceoffundname)}
                      >
                        <AiFillEdit />
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteItem("source", s.activitysourceoffundid)}
                      >
                        <AiFillDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">No source of fund data found.</p>
          )}
        </Tab>

        {/* ------------------ Stakeholder Tab ------------------ */}
        <Tab eventKey="stakeholder" title="Stakeholders">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="m-0">List of Stakeholders</h6>
            <Button variant="warning" onClick={() => openModal("stakeholder")}>
              <FcPlus /> Add New
            </Button>
          </div>

          {stakeholder?.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Activity</th>
                  <th>Budget</th>
                  <th>Start Quarter</th>
                  <th>End Quarter</th>
                  <th>Target</th>
                  <th>Output</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stakeholder.map((s) => (
                  <tr key={s.stakeholderid}>
                    <td>{s.stakeHoldername}</td>
                    <td>{s.activityname}</td>
                    <td>{s.estimatedbudget}</td>
                    <td>{s.startingquarter}</td>
                    <td>{s.endingquarter}</td>
                    <td>{s.targetname}</td>
                    <td>{s.outputname}</td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openModal("stakeholder", s.stakeholderid, s.stakeHoldername)}
                      >
                        <AiFillEdit />
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteItem("stakeholder", s.stakeholderid)}
                      >
                        <AiFillDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">No stakeholder data found.</p>
          )}
        </Tab>
      </Tabs>

      {/* ------------------ Shared Add/Edit Modal ------------------ */}
      <Modal show={modalData.show} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.id ? "Update" : "Add"}{" "}
            {modalData.type === "source" ? "Source of Fund" : "Stakeholder"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData.type === "source" ? (
            <SourceofFund
              ActivitySourceoffundId={modalData.id}
              ActivityId={ActivityId}
              SourceoffundName={modalData.name}
            />
          ) : (
            <StakeholderModal
              StakeHolderId={modalData.id}
              ActivityId={ActivityId}
              StakeHolderName={modalData.name}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActivityModel;
