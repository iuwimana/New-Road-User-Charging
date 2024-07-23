import React, { Component } from "react";
import Modal from "./modal";
import ViewUserModal from "./ViewUsermodal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Role from "../../../services/security/roleServices";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { MdOutlineVisibility, MdDelete } from "react-icons/md";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import './model.css';
class Roles extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      roleid:0,
      rolename:"",
      description:"",
      issystemrole:false,
      roles: [],
      users: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      showModalview: false,
      showModalupdate: false,
      showModaladd : false,
      sortColumn: { path: "title", order: "asc" },
    };
  }
  toggleModalview = () => {
    this.setState(prevState => ({ showModalview: !prevState.showModalview }));
  }
  toggleModalupdate = () => {
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }
  toggleModaladd = () => {
    this.setState(prevState => ({ showModaladd: !prevState.showModaladd }));
  }
  async componentDidMount() {
    try {
      const { data: roles } = await Role.getRoles();

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
      filtered = allroles.filter(
        (m) =>
          m.rolename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.roleid)
      filtered = allroles.filter((m) => m.role.roleid === selectedrole.roleid);
    ///////////////////////////////////////////

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const roles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: roles };
  };
  replaceModalItem(index,roleid,rolename,description,issystemrole) {
    this.setState({
      requiredItem: index,
      roleid: roleid,
      rolename: rolename,
      description: description,
      issystemrole: issystemrole,
    });
    this.setState(prevState => ({ showModalview: !prevState.showModalview }));
  }

  replaceModalItemUpdate(index,roleid,rolename,description,issystemrole) {
    this.setState({
      requiredItem: index,
      roleid: roleid,
      rolename: rolename,
      description: description,
      issystemrole: issystemrole,
    });
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }

  saveModalDetails(roles) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.roles;
    tempbrochure[requiredItem] = roles;
    this.setState({ roles: tempbrochure });
  }

  async deleteItem(RoleID) {
    //const { user } = this.state;

    try {
      if (!RoleID) {
        toast.info(`the Role you selected ${RoleID} doesnot exist`);
      } else {
        await Role.deleteRole(RoleID);
        window.location.reload(false);
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

    if (count === 0) return <p>There are no role in Database.</p>;

    const { totalCount, data: roles } = this.getPagedData();

    const brochure = roles.map((roles, index) => {
      return (
        <tr key={roles.roleid}>
          {" "}
          <td>{roles.rolename}</td>
          <td>{roles.description}</td>
          <td>{roles.issystemrole.toString()}</td>
          <td>
            <button
              className="btn btn-secondary"
              data-toggle="modal"
              data-target="#exampleModalView"
              onClick={() => this.replaceModalItem(index,
                roles.roleid,
                roles.rolename,
                roles.description,
                roles.issystemrole
                )}
            >
              <MdOutlineVisibility /> View
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.replaceModalItemUpdate(index,
                roles.roleid,
                roles.rolename,
                roles.description,
                roles.issystemrole)}
            >
              <AiFillEdit /> Update
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(roles.roleid)}
            >
              <AiFillDelete /> Delete
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.roles[requiredItem];
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
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                <div>
                  <button
                    className="btn btn-success"
                    onClick={this.toggleModaladd}
                  >
                    <FcPlus /> AddRole
                  </button>
                  
                  <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />

                  <div style={{ textAlign: "center" }}>
                  <div className="table-responsive mb-5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>RoleName</th>
                          <th>Description</th>
                          <th>IsSystemRole</th>
                          <th>ViewRoleUser</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>{brochure}</tbody>
                    </table>
                  </div>
                  </div>
                  <AddModal />

                  <Modal
                    roleid={this.state.roleid}
                    rolename={this.state.rolename}
                    description={this.state.description}
                    isSystemRole={Boolean(this.state.issystemrole)}
                    saveModalDetails={this.saveModalDetails}
                    show={this.state.showModalupdate} onClose={this.toggleModalupdate}
                  />
                  <ViewUserModal
                    roleid={this.state.roleid}
                    rolename={this.state.rolename}
                    description={this.state.description}
                    isSystemRole={Boolean(this.state.issystemrole)}
                    saveModalDetails={this.saveModalDetails}
                    show={this.state.showModalview} onClose={this.toggleModalview}
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

export default Roles;
