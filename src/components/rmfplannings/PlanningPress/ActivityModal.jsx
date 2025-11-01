import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Form, Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FcPlus, FcInspection } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import * as BaselineData from "../../../services/RMFPlanning/baselineServices";
import * as IndicatorData from "../../../services/RMFPlanning/indicatorService";
import * as TargetData from "../../../services/RMFPlanning/targetService";
import BaselineModal from "./baseline";
import IndicatorModal from "./indicator";
import Target from "./target";
import Activity from "./activities";

const ActivityModal = ({ show, handleClose, output }) => {
  const [activeTab, setActiveTab] = useState("baseline");
  const [loading, setLoading] = useState(true);
  const [baselines, setBaselines] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [targets, setTargets] = useState([]);

  // Sub-modals
  const [showBaselineModal, setShowBaselineModal] = useState(false);
  const [showIndicatorModal, setShowIndicatorModal] = useState(false);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    if (!output) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [b, i, t] = await Promise.all([
          BaselineData.getbaselineById(output.outputid),
          IndicatorData.getindicatorById(output.outputid),
          TargetData.gettargetById(output.outputid),
        ]);
        setBaselines(b.data);
        setIndicators(i.data);
        setTargets(t.data);
      } catch {
        toast.error("Failed to load output data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [output]);

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-xxl"
          centered
          backdrop="static"
          className="animate__animated animate__fadeIn"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Modal.Header closeButton className="bg-primary text-white shadow-sm">
              <Modal.Title>
                <strong>Output Management</strong> — {output?.outputname}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-light">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                  <p>Loading details...</p>
                </div>
              ) : (
                <>
                  {/* Top Information Card */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3 p-3 mb-4 shadow-sm border-start border-4 border-primary"
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <p className="mb-1 fw-semibold text-secondary">Outcome Name</p>
                        <p className="text-dark">{output.outcomename}</p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1 fw-semibold text-secondary">Fiscal Year</p>
                        <p className="text-dark">{output.fiscalyear}</p>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1 fw-semibold text-secondary">Description</p>
                        <p className="text-dark">{output.outcomedescription}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tabs */}
                  <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3 fw-semibold">
                    {/* 🔹 Baseline */}
                    <Tab eventKey="baseline" title="Baselines">
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold text-secondary">Baseline List</h6>
                          <Button variant="outline-primary" onClick={() => setShowBaselineModal(true)}>
                            <FcPlus /> Add Baseline
                          </Button>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead className="table-primary">
                              <tr>
                                <th>Name</th>
                                <th>Output</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {baselines.length ? (
                                baselines.map((b) => (
                                  <tr key={b.baselineid}>
                                    <td>{b.baselinename}</td>
                                    <td>{b.outputname}</td>
                                    <td>
                                      <Button variant="outline-warning" size="sm" className="me-2">
                                        <AiFillEdit />
                                      </Button>
                                      <Button variant="outline-danger" size="sm">
                                        <AiFillDelete />
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center text-muted">
                                    No baselines available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    </Tab>

                    {/* 🔹 Indicator */}
                    <Tab eventKey="indicator" title="Indicators">
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold text-secondary">Indicator List</h6>
                          <Button variant="outline-primary" onClick={() => setShowIndicatorModal(true)}>
                            <FcPlus /> Add Indicator
                          </Button>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead className="table-primary">
                              <tr>
                                <th>Name</th>
                                <th>Output</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {indicators.length ? (
                                indicators.map((i) => (
                                  <tr key={i.indicatorid}>
                                    <td>{i.indicatorname}</td>
                                    <td>{i.outputname}</td>
                                    <td>
                                      <Button variant="outline-warning" size="sm" className="me-2">
                                        <AiFillEdit />
                                      </Button>
                                      <Button variant="outline-danger" size="sm">
                                        <AiFillDelete />
                                      </Button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" className="text-center text-muted">
                                    No indicators available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    </Tab>

                    {/* 🔹 Targets */}
                    <Tab eventKey="target" title="Targets / Milestones">
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="fw-bold text-secondary">Target List</h6>
                          <Button variant="outline-primary" onClick={() => setShowTargetModal(true)}>
                            <FcPlus /> Add Target
                          </Button>
                        </div>

                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead className="table-primary">
                              <tr>
                                <th>Name</th>
                                <th>Start Quarter</th>
                                <th>End Quarter</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {targets.length ? (
                                targets.map((t) => (
                                  <tr key={t.targetid}>
                                    <td>{t.targetname}</td>
                                    <td>{t.startquorter}</td>
                                    <td>{t.endquorter}</td>
                                    <td>
                                      <DropdownButton id="dropdown-basic" title="Actions" size="sm">
                                        <Dropdown.Item>
                                          <Button variant="outline-warning" size="sm">
                                            <AiFillEdit /> Edit
                                          </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Button variant="outline-danger" size="sm">
                                            <AiFillDelete /> Delete
                                          </Button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() => {
                                              setSelectedTarget(t.targetid);
                                              setShowActivityModal(true);
                                            }}
                                          >
                                            <FcInspection /> Activities
                                          </Button>
                                        </Dropdown.Item>
                                      </DropdownButton>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4" className="text-center text-muted">
                                    No targets available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    </Tab>
                  </Tabs>
                </>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </motion.div>

          {/* Sub-modals */}
          <BaselineModal show={showBaselineModal} handleClose={() => setShowBaselineModal(false)} outputId={output.outputid} />
          <IndicatorModal show={showIndicatorModal} handleClose={() => setShowIndicatorModal(false)} outputId={output.outputid} />
          <Target show={showTargetModal} handleClose={() => setShowTargetModal(false)} outputId={output.outputid} />
          <Activity show={showActivityModal} handleClose={() => setShowActivityModal(false)} targetId={selectedTarget} />
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ActivityModal;
