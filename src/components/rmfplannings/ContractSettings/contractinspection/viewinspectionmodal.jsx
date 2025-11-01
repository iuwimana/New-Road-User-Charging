import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";

import * as Serviceorderdate from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractInspection from "../../../../services/contractinpection/contractinspect";
import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";

class viewinspectionModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        tabKey:0,
        serviceid: 0,
        servicename: "",
        discription: "",
        measurementid: 0,
        servicebudget: 0,
        areaofmaintenance: 0,
        

        projectid: 0,
        contractid: 0,
        contractdiscription: "",
        contractbudget: 0,
        contractorstartdate: "",
        contractorenddat: "",
        contractmodeid: 0,
        contractmode: "",
        contractorid: 0,
        contractorname: "",
        contractoraddress: "",
        contractoremail: "",
        contractorphonenumber: "",
        tinnumber: "",
        contactpersonfirstname: "",
        contactpersonmiddlename: "",
        contactpersonlastname: "",
        contactpersonemail: "",
        contactpersonphonenumber: "",
        maintenancetypeid: 0,
        maintenancetypename: "",
        roadid: 0,
        roadname: "",
        roaddistance: 0,
        targetid: 0,
        targetname: "",
        startquartid: 0,
        startquarter: "",
        endquarterid: 0,
        endquarter: "",
        fiscalyearid: 0,
        fiscalyear: "",
        projecttypeid: 0,
        projecttypename: "",
        
        projectdescription: "",
        budgetallocatetotheroad: 0,
        projectstartingdate: "",
        projectendingdate: "",
        status: "",
        projectlength: 0,
        projectref: "",
        measurementname: "",

        inspectionid: 0,
        serviceorderid: 0,
        isworkloadfinished: false,
        istimelineexpected: false,
        observations: "",
        isreadyforpayment: false,
        serviceorderdescription: "",
        damagedlevel: "",
      },
      inspectionid: 0,
      serviceorderid: 0,
      isworkloadfinished: false,
      istimelineexpected: false,
      observations: "",
      isreadyforpayment: false,
      serviceorderdescription: "",
      damagedlevel: "",
      projectid: 0,
      contractid: 0,
      contractdiscription: "",
      contractbudget: 0,
      contractorstartdate: "",
      contractorenddat: "",
      contractmodeid: 0,
      contractmode: "",
      contractorid: 0,
      contractorname: "",
      contractoraddress: "",
      contractoremail: "",
      contractorphonenumber: "",
      tinnumber: "",
      contactpersonfirstname: "",
      contactpersonmiddlename: "",
      contactpersonlastname: "",
      contactpersonemail: "",
      contactpersonphonenumber: "",
      maintenancetypeid: 0,
      maintenancetypename: "",
      roadid: 0,
      roadname: "",
      roaddistance: 0,
      targetid: 0,
      targetname: "",
      startquartid: 0,
      startquarter: "",
      endquarterid: 0,
      endquarter: "",
      fiscalyearid: 0,
      fiscalyear: "",
      projecttypeid: 0,
      projecttypename: "",
      
      projectdescription: "",
      budgetallocatetotheroad: 0,
      projectstartingdate: "",
      projectendingdate: "",
      status: "",
      projectlength: 0,
      projectref: "",
      measurementname: "",
      serviceid: 0,
      servicename: "",
      discription: "",
      measurementid: 0,
      servicebudget: 0,
      areaofmaintenance: 0,
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
      damagedlevel: nextProps.damagedlevel,
      serviceorderdescription: nextProps.serviceorderdescription,

      projectid: nextProps.projectid,
      contractid: nextProps.contractid,
      contractdiscription: nextProps.contractdiscription,
      contractbudget: nextProps.contractbudget,
      contractorstartdate: nextProps.contractorstartdate,
      contractorenddat: nextProps.contractorenddat,
      contractmodeid: nextProps.contractmodeid,
      contractmode: nextProps.contractmode,
      contractorid: nextProps.contractorid,
      contractorname: nextProps.contractorname,
      contractoraddress: nextProps.contractoraddress,
      contractoremail: nextProps.contractoremail,
      contractorphonenumber: nextProps.contractorphonenumber,
      tinnumber: nextProps.tinnumber,
      contactpersonfirstname: nextProps.contactpersonfirstname,
      contactpersonmiddlename: nextProps.contactpersonmiddlename,
      contactpersonlastname: nextProps.contactpersonlastname,
      contactpersonemail: nextProps.contactpersonemail,
      contactpersonphonenumber: nextProps.contactpersonphonenumber,
      maintenancetypeid: nextProps.maintenancetypeid,
      maintenancetypename: nextProps.maintenancetypename,
      roadid: nextProps.roadid,
      roadname: nextProps.roadname,
      roaddistance: nextProps.roaddistance,
      targetid: nextProps.targetid,
      targetname: nextProps.targetname,
      startquartid: nextProps.startquartid,
      startquarter: nextProps.startquarter,
      endquarterid: nextProps.endquarterid,
      endquarter: nextProps.endquarter,
      fiscalyearid: nextProps.fiscalyearid,
      fiscalyear: nextProps.fiscalyear,
      projecttypeid: nextProps.projecttypeid,
      projecttypename: nextProps.projecttypename,
      projectdescription: nextProps.projectdescription,
      budgetallocatetotheroad: nextProps.budgetallocatetotheroad,
      projectstartingdate: nextProps.projectstartingdate,
      projectendingdate: nextProps.projectendingdate,
      status: nextProps.status,
      projectlength: nextProps.projectlength,
      projectref: nextProps.projectref,
      measurementname: nextProps.measurementname,
      serviceid: nextProps.serviceid,
      
      servicename: nextProps.servicename,
      discription: nextProps.discription,
      measurementid: nextProps.measurementid,
      servicebudget: nextProps.servicebudget,
      areaofmaintenance: nextProps.areaofmaintenance,
    });
  }

  inspectioniddHandler(e) {
    this.setState({ inspectionid: e.target.value });
  }
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }
  isworkloadfinishedHandler(e) {
    this.setState({ isworkloadfinished: e.target.checked });
  }
  istimelineexpectedHandler(e) {
    this.setState({ istimelineexpected: e.target.checked });
  }
  observationsHandler(e) {
    this.setState({ observations: e.target.value });
  }
  isreadyforpaymentHandler(e) {
    this.setState({ isreadyforpayment: e.target.checked });
  }
  serviceorderdescriptionHandler(e) {
    this.setState({ serviceorderdescription: e.target.value });
  }
  damagedlevelHandler(e) {
    this.setState({ damagedlevel: e.target.value });
  }

  handleClick = async (e) => {
    try {
      const data = this.state;
      const inspectionid=0;
      await ContractInspection.addcontractinspection(
        inspectionid,
        data.serviceorderid,
        data.isworkloadfinished,
        data.istimelineexpected,
        data.observations,
        data.isreadyforpayment
      );
      

      toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${data.serviceorderid},
       isworkloadfinished: ${data.isworkloadfinished},
       istimelineexpected: ${data.istimelineexpected},
       observations: ${data.observations},
       isreadyforpayment: ${data.isreadyforpayment} `);
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
        id="exampleviewinspectionModal"
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
                              value={
                                this.state.startquarter +
                                " / " +
                                this.state.endquarter
                              }
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
                            value={
                              this.state.roaddistance +
                              " " +
                              this.state.measurementname
                            }
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
                                id="serviceorderdescription"
                                name="serviceorderdescription"
                                value={this.state.serviceorderdescription}
                                rows="4"
                                cols="8"
                              ></textarea>
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
                                name="contractbudget"
                                id="contractbudget"
                                value={this.state.contractbudget}
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
                                name="contractorstartdate"
                                id="contractorstartdate"
                                value={this.state.contractorstartdate}
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
                                name="contractorenddat"
                                id="contractorenddat"
                                value={this.state.contractorenddat}
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
                                <small>Inspection details</small>
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
                                Inspector Name
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="text"
                                className="form-control"
                                name="isworkloadfinished"
                                id="isworkloadfinished"
                                value={this.state.isworkloadfinished}
                                onChange={(e) => this.isworkloadfinishedHandler(e)}
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
                                name="serviceorderid"
                                id="serviceorderid"
                                value={this.state.serviceorderid}
                                onChange={(e) => this.serviceorderidHandler(e)}
                              />
                            </div>
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                               Purpose of Inspection
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
                                can be paied
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="checkbox"
                                className="form-control"
                                name="isreadyforpayment"
                                id="isreadyforpayment"
                                value={this.state.isreadyforpayment}
                                onChange={(e) => this.isreadyforpaymentHandler(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
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
                                Observation
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <textarea
                                id="observations"
                                name="observations"
                                value={this.state.observations}
                                onChange={(e) => this.observationsHandler(e)}
                                rows="4"
                                cols="8"
                              ></textarea>
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
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                evaluate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default viewinspectionModal;
