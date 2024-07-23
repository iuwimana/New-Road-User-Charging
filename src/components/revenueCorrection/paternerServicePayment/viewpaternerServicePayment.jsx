import React, { Component } from "react";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/paternerServicePaymentService";
//import AddRole from "./addRole";
//import History from "./history";
import { useParams } from "react-router-dom";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { useLocation } from 'react-router-dom';

class ViewpaternerServicePayment extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      servicepaymentfiscalyear: "",
      servicepaymentperiod: "",
      institutionpartenername: "",
      revenueproductname: "",
      servicepaymentid: 0,
      paymentmodename: "",
      isfixed: 0,
      payunit: "",
      servicequantity: 0,
      payperunit: 0,
      paymentamount: 0,
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
      
     const { location } = this.props;
     const { servicepaymentid } = location.state || {};
      toast.error(`error:${servicepaymentid}`);
      if (!servicepaymentid) {
        toast.error(`error:${servicepaymentid}`);
      } else {
        //const { ServicePaymentId } = this.props.location.ServicePaymentId
        const { data: sources } = await Source.getpaternerservicepaymentById(
          servicepaymentid
        );
        this.setState({ sources });
      }
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
    else if (selectedrole && selectedrole.SourceofFundID)
      filtered = allsources.filter(
        (m) => m.source.SourceofFundID === selectedrole.SourceofFundID
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      paternerservicepaymentid: nextProps.paternerservicepaymentid,
      servicepaymentfiscalyear: nextProps.servicepaymentfiscalyear,
      servicepaymentid: nextProps.servicepaymentid,
      servicepaymentperiod: nextProps.servicepaymentperiod,
      institutionpartenername: nextProps.institutionpartenername,
      revenueproductname: nextProps.revenueproductname,
      paymentmodename: nextProps.paymentmodename,
      isfixed: nextProps.isfixed,
      payunit: nextProps.payunit,
      servicequantity: nextProps.servicequantity,
      payperunit: nextProps.payperunit,
      paymentamount: nextProps.paymentamount,
    });
  }

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
        <tr key={sources.paternerservicepaymentid}>
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
              <div className="text-muted text-center mt-2 mb-3">
                <h1>
                  <div style={{ textAlign: "center" }}>
                    <h1>
                      RMF Resource Correction- Payments Details for Business
                      Paterner
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

export default ViewpaternerServicePayment;
