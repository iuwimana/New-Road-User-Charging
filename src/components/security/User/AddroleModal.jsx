import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";

import { Card,CardFooter, CardHeader, CardBody, Col } from "reactstrap";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import Form from "../../common/form";
import * as userService from "../../../services/userService";
import auth from "../../../services/authService";
import PropTypes from 'prop-types';

class AddroleModal extends Form {
  modalElement = React.createRef();
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        username: "",
        password: "",
        name: "",
        IdNumber: "",
      },

      username: "",
      password: "",
      name: "",
      IdNumber: "",
      user: {},
      errors: {},
      banks: [],
      contractors: [],
      contractmodes: [],
      paternerStatuses: [],
    };
  }

  async componentDidMount() {
    this.modal = new window.bootstrap.Modal(this.modalElement.current);
 
    const user = auth.getJwt();
    this.setState({ user });
  }

  

  usernameHandler(e) {
    this.setState({ username: e.target.value });
  }
  passwordHandler(e) {
    this.setState({ password: e.target.value });
  }
  nameHandler(e) {
    this.setState({ name: e.target.value });
  }
   getDomainFromEmail(email) {
      var regex = /@([^\s@]+)/;
      var matches = email.match(regex);
      if (matches && matches.length > 1) {
        return matches[1];
      }
      return null;
    }

  handleClick = async (e) => {
    try {
      var domain = this.getDomainFromEmail(this.state.username);
      if(domain!=='rmf.gov.rw'){
      toast.error(`domain you use:${domain}  is not RMF Domain(rmf.gov.rw)`)
     } else{
         
      const response = await userService.register(
        this.state.username,
        this.state.password,
        this.state.name
      );
      // auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/security/role";
      
      toast.success(`user  has been updated successful:
       username: ${this.state.username},
       password: ${this.state.password},
       name: ${this.state.name},IdNumber:${this.state.IdNumber}
        `);
        }
        
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error(`error occur:${JSON.stringify(errors)}`);
      }
    }
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <>
      <div className="modal-backdrop" onClick={this.props.onClose} >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          
        <h2>User-Add User</h2>
          <div className="row">
              <div className="col">
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3"></div>
                  <div className="btn-wrapper text-start">
                    {/**------------------------------------------- */}

                    {/**------------------------------------------- */}
                    <div className="row">
                      <div className="col">
                        {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  username
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  id="username"
                                  value={this.state.username}
                                  onChange={(e) => this.usernameHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                      <div className="col">
                        {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  password
                                </label>
                              </div>
                            </div>

                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  value={this.state.password}
                                  onChange={(e) => this.passwordHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"></div>
                      <div className="col">
                        {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Full name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  value={this.state.name}
                                  onChange={(e) => this.nameHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="col-auto"></div>
                      </div>
                    </div>

                    <br></br>
                  </div>
                  <CardFooter>
                <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                AddNew
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.onClose}
              >
                Close
              </button>
                  </CardFooter>
                </Card>
              </div>
            </div>


           
          
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
