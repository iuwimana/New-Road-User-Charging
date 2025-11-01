import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { createEvaluation } from '../../../services/ContractManagement/ContractSetting/inspectionEvaluationService';
import { getInspectionPlanDetailswithdescriptorByPlan } from '../../../services/ContractManagement/ContractSetting/inspectionplanDetailServices';

const AddInspectionEvaluationModal = ({ isOpen, toggle, refresh, planId }) => {
    const [descriptors, setDescriptors] = useState([]);
    const [scores, setScores] = useState({});
    const [comment, setComment] = useState('');

    // Fetch descriptors when modal opens
    useEffect(() => {
        if (planId && isOpen) {
            getInspectionPlanDetailswithdescriptorByPlan(planId).then((res) => {
                setDescriptors(res.data || []);
                setScores({});
            });
        }
    }, [planId, isOpen]);

    // Handle checkbox change
    const handleCheckbox = (descriptor, type) => {
        const { descriptor_id, weight } = descriptor;
        let score = 0;

        if (type === 'full') score = Number(weight);
        if (type === 'half') score = Number(weight) / 2;

        // toggle: if clicked again, uncheck
        setScores((prev) => {
            const current = prev[descriptor_id] || 0;
            return {
                ...prev,
                [descriptor_id]: current === score ? 0 : score,
            };
        });
    };

    // Submit evaluation
    const handleSubmit = async () => {
        try {
            const payload = {
                inspectionplanid: planId,
                comment,
                details: descriptors.map((d) => ({
                    descriptorid: d.descriptor_id,
                    weight: Number(d.weight),
                    obtainedMax: scores[d.descriptor_id] || 0,
                })),
            };

            await createEvaluation(payload);
            toast.success('Evaluation added successfully');
            toggle();
            refresh();
        } catch (err) {
            toast.error('Error saving evaluation: ' + err.message);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>Add Inspection Evaluation{planId}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Comment</Label>

                        <Input type="select" value={comment} onChange={(e) => setComment(e.target.value)}>
                            <option value="">-- Select Comment --</option>
                            <option value="payment recommendation">Payment Recommendation</option>
                            <option value="hold payment">Hold Payment</option>
                        </Input>
                    </FormGroup>
                    <hr />
                    {descriptors.map((desc) => (
                        <div key={desc.descriptor_id} className="border p-2 mb-2 rounded">
                            <p>
                                <strong>{desc.activity_name}</strong> – {desc.descriptor_description} ({desc.weight})
                            </p>
                            <div>
                                <Input type="checkbox" checked={scores[desc.descriptor_id] === Number(desc.weight)} onChange={() => handleCheckbox(desc, 'full')} /> Completed
                                <Input type="checkbox" className="ms-3" checked={scores[desc.descriptor_id] === Number(desc.weight) / 2} onChange={() => handleCheckbox(desc, 'half')} /> Partially
                                complete
                            </div>
                        </div>
                    ))}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddInspectionEvaluationModal;
