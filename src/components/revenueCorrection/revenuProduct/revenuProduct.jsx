import React, { Component } from "react";
import Modal from "./modal";
import AddModal from "./addroleModal";
import { toast } from "react-toastify";
import * as Product from "../../../services/RevenuRessources/productServices";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "../../searchBox";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import { Card, CardHeader, CardBody, Col } from "reactstrap";

import _ from "lodash";

class RevenuProduct extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      revenueproductid:0,
      revenueproductname:"",
      accountnumber:"",
      sourceoffundname:"",
      sourceoffundid:0,
      bankname:"",
      revenuetypename:"",
      startdate:"",
      enddate:"",
      products: [],
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
      const { data: products } = await Product.getrevenuproducts();

      this.setState({ products });
    } catch (ex) {
      return toast.error(
        "An Error Occured, while rfetching Product data Please try again later" +
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
          m.sourceoffundname
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.revenuetypename
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          m.startdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.enddate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedrole && selectedrole.revenueproductid)
      filtered = allproducts.filter(
        (m) => m.product.revenueproductid === selectedrole.revenueproductid
      );
    ///////////////////////////////////////////
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };
  replaceModalItem(revenueproductid,
                revenueproductname,
                accountnumber,
                sourceoffundname,
                sourceoffundid,
                bankname,
                revenuetypename,
                startdate,
                enddate) {
    this.setState({
      revenueproductid: revenueproductid,
      revenueproductname: revenueproductname,
      accountnumber: accountnumber,
      sourceoffundname: sourceoffundname,
      sourceoffundid:sourceoffundid,
      bankname: bankname,
      revenuetypename: revenuetypename,
      startdate: startdate,
      enddate: enddate,
    });
  }

  saveModalDetails(products) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.products;
    tempbrochure[requiredItem] = products;
    this.setState({ products: tempbrochure });
  }

  async deleteItem(revenueproductid) {
    //const { user } = this.state;

    try {
      if (!revenueproductid) {
        toast.info(
          `the RevenueProduct you selected ${revenueproductid} doesnot exist`
        );
      } else {
        await Product.deleteRevenueProduct(revenueproductid);
        toast.success(`this RevenueProduct has been deleted successful`);
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
          "An Error Occured, while saving Product Please try again later"
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
        <tr key={products.revenueproductid}>
          <td>{products.revenueproductname}</td>
          <td>{products.accountnumber}</td>
          <td>{products.sourceoffundname}</td>
          <td>{products.bankname}</td>
          <td>{products.revenuetypename}</td>
          <td>{products.startdate}</td>
          <td>{products.enddate}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() =>
                this.replaceModalItem(
                  products.revenueproductid,
                  products.revenueproductname,
                  products.accountnumber,
                  products.sourceoffundname,
                  products.sourceoffundid,
                  products.bankname,
                  products.revenuetypename,
                  products.startdate,
                  products.enddate
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
              onClick={() => this.deleteItem(products.RevenueProductId)}
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
                    <h1>RMF Resource Collection- Collection</h1>
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
                      <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleAddModal"
                      >
                        <FcPlus />
                        AddCollection
                      </button>
                      <p>There are collection in Database.</p>
                      <AddModal />
                    </>
                  )}
                  {count !== 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#exampleAddModal"
                      >
                        <FcPlus />
                        AddCollection
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
                              <th>Collection</th>
                              <th>Account number</th>
                              <th>Source of fund</th>
                              <th>Bank name</th>
                              <th>RevenueTypename</th>
                              <th>StartDate</th>
                              <th>EndDate</th>
                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>{brochure}</tbody>
                        </table>
                      </div>
                      <AddModal />

                      <Modal
                        revenueproductid={this.state.revenueproductid}
                        revenueproductname={this.state.revenueproductname}
                        accountnumber={this.state.accountnumber}
                        sourceoffundname={this.state.sourceoffundname}
                        sourceoffundid={this.state.sourceoffundid}
                        bankname={this.state.bankname}
                        revenuetypename={this.state.revenuetypename}
                        startdate={this.state.startdate}
                        enddate={this.state.enddate}
                        saveModalDetails={this.saveModalDetails}
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

export default RevenuProduct;
