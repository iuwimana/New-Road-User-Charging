import React, { Component, useLocation } from "react";
import Modal from "./modal";
import AddModal from "./AddroleModal";
import { toast } from "react-toastify";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";
import './model.css';

class RevenuPayment extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      revenuepaymentid: 0,
      revenueproductname: "",
      paymentmodename: "",
      paymentmodeid: 0,
      Revenueproductname: "",
      revenueproductid: 0,
      data: null,
      fiscalyearsid: 0,
      value: 0,
      products: [],
      fiscalyear: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      searchQuery: "",
      selectedrole: null,
      showModalupdate: false,
      showModaladd : false,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
  toggleModalupdate = () => {
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }
  toggleModaladd = () => {
    this.setState(prevState => ({ showModaladd: !prevState.showModaladd }));
  }
  async populateBanks() {
    try {
     
      //const { data: fiscalyear } = await FiscalYear.getFiscalyears();
      const response= await FiscalYear.getFiscalyears();
      if (response) {
        const fiscalYears = response.data;
        this.setState({ data: response });
       // const fiscalyearsid = fiscalYears.map(year => year.fiscalyearid);
        //const fiscalyear = fiscalYears.map(year => year.fiscalyear);
        const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
        const fiscalyear = fiscalYears.map(year => year.fiscalyear);
        //this.setState({ fiscalyearid, fiscalyear });
        this.setState({ fiscalyearsid, fiscalyear });
        
        
      }else{
        toast.error("No Fiscal year find......" + this.state.fiscalyearsid);
        

      }
       
     
      
    } catch (ex) {
      toast.error("current user data Loading issues......" + ex);
    }
  }
  async componentDidMount() {
    try {
     
      await this.populateBanks();
      
      if(this.state.fiscalyearsid===0){
        await this.populateBanks();
       

        const { data: products } = await Payment.getrevenupaymentByFiscalyear(
          this.state.fiscalyearsid
        );
       if (products){
        this.setState({ products });
  
       }else
        
       toast.error("no product fund" +this.state.fiscalyearsid); 

      }else{
        const { data: products } = await Payment.getrevenupaymentByFiscalyear(
          this.state.fiscalyearsid
        );
       if (products){
        this.setState({ products });
  
       }else
        
       toast.error("no product fund" +this.state.fiscalyearid); 

      }
      
      
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching revenu Payment data Please try again later" +
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
      products: allproducts,
    } = this.state;

    let filtered = allproducts;
    if (searchQuery)
      filtered = allproducts.filter(
        (m) =>
          m.revenueproductname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.paymentmodename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.sourceoffundname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.revenuetypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.value.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.revenuepaymentid)
      filtered = allproducts.filter(
        (m) => m.product.revenuepaymentid === selectedrole.revenuepaymentid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };
  replaceModalItem(
    
    revenuepaymentid,
    revenueproductname,
    paymentmodename,
    paymentmodeid,
    Revenueproductname,
    revenueproductid,
    fiscalyearid,
    value

  ) {
    this.setState({
      revenuepaymentid: revenuepaymentid,
      revenueproductname: revenueproductname,
      paymentmodename: paymentmodename,
      paymentmodeid: paymentmodeid,
      Revenueproductname: Revenueproductname,
      revenueproductid: revenueproductid,
      fiscalyearid: fiscalyearid,
      value: value,
    });
    this.setState(prevState => ({ showModalupdate: !prevState.showModalupdate }));
  }

  async fiscalyearidHandler(e) {
    this.setState({ fiscalyearid: e.target.value });
    await this.componentDidMount();
  }

  saveModalDetails(products) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.products;
    tempbrochure[requiredItem] = products;
    this.setState({ products: tempbrochure });
  }

  async deleteItem(revenuepaymentid) {
    //const { user } = this.state;

    try {
      if (!revenuepaymentid) {
        toast.info(
          `the revenu Payment you selected  doesnot exist ${revenuepaymentid}`
        );
      } else {
        await Payment.deleteRevenuePayment(revenuepaymentid);
        toast.success(`this revenu Payment has been deleted successful`);
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
          "An Error Occured, while saving revenu Payment Please try again later"
        );
      }
    }
  }

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: products } = this.getPagedData();

    const brochure = products.map((products, index) => {
      return (
        <tr key={products.revenuepaymentid}>
          <td>{products.revenueproductname}</td>
          <td>{products.paymentmodename}</td>
          <td>{products.sourceoffundname}</td>
          <td>{products.fiscalyear}</td>
          <td>{products.value}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  products.revenuepaymentid,
                  products.revenueproductname,
                  products.paymentmodename,
                  products.paymentmodeid,
                  products.revenueproductname,
                  products.revenueproductid,
                  products.fiscalyearid,
                  products.value
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
              onClick={() => this.deleteItem(products.revenuepaymentid)}
            >
              <AiFillDelete />
              Delete
            </button>
          </td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.products[requiredItem];
    const fiscalyear = this.state.fiscalyear;
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
          {/** 
          <select
            name="fiscalyearid"
            id="fiscalyearid"
            className="form-control"
            onChange={(e) => this.fiscalyearidHandler(e)}
            onClick={(e) => this.fiscalyearidHandler(e)}
          >
            {fiscalyear.map((fiscalyear) => (
              <option
                key={fiscalyear.fiscalyearid}
                value={fiscalyear.fiscalyearid}
              >
                {fiscalyear.fiscalyear}
              </option>
            ))}
          </select>
          */}
          <Col />
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
                  {count === 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={this.toggleModaladd}
                      >
                        <FcPlus />
                        AddPayments
                      </button>
                      <p>There are revenu Payment in Database.</p>
                      <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                    </>
                  )}
                  {count !== 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={this.toggleModaladd}
                      >
                        <FcPlus />
                        AddPayments
                      </button>
                      <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
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
                              <th>Collections</th>
                              <th>Payment mode</th>
                              <th>Source of fund</th>
                              <th>Fiscal year</th>
                              <th>Amount to pay</th>
                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody>{brochure}</tbody>
                        </table>
                      </div>

                      

                      <Modal
                        RevenuePaymentId={this.state.revenuepaymentid}
                        RevenueProductId={this.state.revenueproductid}
                        paymentmodeid={this.state.paymentmodeid}
                        RevenueProductname={this.state.revenueproductname}
                        PaymentModename={this.state.paymentmodename}
                        SourceofFundname={this.state.sourceoffundname}
                        AccountNumber={this.state.accountnumber}
                        Bankname={this.state.bankname}
                        RevenueTypename={this.state.revenuetypename}
                        Value={this.state.value}
                        fiscalyearid={this.state.fiscalyearsid}
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RevenuPayment;
