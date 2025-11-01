import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
//import { Link } from "react-router-dom";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Business from "../../../services/RevenuRessources/currencyServices";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

//import AddRole from "./addRole";
//import History from "./history";
import Pagination from "../../common/pagination";
//import Form from "../common/form";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

class Currency extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
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
      showModalAdd: false,
  showModalUpdate: false,
  selectedCurrency: null,
    };
  }
  toggleModalAdd = () => {
  this.setState(prev => ({ showModalAdd: !prev.showModalAdd }));
};

toggleModalUpdateOpen = (currency) => {
  this.setState({ showModalUpdate: true, selectedCurrency: currency });
};

toggleModalUpdateClose = () => {
  this.setState({ showModalUpdate: false, selectedCurrency: null });
};

  async componentDidMount() {
    try {
      const { data: sources } = await Source.getSource();
      const { data: business } = await Business.getcurrencies();
      if (!business || !sources) {
        return toast.error("An Error Occured,data fetching ...");
      } else {
        this.setState({ sources, business });
      }
    } catch (ex) {
      return toast.error(
        "An Error Occured, while fetching business data Please try again later" +
          ex
      );
    }
  }
  populateCurrencies = async () => {
  try {
    const { data: business } = await Business.getcurrencies();
    if (!business) {
      toast.error("An Error Occured, data fetching ...");
    } else {
      this.setState({ business });
    }
  } catch (ex) {
    toast.error("An Error Occured while fetching currencies");
  }
};

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
      filtered = allsources.filter(
        (m) =>
          m.currencyname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.countryname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.activeon.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.buyrate.toString().toLowerCase().startsWith(searchQuery.toLowerCase())||
          m.salerate.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.currencyid)
      filtered = allsources.filter(
        (m) =>
          m.Business.currencyid ===
          selectedrole.currencyid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const business = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: business };
  };
  replaceModalItem(currencyid,currencyname,countryname,buyrate,salerate) {
    
    this.setState({
      currencyid:currencyid,
      currencyname:currencyname,
      countryname:countryname,
      buyrate:buyrate,
      salerate:salerate,
    });
  }

  saveModalDetails(business) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.business;
    tempbrochure[requiredItem] = business;
    this.setState({ business: tempbrochure });
  }

  async deleteItem(InstitutionPartenerId) {
    //const { user } = this.state;

    try {
      if (!InstitutionPartenerId) {
        toast.info(`the Institution Partener you selected  doesnot exist`);
      } else {
        await Business.deletecurrencies(InstitutionPartenerId);
        toast.success(`this Institution Partener has been deleted successful`);
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
      const brochure = business.map((business, index) => {
        index=(this.state.currentPage*this.state.pageSize)-(this.state.pageSize-index)
        return (
          <tr key={business.currencyid}>
            <td>{business.currencyname}</td>
            <td>{business.countryname}</td>
            <td>{business.buyrate}</td>
            <td>{business.salerate}</td>
            <td>{business.activeon}</td>
            <td>
              
              <button
                className="btn btn-primary" onClick={() => this.toggleModalUpdateOpen(business)}>
                <AiFillEdit />
                Update
              </button>{" "}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteItem(business.institutionpartenerid)}
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
                
                <div className="btn-wrapper text-center"></div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div>
                  <div>
                    {count === 0 && (
                      <>
                        <button
                          className="btn btn-success" onClick={this.toggleModalAdd}>
                          <FcPlus />
                          Addsource
                        </button>
                        <p>There are no Currenct  in Database.</p>
                        
                        {this.state.showModalAdd && (
  <AddModal 
    show={this.state.showModalAdd} 
    handleClose={this.toggleModalAdd} 
    refreshData={this.populateCurrencies} // new function to reload currencies
  />
)}
                      </>
                    )}
                    {count !== 0 && (
                      <>
                        <button
                          className="btn btn-success" onClick={this.toggleModalAdd}>
                          <FcPlus />
                          AddCurrency
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
                              <th>currency</th>
                              <th>countryname</th>
                              <th>Buying Value</th>
                              <th>Selling Value</th>
                              <th>Available On</th>

                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                        </div>
                        {this.state.showModalAdd && (
  <AddModal 
    show={this.state.showModalAdd} 
    handleClose={this.toggleModalAdd} 
    refreshData={this.populateCurrencies} // new function to reload currencies
  />
)}

{this.state.showModalUpdate && this.state.selectedCurrency && (
  <Modal
    show={this.state.showModalUpdate}
    handleClose={this.toggleModalUpdateClose}
    refreshData={this.populateCurrencies}
    selectedCurrency={this.state.selectedCurrency}
  />
)}


                        
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

export default Currency;
