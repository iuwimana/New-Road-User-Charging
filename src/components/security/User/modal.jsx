import React, { Component } from "react";
import * as Role from "../../../services/security/roleServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import { Card,CardFooter, CardHeader, CardBody, Col } from "reactstrap";
import PropTypes from 'prop-types';
class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      userid: 0,
      roleid: 0,
      rolename: "",
      user: {},
      roles: [],
      errors: {},
    };
  }

  async populateBanks() {
    try {
      const { data: roles } = await Role.getRoles();
      this.setState({ roles });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  async componentDidMount() {
    try {
      await this.populateBanks();
      const user = auth.getJwt();
      this.setState({ user });
    } catch (ex) {
      toast.error("Loading Issue............" + ex);
    }
  }

  componentWillReceiveProps(nextProps) {
    try {
      this.setState({
        userid: nextProps.userid,
      });
    } catch (ex) {
      toast.error(`the activation of this user has failed ${ex}`);
    }
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  UserIdHandler(e) {
    this.setState({ userid: e.target.value });
  }
  RoleIDIdHandler(e) {
    this.setState({ roleid: e.target.value });
  }
  isSystemRoleHandler(e) {
    this.setState({ issystemrole: e.target.checked });
  }

  async handleSave() {
    const { user } = this.state;

    try {
      const item = this.state;
      const RoleUserID = 0;

      await Role.addRoleUsers(RoleUserID, item.roleid, item.userid);
      window.location = "/";
      toast.success(
        `role with role: ${item.roleid}  and isSystemRole:${item.userid} has been updated successful`
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    const roles = this.state.roles;
    return (
      <>
      <div className="modal-backdrop" onClick={this.props.onClose} >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>User-Grant User Role</h2>
          <Card className=" shadow border-0">


          <div className="mb-3">
                <input
                  type="hidden"
                  className="form-control"
                  value={this.state.userid}
                  onChange={(e) => this.UserIdHandler(e)}
                  placeholder="Userid"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  UserRole
                </label>
                <div className="col-auto">
                  <select
                    name="roleid"
                    id="roleid"
                    className="form-control"
                    onChange={(e) => this.RoleIDIdHandler(e)}
                  >
                    <option value={this.state.roleid}>
                      {this.state.rolename}
                    </option>
                    {roles.map((role) => (
                      <option key={role.roleid} value={role.roleid}>
                        {role.rolename}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CardFooter>

              <button
                type="button"
                onClick={this.props.onClose}
              >
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
                GrantRole
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
