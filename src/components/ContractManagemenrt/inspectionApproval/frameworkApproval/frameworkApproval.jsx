import React, { Component } from "react";
import Modal from "./modal";
//import AddModal from "./addroleModal";
import Rejectionmsg from "./rejectionmsg";
import { toast } from "react-toastify";
import { MdNotificationsActive } from "react-icons/md";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Outcome from "../../../../services/RMFPlanning/outcomeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractIspectionData from "../../../../services/contractinpection/contractinspect";
import * as UserApprovalData from "../../../../services/security/userapprovalservice";
import * as UserData from "../../../../services/security/userServices";
import * as auth from "../../../../services/authService";
import jwtDecode from "jwt-decode";

import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import _ from "lodash";

class FrameworkApproval extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      fiscalyearid: 0,
      fiscalyearsid:0,
      fiscalyear: "",
      outcomename: "",
      outcomeid: 0,
      statuses: "",
      outcomedescription: "",
      subprogramname: "",
      programname: "",
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
      roadname: "",
      roaddistance: 0,
      targetid: 0,
      targetname: "",
      startquartid: 0,
      startquarter: "",
      endquarterid: 0,
      endquarter: "",
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
      serviceorderid: 0,
      damagedlevel: "",
      serviceorderstatus: "",
      isrejected: false,
      rejectionmessage: "",
      rejectionstatus: "",
      serviceorderdescription: "",
      serviceorderamount: 0,

      canapprov: true,
      canreview: true,
      sources: [],
      business: [],
      outcome: [],
      contracts: [],
      banks: [],
      user: [],
      users: [],
      userapprovals: [],
      currentPage: 1,
      pageSize: 6,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
async populateBanks() {
     try {
      
      const { data: fiscalyear } = await FiscalYear.getFiscalyears();
      const response= await FiscalYear.getFiscalyears();
      if (response) {
        const fiscalYears = response.data;
        this.setState({ data: response });
        const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
        const fiscalyear = fiscalYears.map(year => year.fiscalyear);
      //this.setState({ fiscalyearid, fiscalyear });
        this.setState({ fiscalyearsid, fiscalyear });
      }else{
        toast.error("No Fiscal year find......" + fiscalyear);

      }

        
      
    } catch (ex) {
      toast.error("current user data Loading issues......" + ex);
    }
  }
  async componentDidMount() {
    try {
      await this.populateBanks();
      if(this.state.fiscalyearsid===0){
        await this.populateBanks();
        const { data: outcome } =
        await ContractIspectionData.getframeworkcontractinspectionByfiscalyear(
          this.state.fiscalyearsid
        );

        this.setState({ outcome });
      }else{
        await this.populateBanks();
        const { data: outcome } =
        await ContractIspectionData.getframeworkcontractinspectionByfiscalyear(
          this.state.fiscalyearsid
        );

        this.setState({ outcome });

      }
      const user = auth.getJwt();
      this.setState({ user });
      const users = jwtDecode(user);
      this.setState({ users });
      const { data: userapprovals } =
        await UserApprovalData.getuserapprovalevel(users.username, "Inspection");
      this.setState({ userapprovals });
      let approvmode="";
      {
        userapprovals.map(
          (userapprovals) => approvmode= userapprovals.approvallevel
        );
      }
      this.setState({approvmode});
      if (approvmode === "Approv") {
        this.setState({ canapprov: true, canreview: false });
        
      }else if (approvmode === "Verifier") {
        this.setState({ canapprov: false, canreview: true });
      }else if (approvmode === "Initiator") {
        this.setState({ canapprov: false, canreview: false });
      }

      
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching data Please try again later" + ex
      );
    }
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearch = (query) => {
    //const { search } = await Role.getRolesearched(query);

    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedrole,
      outcome: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.serviceorderdescription
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractmode.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.projecttypename.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.serviceorderid)
      filtered = allsources.filter(
        (m) => m.Outcome.serviceorderid === selectedrole.serviceorderid
      );
    ///////////////////  ////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const outcome = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: outcome };
  };
  handleapproval = async (inspectionid) => {
    try {
      const statuse = "Approved";
      if (!inspectionid) {
        toast.info(`the outcome you selected ${inspectionid} doesnot exist`);
      } else {
        await ContractIspectionData.updatefremeworkcontractinspectionstatus(inspectionid,statuse);
        toast.success(`this contract  has been Approved successful`);
      }
    } catch (ex) {
      toast.error(`the Approval of this contract has been failed ${ex}`);
    }
  };

  handlereview = async (inspectionid) => {
    try {
      const statuse = "Verified";
      if (!inspectionid) {
        toast.info(`the User you selected ${inspectionid} doesnot exist`);
      } else {
        await ContractIspectionData.updatefremeworkcontractinspectionstatus(inspectionid,statuse);
        toast.success(`this contract  has been reviewed successful`);
      }
    } catch (ex) {
      toast.error(`the reviewed of this contract has been failed ${ex}`);
    }
  };
  async replaceRejectedMsgItem(index, inspectionid, inspectionstatus) {
    this.setState({
      requiredItem: index,
      inspectionid: inspectionid,
      inspectionstatus: inspectionstatus,
     
    });
  }
  async replaceModalItem(
    index,
    contractid,
    contractdiscription,
    contractbudget,
    contractorstartdate,
    contractorenddate,
    contractmodeid,
    contractmode,
    contractorid,
    contractorname,
    contractoraddress,
    contractoremail,
    contractorphonenumber,
    tinnumber,
    contactpersonfirstname,
    contactpersonmiddlename,
    contactpersonlastname,
    contactpersonemail,
    contactpersonphonenumber,
    maintenancetypeid,
    maintenancetypename,
    roadid,
    roadname,
    roaddistance,
    targetid,
    targetname,
    startquartid,
    startquarter,
    endquarterid,
    endquarter,
    
    projecttypeid,
    projecttypename,
    cancreateserviceorder,
    projectid,
    projectdescription,
    budgetallocatetotheroad,
    projectstartingdate,
    projectendingdate,
    status,
    projectlength,
    projectref,
    measurementname,
    serviceorderid,
    damagedlevel,
    serviceorderstatus,
    isrejected,
    rejectionmessage,
    rejectionstatus,
    serviceorderdescription,
    serviceorderamount
  ) {
    this.setState({
      requiredItem: index,
      contractid: contractid,
      contractdiscription: contractdiscription,
      contractbudget: contractbudget,
      contractorstartdate: contractorstartdate,
      contractorenddate: contractorenddate,
      contractmodeid: contractmodeid,
      contractmode: contractmode,
      contractorid: contractorid,
      contractorname: contractorname,
      contractoraddress: contractoraddress,
      contractoremail: contractoremail,
      contractorphonenumber: contractorphonenumber,
      tinnumber: tinnumber,
      contactpersonfirstname: contactpersonfirstname,
      contactpersonmiddlename: contactpersonmiddlename,
      contactpersonlastname: contactpersonlastname,
      contactpersonemail: contactpersonemail,
      contactpersonphonenumber: contactpersonphonenumber,
      maintenancetypeid: maintenancetypeid,
      maintenancetypename: maintenancetypename,
      roadid: roadid,
      roadname: roadname,
      roaddistance: roaddistance,
      targetid: targetid,
      targetname: targetname,
      startquartid: startquartid,
      startquarter: startquarter,
      endquarterid: endquarterid,
      endquarter: endquarter,
      
      projecttypeid: projecttypeid,
      projecttypename: projecttypename,
      cancreateserviceorder: cancreateserviceorder,
      projectid: projectid,
      projectdescription: projectdescription,
      budgetallocatetotheroad: budgetallocatetotheroad,
      projectstartingdate: projectstartingdate,
      projectendingdate: projectendingdate,
      status: status,
      projectlength: projectlength,
      projectref: projectref,
      measurementname: measurementname,
      serviceorderid: serviceorderid,
      damagedlevel: damagedlevel,
      serviceorderstatus: serviceorderstatus,
      isrejected: isrejected,
      rejectionmessage: rejectionmessage,
      rejectionstatus: rejectionstatus,
      serviceorderdescription: serviceorderdescription,
      serviceorderamount: serviceorderamount,
    });

    try {
      await Outcome.addsappdf(fiscalyear, outcomename, outcomeid);
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

  saveModalDetails(outcome) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.outcome;
    tempbrochure[requiredItem] = outcome;
    this.setState({ outcome: tempbrochure });
  }

  async deleteItem(InstitutionPartenerId) {
    //const { user } = this.state;

    try {
      if (!InstitutionPartenerId) {
        toast.info(`the Institution Partener you selected  doesnot exist`);
      } else {
        await Business.deleteBusinessPaterner(InstitutionPartenerId);
        toast.success(`this Institution Partener has been deleted successful`);
      }
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
          "An Error Occured, while saving InstitutionPartener Please try again later"
        );
      }
    }
  }

  render() {
    const canapprov = this.state.canapprov;
    const canreview = this.state.canreview;
    const { length: count } = this.state.outcome;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: outcome } = this.getPagedData();

    const brochure = outcome.map((outcome, index) => {
      return (
        <tr key={outcome.inspectionid}>
          {" "} 
          <td>{outcome.inspectorname}</td>
          <td>{outcome.purposeofinspection}</td>
          <td>{outcome.observations}</td>
          <td>{outcome.inspectiondate}</td>
          <td>{outcome.inspectionstatus}</td>
          <td>
            {" "}
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  index,
                  outcome.contractid,
                  outcome.contractdiscription,
                  outcome.contractbudget,
                  outcome.contractorstartdate,
                  outcome.contractorenddate,
                  outcome.contractmodeid,
                  outcome.contractmode,
                  outcome.contractorid,
                  outcome.contractorname,
                  outcome.contractoraddress,
                  outcome.contractoremail,
                  outcome.contractorphonenumber,
                  outcome.tinnumber,
                  outcome.contactpersonfirstname,
                  outcome.contactpersonmiddlename,
                  outcome.contactpersonlastname,
                  outcome.contactpersonemail,
                  outcome.contactpersonphonenumber,
                  outcome.maintenancetypeid,
                  outcome.maintenancetypename,
                  outcome.roadid,
                  outcome.roadname,
                  outcome.roaddistance,
                  outcome.targetid,
                  outcome.targetname,
                  outcome.startquartid,
                  outcome.startquarter,
                  outcome.endquarterid,
                  outcome.endquarter,
                  
                  outcome.projecttypeid,
                  outcome.projecttypename,
                  outcome.cancreateserviceorder,
                  outcome.projectid,
                  outcome.projectdescription,
                  outcome.budgetallocatetotheroad,
                  outcome.projectstartingdate,
                  outcome.projectendingdate,
                  outcome.status,
                  outcome.projectlength,
                  outcome.projectref,
                  outcome.measurementname,
                  outcome.serviceorderid,
                  outcome.damagedlevel,
                  outcome.serviceorderstatus,
                  outcome.isrejected,
                  outcome.rejectionmessage,
                  outcome.rejectionstatus,
                  outcome.serviceorderdescription,
                  outcome.serviceorderamount
                )
              }
            >
              View
            </button>{" "}
          </td>
          <td>
            {canreview && outcome.inspectionstatus === "New"  && (
              <button
                className="btn btn-success"
                onClick={() => this.handlereview(outcome.inspectionid)}
              >
                Review
              </button>
            )}
            {canreview && outcome.inspectionstatus === " inspected " && (
              <button
                className="btn btn-success"
                onClick={() => this.handlereview(outcome.inspectionid)} 
              >
                Review
              </button>
            )}
            {canreview && outcome.inspectionstatus === " re-inspected " && (
              <button
                className="btn btn-success"
                onClick={() => this.handlereview(outcome.serviceorderid)} 
              >
                Review
              </button>
            )}

            {canapprov && outcome.inspectionstatus === "Verified" && (
              <button
                className="btn btn-success"
                onClick={() => this.handleapproval(outcome.inspectionid)}
              >
                Approval 
              </button>
            )}
          </td>
          <td>
            {outcome.inspectionstatus !== "Approved" && (
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#exampleModalapprov"
                onClick={() =>
                  this.replaceRejectedMsgItem(
                    index,
                    outcome.inspectionid,
                    outcome.inspectionstatus
                  )
                }
              >
                Reject
              </button>
            )}
          </td>
          <td>
            <button className="btn btn-secondary">
              <MdNotificationsActive />
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.outcome[requiredItem];
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          ></Col>
          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent ">
              
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                {count === 0 && (
                  <>
                    <p>There are no SO in Database.</p>
                  </>
                )}
                {count !== 0 && (
                  <>
                  {/** 
                    <div style={{ textAlign: "center" }}>
                      <SearchBox
                        value={searchQuery}
                        onChange={this.handleSearch}
                      />
                    </div>
                    */}
                    <div className="table-responsive mb-5">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Inspector Name</th>
                            <th>Purpese of Inspection</th>
                            <th>observations</th>
                            <th>inspectiondate</th>
                            <th>status</th>

                            <th>View SO</th>
                            <th>Aproval</th>
                            <th>Reject</th>
                            <th>Reject Msg</th>
                          </tr>
                        </thead>
                        <tbody>{brochure}</tbody>
                      </table>
                    </div>
                    <Modal
                      contractid={this.state.contractid}
                      contractdiscription={this.state.contractdiscription}
                      contractbudget={this.state.contractbudget}
                      contractorstartdate={this.state.contractorstartdate}
                      contractorenddate={this.state.contractorenddate}
                      contractmodeid={this.state.contractmodeid}
                      contractmode={this.state.contractmode}
                      contractorid={this.state.contractorid}
                      contractorname={this.state.contractorname}
                      contractoraddress={this.state.contractoraddress}
                      contractoremail={this.state.contractoremail}
                      contractorphonenumber={this.state.contractorphonenumber}
                      tinnumber={this.state.tinnumber}
                      contactpersonfirstname={this.state.contactpersonfirstname}
                      contactpersonmiddlename={
                        this.state.contactpersonmiddlename
                      }
                      contactpersonlastname={this.state.contactpersonlastname}
                      contactpersonemail={this.state.contactpersonemail}
                      contactpersonphonenumber={
                        this.state.contactpersonphonenumber
                      }
                      maintenancetypeid={this.state.maintenancetypeid}
                      maintenancetypename={this.state.maintenancetypename}
                      roadid={this.state.roadid}
                      roadname={this.state.roadname}
                      roaddistance={this.state.roaddistance}
                      targetid={this.state.targetid}
                      targetname={this.state.targetname}
                      startquartid={this.state.startquartid}
                      startquarter={this.state.startquarter}
                      endquarterid={this.state.endquarterid}
                      endquarter={this.state.endquarter}
                      
                      projecttypeid={this.state.projecttypeid}
                      projecttypename={this.state.projecttypename}
                      cancreateserviceorder={this.state.cancreateserviceorder}
                      projectid={this.state.projectid}
                      projectdescription={this.state.projectdescription}
                      budgetallocatetotheroad={
                        this.state.budgetallocatetotheroad
                      }
                      projectstartingdate={this.state.projectstartingdate}
                      projectendingdate={this.state.projectendingdate}
                      status={this.state.status}
                      projectlength={this.state.projectlength}
                      projectref={this.state.projectref}
                      measurementname={this.state.measurementname}
                      serviceorderid={this.state.serviceorderid}
                      damagedlevel={this.state.damagedlevel}
                      serviceorderstatus={this.state.serviceorderstatus}
                      serviceorderdescription={this.state.serviceorderdescription}
                      serviceorderamount={this.state.serviceorderamount}
                      saveModalDetails={this.saveModalDetails}
                    />
                    <Rejectionmsg
                      inspectionid={this.state.inspectionid}
                      inspectionstatus={this.state.inspectionstatus}
                      
                    />
                  </>
                )}

                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default FrameworkApproval;
