import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
class AddUser extends Component {
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

AddUser.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddUser;
