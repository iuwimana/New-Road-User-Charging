import React, { Component } from 'react';
import * as role from '../../../services/security/roleServices';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
class AddroleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            roleid: 0,
            rolename: '',
            description: '',
            isSystemRole: false,
            user: {},
            errors: {},
        };
    }

    componentDidMount() {
        const user = auth.getJwt();
        this.setState({ user });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            roleid: nextProps.roleid,
            rolename: nextProps.rolename,
            description: nextProps.description,
            isSystemRole: Boolean(nextProps.isSystemRole),
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }

    rolenameHandler(e) {
        this.setState({ rolename: e.target.value });
    }
    descriptionHandler(e) {
        this.setState({ description: e.target.value });
    }
    isSystemRoleHandler(e) {
        this.setState({ isSystemRole: e.target.checked });
    }

    async handleSave() {
        const { user } = this.state;

        try {
            const item = this.state;
            const roleid = 0;

            await role.addRoles(user, roleid, item.rolename, item.description, item.isSystemRole);
            toast.success(`role with rolename: ${item.rolename} ,description: ${item.description} and isSystemRole:${item.isSystemRole} has been updated successful`);
            window.location = "/security/role";
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
                toast.error('An Error Occured, while saving role Please try again later');
            }
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <>
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Role-Add Role</h2>
                    <Card className=" shadow border-0">
                        <div className="mb-3"></div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                RoleName
                            </label>
                            <input type="text" className="form-control" value={this.state.rolename} onChange={(e) => this.rolenameHandler(e)} placeholder="RoleName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Description
                            </label>
                            <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.descriptionHandler(e)} placeholder="Description" />
                        </div>
                        <div className="mb-3">
                            <div className="col-auto">
                                <label htmlFor="exampleFormControlInput1">IsSystemRole</label>
                            </div>
                            <div className="col-auto">
                                <input
                                    name="IsSystemRole"
                                    type="checkbox"
                                    value={this.state.isSystemRole}
                                    checked={this.state.isSystemRole.value}
                                    onChange={(e) => this.isSystemRoleHandler(e)}
                                />
                            </div>
                        </div>

                        <CardFooter>
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => {
                                    this.handleSave();
                                }}
                            >
                                AddRole
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            </>
        );
    }
}
AddroleModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddroleModal;
