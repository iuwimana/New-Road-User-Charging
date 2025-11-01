import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import { createEvaluation,getEvaluationsByPlan,getInspectionEvaluationdetailsbyinspection } from '../../../services/ContractManagement/ContractSetting/inspectionEvaluationService';
import { getInspectionPlanDetailswithdescriptorByPlan} from '../../../services/ContractManagement/ContractSetting/inspectionplanDetailServices';
import {getInspectionPlanById} from '../../../services/ContractManagement/ContractSetting/inspectionPlanService';
const UpdateInspectionEvaluationModal = ({ isOpen, toggle,  evaluation,refresh, planId }) => {
  const [descriptors, setDescriptors] = useState([]);
  const [scores, setScores] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
  if (!isOpen) return;

  const pid = planId || evaluation?.inspectionplanid;

  Promise.all([
    getInspectionPlanDetailswithdescriptorByPlan(pid),
    evaluation?.details ? Promise.resolve(evaluation.details) : getInspectionEvaluationdetailsbyinspection(pid),
  ]).then(([descRes, evalDetails]) => {
    const descData = descRes.data || [];
    setDescriptors(descData);
    toast.info(`........${JSON.stringify(descData)}`)
    const existingScores = {};
    (evalDetails || []).forEach((d) => {
      existingScores[d.descriptorid] = Number(d.obtainedMax);
    });
    setScores(existingScores);
    setComment(evaluation?.comment || '');
  });
}, [planId, evaluation, isOpen]);

  // Handle checkbox change
  const handleCheckbox = (descriptor, type) => {
    const { descriptor_id, weight } = descriptor;
    let score = type === 'full' ? Number(weight) : type === 'half' ? Number(weight) / 2 : 0;

    setScores((prev) => {
      const current = prev[descriptor_id] || 0;
      return { ...prev, [descriptor_id]: current === score ? 0 : score };
    });
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      const payload = {
        inspectionplanId: {
          inspectionplanid: planId || evaluation?.inspectionplanid,
          comment,
          details: descriptors.map((d) => ({
            descriptorid: d.descriptor_id,
            weight: Number(d.weight),
            obtainedMax: scores[d.descriptor_id] || 0,
          })),
        },
      };

      console.log("Payload to submit:", payload);

      await createEvaluation(payload);
      toast.success('Evaluation updated successfully');
      toggle();
      refresh();
    } catch (err) {
      toast.error('Error updating evaluation: ' + err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Update Inspection Evaluationss</ModalHeader>
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
          {descriptors.length === 0 ? (
            <p>No descriptors found for this plan.</p>
          ) : (
            descriptors.map((desc) => (
              <div key={desc.descriptor_id} className="border p-2 mb-2 rounded">
                <p>
                  <strong>{desc.activity_name}</strong> – {desc.descriptor_description} ({desc.weight})
                </p>
                <div>
                  <Input
                    type="checkbox"
                    checked={scores[desc.descriptor_id] === Number(desc.weight)}
                    onChange={() => handleCheckbox(desc, 'full')}
                  />{' '}
                  Completed
                  <Input
                    type="checkbox"
                    className="ms-3"
                    checked={scores[desc.descriptor_id] === Number(desc.weight) / 2}
                    onChange={() => handleCheckbox(desc, 'half')}
                  />{' '}
                  Partially complete
                </div>
              </div>
            ))
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateInspectionEvaluationModal;
