import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";

import * as Projectdate from "../../../../services/ContractManagement/ContractSetting/projectservice";

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
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        projectref: "",
        fiscalyearcontracttypeid: 0,
        projectlength: 0,
        measurementid: 0,
        measurementname:"",
        projectid: 0,
        maintenancetypeid: 0,
        maintenancetypename: "",
        roadname: "",
        roadid: 0,
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
        measurementname:"",
      projectid: 0,
      maintenancetypeid: 0,
      maintenancetypename: "",
      roadname: "",
      roadid: 0,
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
      banks: [],
      projectType: [],
      fiscalYear: [],
      target: [],
      road: [],
      maintenance: [],
      paternerStatuses: [],
    };
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
  async populateBanks() {
    try {
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
      measurementname: nextProps.measurementname,
      projectid: nextProps.projectid,
      maintenancetypeid: nextProps.maintenancetypeid,
      maintenancetypename: nextProps.maintenancetypename,
      roadname: nextProps.roadname,
      roadid: nextProps.roadid,
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
  roadidHandler(e) {
    this.setState({ roadid: e.target.value });
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

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;
      const projectref="";
      const budget=0;
      await Projectdate.addproject(
        item.projectid,
        item.projecttypeid,
        item.projectdescription,
        item.fiscalyearid,
        item.targetid,
        item.roadid,
        item.maintenancetypeid,
        item.budget,
        item.startdate,
        item.enddate
      );

      toast.success(
        `project data  has been updated successful:
         
          `
      );
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/security/role";
      //this.props.history.push("/security/role");

      //this.props.saveModalDetails(item);
      //(myString.toLowerCase() === 'true');
      //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
      // const item = this.state;
      //this.props.saveModalDetails(item);
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
    const paternerStatuses = this.state.paternerStatuses;
    const banks = this.state.banks;
    const fiscalYear = this.state.fiscalYear;
    const projectType = this.state.projectType;
    const target = this.state.target;
    const road = this.state.road;
    const maintenance = this.state.maintenance;

    return (
      <div
        className="modal fade"
        id="exampleviewModal"
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
                Detail for Road to maintain
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
                {/**-----------------SAP data */}
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>SAP Information</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  <div className="mb-3">
                    {/**-------------------------------------------------------------- */}
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
                            <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="targetname"
                                id="targetname"
                                value={this.state.targetname}
                                
                              />
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**----------------------------------------------------------------- */}
                    {/**---------------------------------------------- */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="col-auto">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              fiscalyear
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="col-auto">

                            <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="fiscalyear"
                                id="fiscalyear"
                                value={this.state.fiscalyear}
                                
                              />
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**----------------------------------------------------------------- */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="col-auto">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Quarter
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="col-auto">

                            <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="startquarter"
                                id="startquarter"
                                value={this.state.startquarter + " / "+ this.state.endquarter}
                                
                              />
                              


                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/**----------------------------------------------------------------- */}
                </Card>
              </div>
              <div className="col">
                {/**-----------------road data */}

                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Road Information</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>
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
                           <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="roadname"
                                id="roadname"
                                value={this.state.roadname}
                              />
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <div className="col-auto">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Road Length
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                          <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="roaddistance"
                                id="roaddistance"
                                value={this.state.roaddistance+" " +this.state.measurementname}
                              />
                         
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <div className="col-auto">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Length to Maintain
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                           <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="projectlength"
                                id="projectlength"
                                value={this.state.projectlength}
                              />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/**----------------------++++++++++++++++++++++++++++++project data */}

                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Maintainance details</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  <div className="row">
                    <div className="col">
                      {/*--------------------------------------------------- */}
                      {/**----------------------------------------------------------------- */}
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
                              
                                <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="projectlength"
                                id="projectlength"
                                value={this.state.maintenancetypename}
                              />
                                
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**------------------------------------------------------------ */}
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="hidden"
                                className="form-control"
                                name="contractorname"
                                id="contractorname"
                                value={this.state.projectid}
                                onChange={(e) => this.projectidHandler(e)}
                              />
                            </div>
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Contract Type
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                               <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="projectlength"
                                id="projectlength"
                                value={this.state.projecttypename}
                              />
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Work description
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              

                              <textarea
                              disabled={true} 
                                id="projectdescription"
                                name="projectdescription"
                                value={this.state.projectdescription}
                                rows="4"
                                cols="8"
                              >
                                
                                
                              </textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>

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
                                budget
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                              disabled={true}
                                type="text"
                                className="form-control"
                                name="budget"
                                id="budget"
                                value={this.state.budget}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>

                    <div className="col">
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
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="startdate"
                                id="startdate"
                                value={this.state.startdate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col"></div>
                    <div className="col">
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
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="enddate"
                                id="enddate"
                                value={this.state.enddate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
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
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
