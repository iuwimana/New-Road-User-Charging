// TargetRow.jsx - Fixed with visible content
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Badge, Collapse, Table, Spinner } from 'react-bootstrap';
import { AiFillEdit, AiFillDelete, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcInspection, FcExpand, FcCollapse } from 'react-icons/fc';
import { toast } from 'react-toastify';

// Import your activity service
import * as ActivityData from '../../../services/RMFPlanning/activityServices';
import { FcPlus } from 'react-icons/fc';
import './ContractForm.css';

const TargetRow = ({ target, index, onEdit, onDelete, onManageActivities }) => {
    const [showActivities, setShowActivities] = useState(false);
    const [activities, setActivities] = useState([]);
    const [loadingActivities, setLoadingActivities] = useState(false);
    const [activityCount, setActivityCount] = useState(0);
    const [hasLoadedActivities, setHasLoadedActivities] = useState(false);

    // Load activities count
    useEffect(() => {
        const loadActivityCount = async () => {
            try {
                const response = await ActivityData.getactivityById(target.targetid);
                console.log('Activity count response:', response);

                if (response && response.data) {
                    setActivityCount(response.data.length || 0);
                } else {
                    setActivityCount(0);
                }
            } catch (error) {
                console.error('Error loading activity count:', error);
                setActivityCount(0);
            }
        };

        loadActivityCount();
    }, [target.targetid]);

    // Load detailed activities
    const loadActivities = async () => {
        setLoadingActivities(true);
        try {
            const response = await ActivityData.getactivityById(target.targetid);
            console.log('Detailed activities:', response?.data);

            if (response && response.data) {
                setActivities(response.data);
                setHasLoadedActivities(true);
            } else {
                setActivities([]);
                setHasLoadedActivities(true);
            }
        } catch (error) {
            console.error('Error loading activities:', error);
            toast.error('Failed to load activities');
            setActivities([]);
            setHasLoadedActivities(true);
        } finally {
            setLoadingActivities(false);
        }
    };

    const handleToggleActivities = async () => {
        // Immediately toggle the visibility
        const newShowState = !showActivities;
        setShowActivities(newShowState);

        // If opening and we haven't loaded activities yet, load them
        if (newShowState && !hasLoadedActivities) {
            await loadActivities();
        }
    };

    const handleDeleteActivity = async (activityId) => {
        if (!window.confirm('Are you sure you want to delete this activity?')) return;

        try {
            await ActivityData.deleteactivity(activityId);
            setActivities((prev) => prev.filter((a) => a.activityid !== activityId));
            setActivityCount((prev) => prev - 1);
            toast.success('Activity deleted successfully');
        } catch (error) {
            console.error('Error deleting activity:', error);
            toast.error('Failed to delete activity');
        }
    };

    return (
        <>
            {/* Main Target Row */}
            <tr className="target-row">
                <td>
                    <div className="d-flex align-items-center gap-1">
                        <Button
                            variant="link"
                            size="sm"
                            className="p-0 text-decoration-none"
                            onClick={handleToggleActivities}
                            title={showActivities ? 'Hide Activities' : 'Show Activities'}
                            disabled={loadingActivities}
                        >
                            {loadingActivities ? (
                                <Spinner animation="border" size="sm" />
                            ) : showActivities ? (
                                <>
                                    Hide <FcCollapse />
                                </>
                            ) : (
                                <>
                                    Show <FcExpand />
                                </>
                            )}
                        </Button>
                    </div>
                </td>
                <td className="fw-semibold text-primary">{target.targetname}</td>
                <td>
                    <span className="text-muted small">{target.outputname}</span>
                </td>
                <td>
                    <Badge bg="info" className="fs-7">
                        {target.startquorter}
                    </Badge>
                </td>
                <td>
                    <Badge bg="secondary" className="fs-7">
                        {target.endquorter}
                    </Badge>
                </td>
                <td>
                    <div className="d-flex align-items-center gap-2">
                        <Badge bg={activityCount > 0 ? 'success' : 'light'} text={activityCount > 0 ? 'white' : 'dark'} className="fs-7">
                            {activityCount} {activityCount === 1 ? 'Activity' : 'Activities'}
                        </Badge>
                    </div>
                </td>
                <td>
                    <div className="d-flex gap-1">
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() =>
                                onEdit('target', 'edit', {
                                    targetId: target.targetid,
                                    targetName: target.targetname,
                                    startQuorter: target.startquorter,
                                    endQuorter: target.endquorter,
                                    startQuorterId: target.startquorterid,
                                    endQuorterId: target.endquorterid,
                                })
                            }
                            title="Edit Target"
                        >
                            <AiFillEdit />
                        </Button>

                        <Button size="sm" variant="outline-success" onClick={() => onManageActivities('activity', 'add', { targetId: target.targetid })} title="Add Activity">
                            <FcInspection />
                        </Button>

                        <DropdownButton id={`actions-${target.targetid}`} title="⋯" size="sm" variant="outline-secondary" align="end">
                            <Dropdown.Item as="button" onClick={handleToggleActivities} disabled={loadingActivities}>
                                {loadingActivities ? (
                                    <Spinner animation="border" size="sm" />
                                ) : showActivities ? (
                                    <>
                                        <AiFillEyeInvisible /> Hide Activities
                                    </>
                                ) : (
                                    <>
                                        <AiFillEye /> View Activities
                                    </>
                                )}
                            </Dropdown.Item>

                            <Dropdown.Item as="button" onClick={() => onManageActivities('activity', 'add', { targetId: target.targetid })}>
                                <FcInspection /> Add New Activity
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item as="button" className="text-danger" onClick={() => onDelete(target.targetid)}>
                                <AiFillDelete /> Delete Target
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </td>
            </tr>

            {/* Expandable Activities Row */}
            <tr>
                <td colSpan="7" className="p-0 border-0">
                    <Collapse in={showActivities}>
                        <div className="activities-container p-3 bg-light border-top">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="mb-0 text-dark">
                                    Activities for: <strong className="text-primary">"{target.targetname}"</strong>
                                    <small className="text-muted ms-2">(Target ID: {target.targetid})</small>
                                </h6>
                                <Button size="sm" variant="success" onClick={() => onManageActivities('activity', 'add', { targetId: target.targetid })}>
                                    <FcPlus /> Add Activity
                                </Button>
                            </div>

                            {loadingActivities ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" size="sm" variant="primary" />
                                    <div className="mt-2 small text-muted">Loading activities...</div>
                                </div>
                            ) : activities.length > 0 ? (
                                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <Table size="sm" className="mb-0 bg-white rounded shadow-sm">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="25%">Activity Name</th>
                                                <th width="25%">Estimated Budget</th>
                                                <th width="15%">Target Name</th>
                                                <th width="20%">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activities.map((activity, actIdx) => (
                                                <tr key={activity.activityid || actIdx}>
                                                    <td className="text-muted">{actIdx + 1}</td>
                                                    <td className="fw-semibold">{activity.activityname || 'Unnamed Activity'}</td>
                                                    <td>
                                                        <span className="text-muted small">{activity.estimatedbudget || 'No budget set'}</span>
                                                    </td>
                                                    <td>
                                                        <Badge bg="outline-info" text="dark" className="fs-7">
                                                            {activity.targetname || target.targetname}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-primary"
                                                                onClick={() =>
                                                                    onEdit('activity', 'edit', {
                                                                        activityId: activity.activityid,
                                                                        activityData: activity,
                                                                        targetId: target.targetid,
                                                                    })
                                                                }
                                                                title="Edit Activity"
                                                            >
                                                                <AiFillEdit />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                onClick={() => handleDeleteActivity(activity.activityid)}
                                                                title="Delete Activity"
                                                                disabled={!activity.activityid}
                                                            >
                                                                <AiFillDelete />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-5 text-muted bg-white rounded p-4">
                                    <div className="mb-3">
                                        <FcInspection size={48} />
                                    </div>
                                    <div className="mb-2 fs-6">No activities found for this target</div>
                                    <div className="small mb-3">Target ID: {target.targetid}</div>
                                    <Button size="sm" variant="success" onClick={() => onManageActivities('activity', 'add', { targetId: target.targetid })}>
                                        <FcPlus /> Create First Activity
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Collapse>
                </td>
            </tr>
        </>
    );
};

export default TargetRow;