import React, { Component } from "react";
//import Modal from './modal';
//import AddModal from './addroleModal';
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/revenuCorrectionService";
import * as RevProdData from "../../../services/RevenuRessources/revenuPaymentServices";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";
import { FcCurrencyExchange } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

import ListGroup from "./../../common/listGroup";
//import { async } from './../../../services/security/userServices';

class RevenuDashboard extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      fiscalyearsid:0, 
      fiscalyear:"" ,
      revenuproductid: 0,
      revenueproductid: 0,
      startdate: "1000-01-01 00:00:00",
      enddate: "1000-01-01 00:00:00",
      revenuproductname: "",
      totaldeposit: 0,
      currencyid: 0,
      currencyname: "",
      activeon: "",
      sources: [],
      narative: [],
      services: [],
      revprod: [],
      revprods: [],
      fiscalyear: [],
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
  async populateBanks() {
    try {
      
        const response = await FiscalYear.getFiscalyears();
        if (response) {
            const fiscalYears = response.data;
            this.setState({ data: response });
            // const fiscalyearsid = fiscalYears.map(year => year.fiscalyearid);
            //const fiscalyear = fiscalYears.map(year => year.fiscalyear);
            const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
            const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
            //this.setState({ fiscalyearid, fiscalyear });
            this.setState({ fiscalyearsid, fiscalyear });

            const { data } = await RevProdData.getrevenupaymentByFiscalyear(
              this.state.fiscalyearsid
            );
            const revprods = [
              { revenuproductid: 0,revenuepaymentid: 0, revenueproductname: "All Products" },
              ...data,
            ];
            this.setState({ revprods });
           
        } else {
            toast.error('No Fiscal year find......' + this.state.fiscalyearsid);
        }
    



      //------------------------
      
       
       
      
    } catch (ex) {
      toast.error("current user data Loading issues......" + ex);
    }
  }
  async componentDidMount() {
    try {
      
      await this.populateBanks();
      if(this.state.fiscalyearsid===0){
        await this.populateBanks();
        const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(
          this.state.fiscalyearsid
        );
        const { data: narative } =
        await Source.getnarativedashboardrevenuecorrection(
          this.state.revenueproductid,
          this.state.startdate,
          this.state.enddate,this.state.fiscalyearsid
        );
      this.setState({ sources, narative });

      const deposit = [];
      const amount = 0;
      const deplist = sources.map((sources) => {
        deposit.push(sources.deposit);
      });

      this.setState({
        totaldeposit: deposit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      });

      } else{
        const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(
          this.state.fiscalyearsid
        );
        const { data: narative } =
        await Source.getnarativedashboardrevenuecorrection(
          this.state.revenueproductid,
          this.state.startdate,
          this.state.enddate,this.state.fiscalyearsid
        );
      this.setState({ sources, narative });

      const deposit = [];
      const amount = 0;
      const deplist = sources.map((sources) => {
        deposit.push(sources.deposit);
      });

      this.setState({
        totaldeposit: deposit.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ),
      });

      }
      
      
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching role data Please try again later" + ex
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
  handleselect = async(revprod) => {
    this.setState({ selectedrole: revprod, searchQuery: "", currentPage: 1 });
    const revenuproduct = JSON.stringify(revprod.revenuepaymentid);
    const revenuproductID = JSON.stringify(revprod.revenueproductid);
    const revenuproducts = JSON.stringify(revprod.revenueproductname);
    const currencyid = JSON.stringify(revprod.currencyid);
    const currencyname = JSON.stringify(revprod.currencyname);
    const activeon = JSON.stringify(revprod.activeon);
    this.setState({
      revenuproductname: revenuproducts,
      currencyid: currencyid,
      currencyname: currencyname,
      activeon: activeon,
      revenueproductid:revenuproduct
    });
   // toast.success(revenuproduct)
    await this. componentDidMount();
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedrole,
      sources: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
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
          m.correctiondate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.transactiondetails
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          // m.DocId.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.correctiondate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.revenuepaymentid)
      filtered = allsources.filter(
        (m) => m.revenuepaymentid === selectedrole.revenuepaymentid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sources = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sources };
  };
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
    });
  }

  async fiscalyearidHandler(e) {
    this.setState({ fiscalyearid: e.target.value });
    await this.componentDidMount();
    
    this.setState({ fiscalyearname: " " });
  }

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  async startdateHandler (e) {
    this.setState({ startdate: e.target.value });
    await this. componentDidMount();
  }
  async enddateHandler(e) {
    this.setState({ enddate: e.target.value });
    await this. componentDidMount();
  }

  render() {
    const { length: count } = this.state.sources;
    const {
      pageSize,
      currentPage,
      selectedrole,
      searchQuery,
      sources: allsources,
    } = this.state;
    const narative = this.state.narative;
    const { totalCount, data: sources } = this.getPagedData();
    const countproduct = this.state.revenuproductid;
    const fiscalyear = this.state.fiscalyear;
    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.revenuecorrectionid}>
          <td>{sources.revenueproductname}</td>
          {/*<td>{sources.bordername}</td>*/}
          <td>{sources.sourceoffundname}</td>
          <td>{sources.accountnumber}</td>
          <td>{sources.bankname}</td>
          <td>{sources.correctiondate}</td>
          <td>{sources.deposit}</td>
        </tr>
      );
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.sources[requiredItem];
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
              <svg
                data-layer="011e3a76-3eb0-4c45-9c29-b97247d10934"
                preserveAspectRatio="none"
                viewBox="-0.75 -0.75 83.5 84.5"
                className="ellipse2"
              >
                <path d="M 41 0 C 63.6436767578125 0 82 18.58018493652344 82 41.5 C 82 64.41981506347656 63.6436767578125 83 41 83 C 18.35632514953613 83 0 64.41981506347656 0 41.5 C 0 18.58018493652344 18.35632514953613 0 41 0 Z" />
              </svg>
              <MdDashboard className="ellipse1" />
              <div
                data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                className="rectangle9"
              >
                <div
                  data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                  className="revPr"
                >
                  <div className="row">
                    <big style={{ fontSize: 22 }}>
                      Narative Dashbord for revenu collection
                    </big>
                  </div>
                  <div className="row">
                    {this.state.revenuproductname}
                    {"Fiscal Year - "}                    
                    <small>{this.state.fiscalyear + " "}</small> 
                    {"  "}
                    <br />
                  </div>
                </div>
                <div
                  data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                  className="revsum"
                >
                  Total revenu collected{" "}
                  <big style={{ fontSize: 28 }}>
                    {" "}
                    {new Intl.NumberFormat().format(this.state.totaldeposit) +
                      " " +
                      "Rwf"}
                  </big>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-3">
                  <div
                    data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                    className="rectangle1"
                  >
                    collections:{this.state.revenuproductname}
                    <svg
                      data-layer="011e3a76-3eb0-4c45-9c29-b97247d10934"
                      preserveAspectRatio="none"
                      viewBox="-0.75 -0.75 83.5 84.5"
                      className="ellipse2"
                    >
                      <path d="M 41 0 C 63.6436767578125 0 82 18.58018493652344 82 41.5 C 82 64.41981506347656 63.6436767578125 83 41 83 C 18.35632514953613 83 0 64.41981506347656 0 41.5 C 0 18.58018493652344 18.35632514953613 0 41 0 Z" />
                    </svg>
                    <div className="ellipse1">2</div>
                  </div>
                  <div
                    data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                    className="rectangle9"
                  >
                    <ListGroup
                      items={this.state.revprods}
                      textProperty="revenueproductname"
                      valueProperty="revenuepaymentid"
                      selectedItem={this.state.selectedrole}
                      onItemSelect={this.handleselect}
                    />
                  </div>
                </div>
                <div className="col">
                  <div
                    data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                    className="rectangle3"
                  >
                    <div className="row">
                      <div className="col">From</div>
                      <div className="col">
                        <input
                          type="date"
                          className="form-control"
                          style={{ fontSize: 10 }}
                          value={this.state.Value}
                          onChange={(e) => this.startdateHandler(e)}
                          placeholder="amount to be payed"
                        />
                      </div>

                      <div className="col"> To</div>
                      <div className="col">
                        <input
                          type="date"
                          className="form-control"
                          value={this.state.Value}
                          style={{ fontSize: 10 }}
                          onChange={(e) => this.enddateHandler(e)}
                          placeholder="amount to be payed"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb"
                    className="rectangle2"
                  >
                    <div className="cards">
                      <div className="row">
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Total Collected
                          </label>
                        </div>
                        <div className="col">
                          {narative.map((narative) =>
                            new Intl.NumberFormat().format(narative.totalamount)
                          )}

                          {"Rwf"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Account Number
                          </label>
                        </div>
                        <div className="col">
                          {narative.map((narative) =>
                            narative.accountnumber
                          )}

                          
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Bank
                          </label>
                        </div>
                        <div className="col">
                          {narative.map((narative) =>
                            narative.bankname
                          )}
                        </div>
                      </div>

                     {/**  <button
                        type="button"
                        className="btn btn-primaries"
                        data-dismiss="modal"
                        onClick={this.handleSave}
                      >
                        View More .....
                      </button>*/}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RevenuDashboard;
