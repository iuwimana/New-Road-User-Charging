import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RMFPlanning/programServices";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { TableSection } from "./TableSection.jsx";

class SourceofFunds extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      sources: [],
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
      const { data: sources } = await Source.getprograms();

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
          m.ProgramName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.Description.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.ProgramId)
      filtered = allsources.filter(
        (m) => m.source.ProgramId === selectedrole.ProgramId
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

  async deleteItem(SourceofFundID) {
    //const { user } = this.state;

    try {
      if (!SourceofFundID) {
        toast.info(`the Role you selected ${SourceofFundID} doesnot exist`);
      } else {
        await Source.deleteprogram(SourceofFundID);
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

    if (count === 0) return <p>There are source in Database.</p>;

    const { totalCount, data: sources } = this.getPagedData();

    const brochure = sources.map((sources, index) => {
      return (
        <>

        <tr key={sources.ProgramId}>
          <td>{sources.ProgramName}</td>
          <td>{sources.Description}</td>

          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index)}
            >
              Update
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(sources.SourceofFundID)}
            >
              Delete
            </button>
          </td>
        </tr>
        <tr>

        </tr>
        </>
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
          {count === 0 && (
            <>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleAddModal"
              >
                AddNew +
              </button>
              <p>There are Program in Database.</p>
              <AddModal />
            </>
          )}
        </Col>

        {count !== 0 && (
          <>
            <div
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleAddModal"
              >
                AddNew +
              </button>
            </div>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card className=" shadow border-0">
                <CardHeader className="bg-transparent ">
                  <div className="text-muted text-center mt-2 mb-3">
                    <h1>
                      <div style={{ textAlign: "center" }}>
                        <h1>RMF Planning- Single Action Plan </h1>
                        <SearchBox
                          value={searchQuery}
                          onChange={this.handleSearch}
                        />
                      </div>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-center"></div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="table-responsive mb-5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>ProgramName</th>
                          <th>Description</th>

                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      {sources.map((personDetails, index) => (
                        <TableSection
                          personDetails={personDetails}
                          index={personDetails.id}
                        />
                      ))}
                    </table>
                  </div>
                </CardBody>
              </Card>
              <AddModal />
            </Col>

            <Modal
              ProgramId={modalData.ProgramId}
              ProgramName={modalData.ProgramName}
              Description={modalData.Description}
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
    );
  }
}

export default SourceofFunds;
