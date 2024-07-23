import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class SourceofFunds extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      sourceoffundid: 0,
      sourceoffundname: "",
      accountnumber: "",
      bankname: "",
      bankid: 0,
      revenuetypeid: 0,
      currencyid: 0,
      revenuetypename: "",
      currencyname: "",
      startdate: "",
      enddate: "",
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
      const { data: sources } = await Source.getSource();

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
          m.sourceoffundname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.revenuetypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.startdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.enddate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.sourceoffundid)
      filtered = allsources.filter(
        (m) => m.source.sourceoffundid === selectedrole.sourceoffundid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sources = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sources };
  };
  replaceModalItem(
    sourceoffundid,
    sourceoffundname,
    accountnumber,
    bankid,
    revenuetypeid,
    currencyid,
    currencyname,
    bankname,
    revenuetypename,
    startdate,
    enddate
  ) {
    this.setState({
      sourceoffundid: sourceoffundid,
      sourceoffundname: sourceoffundname,
      accountnumber: accountnumber,
      bankid: bankid,
      revenuetypeid: revenuetypeid,
      currencyid: currencyid,
      currencyname: currencyname,
      bankname: bankname,
      revenuetypename: revenuetypename,
      startdate: startdate,
      enddate: enddate,
    });
  }

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  async deleteItem(sourceoffundid) {
    //const { user } = this.state;

    try {
      if (!sourceoffundid) {
        toast.info(`the Role you selected ${sourceoffundid} doesnot exist`);
      } else {
        await Source.deleteSource(sourceoffundid);
        toast.success(
          `this Role ${sourceoffundid} has been deleted successful`
        );
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
        <tr key={sources.sourceoffundid}>
          <td>{sources.sourceoffundname}</td>
          <td>{sources.accountnumber}</td>
          <td>{sources.bankname}</td>
          <td>{sources.revenuetypename}</td>
          <td>{sources.currencyname}</td>
          <td>{sources.startdate}</td>
          <td>{sources.enddate}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  sources.sourceoffundid,
                  sources.sourceoffundname,
                  sources.accountnumber,
                  sources.bankid,
                  sources.revenuetypeid,
                  sources.currencyid,
                  sources.currencyname,
                  sources.bankname,
                  sources.revenuetypename,
                  sources.startdate,
                  sources.enddate
                )
              }
            >
              <AiFillEdit />
              Update
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(sources.sourceoffundid)}
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
                    <h1>RMF Resource Collection- Source of Funds</h1>
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
                        Addsource
                      </button>
                      <p>There are Product in Database.</p>
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
                        Addsource
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
                              <th>SourceName</th>
                              <th>AccountNumber</th>
                              <th>BankName</th>
                              <th>RevenueType</th>
                              <th>currency</th>
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
                        SourceofFundId={this.state.sourceoffundid}
                        SourceofFundname={this.state.sourceoffundname}
                        AccountNumber={this.state.accountnumber}
                        BankId={this.state.bankid}
                        BankName={modalData.bankname}
                        Bankname={modalData.bankname}
                        RevenueTypeId={this.state.revenuetypeid}
                        RevenueTypename={modalData.revenuetypename}
                        currencyid={this.state.currencyid}
                        currencyname={this.state.currencyname}
                        StartDate={this.state.startdate}
                        EndDate={this.state.enddate}
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

export default SourceofFunds;
