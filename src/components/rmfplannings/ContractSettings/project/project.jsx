import React, { Component } from "react";
import UpdateModal from "./updateModal";
import AddModal from "./addroleModal";
import Modal from "./modal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Projectdata from "../../../../services/ContractManagement/ContractSetting/projectservice";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import ProjectContractor from "./projectcontractor";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
//import AddRole from "./addRole";
//import History from "./history";
import { MdOutlineVisibility } from "react-icons/md";

import Pagination from "../../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class Project extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      data: {
        projectid: 0,
        projectdescription: "",
        projecttypename: "",
        maintenancetypename: "",
        roadname: "",
        fiscalyear: "",
        roaddistance: "",
        maintenancetypeid: 0,
        roadid: 0,
        projecttypeid: 0,
      },
      value: this.props.location.state,
      fiscalyearcontracttypeid: 0,
      projectid: 0,
      maintenancetypeid: 0,
      roadid: 0,
      projecttypeid: 0,
      projectdescription: "",
      projecttypename: "",
      maintenancetypename: "",
      roadname: "",
      fiscalyear: "",
      roaddistance: "",
      modalOpen: false,
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
      if (!state.fiscalyearcontracttypeid) {
        toast.error(
          `error while loading Fiscal year:${state.fiscalyearcontracttypeid}`
        );
      } else {
        const fiscalyearcontracttypeid = state.fiscalyearcontracttypeid;
        const { data: sources } = await Source.getSource();
        const { data: business } =
          await Projectdata.getprojectsbyfiscalyearcontracttypeid(
            state.fiscalyearcontracttypeid
          );
        if (!business || !sources) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ sources, business, fiscalyearcontracttypeid });
        }
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching business data Please try again later" +
          ex
      );
    }
  }
  handleClosesubprogram = () => {
    this.setState({ modalOpen: false });
  };
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
          m.maintenancetypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.roadname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.roaddistance
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.targetname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.startquarter.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.endquarter.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.fiscalyear.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.projecttypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.projectdescription
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.budget
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.startdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.enddate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.projectid)
      filtered = allsources.filter(
        (m) =>
          m.Business.projectid ===
          selectedrole.projectid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  handleshow(fiscalyearcontracttypeid) {
    this.setState({ fiscalyearcontracttypeid: fiscalyearcontracttypeid });
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  viewcontractor(
    projectid,
    projectdescription,
    projecttypename,
    maintenancetypename,
    roadname,
    fiscalyear,
    roaddistance,
    maintenancetypeid,
    roadid,
    projecttypeid
  ) {
    <ProjectContractor
      projectid={projectid}
      projectdescription={projectdescription}
      projecttypename={projecttypename}
      maintenancetypename={maintenancetypename}
      roadname={roadname}
      fiscalyear={fiscalyear}
      roaddistance={roaddistance}
    />;
    this.setState({
      projectid,
      projectdescription,
      projecttypename,
      maintenancetypename,
      roadname,
      fiscalyear,
      roaddistance,
      maintenancetypeid,
      roadid,
      projecttypeid,
    });

    this.setState({ modalOpen: true });
  }

  async deleteItem(projectid) {
    //const { user } = this.state;

    try {
      if (!projectid) {
        toast.info(`the project you selected  doesnot exist`);
      } else {
        await Projectdata.deleteproject(projectid);
        toast.success(`this Projectdata has been deleted successful`);
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
          <tr key={business.projectid}>
            
            <td>{business.roadname}</td>

            <td>{business.maintenancetypename}</td>
            <td>{business.targetname}</td>
            <td>{business.projectlength + " " + business.measurementname}</td>

            <td>{business.status}</td>

            <td>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <AiFillEdit />
                Update
              </button>{" "}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteItem(business.projectid)}
              >
                <AiFillDelete />
                Delete
              </button>
            </td>
            {/*<td>
              
              <button
                className="btn btn-success"
                onClick={() =>
                  this.viewcontractor(
                    business.projectid,business.projectdescription,
                    business.projecttypename,business.maintenancetypename,
                    business.roadname,business.fiscalyear,business.roaddistance,
                    business.maintenancetypeid,business.roadid,business.projecttypeid
                  )
                }
              >
                <FcPlus />
                Contractor
              </button>* */}
              
            <td>
              <button
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#exampleviewModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <MdOutlineVisibility />
                View
              </button>
            </td>
          </tr>
        );
      });

      const requiredItem = this.state.requiredItem;
      let modalData = this.state.business[requiredItem];
      const fiscalyearcontracttypeid = this.state.fiscalyearcontracttypeid;

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
                      <h1>contract settings- Road To Maintain</h1>
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
                            this.handleshow(this.state.fiscalyearcontracttypeid)
                          }
                        >
                          <FcPlus />
                          AddNew
                        </button>
                        <p>There are no Business Paterner in Database.</p>
                        <AddModal
                          fiscalyearcontracttypeid={fiscalyearcontracttypeid}
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
                            this.handleshow(this.state.fiscalyearcontracttypeid)
                          }
                        >
                          <FcPlus />
                          AddNew
                        </button>

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
                              
                              <th>Road name</th>
                              <th>Maintenance type name</th>
                              <th>Target </th>
                              <th>Project length</th>
                              <th style={{ width: 80 }}>Status</th>

                              <th>Update</th>
                              <th>Delete</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        </div>
                        <AddModal
                          projectid={modalData.projectid}
                          maintenancetypeid={modalData.maintenancetypeid}
                          maintenancetypename={modalData.maintenancetypename}
                          roadname={modalData.roadname}
                          roadid={modalData.roadid}
                          targetname={modalData.targetname}
                          targetid={modalData.targetid}
                          fiscalyearcontracttypeid={fiscalyearcontracttypeid}
                          startdate={modalData.startdate}
                          enddate={modalData.enddate}
                          saveModalDetails={this.saveModalDetails}
                        />

                        <UpdateModal
                          projectid={modalData.projectid}
                          maintenancetypeid={modalData.maintenancetypeid}
                          maintenancetypename={modalData.maintenancetypename}
                          roadname={modalData.roadname}
                          roadid={modalData.roadid}
                          targetname={modalData.targetname}
                          targetid={modalData.targetid}
                          fiscalyearcontracttypeid={fiscalyearcontracttypeid}
                          projectdescription={modalData.projectdescription}
                          budget={modalData.budget}
                          startdate={modalData.startdate}
                          enddate={modalData.enddate}
                          projectref={modalData.projectref}
                          projectlength={modalData.projectlength}
                          measurementid={modalData.measurementid}
                          measurementname={modalData.measurementname}
                          saveModalDetails={this.saveModalDetails}
                        />
                        <Modal
                          projectid={modalData.projectid}
                          maintenancetypeid={modalData.maintenancetypeid}
                          maintenancetypename={modalData.maintenancetypename}
                          roadname={modalData.roadname}
                          roadid={modalData.roadid}
                          targetname={modalData.targetname}
                          targetid={modalData.targetid}
                          fiscalyearcontracttypeid={fiscalyearcontracttypeid}
                          projectdescription={modalData.projectdescription}
                          budget={modalData.budget}
                          startdate={modalData.startdate}
                          enddate={modalData.enddate}
                          startquarter={modalData.startquarter}
                          endquarter={modalData.endquarter}
                          fiscalyear={modalData.fiscalyear}
                          roaddistance={modalData.roaddistance}
                          projecttypename={modalData.projecttypename}
                          projectref={modalData.projectref}
                          projectlength={modalData.projectlength}
                          measurementid={modalData.measurementid}
                          measurementname={modalData.measurementname}
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

export default Project;
