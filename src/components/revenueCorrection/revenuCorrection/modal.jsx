import React, { Component } from "react";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Payment from "../../../services/RevenuRessources/revenuPaymentServices";
import * as PaymentModes from "../../../services/RevenuRessources/paymentModeservices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";



class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {RevenuePaymentId:0,PaymentModeId:0,RevenueProductId:0,Value:0},
      
      user:{},
      sources: [],
      errors: {},
      banks: [],
      payments: [],
      paymentModes: [],
      revenues: [],
      products: [],
    };
  }
 schema = {
   RevenuePaymentId: Joi.number()
                       .required(),
    PaymentModeId: Joi.number()
                       .required(),
    RevenueProductId: Joi.number()
                       .required(),
    Value: Joi.number()
                       .required()

    
  };
  async populateBanks() {
    try{
      const { data: products } = await Product.getrevenuproducts();
    const { data: paymentModes } = await PaymentModes.getpaymentModes();
    const { data: sources } = await Source.getSource();
    this.setState({ products,paymentModes,sources });
    

    }catch (ex) {
    toast.error("Loading issues......");
  }
    
  }
  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      
      RevenuePaymentId: nextProps.RevenuePaymentId,
      RevenueProductname: nextProps.RevenueProductname,
      PaymentModename: nextProps.PaymentModename,
      RevenueProductId: nextProps.RevenueProductId,
      PaymentModeId: nextProps.PaymentModeId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      Bankname: nextProps.Bankname,
      RevenueTypename: nextProps.RevenueTypename,
      Value: nextProps.Value,
      
    });
  }
  


RevenuePaymentIdHandler(e) {
    this.setState({ RevenuePaymentId: e.target.value });
  }
PaymentModeIdHandler(e) {
    this.setState({ PaymentModeId: e.target.value });
  }
RevenueProductIdHandler(e) {
    this.setState({ RevenueProductId: e.target.value });
  }
valueHandler(e) {
  this.setState({ Value: e.target.value });
}

handleSave=async(e)=> {
   // const { user } = this.state;
   
     try {
      const  data  = this.state;
      await Payment.addRevenuepayment(data.RevenuePaymentId,data.PaymentModeId,data.RevenueProductId,data.Value);
      toast.success(`Revenuepayment data ${data.RevenuePaymentId} and${data.PaymentModeId} and${data.RevenueProductId} and${data.Value} and  has been updated successful`);
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
        
        toast.error("An Error Occured, while saving Revenuepayment Please try again later");
    }
    }
  }

  render() {
    const paymentModes = this.state.paymentModes;
    const products = this.state.products;
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
                Update Revenue Payment
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
              <div className="mb-3">
                <input
                  type="hidden"
                  className="form-control"
                  value={this.state.RevenuePaymentId}
                  onChange={(e) => this.RevenuePaymentIdHandler(e)}
                  placeholder="RevenueProductId"
                />
              </div>
                            
              <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  Payment Mode
                </label></div>
                 <div className="col-auto">


                  <select name="PaymentModeId" id="PaymentModeId" className="form-control" onChange={(e) => this.PaymentModeIdHandler(e)}>
                  <option value={this.state.PaymentModeId}>{this.state.PaymentModename}
                    </option>
                  {paymentModes.map(paymentModes => (
                     <option key={paymentModes.PaymentModeId} value={paymentModes.PaymentModeId} >
                     {paymentModes.PaymentModename}
                    </option>
                    ))}
                    
                    </select>


                </div>
                
              </div>

            <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  Revenu Product
                </label></div>
                 <div className="col-auto">


                  <select name="RevenueProductId" id="RevenueProductId" className="form-control" onChange={(e) => this.RevenueProductIdHandler(e)}>
                  <option value={this.state.RevenueProductId}>{this.state.RevenueProductname}
                    </option>
                  {products.map(products => (
                     <option key={products.RevenueProductId} value={products.RevenueProductId} >
                     {products.RevenueProductname}
                    </option>
                    ))}
                    
                    </select>


                </div>
                
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Value
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.Value}
                  onChange={(e) => this.valueHandler(e)}
                  placeholder="amount to be payed"
                />
              </div>
            
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                
                onClick={this.handleSave}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
