import React, { Component } from "react";
import Papa from "papaparse";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import * as BorderData from "../../../services/RevenuRessources/nationalborderservices";
import * as Correction from "../../../services/RevenuRessources/revenuCorrectionService";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

class RevenuCorrectionsupload extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      data: {
        RevenueCorrectionId: 0,
        borderid: 0,
        bordername: "",
        RevenueProductId: 0,
        RevenuePaymentId: 0,
        CorrectionDate: "",
        RefNumber: {},
        TransactionDetails: {},
        Deposit: {},
        PoRef: {},
        DocId: {},
      },
      value: 1,
      currencyid: 0,
      currencyname: "",
      activeon: "",
      isactif: true,
      loadData: [],
      user: {},
      ParsedData: [],
      borders: [],
      TableRows: [],
      Values: [],
      product: [],
      sources: [],
      payment: [],
      paymentModes: [],
      errors: {},
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
      const { revenuproductid, revenuproductname,currencyid,currencyname,activeon } = location.aboutProps || {};
      const { data: product } = await Product.getrevenuproducts();
      const { data: payment } = await Payment.getrevenupayments();
      const { data: borders } = await BorderData.getnationalborders();

      this.setState({ product, payment, borders });

     
      if (!fiscalyearid && ! revenuproductid && ! revenuproductname) {
        toast.error(`error while loading Fiscal year:${contractid}`);
      } else {
      const fiscalyearid = state.fiscalyearid;
      const revenuproductid = state.revenuproductid;
      const revenuproductname = state.revenuproductname;
      const currencyid = state.currencyid;
      const currencyname = state.currencyname;
      const activeon = state.activeon;
      const currentDate = new Date().toDateString();
      
        this.setState({
          fiscalyearid,
          revenuproductid,
          revenuproductname,
          currencyid,
          currencyname,
          activeon,
        });
        
        
      }
    } catch (ex) {
      toast.error("Loading issues......"+ex);
    }
  }

  async componentDidMount() {
    try {
      
      const { location } = this.props;
    const value = location && location.state ? location.state.value : 'No value passed';

      //const { revenuproductid, revenuproductname } = location.aboutProps || {};
      toast.error("Loading issues......" +value);
      await this.populateBanks();
      const user = auth.getJwt();
      const ParsedData = this.state.ParsedData;
      const TableRows = this.state.TableRows;
      const Values = this.state.Values;
      this.setState({ user, ParsedData, TableRows, Values });
      
      const { state } = this.props.location;
      const currencyid = state.currencyid;
      const currencyname = state.currencyname;
      var activeon = JSON.parse(state.activeon);
      var CurrentDate = new Date()
      CurrentDate.setHours(0, 0, 0, 0);
      var GivenDate = new Date(activeon)

     
      if (
        currencyid === "4" &&
        GivenDate < CurrentDate
      ) {
        this.setState({ isactif: false });
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching revenu Payment data Please try again later" +
          ex
      );
    }
  }
  PaymentIDHandler(e) {
    this.setState({ RevenuePaymentId: e.target.value });
  }
  ProductIdHandler(e) {
    this.setState({ RevenueProductId: e.target.value });
  }
  borderidHandler(e) {
    this.setState({ borderid: e.target.value });
  }
  
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        const ParsedData = results.data;
        const TableRows = rowsArray[0];
        const Values = valuesArray;
        this.setState({ ParsedData, TableRows, Values });
        this.handlepage();
      }.bind(this),
    });
  };
  handlepage(i) {
    const { pageSize, currentPage } = this.state;

    const ParsedData = this.state.ParsedData;

    const products = paginate(ParsedData, currentPage, pageSize);

    return { totalCount: ParsedData.length, products, ParsedData };
  }
  handleSave = async (e) => {
    try {
      // e.preventDefault();
      const RevenueCorrectionId = 0;
      const borderid=2;
      let loadData = this.state.loadData;
      const Values = this.state.Values;
      const data = this.state;
      const ParsedData = this.state.ParsedData;
      // await Correction.addrevenucorrection(
      //  RevenueCorrectionId,
      //  data.RevenuePaymentId,
      //  data.RevenueProductId,
      //  ParsedData
      //);
      
      for (const country of Object.keys(ParsedData)) {
        loadData = [...loadData, ParsedData[country]];
      }
       
      if (borderid && this.state.revenuproductid && loadData) {
        await Correction.addrevenucorrection(
          RevenueCorrectionId,
          borderid,
          this.state.revenuproductid,
          loadData
        );

        toast.success("Revenu correction file upload successfull");
      } else {
        toast.error("All Field are required");
      }
    } catch (ex) {
      toast.error(
        "An Error Occured, while uploading revenu correction file:" + ex
      );
    }
    this.props.history.push("/revenu/revenucorrection");
    //const { state } = this.props.location;
    //window.location = state ? state.from.pathname : "/";
  };

  render() {
   
    const payment = this.state.payment;
    const product = this.state.product;
    const borders = this.state.borders;
    //borderidHandler borders;
    //const banks=this.state.banks
    const { totalCount } = this.handlepage();
    const { pageSize, currentPage } = this.state;

    const TableRows = this.state.TableRows;
    const Values = this.state.Values;
    const products = paginate(Values, currentPage, pageSize);

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
          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent ">
              <div className="text-muted text-center mt-2 mb-3">
                <h1>
                  <div style={{ textAlign: "center" }}>
                    <big>Revenu Collection</big>
                  </div>
                </h1>
              </div>
              <div className="btn-wrapper text-center"></div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="card">
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exampleFormControlInput1">
                        Product Payment
                      </label>
                    </div>
                    <div className="col">
                      <select
                        name="RevenuePaymentId"
                        id="RevenuePaymentId"
                        className="form-control"
                        disabled
                        onChange={(e) => this.PaymentIDHandler(e)}
                      >
                        <option value={this.state.revenuproductid}>
                          {this.state.revenuproductname}
                        </option>
                        {payment.map((payment) => (
                          <option
                            key={payment.revenuepaymentid}
                            value={payment.revenuepaymentid}
                          >
                            {payment.revenueproductname}
                            {"--->"}
                            {payment.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exampleFormControlInput1">Currency</label>
                    </div>
                    <div className="col">
                      <label htmlFor="exampleFormControlInput1">
                        {this.state.currencyname}
                      </label>
                    </div>
                  </div>
                </div>
                {/** 
                <div className="mb-3">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="exampleFormControlInput1">
                        National Border
                      </label>
                    </div>
                    <div className="col">
                      <select
                        name="borderid"
                        id="borderid"
                        className="form-control"
                        onChange={(e) => this.borderidHandler(e)}
                      >
                        <option value={this.state.borderid}>
                          {this.state.bordername}
                        </option>
                        {borders.map((borders) => (
                          <option
                            key={borders.borderid}
                            value={borders.borderid}
                          >
                            {borders.bordername}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                */}
              </div>
              <br />
              <br />
              {!this.state.isactif && (
                <Card className=" shadow border-0">
                  <CardHeader className="bg-transparent ">
                    <small>
                      <div style={{ textAlign: "center", color: "red" }}>
                        The Exchenge rate is not Update, Please go on Current to
                        update
                      </div>
                    </small>
                  </CardHeader>
                </Card>
              )}
              {this.state.isactif && (
                <Card className=" shadow border-0">
                  <CardHeader className="bg-transparent ">
                    <small>
                      <div style={{ textAlign: "center" }}>
                        Upload Bank statement
                      </div>
                    </small>

                    <div className="btn-wrapper text-right">
                      <div className="row">
                        <div className="col"></div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleSave}
                            aria-hidden="true"
                          >
                            Load Data...
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="exampleFormControlInput1">
                          choose a CSV file to upload
                        </label>
                      </div>
                      <div className="col">
                        <input
                          type="file"
                          name="file"
                          onChange={this.changeHandler}
                          accept=".csv"
                          style={{
                            display: "block",
                            margin: "10px auto",
                          }}
                        />
                      </div>
                    </div>

                    {/* File Uploader */}

                    <br />
                    <br />
                    {/* Table */}
                    <div className="table-responsive mb-5">
                      <table className=" striped bordered hover" border={1}>
                        <thead>
                          <tr>
                            {TableRows.map((rows, index) => {
                              return <th key={index}>{rows}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((value, index) => {
                            return (
                              <tr key={index}>
                                {value.map((val, i) => {
                                  return <td key={i}>{val}</td>;
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                    />
                  </CardBody>
                </Card>
              )}
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RevenuCorrectionsupload;
