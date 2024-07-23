import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import * as ServiceData from '../../../services/ContractManagement/ContractSetting/servicesService';
import * as ServiceOrderData from '../../../services/ContractManagement/ContractSetting/serviceOrdersService';
import * as Outcome from '../../../services/RMFPlanning/outcomeService';

import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import * as RejectMSGData from '../../../services/common/rejectionmessageservice';
import * as PaternerStatuses from '../../../services/RevenuRessources/paternerStatusServices';
import * as BusinessPaterner from '../../../services/RevenuRessources/businessPaternerServices';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Rejectionmsg extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            data: {
                outcomeid: 0,
                statuses: '',
                statuse: '',
                rejectionmessage: '',
            },
            outcomeid: 0,
            statuses: '',
            rejectionmessage: '',
            user: {},
            errors: {},
            banks: [],
            paternerStatuses: [],
            services: [],
        };
    }
    schema = {
        serviceorderid: Joi.number().required(),
        rejectionmessage: Joi.string().required().label('rejectionmessage'),
    };

    async componentDidMount() {
        const user = await auth.getCurrentUser();
        this.setState({ user });
    }

    async handleSave(e) {
        try {
            const Rejectionmessageid = 0;
            const Rejectionmessage = this.state.rejectionmessage;
            const Rejectedby = this.state.user.username;
            const Rejectionlevel = this.state.statuses;
            const itemrejectedon = 'Planing';
            const statuse = 'rected on ' + this.state.statuses;

            e.preventDefault();
            await RejectMSGData.addrejectionmessage(Rejectionmessageid, Rejectionmessage, Rejectedby, Rejectionlevel, itemrejectedon);

            if (this.state.statuses === 'New') {
                const statuse = 'rejected on second level';
                await Outcome.updateoutcomestatus(this.state.outcomeid, statuse);
            } else if (this.state.statuses === 'rejected on first level') {
                const statuse = 'rejected on second level';
                await Outcome.updateoutcomestatus(this.state.outcomeid, statuse);
            } else if (this.state.statuses === 'Verified') {
                const statuse = 'rejected on first level';

                await Outcome.updateoutcomestatus(this.state.outcomeid, statuse);
            }

            toast.success(`Rejection has initiated successfull`);
            //window.location.reload(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.rolename = ex.response.data;
                toast.error('Error:' + errors.rolename);
                this.setState({ errors });
            } else if (ex.response && ex.response.status === 409) {
                const errors = { ...this.state.errors };
                errors.rolename = ex.response.data;
                toast.error('Error:' + errors.rolename);
                this.setState({ errors });
            } else {
                toast.error('An Error Occured, while saving Program data Please try again later');
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            outcomeid: nextProps.outcomeid,
            statuses: nextProps.statuses,
        });
    }

    serviceorderidHandler(e) {
        this.setState({ serviceorderid: e.target.value });
    }

    rejectionmessageHandler(e) {
        this.setState({ rejectionmessage: e.target.value });
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <>
                <div className="modal-backdrop" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CardHeader>
                            <h1>
                                <div style={{ textAlign: 'center' }}>
                                    <h1> Reject Outcome</h1>
                                </div>
                            </h1>
                        </CardHeader>

                        <div className="flex items-center justify-center">
                            <Col
                                style={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Col
                                    style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                ></Col>
                                <Card className=" shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form onSubmit={this.handleSave}>
                                            <div className="row">
                                                <div className="col">
                                                    <div>
                                                        <div className="mb-3">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <Form.Group>
                                                                        <Form.Control
                                                                            type="hidden"
                                                                            placeholder="serviceorderid *"
                                                                            name="serviceorderid"
                                                                            value={this.state.serviceorderid}
                                                                            onChange={(e) => this.serviceorderidHandler(e)}
                                                                            required
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*--------------------------------------------------------------- */}
                                                        <div className="mb-3">
                                                            <Form.Label>Comment</Form.Label>

                                                            <Form.Group>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    placeholder="Rejection Reason *"
                                                                    name="rejectionmessage"
                                                                    value={this.state.rejectionmessage}
                                                                    onChange={(e) => this.rejectionmessageHandler(e)}
                                                                    required
                                                                />
                                                            </Form.Group>

                                                            <br></br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="success" onClick={this.handleSave} block>
                                                Reject
                                            </Button>
                                            <Button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                                Close
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
Rejectionmsg.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default Rejectionmsg;
