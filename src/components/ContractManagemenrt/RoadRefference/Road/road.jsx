import React, { Component } from "react";
import { Card, CardHeader, CardBody, Col, Button } from "reactstrap";
import Pagination from "../../../common/pagination";
import { paginate } from "../../../../utils/paginate";
import SearchBox from "../../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { toast } from "react-toastify";

import AddRoadModal from "./addroleModal";
import UpdateRoadModal from "./modal";
import * as RoadService from "../../../../services/ContractManagement/RoadRefference/road";

class RoadMain extends Component {
  state = {
    roads: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "roodname", order: "asc" },
    showModalAdd: false,
    showModalUpdate: false,
    selectedRoad: null,
  };

  async componentDidMount() {
    await this.populateRoads();
  }

  populateRoads = async () => {
    try {
      const { data } = await RoadService.getroads();
      if (data) this.setState({ roads: data });
      else toast.error("No roads found.");
    } catch (ex) {
      toast.error("Failed to load roads.");
    }
  };

  toggleModalAdd = () => {
    this.setState((prev) => ({ showModalAdd: !prev.showModalAdd }));
  };

  toggleModalUpdateOpen = (road) => {
    this.setState({ showModalUpdate: true, selectedRoad: road });
  };

  toggleModalUpdateClose = () => {
    this.setState({ showModalUpdate: false, selectedRoad: null });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const { roads: allRoads, searchQuery, sortColumn, currentPage, pageSize } = this.state;
    let filtered = allRoads;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = allRoads.filter(
        (r) =>
          r.roodname.toLowerCase().includes(q) ||
          r.roodtypename.toLowerCase().includes(q) ||
          r.roadclass.toLowerCase().includes(q) ||
          r.shouldername.toLowerCase().includes(q)
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paged = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paged };
  };

  handleDelete = async (roodid) => {
    if (!window.confirm("Are you sure you want to delete this road?")) return;

    try {
      await RoadService.deleteroad(roodid);
      toast.success("Road deleted successfully.");
      this.populateRoads();
    } catch (ex) {
      toast.error("Error deleting road.");
    }
  };

  render() {
    const { showModalAdd, showModalUpdate, selectedRoad, searchQuery, currentPage, pageSize } = this.state;
    const { totalCount, data: roads } = this.getPagedData();

    return (
      <div>
        <Col>
          <Card className="shadow border-0">
            <CardHeader className="bg-transparent">
              <Button color="success" onClick={this.toggleModalAdd}>
                <FcPlus /> Add Road
              </Button>
            </CardHeader>
            <CardBody>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />

              <div className="table-responsive mt-3">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Name</th>
                      <th>Distance</th>
                      <th>Type</th>
                      <th>Class</th>
                      <th>Lanes</th>
                      <th>Shoulder</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roads.map((road) => (
                      <tr key={road.roodid}>
                        <td>{road.roodname}</td>
                        <td>{road.rooddistance} KM</td>
                        <td>{road.roodtypename}</td>
                        <td>{road.roadclass}</td>
                        <td>{road.numberoflames}</td>
                        <td>{road.shouldername}</td>
                        <td>
                          <Button color="primary" size="sm" onClick={() => this.toggleModalUpdateOpen(road)}>
                            <AiFillEdit /> Update
                          </Button>
                        </td>
                        <td>
                          <Button color="danger" size="sm" onClick={() => this.handleDelete(road.roodid)}>
                            <AiFillDelete /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />

              {showModalAdd && (
                <AddRoadModal show={showModalAdd} handleClose={this.toggleModalAdd} refreshData={this.populateRoads} />
              )}

              {showModalUpdate && selectedRoad && (
                <UpdateRoadModal
                  show={showModalUpdate}
                  handleClose={this.toggleModalUpdateClose}
                  refreshData={this.populateRoads}
                  selectedRoad={selectedRoad}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RoadMain;
