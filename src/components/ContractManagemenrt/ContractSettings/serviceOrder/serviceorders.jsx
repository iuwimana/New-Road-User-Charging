import React, { Component } from "react";
import Modal from "./modal";
import Modalapprov from "./modalApprove";
import AddModal from "./AddModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";

import { Card, CardHeader, CardBody, Col } from "reactstrap";

//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class ServiceOrders extends Component {
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
      value: this.props.location.state,
      contractid: 0,
      projectid: 0,
      serviceorderid: 0,
      serviceorderdescription: "",
      damagedlevel: "",
      serviceorderstatus: "",
      isnew: false,
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
        const { data: sources } = await Source.getSource();
        const { data: business } = await ServiceOrderData.getserviceorders();
        if (!business || !sources) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ sources, business,contractid,projectid });
        }
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching business data Please try again later" +
          ex
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
      business: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.serviceorderdescription
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.damagedlevel
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.serviceorderstatus
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.serviceorderid)
      filtered = allsources.filter(
        (m) => m.Business.serviceorderid === selectedrole.serviceorderid
      );
    /////////////////////////////////////////serviceorderid serviceorderdescription damagedlevel serviceorderstatus
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  handleshow(contractid) {
    this.setState({ contractid: contractid});
  }

  saveModalDetailsApprov(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
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

  async approveserviceorder(serviceorderid) {
    //const { user } = this.state;

    try {
      if (!serviceorderid) {
        toast.info(`the serviceorder you selected  doesnot exist`);
      } else {
        await ServiceOrderData.Approveserviceorder(serviceorderid);
        toast.success(`this serviceorder has been Approved successful`);
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
            <td>{business.serviceorderdescription}</td>
            <td>{business.damagedlevel}</td>
            <td>{business.serviceorderstatus}</td>

            <td>
              <button
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <MdOutlineVisibility />
                View Service
              </button>{" "}
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={() =>
                  this.approveserviceorder(business.serviceorderid)
                }
              >
                <AiOutlineCheck />
                Approve
              </button>
            </td>
            <td>
              {business.status !== "New" && (
                <button
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModalapprov"
                  onClick={() => this.replaceModalItem(index)}
                >
                  <AiOutlineClose />
                  Reject
                </button>
              )}
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
                      <h1>Contract Management- Service order</h1>
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
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleAddModal"
                          onClick={() =>
                            this.handleshow(this.state.contractid,this.state.projectid)
                          }
                        >
                          <FcPlus />
                          Addsource
                        </button>
                        <p>There are no Business Paterner in Database.</p>
                        <AddModal 
                        contractid={contractid} 
                        projectid={projectid}
                        />
                      </>
                    )}
                    {count !== 0 && (
                      <>
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleAddModal"
                          onClick={() =>
                            this.handleshow(this.state.contractid,this.state.projectid)
                          }
                        >
                          <FcPlus />
                          Addsource
                        </button>
                        <div style={{ textAlign: "center" }}>
                          <SearchBox
                            value={searchQuery}
                            onChange={this.handleSearch}
                          />
                        </div>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>serviceorderdescription</th>
                              <th>damagedlevel</th>
                              <th>serviceorderstatus</th>

                              <th>View Services</th>
                              <th>Approve</th>
                              <th>Reject</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        <AddModal 
                        contractid={contractid} 
                        projectid={projectid}
                        />
                        <Modal
                          serviceorderid={modalData.serviceorderid}
                          serviceorderdescription={
                            modalData.serviceorderdescription
                          }
                          damagedlevel={modalData.damagedlevel}
                          serviceorderstatus={modalData.serviceorderstatus}
                          contractid={modalData.contractid}
                          projectid={modalData.projectid}
                          saveModalDetails={this.saveModalDetails}
                        />

                        <Modalapprov
                          serviceorderid={modalData.serviceorderid}
                          saveModalDetailsApprov={this.saveModalDetailsApprov}
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

export default ServiceOrders;
