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

class Modal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        serviceid:0,
        serviceorderid:0,
        servicename:"",
        discription:"",
        measurementid:0,
        servicebudget:0,
        areaofmaintenance:0
      },

      serviceid:0,
        serviceorderid:0,
        servicename:"",
        discription:"",
        measurementid:0,
        servicebudget:0,
        areaofmaintenance:0,
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
      
      serviceid: nextProps.serviceid,
      serviceorderid: nextProps.serviceorderid,
      servicename: nextProps.servicename,
      discription: nextProps.discription,
      measurementid: nextProps.measurementid,
      servicebudget: nextProps.servicebudget,
      areaofmaintenance: nextProps.areaofmaintenance,
    });
  }

  serviceiddHandler(e) {
    this.setState({ serviceid: e.target.value });
  }
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }
  servicenameHandler(e) {
    this.setState({ servicename: e.target.value });
  }
  damagedlevelHandler(e) {
    this.setState({ damagedlevel: e.target.value });
  }
  discriptionHandler(e) {
    this.setState({ discription: e.target.value });
  }
  measurementidHandler(e) {
    this.setState({ measurementid: e.target.value });
  }
  servicebudgetHandler(e) {
    this.setState({ servicebudget: e.target.value });
  }
  areaofmaintenanceHandler(e) {
    this.setState({ areaofmaintenance: e.target.value });
  }

  handleClick = async (e) => {
    try {
      const data = this.state;

      await Serviceorderdate.addserviceorder(
        data.serviceorderid,
        data.damagedlevel,
        data.serviceorderdescription,
        data.projectid,
        data.contractid
      );

      toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${data.serviceorderid},
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
        id="exampleserviceModal"
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
                Service list to achieve contract
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
                      type="text"
                      className="form-control"
                      name="serviceorderid"
                      id="serviceorderid"
                      value={this.state.serviceorderid}
                      onChange={(e) => this.serviceorderidHandler(e)}
                    />
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
                          Service name
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          name="servicename"
                          id="servicename"
                          value={this.state.servicename}
                          onChange={(e) =>
                            this.servicenameHandler(e)
                          }
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>
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
                          Service Length
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          name="areaofmaintenance"
                          id="areaofmaintenance"
                          value={this.state.areaofmaintenance}
                          onChange={(e) =>
                            this.areaofmaintenanceHandler(e)
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
                          Measurement unit
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          name="measurementid"
                          id="measurementid"
                          value={this.state.measurementid}
                          onChange={(e) =>
                            this.serviceorderdescriptionHandler(e)
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
                          Service Description
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">

                        <textarea name="discription" value={this.state.discription} rows={4} cols={40} />
                      
                      </div>
                    </div>
                  </div>
                </div>


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
                          Budget allocated
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          name="servicebudget"
                          id="servicebudget"
                          value={this.state.servicebudget}
                          onChange={(e) =>
                            this.servicebudgetHandler(e)
                          }
                            
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col">
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
            <div className="cards">
              <div className="row">
                {/**------------------------------------------- */}
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <div className="col-auto">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Contract Estimated Budget
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="text"
                          className="form-control"
                          name="serviceorderdescription"
                          id="serviceorderdescription"
                          value={this.state.serviceorderdescription}
                          onChange={(e) =>
                            this.serviceorderdescriptionHandler(e)
                          }
                        />
                      </div>
                    </div>
                  </div>
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
                            service Total Budget
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                          <input
                            type="text"
                            className="form-control"
                            name="serviceorderdescription"
                            id="serviceorderdescription"
                            value={this.state.serviceorderdescription}
                            onChange={(e) =>
                              this.serviceorderdescriptionHandler(e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>


                    {/**-------------------------------------------- */}

                    <br></br>
                  </div>
                </Card>
              </div>
            </div>

            <div className="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
