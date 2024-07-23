import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Services from "../../../services/RevenuRessources/paternerServiceServices";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import _ from "lodash";

class PaternerService extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      sources: [],
      services: [],
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
      const { data: sources } = await Services.getpaternerServices();

      this.setState({ sources });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching role data Please try again later" +
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
      sources: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.institutionpartenername
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.revenueproductname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.startdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.enddate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.partenerserviceid)
      filtered = allsources.filter(
        (m) => m.Services.partenerserviceid === selectedrole.partenerserviceid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sources = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sources };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  async deleteItem(partenerserviceid) {
    //const { user } = this.state;

    try {
      if (!partenerserviceid) {
        toast.info(`the Role you selected ${partenerserviceid} doesnot exist`);
      } else {
        await Services.deletePartenerService(partenerserviceid);
        toast.success(`this Role has been deleted successful`);
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
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  render() {
    const { length: count } = this.state.sources;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: sources } = this.getPagedData();

    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.partenerserviceid}>
          <td>{sources.institutionpartenername}</td>
          <td>{sources.revenueproductname}</td>
          <td>{sources.startdate}</td>
          <td>{sources.enddate}</td>
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
              onClick={() => this.deleteItem(sources.partenerserviceid)}
            >
              <AiFillDelete />
              Delete
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.sources[requiredItem];
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
                    <h1>
                      RMF Resource Collection- Service offered by the
                      institution partner
                    </h1>
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
                      >
                        <FcPlus />
                        AddNew
                      </button>
                      <p>There are no Paterner Service in Database.</p>
                      <AddModal />
                    </>
                  )}
                  {count !== 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleAddModal"
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
                              <th>Business Partener</th>
                              <th>Service</th>
                              <th>StartDate</th>
                              <th>EndDate</th>
                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                      </div>
                      <AddModal />

                      <Modal
                        PartenerServiceId={modalData.partenerserviceid}
                        InstitutionPartenerId={modalData.institutionpartenerid}
                        InstitutionPartenerName={
                          modalData.institutionpartenername
                        }
                        RevenueProductId={modalData.revenueproductid}
                        RevenueProductname={modalData.revenueproductname}
                        StartDate={modalData.startdate}
                        EndDate={modalData.enddate}
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

export default PaternerService;
