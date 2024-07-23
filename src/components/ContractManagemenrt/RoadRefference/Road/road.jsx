import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

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

class BusinessPaterner extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
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
      const { data: sources } = await Source.getSource();
      const { data: business } = await Road.getroads();
      if (!business || !sources) {
        return toast.error("An Error Occured,data fetching ...");
      } else {
        this.setState({ sources, business });
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
          m.roodname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.rooddistance
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.roodtypename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.roadclass.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.numberoflames
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.lamewidth
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.shouldername.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.pavettypename.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.roodid)
      filtered = allsources.filter(
        (m) => m.Business.roodid === selectedrole.roodid
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

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  async deleteItem(roodid) {
    //const { user } = this.state;

    try {
      if (!roodid) {
        toast.info(`the rood you selected  doesnot exist`);
      } else {
        await Road.deleteroad(roodid);
        toast.success(`this rood has been deleted successful`);
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
          <tr key={business.roodid}>
            <td>{business.roodname}</td>
            <td>{business.rooddistance + " KM"}</td>
            <td>{business.roodtypename}</td>
            <td>{business.roadclass}</td>
            <td>{business.numberoflames}</td>
            <td>{business.lamewidth + " KM"}</td>
            <td>{business.shouldername}</td>
            <td>{business.pavettypename}</td>
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
                onClick={() => this.deleteItem(business.roodid)}
              >
                <AiFillDelete />
                Delete
              </button>
            </td>
          </tr>
        );
      });

      const requiredItem = this.state.requiredItem;
      let modalData = this.state.business[requiredItem];
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
                      <h1>Road Refference- Road Settings</h1>
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
                        <p>There are no Business Paterner in Database.</p>
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
                                <th>Road name</th>
                                <th>Road distance</th>
                                <th>Road typename</th>
                                <th>Road classification</th>
                                <th>Road number of lames</th>
                                <th>Road lame width in KM</th>
                                <th>Road shoulder</th>
                                <th>Road pavet type name</th>

                                <th>Update</th>
                                <th>Delete</th>
                              </tr>
                            </thead>
                            <tbody>{brochure}</tbody>
                          </table>
                        </div>
                        <AddModal />

                        <Modal
                          roodid={modalData.roodid}
                          roodname={modalData.roodname}
                          rooddistance={modalData.rooddistance}
                          roodtypename={modalData.roodtypename}
                          roadcharacteristicsid={
                            modalData.roadcharacteristicsid
                          }
                          roodtypeid={modalData.roodtypeid}
                          roadclass={modalData.roadclass}
                          numberoflames={modalData.numberoflames}
                          lamewidth={modalData.lamewidth}
                          shouldername={modalData.shouldername}
                          pavettypename={modalData.pavettypename}
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

export default BusinessPaterner;
