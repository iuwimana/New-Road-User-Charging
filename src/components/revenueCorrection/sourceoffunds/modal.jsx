import React, { Component } from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import * as CurrencyData from "../../../services/RevenuRessources/currencyServices";
import Currency from './../currency/currency';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        SourceofFundId: 0,
        SourceofFundname: "",
        AccountNumber: "",
        BankId: 0,
        currencyid: 0,
        currencyname: "",
        Bankname: "",
        RevenueTypeId: 0,
        RevenueTypename: "",
        StartDate: "",
        EndDate: "",
      },
      SourceofFundId: 0,
      SourceofFundname: "",
      AccountNumber: "",
      BankId: 1,
      currencyid: 0,
      currencyname: "",
      Bankname: "",
      RevenueTypeId: 0,
      RevenueTypename: "",
      StartDate: "",
      EndDate: "",
      user: {},
      currencies: [],
      errors: {},
      banks: [],
      revenues: [],
    };
  }
  schema = {
    SourceofFundId: Joi.number().required(),
    SourceofFundname: Joi.string().required().label("SourceofFundname"),
    AccountNumber: Joi.string().required().label("AccountNumber"),
    BankId: Joi.number().required().label("Bank"),
    RevenueTypeId: Joi.number().required().label("RevenueType"),
    StartDate: Joi.date(),
    EndDate: Joi.date(),
  };
  async populateBanks() {
    try {
      const { data: banks } = await bank.getbanks();
      const { data: revenues } = await RevenuType.getrevenuTypes();
      const { data: currencies } = await CurrencyData.getcurrencies();
      this.setState({ banks, revenues, currencies });
    } catch (ex) {
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
      SourceofFundId: nextProps.SourceofFundId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      currencyid: nextProps.currencyid,
      currencyname: nextProps.currencyname,
      BankId: nextProps.BankId,
      Bankname: nextProps.Bankname,
      BankName: nextProps.BankName,
      RevenueTypeId: nextProps.RevenueTypeId,
      RevenueTypename: nextProps.RevenueTypename,
      StartDate: nextProps.StartDate,
      EndDate: nextProps.EndDate,
    });
  }

  currencyidHandler(e) {
    this.setState({ currencyid: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  sourceofFundIdHandler(e) {
    this.setState({ SourceofFundId: e.target.value });
  }
  sourceofFundnameHandler(e) {
    this.setState({ SourceofFundname: e.target.value });
  }
  accountNumberHandler(e) {
    this.setState({ AccountNumber: e.target.value });
  }
  bankIdHandler(e) {
    this.setState({ BankId: e.target.checked });
  }
  revenueTypeIdHandler(e) {
    this.setState({ RevenueTypeId: e.target.checked });
  }
  startDateHandler(e) {
    this.setState({ StartDate: e.target.value });
  }
  endDateHandler(e) {
    this.setState({ EndDate: e.target.value });
  }

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;

      await source.addsource(
        item.SourceofFundId,
        item.SourceofFundname,
        item.AccountNumber,
        item.BankId,
        item.RevenueTypeId,
        item.currencyid,
        item.StartDate,
        item.EndDate
      );
      toast.success( `source of fundshas been updated successful` );
    
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
    const revenues = this.state.revenues;
    const banks = this.state.banks;
    const currencies=this.state.currencies;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "1370px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                RMF Revenu Collection- Update Source of Fund
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
                  type="text"
                  className="form-control"
                  value={this.state.SourceofFundId}
                  onChange={(e) => this.sourceofFundIdHandler(e)}
                  placeholder="SourceofFundId"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  SourceofFundname
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.SourceofFundname}
                  onChange={(e) => this.sourceofFundnameHandler(e)}
                  placeholder="SourceofFundname"
                />
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  AccountNumber
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.AccountNumber}
                  onChange={(e) => this.accountNumberHandler(e)}
                  placeholder="AccountNumber"
                />
                </div>
                <div className="col">
                  <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">BankId</label>
                </div>
                <div className="col-auto">
                  <select name="BankId" id="BankId" className="form-control"
                  onChange={(e) => this.BankIdHandler(e)}>
                    <option value={this.state.BankId}>
                      {this.state.Bankname}
                    </option>
                    {banks.map((banks) => (
                      <option key={banks.BankId} value={banks.BankId}>
                        {banks.Bankname}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
              </div>
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">
                    RevenueTypeId
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="RevenueTypeId"
                    id="RevenueTypeId"
                    className="form-control"
                    onChange={(e) => this.RevenueTypeIdHandler(e)}
                  >
                    <option value={this.state.RevenueTypeId}>
                      {this.state.RevenueTypename}
                    </option>
                    {revenues.map((revenues) => (
                      <option
                        key={revenues.RevenueTypeId}
                        value={revenues.RevenueTypeId}
                      >
                        {revenues.RevenueTypename}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">
                    Currency
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="currencyid"
                    id="currencyid"
                    className="form-control"
                    onChange={(e) => this.currencyidHandler(e)}
                  >
                    <option value={this.state.currencyid}>
                      {this.state.currencyname}
                    </option>
                    {currencies.map((currencies) => (
                      <option
                        key={currencies.currencyid}
                        value={currencies.currencyid}
                      >
                        {currencies.currencyname}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
              </div>
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">StartDate</label>
                </div>
                <div className="col-auto">
                  <input
                    name="StartDate"
                    type="date"
                    className="form-control"
                    value={this.state.StartDate}
                    onChange={(e) => this.startDateHandler(e)}
                  />
                </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                  <label htmlFor="exampleFormControlInput1">EndDate</label>
                </div>
                <div className="col-auto">
                  <input
                    name="EndDate"
                    type="date"
                    className="form-control"
                    value={this.state.EndDate}
                    onChange={(e) => this.endDateHandler(e)}
                   
                  />
                </div>
                </div>
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
