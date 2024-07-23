import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";

import * as Serviceorderdate from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";

import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import "./serceorder.css";
class AddroleModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        serviceorderid: 0,
        serviceorderdescription: "",
        damagedlevel: "",
        serviceorderstatus: "",
        contractid: 0,
        projectid: 0,
        amount:0,
      },

      serviceorderid: 0,
      amount:0,
      contractid: 0,
      projectid: 0,
      serviceorderdescription: "",
      damagedlevel: "",
      serviceorderstatus: "",
      user: {},
      errors: {},
      measurement: [],
      banks: [],
      projectType: [],
      fiscalYear: [],
      target: [],
      road: [],
      maintenance: [],
      paternerStatuses: [],
    };
  }
  async populateBanks() {
    try {
      const { data: measurement } = await Measurement.getmeasurements();
      const { data: projectType } = await ProjectType.getcontracttypes();
      const { data: fiscalYear } = await FiscalYear.getFiscalyears();
      const { data: target } = await Target.gettargets();
      const { data: road } = await Road.getroads();
      const { data: maintenance } = await Maintenance.getmaintenances();

      const { data: banks } = await bank.getbanks();
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({
        banks,
        paternerStatuses,
        projectType,
        fiscalYear,
        target,
        road,
        maintenance,
        measurement,
      });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      serviceorderid: nextProps.serviceorderid,
      serviceorderdescription: nextProps.serviceorderdescription,
      damagedlevel: nextProps.damagedlevel,
      contractid: nextProps.contractid,
      projectid: nextProps.projectid,
      serviceorderstatus: nextProps.serviceorderstatus,
      amount:nextProps.Amount,
    });
  }
 amountHandler(e) {
    this.setState({ amount: e.target.value });
  }
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }
  serviceorderstatusHandler(e) {
    this.setState({ serviceorderstatus: e.target.value });
  }
  serviceorderdescriptionHandler(e) {
    this.setState({ serviceorderdescription: e.target.value });
  }
  damagedlevelHandler(e) {
    this.setState({ damagedlevel: e.target.value });
  }
  contractidHandler(e) {
    this.setState({ contractid: e.target.value });
  }
  projectidHandler(e) {
    this.setState({ projectid: e.target.value });
  }

  handleClick = async (e) => {
    try {
      const data = this.state;
      const serviceorderid = 0;

      await Serviceorderdate.addserviceorder(
        serviceorderid,
        data.damagedlevel,
        data.serviceorderdescription,
        data.projectid,
        data.contractid,
        data.amount
      );

      toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${serviceorderid},
       serviceorderdescription: ${data.serviceorderdescription},
       damagedlevel: ${data.damagedlevel},
       contractid: ${data.contractid},
       projectid: ${data.projectid} `);
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
  };

  render() {
    const fiscalYear = this.state.fiscalYear;
    const projectType = this.state.projectType;
    const target = this.state.target;
    const road = this.state.road;
    const maintenance = this.state.maintenance;
    const measurement = this.state.measurement;
    return (
      <div
        className="modal fade"
        id="exampleAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "1370px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Service Order
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="row">
              <div className="col">
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3"></div>
                  <div className="btn-wrapper text-start">
                    {/**------------------------------------------- */}
                    <input
                      type="hidden"
                      className="form-control"
                      name="contractmodeid"
                      id="contractmodeid"
                      value={this.state.serviceorderid}
                      onChange={(e) => this.serviceorderidHandler(e)}
                    />
                    {/**------------------------------------------- */}

                    {/**------------------------------------------- */}
                    <input
                      type="hidden"
                      className="form-control"
                      name="projectid"
                      id="projectid"
                      value={this.state.projectid}
                      onChange={(e) => this.projectidHandler(e)}
                    />
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
                                  Service Order discription
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <textarea
                                  className="textarea"
                                  name="serviceorderdescription"
                                  id="serviceorderdescription"
                                  value={this.state.serviceorderdescription}
                                  onChange={(e) =>
                                    this.serviceorderdescriptionHandler(e)
                                  }
                                  rows="10"
                                  cols="50"
                                  placeholder="detailed explanation of contract service"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                      <div className="col">
                        {/**------------------------------------------- */}
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <div className="row">
                                <div className="col">
                                  <div className="col-auto">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Road Demaged Level
                                    </label>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="col-auto">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="damagedlevel"
                                      id="damagedlevel"
                                      value={this.state.damagedlevel}
                                      onChange={(e) =>
                                        this.damagedlevelHandler(e)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                  ServiceOrrder Amount
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="amount"
                                  id="amount"
                                  value={this.state.amount}
                                  onChange={(e) => this.amountHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                    </div>

                        {/**------------------------------------------- */}
                      </div>
                    </div>
                    

                    <br></br>
                  </div>
                </Card>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
