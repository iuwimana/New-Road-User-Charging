import React, { Component } from 'react';
import * as Role from '../../../services/security/roleServices';
import * as Securable from '../../../services/security/securableService';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            SecurableID: 0,
            RoleID: 0,
            RolePermissionID: 0,
            SecurableName: '',
            RoleName: '',
            isSystemRole: false,
            CanView: false,
            CanModify: false,
            CanExecute: false,
            CanDelete: false,
            CanCreate: false,
            CanAccess: false,
            user: {},
            roles: [],
            errors: {},
        };
    }

    async componentDidMount() {
        try {
            const { data: roles } = await Role.getRoles();
            const user = auth.getJwt();
            this.setState({ user, roles });
        } catch (ex) {
            return toast.error('Data Loading issues....' + ex);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            this.setState({
                SecurableID: nextProps.SecurableID,
                RoleID: nextProps.RoleID,
                RolePermissionID: nextProps.RolePermissionID,
                SecurableName: nextProps.SecurableName,
                RoleName: nextProps.RoleName,
                isSystemRole: Boolean(nextProps.isSystemRole),
                CanView: Boolean(nextProps.CanView),
                CanModify: Boolean(nextProps.CanModify),
                CanExecute: Boolean(nextProps.CanExecute),
                CanDelete: Boolean(nextProps.CanDelete),
                CanCreate: Boolean(nextProps.CanCreate),
                CanAccess: Boolean(nextProps.CanAccess),
            });
        } catch (ex) {
            return toast.error('Data Loading issues....' + ex);
        }
    }

    CanAccessHandler(e) {
        this.setState({ CanAccess: e.target.checked });
    }

    CanCreateHandler(e) {
        this.setState({ CanCreate: e.target.checked });
    }
    CanExecuteHandler(e) {
        this.setState({ CanExecute: e.target.checked });
    }
    CanModifyHandler(e) {
        this.setState({ CanModify: e.target.checked });
    }
    CanViewHandler(e) {
        this.setState({ CanView: e.target.checked });
    }

    SecurableNameHandler(e) {
        this.setState({ SecurableName: e.target.value });
    }
    RoleIDIdHandler(e) {
        this.setState({ RoleID: e.target.value });
    }
    CanDeleteHandler(e) {
        this.setState({ CanDelete: e.target.checked });
    }
    isSystemRoleHandler(e) {
        this.setState({ isSystemRole: e.target.checked });
    }

    async handleSave() {
        const { user } = this.state;

        try {
            const item = this.state;
            if (item.RolePermissionID) {
                var RolePermissionID = item.RolePermissionID;
            } else {
                RolePermissionID = 0;
            }

            await Securable.addrolepermission(RolePermissionID, item.RoleID, item.SecurableID, item.CanAccess, item.CanCreate, item.CanView, item.CanModify, item.CanDelete, item.CanExecute);
            toast.success(
                `role with RolePermissionID: ${RolePermissionID} ,
        RoleID: ${item.RoleID} and 
        SecurableID:${item.SecurableID} CanDelete ${item.CanDelete} CanExecute ${item.CanExecute}
         CanAccess:${item.CanAccess} CanCreate ${item.CanCreate}
          CanView:${item.CanView} CanModify ${item.CanModify}
         has been updated successful`
            );
            window.location = "/security/securables";
            //const { state } = this.props.location;
            //window.location = state ? state.from.pathname : "/security/role";
            //this.props.history.push("/security/role");

            //this.props.saveModalDetails(item);
            //(myString.toLowerCase() === 'true');
            //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
            // const item = this.state;
            //this.props.saveModalDetails(item);
            window.location = "/security/securables";
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
        const roles = this.state.roles;
        if (!this.props.show) {
            return null;
        }
        return (
            <>
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Securable-Set Permission</h2>
                    <Card className=" shadow border-0">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    
                                    <div className="col-auto">
                                        <select name="RoleID" id="RoleID" className="form-control" onChange={(e) => this.RoleIDIdHandler(e)} disabled>
                                            <option value={this.state.RoleID}>{this.state.RoleName}</option>
                                            {roles.map((role) => (
                                                <option key={role.roleid} value={role.roleid}>
                                                    {role.rolename}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">
                                        SecurableName
                                    </label>
                                    <label className="form-control" onChange={(e) => this.SecurableNameHandler(e)}>
                                        {this.state.SecurableName}
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">IsSystemRole</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="IsSystemRole"
                                            type="checkbox"
                                            
                                            value={this.state.isSystemRole}
                                            checked={this.state.isSystemRole}
                                            onChange={(e) => this.isSystemRoleHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanView</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="CanView"
                                            type="checkbox"
                                            value={this.state.CanView}
                                            checked={this.state.CanView}
                                            onChange={(e) => this.CanViewHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanModify</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="IsSystemRole"
                                            type="checkbox"
                                            value={this.state.CanModify}
                                            checked={this.state.CanModify}
                                            onChange={(e) => this.CanModifyHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanExecute</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="CanExecute"
                                            type="checkbox"
                                            value={this.state.CanExecute}
                                            checked={this.state.CanExecute}
                                            onChange={(e) => this.CanExecuteHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanDelete</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="CanDelete"
                                            type="checkbox"
                                            value={this.state.CanDelete}
                                            checked={this.state.CanDelete}
                                            onChange={(e) => this.CanDeleteHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanCreate</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="CanCreate"
                                            type="checkbox"
                                            value={this.state.CanCreate}
                                            checked={this.state.CanCreate}
                                            onChange={(e) => this.CanCreateHandler(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">CanAccess</label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            name="CanAccess"
                                            type="checkbox"
                                            value={this.state.CanAccess}
                                            checked={this.state.CanAccess}
                                            onChange={(e) => this.CanAccessHandler(e)}
                                        />
                                    </div>
                                </div>
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
                                SetRolePermission
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            </>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
