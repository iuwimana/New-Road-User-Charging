import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as CurrencyData from "../../../services/RevenuRessources/currencyServices"
import * as FisclaYearData from "../../../services/RMFPlanning/fiscalYearService";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        currencyid:0,
      fiscalyearid:0,
      fiscalyear:"",
      islocked:1,
      isselected:1,
      },
      currencyid:0,
      fiscalyearid:0,
      fiscalyear:"",
      islocked:1,
      isselected:1,
      user: {},
      errors: {},
      banks: [],
      paternerStatuses: [],
    };
  }
  schema = {
    fiscalyearid: Joi.number()
                           .required(),
  fiscalyear: Joi.string()
                            .required()
                            .label("currencyname"),
  islocked: Joi.boolean()
                      .required()
                      .label("countryname"),
   isselected: Joi.boolean() 
                      .required(),
  };

  async componentDidMount() {
    const user = auth.getJwt();
    this.setState({ user });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fiscalyearid:nextProps.fiscalyearid,
      fiscalyear:nextProps.fiscalyear,
      islocked:nextProps.islocked,
      isselected:nextProps.isselected,
    });
  }

  currencyidHandler(e) {
    this.setState({ fiscalyearid: e.target.value });
  }

  currencynameHandler(e) {
    this.setState({ fiscalyear: e.target.value });
  }

  

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;
      const islocked=false
       const isselected=false
      await FisclaYearData.addFiscalyear(
        item.fiscalyearid,
        item.fiscalyear,
        islocked,
        isselected
      );
      toast.success(
        `Business Paterner with   has been updated successful:
        fiscalyearid:${item.fiscalyearid} , 
        fiscalyear:${item.fiscalyear},
          `
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
            maxWidth: "370px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                RMF Revenu Collection-Update Fiscal year
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
                  value={this.state.fiscalyearid}
                  onChange={(e) => this.currencyidHandler(e)}
                  placeholder="fiscalyearid"
                />
              </div>
              <div className="mb-3">
              <div className="row">
                <div className="col">
                   <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Fiscalyear
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fiscalyear}
                  onChange={(e) => this.currencynameHandler(e)}
                  placeholder="fiscalyear"
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
