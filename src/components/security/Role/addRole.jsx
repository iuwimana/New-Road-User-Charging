import React from 'react';
//import { Redirect } from "react-router-dom";
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Form from '../../common/form';
import * as role from '../../../services/security/roleServices';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
class AddRole extends Form {
    state = {
        data: { rolename: '', description: '', isSystemRole: false },
        user: {},
        errors: {},
    };

    schema = {
        rolename: Joi.string().required().label('rolename'),
        description: Joi.string().label('description'),
        isSystemRole: Joi.bool().label('isSystemRole'),
    };
    componentDidMount() {
        const user = auth.getJwt();
        this.setState({ user });
    }
    doSubmit = async (e) => {
        const { user } = this.state;
        try {
            const { data } = this.state;
            //toast.info("An Error Occured" + data.username + data.password);
            if (data.rolename === '' && data.description === '') {
                toast.info(`Those Field are Required, Please fill it!! ${data.rolename} and ${data.description}`);
            } else if (data.rolename === '') {
                toast.info('rolename is Required, Please fill it!!');
            } else if (data.description === '') {
                toast.info('description is Required, Please fill it!!');
            } else {
                const RoleID = 0;
                await role.addRoles(user, RoleID, data.rolename, data.description, data.isSystemRole);
                toast.success(`role has been saved successful ${RoleID} ${data.rolename} ${data.description} ${data.isSystemRole}`);
                //const { state } = this.props.location;
                //window.location = state ? state.from.pathname : "/security/role";
                //this.props.history.push('/security/role');
                window.location = "/security/role";
            }
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
    };
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Col lg="5" md="7">
                        <Card className=" shadow border-0">
                            <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <h1>
                                        <small>Add New Role</small>
                                    </h1>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <form onSubmit={this.handleSubmit}>
                                    {this.renderInput('rolename', 'Rolename')}
                                    {this.renderInput('description', 'Description')}
                                    {this.renderChackBox('isSystemRole', 'IsSystemRole')}
                                    {this.rendernodisabledButton('AddRole')}
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </div>
        );
    }
}
AddRole.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddRole;
