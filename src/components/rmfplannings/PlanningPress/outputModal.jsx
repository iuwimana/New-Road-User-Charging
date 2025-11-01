import React, { useState, useEffect, useCallback } from 'react';
import { Form, Modal, Button, Tabs, Tab, Row, Col, Table, Spinner, Dropdown, DropdownButton, Container, Card } from 'react-bootstrap';
import { FcPlus, FcInspection } from 'react-icons/fc';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { DiSqllite } from 'react-icons/di';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

import * as OutputData from '../../../services/RMFPlanning/outputService';
import * as BaselineData from '../../../services/RMFPlanning/baselineServices';
import * as IndicatorData from '../../../services/RMFPlanning/indicatorService';
import * as TargetData from '../../../services/RMFPlanning/targetService';

import BaselineModal from './baseline';
import IndicatorModal from './indicator';
import Target from './target';
import Activity from './activities';
import './ContractForm.css'
import TargetRow from "./TargetRow";
// lightweight hook replacement for useOpenController
function useOpenController(initial = false) {
    const [isOpen, setIsOpen] = useState(initial);
    const toggle = () => setIsOpen((s) => !s);
    return { isOpen, toggle };
}

// small expendable button UI (stub)
function ExpendableButton({ isOpen, toggle }) {
    return (
        <Button size="sm" variant="light" onClick={toggle} style={{ padding: '0 6px' }}>
            {isOpen ? '−' : '+'}
        </Button>
    );
}

// simple ActivitySection stub so targets mapping doesn't break
function ActivitySection({ TargetId, TargetName, OutPutName, StartQuorter, EndQuorter, index }) {
    return (
        <Card className="mb-2">
            <Card.Body>
                <strong>Activities for {TargetName}</strong>
                <div className="text-muted small">
                    (TargetId: {TargetId}, OutputIndex: {index})
                </div>
            </Card.Body>
        </Card>
    );
}

/**
 * Main Output component - OPTIMIZED FOR FULLSCREEN MODAL
 */
export default function Output({ OutComeId, OutPutName, OutComeName, FiscalYear, index }) {
    // UI state
    const [tabKey, setTabKey] = useState('baseline');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // data state
    const [baseline, setBaseline] = useState([]);
    const [indicatorData, setIndicatorData] = useState([]);
    const [targetData, setTargetData] = useState([]);

    // single modal controller for sub-modals
    const [modal, setModal] = useState({
        show: false,
        type: null,
        mode: 'add',
        props: {},
    });

    // Use fallback hook
    const { isOpen, toggle } = useOpenController(false);

    // Derived states
    const id = index;
    const OutcomeId = OutComeId;
    const [outPutName, setOutPutName] = useState(OutPutName || '');

    // Unified fetch
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const idx = typeof index !== 'undefined' ? index : 0;

            const [bRes, iRes, tRes] = await Promise.all([
                BaselineData.getbaselineById(idx).catch(() => ({ data: [] })),
                IndicatorData.getindicatorById(idx).catch(() => ({ data: [] })),
                TargetData.gettargetById(idx).catch(() => ({ data: [] })),
            ]);

            setBaseline(bRes?.data || []);
            setIndicatorData(iRes?.data || []);
            setTargetData(tRes?.data || []);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
            console.error(err);
            toast.error('Failed to load output details');
        } finally {
            setLoading(false);
        }
    }, [index]);

    useEffect(() => {
        fetchAll();
        setModal({ show: false, type: null, mode: 'add', props: {} });
        setOutPutName(OutPutName || '');
    }, [fetchAll, OutComeId, OutPutName, OutComeName, FiscalYear, index]);

    // helper to open modal
    const openModal = (type, mode = 'add', props = {}) => setModal({ show: true, type, mode, props });
    const closeModal = () => setModal({ show: false, type: null, mode: 'add', props: {} });

    // Delete handlers
    const deleteBaseline = async (baselineId) => {
        if (!window.confirm('Delete this baseline?')) return;
        try {
            await BaselineData.deletebaseline(baselineId);
            setBaseline((prev) => prev.filter((b) => b.baselineid !== baselineId));
            toast.success('Baseline deleted');
        } catch (err) {
            console.error(err);
            toast.error('Error deleting baseline');
        }
    };

    const deleteIndicator = async (indicatorId) => {
        if (!window.confirm('Delete this indicator?')) return;
        try {
            await IndicatorData.deleteindicator(indicatorId);
            setIndicatorData((prev) => prev.filter((i) => i.indicatorid !== indicatorId));
            toast.success('Indicator deleted');
        } catch (err) {
            console.error(err);
            toast.error('Error deleting indicator');
        }
    };

    const deleteTarget = async (targetId) => {
        if (!window.confirm('Delete this target?')) return;
        try {
            await TargetData.deletetarget(targetId);
            setTargetData((prev) => prev.filter((t) => t.targetid !== targetId));
            toast.success('Target deleted');
        } catch (err) {
            console.error(err);
            toast.error('Error deleting target');
        }
    };

    const handleSubmitOutput = async (e) => {
        e.preventDefault();
        try {
            await OutputData.addoutput(id, OutcomeId, outPutName);
            toast.success('Output saved');
            fetchAll();
        } catch (err) {
            console.error(err);
            toast.error('Error saving output');
        }
    };

    // Small UI subcomponents
    const SectionCard = ({ title, children, actions }) => (
        <Card className="mb-3 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center py-3">
                <strong className="fs-6">{title}</strong>
                <div>{actions}</div>
            </Card.Header>
            <Card.Body className="p-0">{children}</Card.Body>
        </Card>
    );

    const AnimatedPanel = ({ children, keyName }) => (
        <AnimatePresence mode="wait">
            <motion.div key={keyName} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                {children}
            </motion.div>
        </AnimatePresence>
    );

    // Render
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" size="lg" />
                    <div className="mt-3 fs-5">Loading output details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="fullscreen-output-container p-4">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Header Info - More Compact */}
            <Card className="mb-4 bg-light border-0">
                <Card.Body className="py-3">
                    <Row className="g-3">
                        <Col md={4}>
                            <div><strong className="text-primary">Outcome:</strong></div>
                            <div className="fs-6">{OutComeName || 'N/A'}</div>
                        </Col>
                        <Col md={3}>
                            <div><strong className="text-primary">Fiscal Year:</strong></div>
                            <div className="fs-6">{FiscalYear || 'N/A'}</div>
                        </Col>
                        <Col md={4}>
                            <div><strong className="text-primary">Output Name:</strong></div>
                            <Form.Control
                                size="sm"
                                value={outPutName}
                                onChange={(e) => setOutPutName(e.target.value)}
                                placeholder="Enter output name"
                            />
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>

            {/* Enhanced Tabs - Better for fullscreen */}
            <Tabs 
                activeKey={tabKey} 
                onSelect={(k) => setTabKey(k)} 
                className="mb-4 fullscreen-tabs"
                fill
            >
                <Tab eventKey="baseline" title={
                    <div className="text-center">
                        <div>Baseline</div>
                        <small className="badge bg-primary">{baseline?.length || 0}</small>
                    </div>
                }>
                    <AnimatedPanel keyName={`baseline-${baseline?.length}`}>
                        <SectionCard
                            title={`Baselines (${baseline?.length || 0})`}
                            actions={
                                <Button variant="primary" onClick={() => openModal('baseline', 'add')} size="sm">
                                    <FcPlus /> Add Baseline
                                </Button>
                            }
                        >
                            {baseline?.length > 0 ? (
                                <div className="table-responsive">
                                    <Table striped hover className="mb-0">
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th width="50%">Baseline Name</th>
                                                <th width="30%">Output</th>
                                                <th width="20%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {baseline.map((b) => (
                                                <tr key={b.baselineid}>
                                                    <td className="fw-semibold">{b.baselinename}</td>
                                                    <td>{b.outputname}</td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-primary"
                                                            onClick={() =>
                                                                openModal('baseline', 'edit', {
                                                                    baselineID: b.baselineid,
                                                                    baselinename: b.baselinename,
                                                                })
                                                            }
                                                        >
                                                            <AiFillEdit />
                                                        </Button>{' '}
                                                        <Button size="sm" variant="outline-danger" onClick={() => deleteBaseline(b.baselineid)}>
                                                            <AiFillDelete />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <div className="fs-5">No baselines found</div>
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={() => openModal('baseline', 'add')}
                                        className="mt-2"
                                    >
                                        <FcPlus /> Add First Baseline
                                    </Button>
                                </div>
                            )}
                        </SectionCard>
                    </AnimatedPanel>
                </Tab>

                <Tab eventKey="indicators" title={
                    <div className="text-center">
                        <div>Indicators</div>
                        <small className="badge bg-success">{indicatorData?.length || 0}</small>
                    </div>
                }>
                    <AnimatedPanel keyName={`indicators-${indicatorData?.length}`}>
                        <SectionCard
                            title={`Indicators (${indicatorData?.length || 0})`}
                            actions={
                                <Button variant="success" onClick={() => openModal('indicator', 'add')} size="sm">
                                    <FcPlus /> Add Indicator
                                </Button>
                            }
                        >
                            {indicatorData?.length > 0 ? (
                                <div className="table-responsive">
                                    <Table striped hover className="mb-0">
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th width="50%">Indicator Name</th>
                                                <th width="30%">Output</th>
                                                <th width="20%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {indicatorData.map((i) => (
                                                <tr key={i.indicatorid}>
                                                    <td className="fw-semibold">{i.indicatorname}</td>
                                                    <td>{i.outputname}</td>
                                                    <td>
                                                        <Button
                                                            size="sm"
                                                            variant="outline-primary"
                                                            onClick={() =>
                                                                openModal('indicator', 'edit', {
                                                                    indicatorID: i.indicatorid,
                                                                    indicatorname: i.indicatorname,
                                                                })
                                                            }
                                                        >
                                                            <AiFillEdit />
                                                        </Button>{' '}
                                                        <Button size="sm" variant="outline-danger" onClick={() => deleteIndicator(i.indicatorid)}>
                                                            <AiFillDelete />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <div className="fs-5">No indicators found</div>
                                    <Button 
                                        variant="outline-success" 
                                        onClick={() => openModal('indicator', 'add')}
                                        className="mt-2"
                                    >
                                        <FcPlus /> Add First Indicator
                                    </Button>
                                </div>
                            )}
                        </SectionCard>
                    </AnimatedPanel>
                </Tab>

               <Tab eventKey="targets" title={
    <div className="text-center">
        <div>Targets</div>
        <small className="badge bg-warning text-dark">{targetData?.length || 0}</small>
    </div>
}>
    <AnimatedPanel keyName={`targets-${targetData?.length}`}>
        <SectionCard
            title={`Targets & Milestones (${targetData?.length || 0})`}
            actions={
                <Button variant="warning" onClick={() => openModal('target', 'add')} size="sm">
                    <FcPlus /> Add Target
                </Button>
            }
        >
            {targetData?.length > 0 ? (
                <div className="table-responsive">
                    <Table striped hover className="mb-0 align-middle">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th width="4%">#</th>
                                <th width="23%">Target Name</th>
                                <th width="15%">Output</th>
                                <th width="12%">Start</th>
                                <th width="12%">End</th>
                                <th width="10%">Activities</th>
                                <th width="24%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targetData.map((t, idx) => (
                                <TargetRow 
                                    key={t.targetid}
                                    target={t}
                                    index={idx}
                                    onEdit={openModal}
                                    onDelete={deleteTarget}
                                    onManageActivities={openModal}
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-5 text-muted">
                    <div className="fs-5 mb-3">No targets found</div>
                    <Button 
                        variant="warning" 
                        onClick={() => openModal('target', 'add')}
                        className="mt-2"
                    >
                        <FcPlus /> Add First Target
                    </Button>
                </div>
            )}
        </SectionCard>
    </AnimatedPanel>
</Tab>
            </Tabs>

            {/* Sub-modals */}
            <Modal show={modal.show} onHide={closeModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modal.mode === 'add' ? 'Add' : 'Update'} {modal.type?.charAt(0)?.toUpperCase() + modal.type?.slice(1)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.type === 'baseline' && (
                        <BaselineModal
                            index={index}
                            baselineID={modal.mode === 'edit' ? modal.props.baselineID : 0}
                            baselinename={modal.mode === 'edit' ? modal.props.baselinename : ''}
                            onSaved={() => {
                                closeModal();
                                fetchAll();
                            }}
                        />
                    )}

                    {modal.type === 'indicator' && (
                        <IndicatorModal
                            index={index}
                            indicatorID={modal.mode === 'edit' ? modal.props.indicatorID : 0}
                            indicatorname={modal.mode === 'edit' ? modal.props.indicatorname : ''}
                            onSaved={() => {
                                closeModal();
                                fetchAll();
                            }}
                        />
                    )}

                    {modal.type === 'target' && (
                        <Target
                            index={index}
                            TargetId={modal.mode === 'edit' ? modal.props.targetId : 0}
                            TargetName={modal.mode === 'edit' ? modal.props.targetName : ''}
                            StartQuorter={modal.mode === 'edit' ? modal.props.startQuorter : ''}
                            EndQuorter={modal.mode === 'edit' ? modal.props.endQuorter : ''}
                            StartQuorterId={modal.mode === 'edit' ? modal.props.startQuorterId : 0}
                            EndQuorterId={modal.mode === 'edit' ? modal.props.endQuorterId : 0}
                            onSaved={() => {
                                closeModal();
                                fetchAll();
                            }}
                        />
                    )}

                    
{modal.type === 'activity' && (
    <Activity
        TargetId={modal.props.targetId}
        ActivityId={modal.mode === 'edit' ? modal.props.activityId : 0}
        ActivityName={modal.mode === 'edit' ? modal.props.activityData?.activityname : ''}
        EstimatedBudget={modal.mode === 'edit' ? modal.props.activityData?.estimatedbudget : ''}
        onSaved={() => {
            closeModal();
            fetchAll();
            // Refresh activities in TargetRow if needed
        }}
        onCancel={closeModal} // Add this line for cancel functionality
    />
)}
                </Modal.Body>
                <Modal.Footer>
                   {/** <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>*/} 
                </Modal.Footer>
            </Modal>
        </div>
    );
}