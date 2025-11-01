import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as DescriptorService from '../../../../services/ContractManagement/ContractSetting/evaluationDescriptorServices';
import * as ActivityTypeService from '../../../../services/ContractManagement/ContractSetting/activityTypeService';

const UpdateDescriptorModal = ({ show, handleClose, refreshData, selectedDescriptor }) => {
    const [formData, setFormData] = useState({
        descriptor_id: 0,
        activitytypeid: 0,
        description: '',
        threshold: '',
        weight: 0,
        active: true,
    });

    const [activityTypes, setActivityTypes] = useState([]);
    // Load selected activity for update
    useEffect(() => {
        if (selectedDescriptor) {
            setFormData(selectedDescriptor);
        } else {
            // reset when adding new
            setFormData({
                descriptor_id: 0,
                activitytypeid: 0,
                description: '',
                threshold: '',
                weight: 0,
                active: true,
            });
        }
    }, [selectedDescriptor]);

    useEffect(() => {
        async function fetchData() {
            try {
                const activityTypesData = await ActivityTypeService.getActivityTypes();
                setActivityTypes(activityTypesData);
            } catch (error) {
                toast.error('Failed to load activity types.');
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async () => {
        try {
            await DescriptorService.saveDescriptor(formData);
            toast.success('Descriptor saved successfully!');
            refreshData();
            handleClose();
        } catch (error) {
            toast.error('Save failed!');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Update Evaluation Descriptor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Threshold</Form.Label>
                        <Form.Control type="text" name="threshold" value={formData.threshold} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="number" name="weight" value={formData.weight} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Check type="checkbox" label="Active" name="active" checked={formData.active} onChange={handleChange} />
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

export default UpdateDescriptorModal;
