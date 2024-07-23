import React, { Component } from "react";
import Modal from "./modal";

import AddModal from "./addRole";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as UserApprovalData from "../../../services/security/userapprovalservice";
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

class UserApproval extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      userapprovalid:0,
      email:"",
      userid :0,
      approvallevel:"",
      approvalitem:"",
      roles: [],
      users: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      search: [],      
      showModalupdate: false,
      showModaladd : false,
      sortColumn: { path: "title", order: "asc" },
    };
  }
  toggleModalupdate = () => {
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }
  toggleModaladd = () => {
    this.setState(prevState => ({ showModaladd: !prevState.showModaladd }));
  }
  async componentDidMount() {
    try {
      const { data: roles } = await UserApprovalData.getuserapprovals();

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
          m.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.approvallevel.toLowerCase().startsWith(searchQuery.toLowerCase())||
          m.approvalitem.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.roleid)
      filtered = allroles.filter((m) => m.role.roleid === selectedrole.roleid);
    ///////////////////////////////////////////

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const roles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: roles };
  };
  replaceModalItem(index,userapprovalid,userid ,email,approvallevel,approvalitem) {
    this.setState({
      requiredItem: index,
      userapprovalid:userapprovalid,
      userid :userid ,
      email:email,
      approvallevel:approvallevel,
      approvalitem:approvalitem
    });
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }

  saveModalDetails(roles) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.roles;
    tempbrochure[requiredItem] = roles;
    this.setState({ roles: tempbrochure });
  }

  async deleteItem(userapprovalid) {
    

    try {
       
      if (!userapprovalid) {
        toast.info(`the userapproval you selected ${userapprovalid} doesnot exist`);
      } else {
        await UserApprovalData.deleteuserapproval(userapprovalid);
        window.location.reload(false);
        toast.success(`this userapproval has been deleted successful`);
      }
      window.location = "/security/userapproval";
     
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

    

    const { totalCount, data: roles } = this.getPagedData();
  
    const brochure = roles.map((roles, index) => {
      return (
        <tr key={roles.userapprovalid}>
          {" "}
          <td>{roles.email}</td>
          <td>{roles.approvallevel}</td>
          <td>{roles.approvalitem}</td>
          
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index,
                roles.userapprovalid,
                roles.userid ,
                roles.email,
                roles.approvallevel,
                roles.approvalitem
                )}
            >
              <AiFillEdit /> Update
            </button>{" "}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteItem(roles.userapprovalid)}
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
                
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div>
                {count === 0 && (
                    <>
                      <button
                    className="btn btn-success"
                    onClick={this.toggleModaladd}
                  >
                    <FcPlus /> AddApprov
                  </button>
                  <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                      <p>There are no user approval in database.</p>
                      <AddModal />
                    </>
                  )}
                  {count !== 0 && (
                    <>
                  <button
                    className="btn btn-success"
                    onClick={this.toggleModaladd}
                  >
                    <FcPlus /> AddApprov
                  </button>
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />

                  <div style={{ textAlign: "center" }}>
                  <div className="table-responsive mb-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>User email</th>
                        <th>approvallevel</th>
                        <th>Item to Approv</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>{brochure}</tbody>
                  </table>
                  </div>
                  </div>
                  <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                  <Modal
                    userapprovalid={this.state.userapprovalid}
                    userid={this.state.userid}
                    email={this.state.email}
                    approvallevel={this.state.approvallevel}
                    approvalitem={this.state.approvalitem}
                    saveModalDetails={this.saveModalDetails}
                    show={this.state.showModalupdate} onClose={this.toggleModalupdate}
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
                
              
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default UserApproval;
