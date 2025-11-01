import React, { Component } from "react";
//import Modal from "./modal";
//import AddModal from "./addroleModal";
import AddserviceModal from "./addserviceModel";
import UpdateContractModal from "./contractpaymentModal";
import ViewinspectionModal from "./viewinspectionmodal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractpaymentData from "../../../../services/contractpayment/contractpaymentservice";

import { MdOutlineVisibility } from "react-icons/md";
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

class Inspection extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      data: {
        serviceorderid: 0,
        serviceorderdescription: "",
        damagedlevel: "",
        serviceorderstatus: "",
        contractid: 0,
        projectid: 0,
      },
      value: this.props.location.state,
      contractbudget:0,
      projectid: 0,
      refnumber:"",
      contractorname:"",
      serviceorderid: 0,
      serviceorderdescription: "",
      damagedlevel: "",
      serviceorderstatus: "",
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
      if (!state.contractid && state.projectid) {
        toast.error(`error while loading Fiscal year:${state.contractid}`);
      } else {
        
        const refnumber=state.refnumber
        const contractorname=state.contractorname
        const contractid = state.contractid;
        const projectid = state.projectid;
        const contractbudget=state.contractbudget;
        const { data: business } =
          await ContractpaymentData.getcontractpaymentBycontract(state.contractid);
        if (!business) {
          return toast.error("An Error Occured,data fetching ...");
        } else {
          this.setState({ business, contractid, projectid,contractbudget,refnumber,contractorname });
        }
        
      }
      {/**const deposit = [];
      const amount = 0;
      const deplist = business.map((business) => {
        deposit.push(business.budget);
      });

      this.setState({
        totaldeposit: deposit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      });
      */}

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
      filtered = allsources.filter((m) =>
        m.contractdiscription
          .toLowerCase()
          .startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.contractpaymentid)
      filtered = allsources.filter(
        (m) => m.Business.contractpaymentid === selectedrole.contractpaymentid
      );
    ///////////////////////////////////////////contractpaymentid contractdiscription payedamount contractamount remainamount paymentdate
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }
  handleshow(projectid, contractid,contractbudget) {
    this.setState({ projectid: projectid, contractid: contractid,contractbudget:contractbudget });
  }

  async deleteItem(contractpaymentid) {
    //const { user } = this.state;

    try {
      if (!contractpaymentid) {
        toast.info(`the serviceorder you selected  doesnot exist`);
      } else {
        await ContractpaymentData.deletecontractpayment(contractpaymentid);
        toast.success(`this contractpaymentid has been deleted successful`);
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
          "An Error Occured, while saving InstitutionPartener Please try again later"
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
      let cumurative=0
      const brochure = business.map((business, index) => {
        cumurative=cumurative+business.payedamount
        return (
          <tr key={business.contractpaymentid}>
            <td>#00{business.contractpaymentid}</td>

            <td>{business.payedamount + "Rwf"}</td>
            <td>{business.invoiceamount + "Rwf"}</td>
            <td>{business.deductedamount + "Rwf"}</td>
            <td>{cumurative}</td>
            <td>{business.remainamount + "Rwf"}</td>
            <td>{business.paymentdate}</td>


            
           <td>
            {/** 
            <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#contractpaymentModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <AiFillEdit />
                Update
              </button>{" "}
              */}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteItem(business.contractpaymentid)}
              >
                <AiFillDelete />
                Delete
              </button>
            </td>
              <td> 
              <button
                className="btn btn-secondary"
                data-toggle="modal"
                data-target="#businessModal"
                onClick={() => this.replaceModalItem(index)}
              >
                <MdOutlineVisibility />
                Invoice
              </button>
            </td>

            
          </tr>
        );
      });

      const requiredItem = this.state.requiredItem;
      let modalData = this.state.business[requiredItem];
      const contractid = this.state.contractid;
      const projectid = this.state.projectid;
      const contractbudget=this.state.contractbudget;

    
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
                <div
                data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                className="rectangle9"
              >
                <div
                  data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                  className="revPr"
                >                 
                  <div className="row">                    
                       <big style={{ fontSize: 18 }}>RefNumber:{this.state.refnumber}</big><br/>
                  </div>
                  <br/>
                  <div className="row">                    
                      <big style={{ fontSize: 18 }}>Contractor:{this.state.contractorname}</big><br/>
                  </div>
                  <br/>
                  <div className="row">
                    
                      <big style={{ fontSize: 18 }}>contract Amount:{this.state.contractbudget}</big>
                  </div>
                  </div>

                   
                  
                
                
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
                          data-target="#exampleserviceModal"
                            onClick={() =>
                            this.handleshow(this.state.projectid,this.state.contractid,this.state.contractbudget)
                          }
                        >
                          <FcPlus />
                          AddNew
                        </button>
                        <p>There are no contract to pay .</p>
                        <AddserviceModal
                          contractid={this.state.contractid}
                            contractbudget={this.state.contractbudget}
                          contractamount={this.state.contractamount}
                          
                          
                        />
                      </>
                    )}
                    {count !== 0 && (
                      <>
                      <button
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#exampleserviceModal"
                            onClick={() =>
                            this.handleshow(this.state.projectid,this.state.contractid,this.state.contractbudget)
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
                              <th>Invoice No</th>
                              <th>Invoice Amount</th>
                              <th>Due amount</th>
                              <th>reimbursable amount</th>
                              <th>cumurative amount</th>
                              <th>pending Amount</th>
                              <th>payment Date</th>

                              

                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        </div>
                        <UpdateContractModal
                        contractpaymentid={modalData.contractpaymentid}
                        contractid={modalData.contractid}
                        payedamount={modalData.payedamount}
                        contractbudget={modalData.contractbudget}
                        contractamount={modalData.contractamount}
                        remainamount={modalData.remainamount}
                        notes={modalData.notes}
                        paymenttypename={modalData.paymenttypename}
                        paymenttypeid={modalData.paymenttypeid}
                        saveModalDetails={this.saveModalDetails}
                        />
                        <ViewinspectionModal
                        contractpaymentid={modalData.contractpaymentid}
                        contractid={modalData.contractid}
                        payedamount={modalData.invoiceamount}
                        contractbudget={modalData.contractbudget}
                        contractamount={modalData.contractamount}
                        remainamount={modalData.remainamount}
                        notes={modalData.notes}
                          
                          saveModalDetails={this.saveModalDetails}
                        />

                        <AddserviceModal
                          contractid={this.state.contractid}
                            contractbudget={this.state.contractbudget}
                          contractamount={this.state.contractamount}
                          
                          
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

export default Inspection;
