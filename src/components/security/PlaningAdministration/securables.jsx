import React, { Component } from "react";
import Modal from "./modal";
import ViewUserModal from "./ViewUsermodal";
import AddModal from "../Role/addroleModal";
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
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as Securable from "../../../services/security/securableService";
import { MdHowToReg } from "react-icons/md";
import './model.css';
class Securables extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      roleid: 0,
      userid: 0,
      email: "",
      userpermissionid: 0,
      securableid: 0,
      securablename: "",
      rolename: "",
      issystemrole: false,
      canview: false,
      canmodify: false,
      canexecute: false,
      candelete: false,
      cancreate: false,
      canaccess: false,
      roles: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      securables: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      showModalpermission: false,
      sortColumn: { path: "title", order: "asc" },
    };
  }
  toggleModalpermission = () => {
    this.setState(prevState => ({ showModalpermission: !prevState.showModalpermission }));
  }
  async componentDidMount() {
    try {
      const { data: roles } = await Securable.getplaningsecurables();

      this.setState({ roles });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching Securables data Please try again later" +
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
    //toast.info(`the Securables you selected ${query} doesnot exist`);
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
          m.securablename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.securableid)
      filtered = allroles.filter(
        (m) => m.role.securableid === selectedrole.securableid
      );
    ///////////////////////////////////////////

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const roles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: roles };
  };

  replaceModalItem(
    index,
    userid,
    userpermissionid,
    securableid,
    securablename,
    email,
    issystemrole,
    canview,
    canmodify,
    canexecute,
    candelete,
    cancreate,
    canaccess
  ) {
    this.setState({
      requiredItem: index,
      userid: userid,
      userpermissionid: userpermissionid,
      securableid: securableid,
      securablename: securablename,
      email: email,
      issystemrole: issystemrole,
      canview: canview,
      canmodify: canmodify,
      canexecute: canexecute,
      candelete: candelete,
      cancreate: cancreate,
      canaccess: canaccess,
    });
    this.setState(prevState => ({ showModalpermission: !prevState.showModalpermission }));
  }

  saveModalDetails(roles) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.roles;
    tempbrochure[requiredItem] = roles;
    this.setState({ roles: tempbrochure });
  }

  render() {
    const { length: count } = this.state.roles;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are Securables in Database.</p>;

    const { totalCount, data: roles } = this.getPagedData();

    const brochure = roles.map((roles, index) => {
      return (
        <tr key={roles.securableid}>
          {" "}
          <td>{roles.securablename}</td>
          <td>{roles.email}</td>
          <td>{roles.canview.toString()}</td>
          <td>{roles.canmodify.toString()}</td>
          <td>{roles.canexecute.toString()}</td>
          <td>{roles.candelete.toString()}</td>
          <td>{roles.cancreate.toString()}</td>
          <td>{roles.canaccess.toString()}</td>
          <td>
            <button
              className="btn btn-secondary"
              onClick={() =>
                this.replaceModalItem(
                  index,
                  roles.userid,
                  roles.userpermissionid,
                  roles.securableid,
                  roles.securablename,
                  roles.email,
                  roles.issystemrole,
                  roles.canview,
                  roles.canmodify,
                  roles.canexecute,
                  roles.candelete,
                  roles.cancreate,
                  roles.canaccess
                )
              }
            >
              <MdHowToReg />
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
              
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                <div>
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                  <div style={{ textAlign: "center" }}></div>
                  <div className="table-responsive mb-5">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Securable name</th>
                          <th>Role name</th>
                          <th>Can view</th>
                          <th>Can modify</th>
                          <th>Can execute</th>
                          <th>Can delete</th>
                          <th>Can create</th>
                          <th>Can access</th>

                          <th>Set Role Permission</th>
                        </tr>
                      </thead>
                      <tbody>{brochure}</tbody>
                    </table>
                  </div>
                  <AddModal />

                  <Modal
                    userid={this.state.userid}
                    userpermissionid={this.state.userpermissionid}
                    securableid={this.state.securableid}
                    securablename={this.state.securablename}
                    email={this.state.email}
                    issystemrole={Boolean(this.state.issystemrole)}
                    canview={Boolean(this.state.canview)}
                    canmodify={Boolean(this.state.canmodify)}
                    canexecute={Boolean(this.state.canexecute)}
                    candelete={Boolean(this.state.candelete)}
                    cancreate={Boolean(this.state.cancreate)}
                    canaccess={Boolean(this.state.canaccess)}
                    saveModalDetails={this.saveModalDetails}
                    show={this.state.showModalpermission} onClose={this.toggleModalpermission}
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

export default Securables;
