import React, { Component } from "react";
import AddSourceModal from "./addroleModal";
import UpdateSourceModal from "./modal";
import { toast } from "react-toastify";
import * as SourceService from "../../../services/RevenuRessources/sourceofFundsServices";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class SourceofFunds extends Component {
  state = {
    sources: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "sourceoffundname", order: "asc" },
    showAddModal: false,
    showUpdateModal: false,
    selectedSource: null,
  };

  async componentDidMount() {
    await this.fetchSources();
  }

  fetchSources = async () => {
    try {
      const { data: sources } = await SourceService.getSource();
      this.setState({ sources });
     
    } catch (ex) {
      toast.error("Error fetching source of funds: " + ex);
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = async (id) => {
    try {
      await SourceService.deleteSource(id);
      toast.success("Source deleted successfully");
      this.fetchSources();
    } catch (ex) {
      toast.error("Error deleting source: " + ex);
    }
  };

  getPagedData = () => {
    const { sources, pageSize, currentPage, searchQuery, sortColumn } =
      this.state;
    let filtered = sources;
    if (searchQuery)
      filtered = sources.filter(
        (s) =>
          s.sourceoffundname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedData = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: pagedData };
  };

  toggleAddModal = () => {
    this.setState((prev) => ({ showAddModal: !prev.showAddModal }));
  };

  toggleUpdateModal = (source = null) => {
    this.setState({
      showUpdateModal: !!source,
      selectedSource: source,
    });
  };

  render() {
    const { showAddModal, showUpdateModal, selectedSource, searchQuery } =
      this.state;
    const { totalCount, data: sources } = this.getPagedData();

    return (
      <Col>
        <Card className="shadow border-0">
          <CardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h4>Source of Funds</h4>
              <button className="btn btn-success" onClick={this.toggleAddModal}>
                <FcPlus /> Add Source
              </button>
            </div>
          </CardHeader>
          <CardBody>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Account Number</th>
                    <th>Bank</th>
                    <th>Revenue Type</th>
                    <th>Currency</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((s) => (
                    <tr key={s.sourceoffundid}>
                      <td>{s.sourceoffundname}</td>
                      <td>{s.accountnumber}</td>
                      <td>{s.bankname}</td>
                      <td>{s.revenuetypename}</td>
                      <td>{s.currencyname}</td>
                      <td>{s.startdate}</td>
                      <td>{s.enddate}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => this.toggleUpdateModal(s)}
                        >
                          <AiFillEdit /> Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(s.sourceoffundid)}
                        >
                          <AiFillDelete /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </CardBody>

          {showAddModal && (
            <AddSourceModal
              show={showAddModal}
              handleClose={this.toggleAddModal}
              refreshData={this.fetchSources}
            />
          )}

          {showUpdateModal && selectedSource && (
            <UpdateSourceModal
              show={showUpdateModal}
              handleClose={() => this.toggleUpdateModal(null)}
              source={selectedSource}
              refreshData={this.fetchSources}
            />
          )}
        </Card>
      </Col>
    );
  }
}

export default SourceofFunds;
