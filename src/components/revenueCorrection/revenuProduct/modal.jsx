import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import Form from "../../common/form";
import { toast } from "react-toastify";

class UpdateProductModal extends Form {
  state = {
    data: {
      revenueproductid: 0,
      revenueproductname: "",
      sourceoffundid: 0,
    },
    sources: [],
    errors: {},
  };

 componentDidMount() {
  const { product } = this.props;
  if (product) this.populateData(); // populate gusa niba hari product
  this.loadSources(); // gufata dropdowns
}


componentDidUpdate(prevProps) {
  if (this.props.product && prevProps.product?.revenueproductid !== this.props.product.revenueproductid) {
    this.populateData(); // populate gusa niba product yahindutse
  }
}

async loadSources() {
  try {
    const { data: sources } = await Source.getSource();
    this.setState({ sources });
  } catch (ex) {
    toast.error("Error loading sources: " + ex.message);
  }
}
 
  populateData() {
        const { product } = this.props;
        if (!product) return;

       

        const data = {
            revenueproductid: product.revenueproductid,
            revenueproductname: product.revenueproductname,
            sourceoffundid: product.sourceoffundid,
            
        };
        this.setState({ data });
    }

    handleChange = ({ currentTarget: input }) => {
  const data = { ...this.state.data };
  data[input.name] = input.value;
  this.setState({ data });
};


  doSubmit = async () => {
    try {
      const { data } = this.state;
      await Product.addRevenueProduct(data.revenueproductid, data.revenueproductname, data.sourceoffundid);
      toast.success("Product updated successfully"+data.revenueproductname);
      this.props.refreshData();
      this.props.handleClose();
    } catch (ex) {
      toast.error("Error updating product: " + ex.message);
    }
  };

  render() {
  const { show, handleClose, product } = this.props;
  const { sources } = this.state;

  // Shyiramo key kugirango modal isubireho igihe product ihindutse
  return (
    <Modal key={product?.revenueproductid} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <form onSubmit={this.handleSubmit}>
        <Modal.Body>
          {this.renderInput("revenueproductname", "Product Name")}
          {this.rendernewSelect("sourceoffundid", "Source of Fund", sources, "sourceoffundid", "sourceoffundname")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={this.doSubmit}>Update</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
}

export default UpdateProductModal;
