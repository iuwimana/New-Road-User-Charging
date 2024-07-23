import React, { Component, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as User from "../../../services/security/userServices";
import AddRole from "./AddroleModal";
import AddUser from "./AddUser";
//import History from "./history";
import { FcPlus } from "react-icons/fc";
import Modal from "./modal";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import {
  MdOutlinePersonalInjury,
  MdHowToReg,
  MdPersonOff,
} from "react-icons/md";
import IconX from '../../../components/Icon/IconX';
import './model.css';
//'../../components/Icon/IconX';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: 0,
      users: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      showModal: false,
      showModalgrant: false,
      modal1: false,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
  async componentDidMount() {
    try {
      const { data: users } = await User.getUsers();
      if (!users) {
        toast.error("An Error Occured, data loading...");
      } else {
        this.setState({ users });
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching Users data Please try again later" +
          ex
      );
    }
  }
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }
  toggleModalgrant = () => {
    this.setState(prevState => ({ showModalgrant: !prevState.showModalgrant }));
  }
  
  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  activateUser = async (UserId) => {
    try {
      if (!UserId) {
        toast.info(`the User you selected ${UserId} doesnot exist`);
      } else {
        await User.activateUsers(UserId);
        toast.success(`this user has been Activated successful`);
      }
    } catch (ex) {
      toast.error(`the activation of this user has failed ${ex}`);
    }
  };
  desactivateUser = async (userid) => {
    try {
      if (!userid) {
        toast.info(`the User you selected ${userid} doesnot exist`);
      } else {
        await User.desactivateUsers(userid);
        toast.success(`this user  has been Desactivated successful`);
      }
    } catch (ex) {
      toast.error(`the activation of this user has failed ${ex}`);
    }
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
      users: allUsers,
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter((m) =>
        m.user_email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.user_userid)
      filtered = allUsers.filter(
        (m) => m.user.user_userid === selectedrole.user_userid
      );
    ///////////////////////////////////////////

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };
  replaceModalItem(index, userid) {
    this.setState({
      requiredItem: index,
      userid: userid,
    });
    this.setState(prevState => ({ showModalgrant: !prevState.showModalgrant }));
  }
  
  setheadunit = async (userid) => {
    try {
      if (!userid) {
        toast.info(`the User you selected ${userid} doesnot exist`);
      } else {
        await User.setheadofunit(userid);
        toast.success(`this user  has been set as Head of Unit successful`);
      }
    } catch (ex) {
      toast.error(`the activation of this user has failed ${ex}`);
    }
  };
  saveModalDetails(users) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.users;
    tempbrochure[requiredItem] = users;
    this.setState({ users: tempbrochure });
  }

  render() {
    const Model1=this.state.modal1;
    const { length: count } = this.state.users;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are Users in Database.</p>;

    const { totalCount, data: users } = this.getPagedData();

    const brochure = users.map((users, index) => {
      return (
        <tr key={users.user_userid}>
          {" "}
          <td>{users.user_email}</td>
          {/*<td>{users.user_createdate}</td>*/}
          <td>{users.user_fullname}</td>
          <td>{users.user_isconfirmed.toString()}</td>
          <td>{users.user_isheadofunit.toString()}</td>
          <td>
            {users.user_isconfirmed !== true && (
              <button
                className="btn btn-primary"
                onClick={() => this.activateUser(users.user_userid)}
              >
                <MdHowToReg /> activate
              </button>
            )}{" "}
            {users.user_isconfirmed === true && (
              <button
                className="btn btn-danger"
                onClick={() => this.desactivateUser(users.user_userid)}
              >
                <MdPersonOff /> Desactivate
              </button>
            )}{" "}
          </td>
          <td>
            <button
              className="btn btn-info"
              
              onClick={() =>this.replaceModalItem(index, users.user_userid)}
              
            >
              <MdOutlinePersonalInjury /> Grant
            </button>
            
            
          </td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => this.setheadunit(users.user_userid)}
            >
              <MdHowToReg /> set
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.users[requiredItem];

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
                    onClick={this.toggleModal}
                  >
                     
                    <FcPlus /> AddUser
                  </button>
                  <AddRole show={this.state.showModal} onClose={this.toggleModal} />
                  <SearchBox value={searchQuery} onChange={this.handleSearch} />
                  <div style={{ textAlign: "center" }}>
                    <div className="table-responsive mb-5">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Email</th>
                            {/*<th>CreateDate</th>*/}
                            <th>FullName</th>
                            <th>IsConfirmed</th>
                            <th>IsHeadofUnit</th>
                            <th>Activation</th>
                            <th>GrantRole</th>
                            <th>Head of Unit</th>
                          </tr>
                        </thead>
                        <tbody>{brochure}</tbody>
                      </table>
                    </div>
                  </div>
                  <AddRole />
                  <Modal
                    userid={this.state.userid}
                    saveModalDetails={this.saveModalDetails}
                    show={this.state.showModalgrant} onClose={this.toggleModalgrant}
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

export default Users;
