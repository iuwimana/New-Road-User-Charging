import React, { Component } from "react";
//import Modal from "./modal";
//import AddModal from "./addroleModal";
import AddserviceModal from "./addserviceModel";
import ViewinspectionModal from "./viewinspectionmodal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import { MdOutlineVisibility } from "react-icons/md";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class Inspection extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      data: {
        serviceorderid: 0,
        serviceorderdescription: "",
        damagedlevel: "",
        serviceorderstatus: "",
        contractid: 0,
        projectid: 0,
      },
      openModal: false,
      value: this.props.location.state,
      projectid: 0,
      serviceorderid: 0,
      serviceorderdescription: "",
      damagedlevel: "",
      serviceorderstatus: "",
      sources: [],
      business: [],
      banks: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
  async componentDidMount() {
    try {
      const { state } = this.props.location;
      if (!state.contractid && state.projectid) {
        toast.error(`error while loading Fiscal year:${state.contractid}`);
      } else {
        const contractid = state.contractid;
        const projectid = state.projectid;

        const { data: business } =
          await ServiceOrderData.getserviceorderBycontractId(state.contractid);
        if (!business) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ business, contractid, projectid });
        }
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching business data Please try again later" +
          ex
      );
    }
  }
    onClickButton = () => this.setState({ openModal: true });

  onCloseModal = () => this.setState({ openModal: false });

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
      business: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter((m) =>
        m.serviceorderdescription
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.serviceorderid)
      filtered = allsources.filter(
        (m) => m.Business.serviceorderid === selectedrole.serviceorderid
      );
    ///////////////////////////////////////////serviceorderid serviceorderdescription damagedlevel serviceorderstatus
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
    this.setState({ openModal: true })
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }
  handleshow(index) {
    this.setState({ openModal: true })
  }

  async deleteItem(serviceorderid) {
    //const { user } = this.state;

    try {
      if (!serviceorderid) {
        toast.info(`the serviceorder you selected  doesnot exist`);
      } else {
        await ServiceOrderData.deleteserviceorder(serviceorderid);
        toast.success(`this serviceorder has been deleted successful`);
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
    const { length: count } = this.state.business;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: business } = this.getPagedData();
    if (business == []) {
      return toast.error("An Error Occured,data fetching ...");
    } else {
      const brochure = business.map((business, index) => {
        return (
          <tr key={business.serviceorderid}>
            <td>{business.roadname}</td>

            <td>{business.roaddistance + "" + business.measurementname}</td>
            <td>{business.contractbudget + "Rwf"}</td>
            <td>{business.serviceorderdescription}</td>
            <td>{business.damagedlevel}</td>
            <td>{business.serviceorderstatus}</td>
           

            <td>
              <button
              className="btn btn-primary"
              data-toggle="modal"
              
                 onClick={() => this.replaceModalItem(index)}
              >
                <AiFillEdit />
                Evaluate
              </button>
            </td>
             
          </tr>
        );
      });

      const requiredItem = this.state.requiredItem;
      let modalData = this.state.business[requiredItem];
      const contractid = this.state.contractid;
      const projectid = this.state.projectid;

      
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
                <div className="text-muted text-center mt-2 mb-3">
                  <h1>
                    <div style={{ textAlign: "center" }}>
                      <h1>Inspection</h1>
                    </div>
                  </h1>
                </div>
                <div className="btn-wrapper text-center"></div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div>
                  <div>
                    {count === 0 && (
                      <>
                        <p>There are no Service order to inspect .</p>
                      </>
                    )}
                    {count !== 0 && (
                      <>
                        <div style={{ textAlign: "center" }}>
                          <SearchBox
                            value={searchQuery}
                            onChange={this.handleSearch}
                          />
                        </div>
                        <div className="table-responsive mb-5">

                        <table className="table">
                          <thead>
                            <tr>
                              <th>Road</th>
                              <th>Road Length</th>
                              <th>contract Budget</th>
                              <th>service order description</th>
                              <th>damaged level</th>
                              <th>service order status</th>

                              

                              <th>Evaluate</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        </div>
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
                  
                     <AddserviceModal
                          serviceorderid={modalData.serviceorderid}
                          damagedlevel={modalData.damagedlevel}
                          serviceorderdescription={
                            modalData.serviceorderdescription
                          }
                          projectid={modalData.projectid}
                          contractid={modalData.contractid}
                          contractdiscription={modalData.contractdiscription}
                          contractbudget={modalData.contractbudget}
                          contractorstartdate={modalData.contractorstartdate}
                          contractorenddat={modalData.contractorenddate}
                          contractmodeid={modalData.contractmodeid}
                          contractmode={modalData.contractmode}
                          contractorid={modalData.contractorid}
                          contractorname={modalData.contractorname}
                          islocal={modalData.islocal}
                          contractoraddress={modalData.contractoraddress}
                          contractoremail={modalData.contractoremail}
                          contractorphonenumber={modalData.contractorphonenumber}
                          tinnumber={modalData.tinnumber}
                          contactpersonfirstname={modalData.contactpersonfirstname}
                          contactpersonmiddlename={modalData.contactpersonmiddlename}
                          contactpersonlastname={modalData.contactpersonlastname}
                          contactpersonemail={modalData.contactpersonemail}
                          contactpersonphonenumber={modalData.contactpersonphonenumber}
                          maintenancetypeid={modalData.maintenancetypeid}
                          maintenancetypename={modalData.maintenancetypename}
                          roadid={modalData.roadid}
                          roadname={modalData.roadname}
                          roaddistance={modalData.roaddistance}
                          targetid={modalData.targetid}
                          targetname={modalData.targetname}
                          startquartid={modalData.startquartid}
                          startquarter={modalData.startquarter}
                          endquarterid={modalData.endquarterid}
                          endquarter={modalData.endquarter}
                          fiscalyearid={modalData.fiscalyearid}
                          fiscalyear={modalData.fiscalyear}
                          projecttypeid={modalData.projecttypeid}
                          projecttypename={modalData.projecttypename}
                          projectdescription={modalData.projectdescription}
                          budgetallocatetotheroad={modalData.budgetallocatetotheroad}
                          projectstartingdate={modalData.projectstartingdate}
                          projectendingdate={modalData.projectendingdate}
                          status={modalData.status}
                          projectlength={modalData.projectlength}
                          projectref={modalData.projectref}
                          measurementname={modalData.measurementname}
                          saveModalDetails={this.saveModalDetails}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>

                        <ViewinspectionModal
                        serviceorderid={modalData.serviceorderid}
                          damagedlevel={modalData.damagedlevel}
                          serviceorderdescription={
                            modalData.serviceorderdescription
                          }
                          projectid={modalData.projectid}
                          contractid={modalData.contractid}
                          contractdiscription={modalData.contractdiscription}
                          contractbudget={modalData.contractbudget}
                          contractorstartdate={modalData.contractorstartdate}
                          contractorenddat={modalData.contractorenddate}
                          contractmodeid={modalData.contractmodeid}
                          contractmode={modalData.contractmode}
                          contractorid={modalData.contractorid}
                          contractorname={modalData.contractorname}
                          islocal={modalData.islocal}
                          contractoraddress={modalData.contractoraddress}
                          contractoremail={modalData.contractoremail}
                          contractorphonenumber={modalData.contractorphonenumber}
                          tinnumber={modalData.tinnumber}
                          contactpersonfirstname={modalData.contactpersonfirstname}
                          contactpersonmiddlename={modalData.contactpersonmiddlename}
                          contactpersonlastname={modalData.contactpersonlastname}
                          contactpersonemail={modalData.contactpersonemail}
                          contactpersonphonenumber={modalData.contactpersonphonenumber}
                          maintenancetypeid={modalData.maintenancetypeid}
                          maintenancetypename={modalData.maintenancetypename}
                          roadid={modalData.roadid}
                          roadname={modalData.roadname}
                          roaddistance={modalData.roaddistance}
                          targetid={modalData.targetid}
                          targetname={modalData.targetname}
                          startquartid={modalData.startquartid}
                          startquarter={modalData.startquarter}
                          endquarterid={modalData.endquarterid}
                          endquarter={modalData.endquarter}
                          fiscalyearid={modalData.fiscalyearid}
                          fiscalyear={modalData.fiscalyear}
                          projecttypeid={modalData.projecttypeid}
                          projecttypename={modalData.projecttypename}
                          projectdescription={modalData.projectdescription}
                          budgetallocatetotheroad={modalData.budgetallocatetotheroad}
                          projectstartingdate={modalData.projectstartingdate}
                          projectendingdate={modalData.projectendingdate}
                          status={modalData.status}
                          projectlength={modalData.projectlength}
                          projectref={modalData.projectref}
                          measurementname={modalData.measurementname}
                          inspectionid={modalData.inspectionid}
                          isworkloadfinished={modalData.isworkloadfinished}
                          istimelineexpected={modalData.istimelineexpected}
                          observations={modalData.observations}
                          isreadyforpayment={modalData.isreadyforpayment}
                          
                          saveModalDetails={this.saveModalDetails}
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </div>
      );
    }
  }
}

export default Inspection;
