import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import * as Serviceorderdate from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractInspection from "../../../../services/contractinpection/contractinspect";
import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import AddinspectioneModal from "./addinspectionmodal";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "react-responsive-modal/styles.css";
class AddServiceModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        serviceid: 0,
        serviceorderid: 0,
        servicename: "",
        discription: "",
        measurementid: 0,
        servicebudget: 0,
        areaofmaintenance: 0,
        serviceorderid: 0,
        damagedlevel: "",
        serviceorderdescription: "",

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
        projectid: 0,
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
        inspectorname: "",
        purposeofinspection: "",
        inspectiondate: "",
      },
      openModal: false,
      inspectionid: 0,
      serviceorderid: 0,
      inspectorname: "",
      purposeofinspection: "",
      inspectiondate: "",
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
      projectid: 0,
      projectdescription: "",
      budgetallocatetotheroad: 0,
      projectstartingdate: "",
      projectendingdate: "",
      status: "",
      projectlength: 0,
      projectref: "",
      measurementname: "",
      serviceid: 0,
      serviceorderid: 0,
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
      business: [],
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
      const { data: business } =
        await ContractInspection.getcontractinspections();

      const { data: banks } = await bank.getbanks();
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({
        business,
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



  onClickButton = () => this.setState({ openModal: true });

  onCloseModal = () => this.setState({ openModal: false });

  componentWillReceiveProps(nextProps) {
    this.setState({
      serviceorderid: nextProps.serviceorderid,
      damagedlevel: nextProps.damagedlevel,
      serviceorderdescription: nextProps.serviceorderdescription,

      projectid: nextProps.projectid,
      inspectorname: nextProps.inspectorname,
      purposeofinspection: nextProps.purposeofinspection,
      inspectiondate: nextProps.inspectiondate,

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
      projectid: nextProps.projectid,
      projectdescription: nextProps.projectdescription,
      budgetallocatetotheroad: nextProps.budgetallocatetotheroad,
      projectstartingdate: nextProps.projectstartingdate,
      projectendingdate: nextProps.projectendingdate,
      status: nextProps.status,
      projectlength: nextProps.projectlength,
      projectref: nextProps.projectref,
      measurementname: nextProps.measurementname,
      serviceid: nextProps.serviceid,
      serviceorderid: nextProps.serviceorderid,
      servicename: nextProps.servicename,
      discription: nextProps.discription,
      measurementid: nextProps.measurementid,
      servicebudget: nextProps.servicebudget,
      areaofmaintenance: nextProps.areaofmaintenance,
    });
    toast.success(`Business Paterner with   has been updated successful:${nextProps.areaofmaintenance}`)
  }
  //----------------------------------------------------------------------

  inspectioniddHandler(e) {
    this.setState({ inspectionid: e.target.value });
  }
  inspectornameHandler(e) {
    this.setState({ inspectorname: e.target.value });
  }
  purposeofinspectionHandler(e) {
    this.setState({ purposeofinspectiond: e.target.value });
  }
  inspectiondateHandler(e) {
    this.setState({ inspectiondate: e.target.value });
  }
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }
  isworkloadfinishedHandler(e) {
    this.setState({ isworkloadfinished: e.target.value });
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
      const inspectionid = 0;
      await ContractInspection.addcontractinspection(
        inspectionid,
        data.serviceorderid,
        data.inspectorname,
        data.purposeofinspection,
        data.observations
      );

      toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${data.serviceorderid},
       inspectorname: ${data.inspectorname},
       purposeofinspection: ${data.purposeofinspection},
       observations: ${data.observations},
       inspectionid: ${data.inspectionid} `);
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
    const business = this.state.business;
    const brochure = business.map((business, index) => {
      return (
        <tr key={business.inspectionid}>
          <td>{business.inspectorname}</td>

          <td>{business.purposeofinspection}</td>
          <td>{business.observations}</td>
          <td>{business.serviceorderdescription}</td>
          <td>{business.damagedlevel}</td>
          <td>{business.inspectiondate}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addinspectionModal"
              onClick={() =>
                this.handleshow(this.state.projectid, this.state.contractid)
              }
            >
              <AiFillEdit />
              Update
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(business.institutionpartenerid)}
            >
              <AiFillDelete />
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
     
          <div className="modal-content">
            
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
                                <small>Inspection detail</small>
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

                  <div style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-success"
                      data-toggle="modal"
                      onClick={this.onClickButton}
                    >
                      <FcPlus />
                      AddNew
                    </button>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Inspector Name</th>
                        <th>Inspection Purpose</th>
                        <th>Observation</th>
                        <th>service order description</th>
                        <th>damaged level</th>
                        <th>Inspection Date</th>

                        <th>Evaluate</th>
                      </tr>
                    </thead>
                    <tbody>{brochure}</tbody>
                  </table>
                  
                  <Modal  dialogClassName="my-modal" show={this.state.openModal} onHide={this.onCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Inspection</Modal.Title>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={this.onCloseModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </Modal.Header>

                    <Modal.Body>
                  
                      <AddinspectioneModal
                      serviceorderid={this.state.serviceorderid} />
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>

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
            </div>
          </div>
        
    );
  }
}

export default AddServiceModal;
