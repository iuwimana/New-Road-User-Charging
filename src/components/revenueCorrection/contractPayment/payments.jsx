import React, { Component } from "react";
import { Card, CardHeader, CardBody, Col, Button } from "reactstrap";
import { toast } from "react-toastify";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import SearchBox from "../../searchBox";
import * as paymentService from "../../../services/ContractManagement/ContractSetting/paymentService";
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';

class Payments extends Component {
  state = {
    payments: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
  };

  async componentDidMount() {
    await this.populatePayments();
  }

  populatePayments = async () => {
    try {
      const response = await FiscalYear.getFiscalyears();
      if(response){
        const fiscalYears = response.data;
        const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
        
        const result = await paymentService.getPaymentsByFiscalYearrevenues(fiscalyearsid); // example fiscalyearid
      if (result) {
        
        this.setState({ payments: result });
      } else {
        toast.error("No payments found.");
      }

      }
      
    } catch (ex) {
      toast.error("Failed to load payments.");
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleRequestPayment = async (paymentid) => {
    try {
      await paymentService.updatePaymentStatus(paymentid);
      toast.success("Payment request sent successfully!");
      await this.populatePayments(); // refresh data
    } catch (ex) {
      toast.error("Failed to send payment request.");
    }
  };
  
  handlepdfdownload= async (paymentid) => {
    try {
      await paymentService.getinvoicepdf(paymentid);
      toast.success("Invoice download successfull!");
     
    } catch (ex) {
      toast.error("Failed to send payment request.");
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, searchQuery, payments: allPayments } = this.state;
    let filtered = allPayments;

    if (searchQuery) {
      filtered = allPayments.filter((p) =>
        (p.contract_refnumber || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    const payments = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: payments };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: payments } = this.getPagedData();

    return (
      <div className="d-flex justify-content-center">
        <Col>
          <Card className="shadow border-0">
            <CardHeader className="bg-transparent">
              <h5>Payments</h5>
            </CardHeader>

            <CardBody>
              <div className="mb-3">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>

              <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Source Type</th>
                      <th>Contract / Service Order</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>Remaining</th>
                      <th>Status</th>
                      <th>Action</th>
                        <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.paymentid}>
                        <td>{p.paymentid}</td>
                        <td>{p.source_type}</td>
                        <td>{p.contractdiscription || p.serviceorder_description || "-"}</td>
                        <td>{p.totalamount}</td>
                        <td>{p.payedamount}</td>
                        <td>{p.remainamount}</td>
                        <td>
                          <span
                            className={`badge ${
                              p.paymentstatus === "Pending"
                                ? "bg-warning"
                                : p.paymentstatus === "Payed"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {p.paymentstatus}
                          </span>
                        </td>
                        {p.paymentstatus==="Payment Request"&&(<td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => this.handleRequestPayment(p.paymentid)}
                          >
                            pay
                          </Button>
                        </td>)}
                        {p.paymentstatus==="Payed"&&(
                            <>
                            <td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => this.handlepdfdownload(p.paymentid)}
                          >
                            Invoice
                          </Button>
                        </td>
                        {/** 
                        <td>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => this.handleRequestPayment(p.paymentid)}
                          >
                            Inspection Report
                          </Button>
                        </td>*/}
                            </>
                    )}
                      </tr>
                    ))}
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
        </Col>
      </div>
    );
  }
}

export default Payments;
