import React, { Component } from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import * as ServicePayment from "../../../services/RevenuRessources/servicePaymentService";
import * as PaymentMode from "../../../services/RevenuRessources/paymentModeservices";
import * as PatServices from "../../../services/RevenuRessources/paternerServiceServices";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        ServicePaymentId: 0,
        partenerserviceid: 0,
        paymentmodeid: 0,
        Value: 0,
      },
      ServicePaymentId: 0,
      partenerserviceid: 0,
      paymentmodeid: 0,
      Value: 0,
      user: {},
      errors: {},
      banks: [],
      revenues: [],
      paymentModes: [],
      patServices: [],
    };
  }
  schema = {
    ServicePaymentId: Joi.number().required(),
    partenerserviceid: Joi.number().required(),
    paymentmodeid: Joi.number().required(),
    Value: Joi.number().required(),
  };
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: paymentModes } = await PaymentMode.getpaymentModes();
    const { data: patServices } = await PatServices.getpaternerServices();
    this.setState({ banks, paymentModes, patServices });

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
      ServicePaymentId: nextProps.ServicePaymentId,
      partenerserviceid: nextProps.PartenerServiceId,
      InstitutionPartenerId: nextProps.InstitutionPartenerId,
      InstitutionPartenerName: nextProps.InstitutionPartenerName,
      RevenueProductId: nextProps.RevenueProductId,
      RevenueProductname: nextProps.RevenueProductname,
      paymentmodeid: nextProps.PaymentModeId,
      PaymentModename: nextProps.PaymentModename,
      isFixed: nextProps.isFixed,
      PayUnit: nextProps.PayUnit,
      Value: nextProps.Value,
      StartDate: nextProps.StartDate,
      EndDate: nextProps.EndDate,
    });
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  ServicePaymentIddHandler(e) {
    this.setState({ ServicePaymentId: e.target.value });
  }
  PartenerServiceIdHandler(e) {
    this.setState({ partenerserviceid: e.target.value });
  }
  PaymentModeIdHandler(e) {
    this.setState({ paymentmodeid: e.target.value });
  }
  ValueHandler(e) {
    this.setState({ Value: e.target.value });
  }

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;

      await ServicePayment.addservicepayment(
        item.ServicePaymentId,
        item.partenerserviceid,
        item.paymentmodeid,
        item.Value
      );
      toast.success(`Service Payment data  has been Added successful`);
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
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  render() {
    const patServices = this.state.patServices;
    const paymentModes = this.state.paymentModes;
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
                Update Business Paterner Service Payment
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
                  value={this.state.ServicePaymentId}
                  onChange={(e) => this.ServicePaymentIddHandler(e)}
                  placeholder="ServicePaymentId"
                />
              </div>

              <div className="mb-3">
                <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">
                    PartenerService
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="PartenerServiceId"
                    id="partenerserviceid"
                    className="form-control"
                    onChange={(e) => this.PartenerServiceIdHandler(e)}
                  >
                    <option value={this.state.PartenerServiceId}>
                      {this.state.InstitutionPartenerName}
                    </option>
                    {patServices.map((patServices) => (
                      <option
                        key={patServices.partenerserviceid}
                        value={patServices.partenerserviceid}
                      >
                        <table className="table ">
                          <tbody>
                            <td>{patServices.institutionpartenername}</td>
                            <td>{"  ------>   "} </td>
                            <td>{patServices.revenueproductname}</td>
                          </tbody>
                        </table>
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">PaymentMode</label>
                </div>
                <div className="col-auto">
                  <select
                    name="PaymentModeId"
                    id="paymentmodeid"
                    className="form-control"
                    onChange={(e) => this.PaymentModeIdHandler(e)}
                  >
                    <option value={this.state.PaymentModeId}>
                      {this.state.PaymentModename}
                    </option>
                    {paymentModes.map((paymentModes) => (
                      <option
                        key={paymentModes.paymentmodeid}
                        value={paymentModes.paymentmodeid}
                      >
                        {paymentModes.paymentmodename}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">
                    Amount to pay Service
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    name="Value"
                    type="text"
                    className="form-control"
                    value={this.state.Value}
                    onChange={(e) => this.ValueHandler(e)}
                  />
                </div>
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
                onClick={() => {
                  this.handleSave();
                }}
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
