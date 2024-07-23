import React, { Component } from "react";
import Modal from "./modal";
import Paternerservicepayment from "./viewpaternerServicePayment";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import * as Source from "../../../services/RevenuRessources/paternerServicePaymentService";
//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { MdOutlineVisibility } from "react-icons/md";

class PaternerServicePayment extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      showComponent: false,
      sources: [],
      user: {},
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
      const { data: sources } = await Source.getpaternerservicepayments();

      this.setState({ sources });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching paternerservicepayment data Please try again later" +
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
      sources: allsources,
    } = this.state;

    let filtered = allsources;
    if (searchQuery)
      filtered = allsources.filter(
        (m) =>
          m.servicepaymentfiscalyear
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.servicepaymentperiod
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.institutionpartenername
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.revenueproductname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.paymentmodename.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.sourceoffundid)
      filtered = allsources.filter(
        (m) => m.source.sourceoffundid === selectedrole.sourceoffundid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sources = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sources };
  };
  replaceModalItem(index) {
    try {
      this.setState({
        requiredItem: index,
      });
      const requiredItem = this.state.requiredItem;
      let modalData = this.state.sources[requiredItem];
      toast.error(`servicepaymentid:${modalData.servicepaymentid}`);
      return (
        <>
          <Paternerservicepayment
            servicepaymentfiscalyear={modalData.servicepaymentfiscalyear}
            servicepaymentid={modalData.servicepaymentid}
            servicepaymentperiod={modalData.servicepaymentperiod}
            institutionpartenername={modalData.institutionpartenername}
            revenueproductname={modalData.revenueproductname}
            paymentmodename={modalData.paymentmodename}
            isfixed={modalData.isfixed}
            payunit={modalData.payunit}
            servicequantity={modalData.servicequantity}
            payperunit={modalData.payperunit}
            paymentamount={modalData.paymentamount}
            saveModalDetails={this.saveModalDetails}
          />
        </>
      );
    } catch (ex) {
      toast.error(
        "An Error Occured, while saving Revenuepayment Please try again later",
        ex
      );
    }
  }
  handleClick = () => {
    this.setState({ showComponent: true });
  };

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  render() {
    const { length: count } = this.state.sources;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: sources } = this.getPagedData();

    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.servicequantity}>
          <td>{sources.servicepaymentfiscalyear}</td>
          <td>{sources.servicepaymentperiod}</td>
          <td>{sources.institutionpartenername}</td>
          <td>{sources.revenueproductname}</td>
          <td>{sources.paymentmodename}</td>
          <td>{sources.isfixed.toString()}</td>
          <td>{sources.payunit}</td>

          <td>{sources.servicequantity}</td>
          <td>{sources.payperunit}</td>
          <td>{sources.paymentamount}</td>
          <td>
         
            <Link
              to={{
                pathname: "/lookup/revenu/ViewPayment",
                state: { servicepaymentid: sources.servicepaymentid },
              }}
              className="btn btn-secondary"
            >
              <MdOutlineVisibility />
              View Payments
            </Link>
          </td>
        </tr>
      );
    });

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
                    <h1>
                      RMF Resource Correction- Payments for Business Paterner
                    </h1>
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
                      <p>There are no Paterner Service Payment in Database.</p>
                    </>
                  )}
                  {count !== 0 && (
                    <>
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
                              <th>FiscalYear</th>
                              <th>Period</th>
                              <th>Business Paterner</th>
                              <th>Revenue Product</th>
                              <th>Payment Mode</th>
                              <th>isFixed</th>
                              <th>PayUnit</th>
                              <th>ServiceQuantity</th>

                              <th>PayperUnit</th>
                              <th>PaymentAmount</th>
                              <th>ViewDetails</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                      </div>
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

export default PaternerServicePayment;
