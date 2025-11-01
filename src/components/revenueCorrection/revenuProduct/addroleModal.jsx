import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Bank from "../../../services/RevenuRessources/bankservices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import Form from "../../common/form";

class AddProductModal extends Form {
  state = {
    data: {
      revenueproductname: "",
      sourceoffundid: 0,
      accountnumber: "",
      bankid: 0,
      revenuetypeid: 0,
      startdate: "",
      enddate: "",
    },
    sources: [],
    banks: [],
    revenues: [],
    errors: {},
  };

  async componentDidMount() {
    try {
      const { data: sources } = await Source.getSource();
      const { data: banks } = await Bank.getbanks();
      const { data: revenues } = await RevenuType.getrevenuTypes();
      this.setState({ sources, banks, revenues });
    } catch (ex) {
      toast.error("Error loading dropdowns: " + ex.message);
    }
  }
      handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };


  doSubmit = async () => {
    try {
      const { data } = this.state;
      await Product.addRevenueProduct(0, data.revenueproductname, data.sourceoffundid);
      toast.success("Product added successfully");
      this.props.refreshData();
      this.props.handleClose();
    } catch (ex) {
      toast.error("Error saving product: " + ex.message);
    }
  };

  render() {
    const { show, handleClose } = this.props;
    const { sources } = this.state;
    
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            {this.renderInput("revenueproductname", "Product Name")}
            {this.rendernewSelect("sourceoffundid", "Source of Fund", sources, "sourceoffundid", "sourceoffundname")}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={this.doSubmit}>Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default AddProductModal;
