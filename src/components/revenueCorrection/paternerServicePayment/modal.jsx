import React, { Component } from "react";
import * as Source from "../../../services/RevenuRessources/paternerServicePaymentService";
import * as auth from "../../../services/authService";
import { toast } from "react-toastify";

import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import _ from "lodash";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.populateBanks=this.populateBanks.bind(this);

    this.state = {
      sources: [],
      ServicePaymentId: 4,
      ServicePaymentFiscalYear: "",
      ServicePaymentPeriod: "",
      InstitutionPartenerName: "",
      RevenueProductname: "",
      PaymentModename: "",
      isFixed: 0,
      PayUnit: "",
      ServiceQuantity: 0,
      PayperUnit: 0,
      PaymentAmount: 0,
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
      try{
        const ServicePaymentId=this.state.ServicePaymentId
   const {  sources } = await Source.getpaternerservicepaymentById(
        ServicePaymentId
      );
    this.setState({ data:this.mapToViewModel(sources) });
      }catch (ex) {
    toast.error("Loading issues......");
  }
      
    
  }
    mapToViewModel(sources) {
    return {
      ServicePaymentId: sources.ServicePaymentId,
      ServicePaymentPeriod: sources.ServicePaymentPeriod,
      InstitutionPartenerName: sources.InstitutionPartenerName,
      RevenueProductname: sources.RevenueProductname,
      PaymentModename: sources.PaymentModename,
      isFixed: sources.isFixed,
      PayUnit: sources.PayUnit,
      ServiceQuantity: sources.ServiceQuantity,
      PayperUnit: sources.PayperUnit,
      PaymentAmount: sources.PaymentAmount,
      ServicePaymentFiscalYear: sources.ServicePaymentFiscalYear,
    };
  }
  async componentDidMount() {
    try {
     await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
   
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
          m.ServicePaymentFiscalYear.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.ServicePaymentPeriod.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.InstitutionPartenerName.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.RevenueProductname.toLowerCase().startsWith(
            searchQuery.toLowerCase()
          ) ||
          m.PaymentModename.toLowerCase().startsWith(searchQuery.toLowerCase())
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

  saveModalDetails(sources) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.sources;
    tempbrochure[requiredItem] = sources;
    this.setState({ sources: tempbrochure });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ServicePaymentId: nextProps.ServicePaymentId,
      ServicePaymentPeriod: nextProps.ServicePaymentPeriod,
      InstitutionPartenerName: nextProps.InstitutionPartenerName,
      RevenueProductname: nextProps.RevenueProductname,
      PaymentModename: nextProps.PaymentModename,
      isFixed: nextProps.isFixed,
      PayUnit: nextProps.PayUnit,
      ServiceQuantity: nextProps.ServiceQuantity,
      PayperUnit: nextProps.PayperUnit,
      PaymentAmount: nextProps.PaymentAmount,
      ServicePaymentFiscalYear: nextProps.ServicePaymentFiscalYear,
    });
  }

  render() {
    const { length: count } = this.state.sources;
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: sources } = this.getPagedData();
    const brochure = sources.map((sources, index) => {
      return (
        <tr key={sources.PaternerServicePaymentId}>
          <td>{sources.ServicePaymentFiscalYear}</td>
          <td>{sources.ServicePaymentPeriod}</td>
          <td>{sources.InstitutionPartenerName}</td>
          <td>{sources.RevenueProductname}</td>
          <td>{sources.PaymentModename}</td>
          <td>{sources.isFixed.toString()}</td>
          <td>{sources.PayUnit}</td>
          <td>{sources.ServiceQuantity}</td>
          <td>{sources.PayperUnit}</td>
          <td>{sources.PaymentAmount}</td>
        </tr>
      );
    });
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Business Paterner Service Payment Details for{" "}
                {this.state.InstitutionPartenerName} On{" "}
                {this.state.RevenueProductname}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
                          

              <div className="row-auto">
                <div className="col-auto">

                  {count === 0 && (
                <>
                  <p>There are no Paterner Service Payment in Database.</p>
                </>
              )}
              {count !== 0 && (
                <>
                  <div style={{ textAlign: "center" }}>
                    <h1>Payments for Business Paterner</h1>
                    <SearchBox
                      value={searchQuery}
                      onChange={this.handleSearch}
                    />
                  </div>
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
              
              
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

export default Modal;
