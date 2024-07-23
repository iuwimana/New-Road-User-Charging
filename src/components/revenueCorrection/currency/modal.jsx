import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as CurrencyData from "../../../services/RevenuRessources/currencyServices"

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        currencyid: 0,
        currencyname: "",
        countryname: "",
        buyrate: 0,
        salerate: 0,
      },
      currencyid: 0,
      currencyname: "",
      countryname: "",
      buyrate: 0,
      salerate: 0,
      user: {},
      errors: {},
      banks: [],
      paternerStatuses: [],
    };
  }
  schema = {
    currencyid: Joi.number().required(),
    currencyname: Joi.string().required().label("currencyname"),
    countryname: Joi.string().required().label("countryname"),
    buyrate: Joi.number().required(),
    salerate: Joi.number().required(),
  };

  async componentDidMount() {
    const user = auth.getJwt();
    this.setState({ user });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currencyid: nextProps.currencyid,
      currencyname: nextProps.currencyname,
      countryname: nextProps.countryname,
      buyrate: nextProps.buyrate,
      salerate: nextProps.salerate,
    });
  }

  currencyidHandler(e) {
    this.setState({ currencyid: e.target.value });
  }

  currencynameHandler(e) {
    this.setState({ currencyname: e.target.value });
  }

  countrynameHandler(e) {
    this.setState({ countryname: e.target.value });
  }
  buyrateHandler(e) {
    this.setState({ buyrate: e.target.value });
  }
  salerateHandler(e) {
    this.setState({ salerate: e.target.value });
  }

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;

      await CurrencyData.addcurrencies(
        item.currencyid,
        item.currencyname,
        item.countryname,
        item.buyrate,
        item.salerate
      );
      toast.success(
        `Business Paterner with   has been updated successful:
        currencyid:${item.currencyid} , 
        currencyname:${item.currencyname},
        countryname: ${item.countryname}, 
        buying rate ${item.buyrate},
        saling rate  ${item.salerate}  `
      );
      
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
    const paternerStatuses = this.state.paternerStatuses;
    const banks = this.state.banks;
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
                RMF Revenu Collection-Update Currency
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
                  value={this.state.currencyid}
                  onChange={(e) => this.currencyidHandler(e)}
                  placeholder="currencyid"
                />
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                   <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Currency
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.currencyname}
                  onChange={(e) => this.currencynameHandler(e)}
                  placeholder="currencyname"
                />
                </div>
                <div className="col">

                   <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Currency Country 
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.countryname}
                  onChange={(e) => this.countrynameHandler(e)}
                  placeholder="countryname"
                />



                </div>
              </div>
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                   <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Buying Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.buyrate}
                  onChange={(e) => this.buyrateHandler(e)}
                  placeholder="Buying Rate"
                />
                </div>
                <div className="col">
                   <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Selling Rate
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.salerate}
                  onChange={(e) => this.salerateHandler(e)}
                  placeholder="Selling Rate"
                />
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
