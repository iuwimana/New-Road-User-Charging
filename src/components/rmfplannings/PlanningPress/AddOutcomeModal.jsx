import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Outcome from '../../../services/RMFPlanning/outcomeService';

const AddOutcomeModal = ({ show, onHide, refresh, subprogramid, fiscalYearId }) => {
    const [OutcomeId, setOutcomeId] = useState(0);
    const [SubProgramId, setSubProgramId] = useState(subprogramid);
    const [OutComeName, setOutcomeName] = useState('');
    const [Description, setDescription] = useState('');
    const [FiscalYearID, setFiscalYearID] = useState(fiscalYearId  );

    const handleSave = async () => {
        if (!OutComeName) return toast.warning('Outcome name is required');
        try {
            await Outcome.addoutcome(OutcomeId, SubProgramId, OutComeName, FiscalYearID, Description);
            toast.success('Outcome added successfully!');
            refresh();
            onHide();
            setOutcomeName('');
            setDescription('');
        } catch {
            toast.error('Failed to add outcome.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>Add New Outcome</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Outcome Name</Form.Label>
                        <Form.Control type="text" value={OutComeName} onChange={(e) => setOutcomeName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={Description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddOutcomeModal;
