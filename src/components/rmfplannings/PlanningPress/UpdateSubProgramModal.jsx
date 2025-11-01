import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as SubProgram from '../../../services/RMFPlanning/subProgramService';

const UpdateSubProgramModal = ({ show, onHide, subProgram, refresh,fiscalYearid }) => {
    //const [ProgramId, setProgramId] = useState(0);
    const [subprogramname, setSubprogramname] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (subProgram) {
            //toast.info(`............${subProgram.ProgramId}`)
            //setProgramId(subProgram.ProgramId);
            setSubprogramname(subProgram.subprogramname);
            setDescription(subProgram.subprogramdescription);
        }
    }, [subProgram]);

    const handleUpdate = async () => {
        if (!subprogramname) return toast.warning('SubProgram name is required');
        try {
            await SubProgram.addsubprogram(subProgram.subprogramid, fiscalYearid, subprogramname, description);
            toast.success('SubProgram updated successfully!');
            refresh();
            onHide();
        } catch {
            toast.error('Failed to update subprogram.');
        }
    };

    if (!subProgram) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-warning text-white">
                <Modal.Title>Update SubProgram</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>SubProgram Name</Form.Label>
                        <Form.Control type="text" value={subprogramname} onChange={(e) => setSubprogramname(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateSubProgramModal;
