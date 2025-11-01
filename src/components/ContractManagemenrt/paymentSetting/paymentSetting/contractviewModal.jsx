import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge } from 'reactstrap';
import './viewstyle.css';
const ViewProjectModal = ({ isOpen, toggle, projectData }) => {
    if (!projectData) return null;

    const parseTeamMembers = (data) => {
        if (!data) return [];

        try {
            // If it's already an array, return it
            if (Array.isArray(data)) return data;

            // If it's a string, try to parse it as JSON
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data);
                return Array.isArray(parsedData) ? parsedData : [parsedData];
            }

            return [];
        } catch (error) {
            console.error('Error parsing team members:', error);
            return [];
        }
    };

    const teamMembers = parseTeamMembers(projectData.evaluationteam || projectData.teamMembersData);

    //console.log('Raw team members data:', projectData.evaluationteam || projectData.teamMembersData);
    console.log('Parsed team members:', teamMembers);
    const start = new Date(projectData.startdate);
    const end = new Date(projectData.enddate);
    const startev = new Date(projectData.evaluationstartdate);
    const endev = new Date(projectData.evaluationenddate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const monthsev = (endev.getFullYear() - startev.getFullYear()) * 12 + (endev.getMonth() - startev.getMonth());

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="custommodal">
            <ModalHeader toggle={toggle} className="bg-primary text-white">
                <h4 className="mb-0">Project Details - {projectData.roodname || projectData.contractdiscription}</h4>
            </ModalHeader>
            <ModalBody className="modal-body-full">
                <div className="row">
                    {/* Basic Project Information */}
                    <div className="col-md-6">
                        <div className="section-title mb-3">
                            <h5>Basic Information</h5>
                        </div>

                        <div className="detail-item">
                            <strong>Road Name:&nbsp;</strong> {projectData.roadname}
                        </div>

                        <div className="detail-item">
                            <strong>Project Description:&nbsp; </strong> {projectData.contractdiscription}
                        </div>
                        <div className="detail-item">
                            <strong>Project Length:&nbsp;</strong> {projectData.contractlength} {projectData.measurementname || 'km'}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="section-title mb-3">
                            <h5>Contract Details</h5>
                        </div>
                        <div className="detail-item">
                            <strong>Contract Amount:&nbsp;</strong> {parseInt(projectData.contractbudget || projectData.amount).toLocaleString()} Rwf
                        </div>
                        <div className="detail-item">
                            <strong>Contract Reference:&nbsp;</strong> {projectData.contractrefnumber}
                        </div>

                        <div className="detail-item">
                            <strong>Contractor:&nbsp;</strong> {projectData.contractorname} (ID: {projectData.contractorid})
                        </div>
                        <div className="detail-item">
                            <strong>Status:&nbsp;</strong>
                            <Badge color={getStatusColor(projectData.status)} className="ml-2">
                                {projectData.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    {/* Maintenance & Fiscal Information */}
                    <div className="col-md-6">
                        <div className="section-title mb-3">
                            <h5>Maintenance & Planning</h5>
                        </div>
                        <div className="detail-item">
                            <strong>Maintenance Type:&nbsp; </strong> {projectData.maintenancetypename} (ID: {projectData.maintenancetypeid})
                        </div>
                        <div className="detail-item">
                            <strong>Maintenance Duration: &nbsp;</strong> {months} months
                        </div>
                        <div className="detail-item">
                            <strong>Target: &nbsp;</strong> {projectData.targetname} (ID: {projectData.targetid})
                        </div>

                        <div className="detail-item">
                            <strong>Project Type:&nbsp; </strong> {projectData.contracttypename} (ID: {projectData.contracttypeid})
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="section-title mb-3">
                            <h5>Timeline</h5>
                        </div>
                        <div className="detail-item">
                            <strong>Start Date:&nbsp; </strong> {formatDate(projectData.startdate)}
                        </div>
                        <div className="detail-item">
                            <strong>End Date: &nbsp;</strong> {formatDate(projectData.enddate)}
                        </div>
                        <div className="detail-item">
                            <strong>Start Quarter: &nbsp;</strong> {projectData.startquarter}
                        </div>
                        <div className="detail-item">
                            <strong>End Quarter: &nbsp;</strong> {projectData.endquarter}
                        </div>
                    </div>
                </div>

                <hr />

                {/* Evaluation Contract Section */}
                <div className="row">
                    <div className="col-12">
                        <div className="section-title mb-3">
                            <h5>Evaluation Contract Details</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="detail-item">
                                    <strong>Evaluation ID: &nbsp;</strong> {projectData.evaluation_contractid}
                                </div>
                                <div className="detail-item">
                                    <strong>Evaluation Amount:&nbsp;</strong>
                                    Rwf{Number(projectData.evaluationamount || 0).toLocaleString()}
                                </div>
                                <div className="detail-item">
                                    <strong>Evaluation Duration:&nbsp; </strong> {monthsev} months
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="detail-item">
                                    <strong>Evaluation Company:&nbsp;</strong> {projectData.evaluation_contractorname} (ID: {projectData.evaluation_contractorid})
                                </div>
                                <div className="detail-item">
                                    <strong>Evaluation Start:&nbsp;</strong> {formatDate(projectData.evaluationstartdate)}
                                </div>
                                <div className="detail-item">
                                    <strong>Evaluation End:&nbsp;</strong> {formatDate(projectData.evaluationenddate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                {/* Team Members Section */}
                {teamMembers && teamMembers.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title mb-3">
                                <h5>Evaluation Team Members ({teamMembers.length})</h5>
                            </div>
                            <div className="table-responsive custom-table-container" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '10px' }}>
                                <table className="table table-striped table-hover custom-table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Evaluation ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamMembers.map((member, index) => (
                                            <tr key={member.evaluationteamid || index}>
                                                <td>{member.evaluationteamid}</td>
                                                <td>{member.fullname}</td>
                                                <td>
                                                    <Badge color={getRoleColor(member.role)}>{member.role}</Badge>
                                                </td>
                                                <td>{member.evaluationteamid}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Information */}
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="section-title mb-3">
                            <h5>Additional Information</h5>
                        </div>
                        <div className="detail-item">
                            <strong>Measurement:&nbsp;</strong> {projectData.measurementname} (ID: {projectData.measurementid})
                        </div>
                        <div className="detail-item">
                            <strong>Can Create Service Order:&nbsp;</strong>
                            <Badge color={projectData.cancreateserviceorder ? 'success' : 'secondary'} className="ml-2">
                                {projectData.cancreateserviceorder ? 'Yes' : 'No'}
                            </Badge>
                        </div>
                        <div className="detail-item">
                            <strong>Is Locked:&nbsp;</strong>
                            <Badge color={projectData.islocked ? 'danger' : 'success'} className="ml-2">
                                {projectData.islocked ? 'Locked' : 'Unlocked'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
                {/** 
                <Button color="primary" onClick={() => {
                    // Add edit functionality here
                    console.log('Edit project:', projectData);
                    toggle();
                }}>
                    Edit Project
                </Button>
                <Button color="info" onClick={() => window.print()}>
                    Print Details
                </Button>
                */}
            </ModalFooter>
        </Modal>
    );
};

// Helper functions
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (error) {
        return dateString;
    }
};

const getStatusColor = (status) => {
    if (!status) return 'secondary';
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete')) return 'success';
    if (statusLower.includes('progress')) return 'primary';
    if (statusLower.includes('pending')) return 'warning';
    if (statusLower.includes('cancel')) return 'danger';
    if (statusLower.includes('execution')) return 'info';
    if (statusLower.includes('signed')) return 'success';
    return 'secondary';
};

const getRoleColor = (role) => {
    if (!role) return 'secondary';
    const roleLower = role.toLowerCase();
    if (roleLower.includes('engineer')) return 'primary';
    if (roleLower.includes('inspector')) return 'info';
    if (roleLower.includes('manager')) return 'success';
    if (roleLower.includes('director')) return 'warning';
    return 'secondary';
};

ViewProjectModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    projectData: PropTypes.shape({
        projectid: PropTypes.number,
        contractid: PropTypes.number,
        roadname: PropTypes.string,
        roadid: PropTypes.number,
        projectdescription: PropTypes.string,
        projectlength: PropTypes.number,
        measurementname: PropTypes.string,
        budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        contractrefnumber: PropTypes.string,
        projectref: PropTypes.string,
        contractorname: PropTypes.string,
        contractorid: PropTypes.number,
        status: PropTypes.string,
        maintenancetypename: PropTypes.string,
        maintenancetypeid: PropTypes.number,
        maintenanceDuration: PropTypes.number,
        targetname: PropTypes.string,
        targetid: PropTypes.number,
        fiscalyear: PropTypes.string,
        fiscalyearid: PropTypes.number,
        projecttypename: PropTypes.string,
        projecttypeid: PropTypes.number,
        startdate: PropTypes.string,
        enddate: PropTypes.string,
        startquarter: PropTypes.string,
        endquarter: PropTypes.string,
        evaluationid: PropTypes.number,
        evaluationamount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        evaluationDuration: PropTypes.number,
        companyname: PropTypes.string,
        company: PropTypes.number,
        evaluationstartdate: PropTypes.string,
        evaluationenddate: PropTypes.string,
        teamMembers: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
        teamMembersData: PropTypes.array,
        measurementid: PropTypes.number,
        cancreateserviceorder: PropTypes.bool,
        islocked: PropTypes.bool,
        description: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
};

export default ViewProjectModal;
