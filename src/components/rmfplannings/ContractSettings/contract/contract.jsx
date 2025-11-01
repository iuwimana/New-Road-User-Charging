import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../../services/RevenuRessources/businessPaternerServices";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";

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

class Contract extends Component {
  constructor(props) {
    super(props);
    
   
    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      data: {
        contractid: 0,
        contractdiscription: "",
        budget: 0,
        ContractModeid: 0,
        contractmode:"",
        ContractorId: 0,
        startdate: "",
        enddate: "",
      },
      value: this.props.location.state,
      contractmodeid: 0,
      contractid: 0,
      contractdiscription: "",
      budget: 0,
      ContractModeid: 0,
      contractmode:"",
      ContractorId: 0,
      startdate: "",
      enddate: "",
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
      const { state } = this.props.location;
      if (!state.contractmodeid) {
        toast.error(
          `error while loading Fiscal year:${state.contractmodeid}`
        );
      } else {
         
        const contractmodeid = state.contractmodeid;
        const contractmode=state.contractmode;
        this.setState({contractmodeid,contractmode})
        const { data: sources } = await Source.getSource();
        const { data: business } = await ContractData.getcontractBycontractmode(this.state.contractmodeid);
        if (!business || !sources) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ sources, business,contractmodeid });
        }
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
   componentWillReceiveProps() {
    const { state } = this.props.location;
    const contractmodeid = state.contractmodeid;
    const contractmode= state.contractmode     
    this.setState({      
      contractmodeid:state.contractmodeid,contractmode:state.contractmode,     
      
    });
    this.componentDidMount();
    
  }
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
          m.contractdiscription
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractbudget
            .toString()
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractorname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractorstartdate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.contractorenddate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.institutionpartenerid)
      filtered = allsources.filter(
        (m) =>
          m.Business.institutionpartenerid ===
          selectedrole.institutionpartenerid
      );
    ///////////////////////////////////////////contractdiscription contractbudget contractorname contractorstartdate contractorenddate
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

   handleshow(contractmodeid) {
    this.setState({ contractmodeid: contractmodeid });
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  async deleteItem(contractid) {
    //const { user } = this.state;

    try {
      if (!contractid) {
        toast.info(`the contract you selected  doesnot exist`);
      } else {
        await ContractData.deletecontract(contractid);
        toast.success(`this contract has been deleted successful`);
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
          "An Error Occured, while saving contract Please try again later"
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
          <tr key={business.contractdiscription}>
            <td>{business.refnumber}</td>
            <td>{business.contractdiscription}</td>
            <td>{business.contractorname}</td>
            <td>{business.contractbudget}</td>
            <td>{business.contractorstartdate}</td>
            <td>{business.contractorenddate}</td>

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
                onClick={() => this.deleteItem(business.contractid)}
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
      const contractmodeid =this.state.contractmodeid
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
                      <h1>Contract Management- {this.state.contractmode}</h1>
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
                           onClick={() =>
                            this.handleshow(this.state.contractmodeid)
                          }
                        >
                          <FcPlus />
                          AddNew
                        </button>
                        <p>There are no contractor in Database.</p>
                        <AddModal 
                        contractmodeid={contractmodeid}
                        />
                      </>
                    )}
                    {count !== 0 && (
                      <>
                        <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleAddModal"
                           onClick={() =>
                            this.handleshow(this.state.contractmodeid)
                          }
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
                              <th>RefNumber</th>
                              <th>Contract Description</th>
                              <th>Contractor</th>
                              <th>Contract Amount</th>
                              <th>StartDate</th>
                              <th>EndDate</th>

                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        </div>
                        <AddModal 
                        contractmodeid={contractmodeid}
                        />

                        <Modal
                        
                        contractmodeid={contractmodeid}
                          contractid={
                            modalData.contractid
                          }
                          contractdiscription={
                            modalData.contractdiscription
                          }
                          budget={modalData.contractbudget}
                          ContractModeid={modalData.ContractModeid}
                          contractorid={modalData.contractorid}
                          startdate={modalData.contractorstartdate}
                          enddate={modalData.contractorenddate}
                          contractorname={modalData.contractorname}
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

export default Contract;
