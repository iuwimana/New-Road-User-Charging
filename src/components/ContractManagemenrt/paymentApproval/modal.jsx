import React, { Component } from "react";
import Joi from "joi-browser";
import { MdNotificationsActive } from "react-icons/md";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../services/RevenuRessources/paternerStatusServices";
import "./Modal.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        fiscalyear: "",
        contractid: 0,
        contractdiscription: "",
        contractbudget: 0,
        contractorstartdate: "",
        contractorenddate: "",
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
        inspectionstatus:"",
        roadname: "",
        roaddistance: 0,
        targetid: 0,
        targetname: "",
        startquartid: 0,
        startquarter: "",
        endquarterid: 0,
        endquarter: "",
        fiscalyearid: 0,
        projecttypeid: 0,
        projecttypename: "",
        cancreateserviceorder: false,
        projectid: 0,
        projectdescription: "",
        budgetallocatetotheroad: 0,
        projectstartingdate: "",
        projectendingdate: "",
        status: "",
        projectlength: 0,
        projectref: "",
        measurementname: "",
      },
      contractid: 0,
      contractdiscription: "",
      contractbudget: 0,
      contractorstartdate: "",
      contractorenddate: "",
      contractmodeid: 0,
      contractmode: "",
      contractorid: 0,
      contractorname: "",
      contractoraddress: "",
      contractoremail: "",
      contractorphonenumber: "",
      tinnumber: "",
      inspectionstatus:"",
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
      projecttypeid: 0,
      projecttypename: "",
      cancreateserviceorder: false,
      projectid: 0,
      projectdescription: "",
      budgetallocatetotheroad: 0,
      projectstartingdate: "",
      projectendingdate: "",
      status: "",
      projectlength: 0,
      projectref: "",
      measurementname: "",
      user: {},
      errors: {},
      banks: [],
      outcomes: [],
      paternerStatuses: [],
    };
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      OutcomeId: nextProps.OutcomeId,

      contractid: nextProps.contractid,
      contractdiscription: nextProps.contractdiscription,
      contractbudget: nextProps.contractbudget,
      contractorstartdate: nextProps.contractorstartdate,
      contractorenddate: nextProps.contractorenddate,
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
      cancreateserviceorder: nextProps.cancreateserviceorder,
      projectid: nextProps.projectid,
      projectdescription: nextProps.projectdescription,
      budgetallocatetotheroad: nextProps.budgetallocatetotheroad,
      projectstartingdate: nextProps.projectstartingdate,
      projectendingdate: nextProps.projectendingdate,
      status: nextProps.status,
      projectlength: nextProps.projectlength,
      projectref: nextProps.projectref,
      measurementname: nextProps.measurementname,
      inspectionstatus:nextProps.inspectionstatus,
    });
  }
  async populateBanks() {
    try {
      const item = this.state;
      const { data: banks } = await bank.getbanks();

      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({ banks, paternerStatuses });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }
  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  PartenerStatusIdHandler(e) {
    this.setState({ PartenerStatusId: e.target.value });
  }
  BankIdHandler(e) {
    this.setState({ BankId: e.target.value });
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
  async handleSave() {}

  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        dialogClassName="my-modal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "7700px", width: "100%", height: "100%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <div style={{ alignItems: "left" }}>
                  RMF-Contract Management-Approv Contract for{" "}
                  {this.state.fiscalyear}
                </div>
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

            <div className="table-responsive mb-5">
              <Col
                style={{
                  textAlign: "left",
                  alignItems: "left",
                  justifyContent: "center",
                }}
              >
                <div className="row">
                  <div className="col">
                    <Card className=" shadow border-0">
                      <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "left" }}>
                              <h1>contract</h1>
                            </div>
                          </h1>
                        </div>
                        <div className="btn-wrapper text-center"></div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="row">
                          <div className="col"><b>Contract description</b></div>
                          <div className="col">{this.state.contractdiscription}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contract type</b></div>
                          <div className="col">{this.state.projecttypename}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contract mode</b></div>
                          <div className="col">{this.state.contractmode}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Budget</b></div>
                          <div className="col">{this.state.contractbudget}</div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <label><b>Start date</b></label></div>
                          <div className="col">
                            <label>{this.state.contractorstartdate}
                           </label></div>
                        </div>
                        <div className="row">
                          <div className="col"><b>End Date</b></div>
                          <div className="col">{this.state.contractorenddate}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Status</b></div>
                          <div className="col">{this.state.inspectionstatus}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="col">
                    <Card className=" shadow border-0">
                      <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "center" }}>
                              <h1>contractor</h1>
                            </div>
                          </h1>
                        </div>
                        <div className="btn-wrapper text-center"></div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="row">
                          <div className="col"><b>Contractor</b></div>
                          <div className="col">{this.state.contractorname}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contractor Address</b></div>
                          <div className="col">{this.state.contractoraddress}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contractor email</b></div>
                          <div className="col">{this.state.contractoremail}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contractor phone number</b></div>
                          <div className="col">{this.state.contractorphonenumber}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Contractor Tin Number</b></div>
                          <div className="col">{this.state.tinnumber}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Card className=" shadow border-0">
                      <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "center" }}>
                              <h1>Contribution to SAP</h1>
                            </div>
                          </h1>
                        </div>
                        <div className="btn-wrapper text-center"></div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="row">
                          <div className="col"><b>Target</b></div>
                          <div className="col">{this.state.targetname}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Quarter</b></div>
                          <div className="col">
                            From:{this.state.startquarter}{" "}
                            To:{this.state.endquarter}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="col">
                    <Card className=" shadow border-0">
                      <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "center" }}>
                              <h1>Road to Maintein</h1>
                            </div>
                          </h1>
                        </div>
                        <div className="btn-wrapper text-center"></div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="row">
                          <div className="col"><b>Road name</b></div>
                          <div className="col">{this.state.roadname}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Road Length</b></div>
                          <div className="col">{this.state.roaddistance}</div>
                        </div>
                        <div className="row">
                          <div className="col"><b>Road length to Maintein</b></div>
                          <div className="col">{this.state.projectlength}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
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
