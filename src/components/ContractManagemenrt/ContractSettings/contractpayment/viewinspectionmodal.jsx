import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as RevenuData from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Contractpayment from "../../../../services/contractpayment/contractpaymentservice";
import { Component } from "react";
import myLogo from "./Rwanda_Coat0fArm.png";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import Pagination from "../../../../components/common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../../../components/searchBox";
import { FcPlus } from "react-icons/fc";
import { jsPDF } from "jspdf";
//import "jspdf-autotable";
import _ from "lodash";
//import { async } from './../../../../services/security/userServices';
class ViewBusiness extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        contractpaymentid: 0,
        contractbudget: 0,
        contractdiscription: 0,
        payedamount: 0,
        contractid: 0,
        notes: "",
        contractamount: 0,
        remainamount: 0,
        paymentdate: "",
      },
      
      contractpaymentid: 0,
      contractbudget: 0,
      contractdiscription: 0,
      payedamount: 0,
      contractid: 0,
      notes: "",
      contractamount: 0,
      remainamount: 0,
      paymentdate: "",
      revenucollections: [],
      services: [],
      currentPage: 1,
      pageSize: 4,
      requiredItem: 0,
      brochure: [],
      contractpayments: [],
      searchQuery: "",
      selectedrole: null,
      search: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }
  async populateBanks() {
    try {
      const { data: contractpayments } =
        await Contractpayment.getcontractpaymentreport(32);

      this.setState({ contractpayments });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  async componentDidMount() {
    try {
      

      const { data: revenucollections } =
        await RevenuData.getBusinessPaterners();

      this.setState({ revenucollections });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching revenucollections data Please try again later" +
          ex
      );
    }
  }
  async componentWillReceiveProps (nextProps) {
    this.setState({
      contractpaymentid: nextProps.contractpaymentid,
      contractdiscription: nextProps.contractdiscription,
      payedamount: nextProps.payedamount,
      contractamount: nextProps.contractamount,
      remainamount: nextProps.remainamount,
      paymentdate: nextProps.paymentdate,
      contractid: nextProps.contractid,
      contractbudget: nextProps.contractbudget,
      notes: nextProps.notes,
    });
    
    try {
      const { data: contractpayments } =
        await Contractpayment.getcontractpaymentreport(nextProps.contractpaymentid);

      this.setState({ contractpayments });
    } catch (ex) {
      toast.error("Loading issues......");
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
      revenucollections: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.revenueproductname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.raymentmodename
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
    else if (selectedrole && selectedrole.partenerserviceid)
      filtered = allsources.filter(
        (m) => m.Services.partenerserviceid === selectedrole.partenerserviceid
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

  exportPdf() {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
    });

    doc.save("revenuCollections.pdf");
  }

  downloadPdf() {
    var doc = new jsPDF("landscape", "px", "a4", false);
    doc.setFont("Helvertica", "bold");
    doc.text(40, 30, "Republic of Rwanda ");
    doc.text(40, 60, "Road Maintenance Fund");
    doc.addImage(myLogo, "png", 500, 2, 120, 100);

    doc.text(240, 140, "RMF- Business Partners");
    doc.autoTable({
      body: [],
      startY: 200,
    });

    doc.autoTable({ html: "#my-table" });

    doc.save("revenu.pdf");
  }

  saveModalDetails(revenucollections) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.revenucollections;
    tempbrochure[requiredItem] = revenucollections;
    this.setState({ revenucollections: tempbrochure });
  }

  render() {
    const contractpayments = this.state.contractpayments;

    var sum = 0;
    const brochure = contractpayments.map((contractpayments, index) => {
      return (
        <>
          <tr style={{height:345}} key={contractpayments.contractpaymentid}>
            <td>#00{contractpayments.contractpaymentid}</td>
            <td>{contractpayments.contractorname}</td>
            <td>{contractpayments.contractdiscription}</td>
            <td>{contractpayments.invoiceamount}</td>
          </tr>
        </>
      );
    });
    const sums = () => {
      return (
        <tr>
          <td colspan="6" style={{ bgcolor: "AliceBlue" }}>
            <b>
              <big>Total Sum</big>
            </b>
          </td>
          <td>{sum}</td>
        </tr>
      );
    };
    return (
      <div
        className="modal fade"
        id="businessModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "1370px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <table
                style={{
                  maxWidth: "1370px",
                  width: "100%",
                  height: "40%",
                }}
                id="my-table1"
              >
                <tr>
                  <td>
                    <div className="row">
                      <div
                        className="col"
                        style={{
                          maxWidth: "280px",
                          width: "40%",
                          height: "40%",
                          alignItems: "left",
                        }}
                      >
                        Republic of Rwanda <br />
                        Road Maintenance Fund
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      classNane="cards"
                      style={{
                        maxWidth: "8370px",
                        width: "370%",
                        height: "40%",
                      }}
                    >
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      tyle={{
                        maxWidth: "280px",
                        width: "40%",
                        height: "40%",
                        alignItems: "right",
                      }}
                    >
                      <div class="emblema">
                        <img
                          src={myLogo}
                          className="myLogo"
                          alt="logo"
                          style={{
                            width: 120,
                            height: 10,
                            textAlign: "right",
                            alignItems: "right",
                            justifyContent: "right",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Card className=" shadow border-0">
              <div className="text-muted text-right mt-2 mb-3">
                <h1>
                  <CardHeader className="bg-transparent ">
                    <div style={{ textAlign: "center" }}>
                      <small>
                        <small>
                          {" "}
                          <small>
                            <small># Invoice</small>
                          </small>
                        </small>
                      </small>
                    </div>
                    <button
                      className="btn btn-primary float-end mt-2 mb-2"
                      onClick={() => this.downloadPdf()}
                    >
                      Export
                    </button>
                  </CardHeader>
                </h1>
              </div>
              <CardBody>
                <table className="table" id="my-table">
                  <thead>
                    <tr>
                      <th style={{ width: 20 }}>InvoiceNo</th>
                      <th>Client</th>
                      <th>Contract Description</th>
                      <th>Due Amount</th>
                    </tr>
                  </thead>
                  {brochure}
                  <tr>
                    <td colspan="3">Total</td>
                    <td></td>
                    <td></td>
                    <td>{this.state.payedamount}</td>
                  </tr>
                </table>
              </CardBody>
            </Card>
            <table
              style={{
                maxWidth: "1370px",
                width: "100%",
                height: "140%",
              }}
              id="my-table12"
            >
              <tr>
                <td></td>
              </tr>
            </table>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewBusiness;
