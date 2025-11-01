import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";

import * as Projectdate from "../../../../services/ContractManagement/ContractSetting/projectservice";

import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";

class AddroleModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        projectref: "",
        fiscalyearcontracttypeid: 0,
        projectlength: 0,
        measurementid: 0,
        projectid: 0,
        measurementid: 0,
        measurementname: "",
        maintenancetypeid: 0,
        maintenancetypename: "",
        roadname: "",
        roodid: 0,
        roaddistance: 0,
        targetname: "",
        targetid: 0,
        startquarter: "",
        startquartid: 0,
        endquarter: "",
        endquarterid: 0,
        fiscalyear: "",
        fiscalyearid: 0,
        projecttypename: "",

        projecttypeid: 0,
        projectdescription: "",
        budget: 0,
        startdate: "",
        enddate: "",
      },
      projectref: "",
      fiscalyearcontracttypeid: 0,
      projectlength: 0,
      measurementid: 0,

      projectid: 0,
      measurementid: 0,
      measurementname: "",
      maintenancetypeid: 0,
      maintenancetypename: "",
      roadname: "",
      roodid: 0,
      roaddistance: 0,
      targetname: "",
      targetid: 0,
      startquarter: "",
      startquartid: 0,
      endquarter: "",
      endquarterid: 0,
      fiscalyear: "",
      fiscalyearid: 0,
      projecttypename: "",

      projecttypeid: 0,
      projectdescription: "",
      budget: 0,
      startdate: "",
      enddate: "",
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
      projectref: nextProps.projectref,
      fiscalyearcontracttypeid: nextProps.fiscalyearcontracttypeid,
      projectlength: nextProps.projectlength,
      measurementid: nextProps.measurementid,
      projectid: nextProps.projectid,
      maintenancetypeid: nextProps.maintenancetypeid,
      maintenancetypename: nextProps.maintenancetypename,
      roadname: nextProps.roadname,
      roodid: nextProps.roadid,
      roaddistance: nextProps.roaddistance,
      targetname: nextProps.targetname,
      targetid: nextProps.targetid,
      startquarter: nextProps.startquarter,
      startquartid: nextProps.startquartid,
      endquarter: nextProps.endquarter,
      endquarterid: nextProps.endquarterid,
      fiscalyear: nextProps.fiscalyear,
      fiscalyearid: nextProps.fiscalyearid,
      projecttypename: nextProps.projecttypename,

      projecttypeid: nextProps.projecttypeid,
      projectdescription: nextProps.projectdescription,
      budget: nextProps.budget,
      startdate: nextProps.startdate,
      enddate: nextProps.enddate,
    });
    
  }
  schema = {
    InstitutionPartenerId: Joi.number().required(),
    InstitutionPartenerName: Joi.string()
      .required()
      .label("InstitutionPartenerName"),
    AccountNumber: Joi.string().required().label("AccountNumber"),
    partenerstatusid: Joi.number().required(),
    bankid: Joi.number().required(),
  };

  projectrefHandler(e) {
    this.setState({ projectref: e.target.value });
  }
  fiscalyearcontracttypeidHandler(e) {
    this.setState({ fiscalyearcontracttypeid: e.target.value });
  }
  projectlengthHandler(e) {
    this.setState({ projectlength: e.target.value });
  }
  measurementidHandler(e) {
    this.setState({ measurementid: e.target.value });
  }
  projectidHandler(e) {
    this.setState({ projectid: e.target.value });
  }
  maintenancetypeidHandler(e) {
    this.setState({ maintenancetypeid: e.target.value });
  }
  maintenancetypenameHandler(e) {
    this.setState({ maintenancetypename: e.target.value });
  }
  roadnameHandler(e) {
    this.setState({ roadname: e.target.value });
  }
  roodidHandler(e) {
    this.setState({ roodid: e.target.value });
  }
  roaddistanceHandler(e) {
    this.setState({ roaddistance: e.target.value });
  }
  targetnameHandler(e) {
    this.setState({ targetname: e.target.value });
  }
  targetidHandler(e) {
    this.setState({ targetid: e.target.value });
  }
  startquarterHandler(e) {
    this.setState({ startquarter: e.target.value });
  }
  startquartidHandler(e) {
    this.setState({ startquartid: e.target.value });
  }
  endquarterHandler(e) {
    this.setState({ endquarter: e.target.value });
  }
  endquarteridHandler(e) {
    this.setState({ endquarterid: e.target.value });
  }
  fiscalyearHandler(e) {
    this.setState({ fiscalyear: e.target.value });
  }
  fiscalyearidHandler(e) {
    this.setState({ fiscalyearid: e.target.value });
  }
  projecttypenameHandler(e) {
    this.setState({ projecttypename: e.target.value });
  }

  projecttypeidHandler(e) {
    this.setState({ projecttypeid: e.target.value });
  }
  projectdescriptionHandler(e) {
    this.setState({ projectdescription: e.target.value });
  }
  budgetHandler(e) {
    this.setState({ budget: e.target.value });
  }
  startdateHandler(e) {
    this.setState({ startdate: e.target.value });
  }
  enddateHandler(e) {
    this.setState({ enddate: e.target.value });
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  PartenerStatusIdHandler(e) {
    this.setState({ partenerstatusid: e.target.value });
  }
  BankIdHandler(e) {
    this.setState({ bankid: e.target.value });
  }
  InstitutionPartenerIdHandler(e) {
    this.setState({ InstitutionPartenerId: e.target.value });
  }
  InstitutionPartenerNameHandler(e) {
    this.setState({ InstitutionPartenerName: e.target.value });
  }

  AccountNumberHandler(e) {
    this.setState({ AccountNumber: e.target.value });
  }

  handleClick = async (e) => {
    try {
      const data = this.state;
      const projectid = 0;
      await Projectdate.addproject(
        projectid,
        data.projectdescription,
        data.targetid,
        data.roodid,
        data.maintenancetypeid,
        data.budget,
        data.startdate,
        data.enddate,
        data.projectref,
        data.fiscalyearcontracttypeid,
        data.projectlength,
        data.measurementid   
        
        
        
      );

      toast.success(
        `project data  has been updated successful:
        projectid:${projectid},
        data.projectdescription:${data.projectdescription},
        data.targetid:${data.targetid},
        data.roodid:${data.roodid},
        data.maintenancetypeid:${data.maintenancetypeid},
        data.budget:${data.budget},
        data.startdate:${data.startdate},
        data.enddate:${data.enddate},
        data.projectref:${data.projectref},
        data.fiscalyearcontracttypeid:${data.fiscalyearcontracttypeid},
        data.projectlength:${data.projectlength},
        data.measurementid:${data.measurementid} 
         
          `
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
                Add Project
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
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Road details</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <div className="row">
                      <div className="col">
                        {/**------------------------------------------- */}
                        <input
                          type="hidden"
                          className="form-control"
                          name="fiscalyearcontracttypeid"
                          id="fiscalyearcontracttypeid"
                          value={this.state.fiscalyearcontracttypeid}
                          onChange={(e) =>
                            this.fiscalyearcontracttypeidHandler(e)
                          }
                        />

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  RefNumber
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="projectref"
                                  id="projectref"
                                  value={this.state.projectref}
                                  onChange={(e) => this.projectrefHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Road
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <select
                                  name="roodid"
                                  id="roodid"
                                  className="form-control"
                                  onChange={(e) => this.roodidHandler(e)}
                                >
                                  <option value={this.state.roodid}>
                                    {this.state.roodname}
                                  </option>
                                  {road.map((road) => (
                                    <option
                                      key={road.roodid}
                                      value={road.roodid}
                                    >
                                      {road.roodname}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
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
                                  Work discription
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="projectdescription"
                                  id="projectdescription"
                                  value={this.state.projectdescription}
                                  onChange={(e) =>
                                    this.projectdescriptionHandler(e)
                                  }
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
                        {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  project length
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="projectlength"
                                  id="projectlength"
                                  value={this.state.projectlength}
                                  onChange={(e) => this.projectlengthHandler(e)}
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
                        {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Measurement Unit
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <select
                                  name="measurementid"
                                  id="measurementid"
                                  className="form-control"
                                  onChange={(e) => this.measurementidHandler(e)}
                                >
                                  <option value={this.state.measurementid}>
                                    {this.state.measurementname}
                                  </option>
                                  {measurement.map((measurement) => (
                                    <option
                                      key={measurement.measurementid}
                                      value={measurement.measurementid}
                                    >
                                      {measurement.measurementname}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
                      </div>
                    </div>
                    

                    <br></br> 
                  </div>
                </Card>
              </div>
              <div className="col">
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Maintenance details</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
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
                                  Maintenance type
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <select
                                  name="maintenancetypeid"
                                  id="maintenancetypeid"
                                  className="form-control"
                                  onChange={(e) =>
                                    this.maintenancetypeidHandler(e)
                                  }
                                >
                                  <option value={this.state.maintenancetypeid}>
                                    
                                  </option>
                                  {maintenance.map((maintenance) => (
                                    <option
                                      key={maintenance.maintenancetypeid}
                                      value={maintenance.maintenancetypeid}
                                    >
                                      {maintenance.maintenancetypename}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
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
                                  target
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <select
                                  name="targetid"
                                  id="targetid"
                                  className="form-control"
                                  onChange={(e) => this.targetidHandler(e)}
                                >
                                  <option value={this.state.targetid}>
                                    
                                  </option>
                                  {target.map((target) => (
                                    <option
                                      key={target.targetid}
                                      value={target.targetid}
                                    >
                                      {"Output : " +
                                        target.outputname +
                                        " With target: " +
                                        target.targetname}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
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
                                  budget
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="budget"
                                  id="budget"
                                  value={this.state.budget}
                                  onChange={(e) => this.budgetHandler(e)}
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
                        {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  startdate
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="startdate"
                                  id="startdate"
                                  value={this.state.startdate}
                                  onChange={(e) => this.startdateHandler(e)}
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
                        {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  enddate
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="enddate"
                                  id="enddate"
                                  value={this.state.enddate}
                                  onChange={(e) => this.enddateHandler(e)}
                                />
                              </div>
                            </div>
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
