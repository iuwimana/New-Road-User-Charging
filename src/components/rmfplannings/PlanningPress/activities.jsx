import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import * as ActivityData from "../../../services/RMFPlanning/activityServices";
import { useState, useEffect } from "react";

const Activities = ({ TargetId, ActivityId, ActivityName, EstimatedBudget, onSaved, onCancel }) => {
    // Use 0 if ActivityId is null/undefined, otherwise use the provided ID
    const id = TargetId;
    const [activityId, setActivityId] = useState(ActivityId || 0);
    const [activityName, setActivityName] = useState(ActivityName || '');
    const [estimatedBudget, setEstimatedBudget] = useState(EstimatedBudget || '');
    const [loading, setLoading] = useState(false);

    // Reset form when props change
    useEffect(() => {
        setActivityId(ActivityId || 0);
        setActivityName(ActivityName || '');
        setEstimatedBudget(EstimatedBudget || '');
    }, [TargetId, ActivityId, ActivityName, EstimatedBudget]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!activityName.trim()) {
            toast.error("Please enter an activity name");
            return;
        }
        
        if (!estimatedBudget.trim()) {
            toast.error("Please enter an estimated budget");
            return;
        }

        setLoading(true);
        
        try {
            // Determine if we're adding or updating
            const isUpdate = activityId && activityId !== 0;
            
            if (isUpdate) {
                // Update existing activity
                await ActivityData.addactivity(activityId, id, activityName, estimatedBudget);
                toast.success(`Activity "${activityName}" has been updated successfully`);
            } else {
                // Add new activity - pass 0 or null for new activity ID
                await ActivityData.addactivity(0, id, activityName, estimatedBudget);
                toast.success(`Activity "${activityName}" has been created successfully`);
            }
            
            // Call the onSaved callback to close modal and refresh
            if (onSaved) {
                onSaved();

            }
            
        } catch (ex) {
            console.error('Error saving activity:', ex);
            
            if (ex.response && ex.response.status === 400) {
                toast.error("Validation Error: " + (ex.response.data || "Invalid data provided"));
            } else if (ex.response && ex.response.status === 409) {
                toast.error("Conflict Error: " + (ex.response.data || "Activity already exists"));
            } else {
                toast.error("An error occurred while saving activity data. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Call the onCancel callback to close the modal
        if (onCancel) {
            onCancel();
            onSaved();
        }
    };

    const isEditMode = activityId && activityId !== 0;

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4">
                    {isEditMode ? 'Edit Activity' : 'Add New Activity'}
                    <small className="text-muted d-block">
                        Target ID: {TargetId} 
                        {isEditMode && ` | Activity ID: ${activityId}`}
                    </small>
                </Card.Title>
                
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Activity Name *
                                    {isEditMode && <span className="text-muted"> (Editing ID: {activityId})</span>}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter activity name"
                                    value={activityName}
                                    onChange={(e) => setActivityName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                                <Form.Text className="text-muted">
                                    {isEditMode ? "Update the activity name" : "Enter a name for the new activity"}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-4">
                                <Form.Label>Estimated Budget *</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter estimated budget"
                                    value={estimatedBudget}
                                    onChange={(e) => setEstimatedBudget(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                                <Form.Text className="text-muted">
                                    Enter the estimated budget for this activity
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2 justify-content-end">
                        <Button 
                            variant="outline-secondary" 
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant={isEditMode ? "warning" : "success"}
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Activity' : 'Add New Activity')}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Activities;