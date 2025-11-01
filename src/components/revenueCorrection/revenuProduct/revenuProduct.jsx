import React, { Component } from "react";
import AddProductModal from "./addroleModal";
import UpdateProductModal from "./modal";
import * as Product from "../../../services/RevenuRessources/productServices";
import { toast } from "react-toastify";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import SearchBox from "../../searchBox";
import _ from "lodash";
import { FcPlus } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

class RevenuProduct extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "revenueproductname", order: "asc" },
    addModalShow: false,
    updateModalShow: false,
    selectedProduct: null,
  };

  async componentDidMount() {
    await this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const { data: products } = await Product.getrevenuproducts();
      this.setState({ products });
      
    } catch (ex) {
      toast.error("Error fetching products: " + ex.message);
    }
  };

  handlePageChange = (page) => this.setState({ currentPage: page });

  handleSearch = (query) => this.setState({ searchQuery: query, currentPage: 1 });

  handleSort = (sortColumn) => this.setState({ sortColumn });

  getPagedData = () => {
    const { products: allProducts, searchQuery, currentPage, pageSize, sortColumn } = this.state;

    let filtered = allProducts;
    if (searchQuery) {
      filtered = allProducts.filter(
        p =>
          p.revenueproductname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sourceoffundname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };

  openAddModal = () => this.setState({ addModalShow: true });
  closeAddModal = () => this.setState({ addModalShow: false });

  openUpdateModal = (product) => this.setState({ updateModalShow: true, selectedProduct: product });
  closeUpdateModal = () => this.setState({ updateModalShow: false, selectedProduct: null });

  handleDelete = async (productId) => {
    if (!productId) return;
    try {
      await Product.deleteRevenueProduct(productId);
      toast.success("Product deleted successfully");
      this.fetchProducts();
    } catch (ex) {
      toast.error("Error deleting product: " + ex.message);
    }
  };

  render() {
    const { totalCount, data: products } = this.getPagedData();
    const { pageSize, currentPage, searchQuery, addModalShow, updateModalShow, selectedProduct } = this.state;

    return (
      <div className="container">
       
        <button className="btn btn-success mb-2" onClick={this.openAddModal}>
          <FcPlus /> Add Product
        </button>

        <SearchBox value={searchQuery} onChange={this.handleSearch} />

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Source of Fund</th>
              <th>Account Number</th>
              <th>Bank</th>
              <th>Revenue Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.revenueproductid}>
                <td>{p.revenueproductname}</td>
                <td>{p.sourceoffundname}</td>
                <td>{p.accountnumber}</td>
                <td>{p.bankname}</td>
                <td>{p.revenuetypename}</td>
                <td>{p.startdate}</td>
                <td>{p.enddate}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => this.openUpdateModal(p)}>
                    <AiFillEdit /> Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.handleDelete(p.revenueproductid)}>
                    <AiFillDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />

        {/* Add Modal */}
        {addModalShow && <AddProductModal show={addModalShow} handleClose={this.closeAddModal} refreshData={this.fetchProducts} />}

        {/* Update Modal */}
        {updateModalShow && selectedProduct && (
          <UpdateProductModal
            show={updateModalShow}
            handleClose={this.closeUpdateModal}
            product={selectedProduct}
            refreshData={this.fetchProducts}
          />
        )}
      </div>
    );
  }
}

export default RevenuProduct;
