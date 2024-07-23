import React, { Component } from "react";
import Modal from "../Role/modal";
import AddModal from "../Role/addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Role from "../../../services/security/securableService";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class AuditTrail extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      roles: [],
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
      const { data: roles } = await Role.getaudittrails();

      this.setState({ roles });
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
    toast.info(`the Role you selected ${query} doesnot exist`);
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
      roles: allroles,
    } = this.state;

    let filtered = allroles;
    if (searchQuery)
      filtered = allroles.filter((m) =>
        m.RoleName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.RoleID)
      filtered = allroles.filter((m) => m.role.RoleID === selectedrole.RoleID);
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const roles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: roles };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(roles) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.roles;
    tempbrochure[requiredItem] = roles;
    this.setState({ roles: tempbrochure });
  }

  async deleteItem(roleid) {
    //const { user } = this.state;

    try {
      if (!roleid) {
        toast.info(`the Role you selected ${roleid} doesnot exist`);
      } else {
        //await Role.deleteRole(roleid);
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
    const { length: count } = this.state.roles;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are AuditTrail in Database.</p>;

    const { totalCount, data: roles } = this.getPagedData();

    const brochure = roles.map((roles, index) => {
      return (
        <tr key={roles.RoleID}>
          <td>{roles.RoleName}</td>
          <td>{roles.Description}</td>
          <td>{roles.IsSystemRole.toString()}</td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = roles[requiredItem];
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
                    <h1>RMF System Security- Audit Trail</h1>
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                <div>
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleAddModal"
                  >
                    AddRole +
                  </button>
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />

                  <div style={{ textAlign: "center" }}></div>
                  <div className="table-responsive mb-5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>RoleName</th>
                          <th>Description</th>
                          <th>IsSystemRole</th>
                        </tr>
                      </thead>
                      <tbody>{brochure}</tbody>
                    </table>
                  </div>
                  <AddModal />

                  <Modal
                    roleid={modalData.RoleID}
                    rolename={modalData.RoleName}
                    description={modalData.Description}
                    isSystemRole={Boolean(modalData.isSystemRole)}
                    saveModalDetails={this.saveModalDetails}
                  />
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

export default AuditTrail;
