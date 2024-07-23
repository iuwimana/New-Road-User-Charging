import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card,CardFooter, CardHeader, CardBody, Col } from "reactstrap";
class AddUser extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-backdrop" onClick={this.props.onClose} >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>User-Add User</h2>
          <div className="row" >
              <div className="col">
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-1"></div>
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
                                  Username
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
                                  Password
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
    );
  }
}

AddUser.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddUser;