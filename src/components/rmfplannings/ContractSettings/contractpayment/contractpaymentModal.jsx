import React, { Component } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";

import * as Serviceorderdate from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractInspection from "../../../../services/contractinpection/contractinspect";
import * as Contractpayment from "../../../../services/contractpayment/contractpaymentservice";
import * as PaymenttypeData from "../../../../services/contractpayment/paymenttypeservices";

import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";

class ContractpaymentModal extends Component {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        contractpaymentid: 0,
        contractbudget: 0,
        contractdiscription: 0,
        payedamount: 0,
        contractid: 0,
        paymenttypename:"",
        paymenttypeid:0,
        notes:"",
        contractamount: 0,
        remainamount: 0,
        paymentdate: "",
      },
      contractpaymentid: 0,
      contractbudget: 0,
      contractdiscription: 0,
      payedamount: 0,
      contractid: 0,
      paymenttypename:"",
      paymenttypeid:0,
      notes:"",
      contractamount: 0,
      remainamount: 0,
      paymentdate: "",
      user: {},
      errors: {},
      measurement: [],
      paymenttypes:[],
      projectType: [],
      banks: [],
      fiscalYear: [],
      target: [],
      road: [],
      maintenance: [],
      paternerStatuses: [],
    };
  }

  async populateBanks() {
    try {
      const { data: measurement } = await Measurement.getmeasurements();
      const { data: projectType } = await ProjectType.getcontracttypes();
      const { data: fiscalYear } = await FiscalYear.getFiscalyears();
      const { data: target } = await Target.gettargets();
      const { data: road } = await Road.getroads();
      const { data: maintenance } = await Maintenance.getmaintenances();
      const { data: paymenttypes } = await PaymenttypeData.getpaymenttypes();

      const { data: banks } = await bank.getbanks();
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({
        banks,
        paternerStatuses,
        projectType,
        fiscalYear,
        target,
        road,
        maintenance,
        measurement,
        paymenttypes,
      });
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
      contractpaymentid: nextProps.contractpaymentid,
      contractdiscription: nextProps.contractdiscription,
      payedamount: nextProps.payedamount,
      contractamount: nextProps.contractamount,
      remainamount: nextProps.remainamount,
      paymentdate: nextProps.paymentdate,
      contractid: nextProps.contractid,
      paymenttypeid:nextProps.paymenttypeid,
      paymenttypename:nextProps.paymenttypename,
      contractbudget: nextProps.contractbudget,
      notes:nextProps.notes,
    });
  }


  notesHandler(e) {
    this.setState({ notes: e.target.value });
  }
  contractpaymentidHandler(e) {
    this.setState({ contractpaymentid: e.target.value });
  }
  contractdiscriptionHandler(e) {
    this.setState({ contractdiscription: e.target.value });
  }
  payedamountHandler(e) {
    this.setState({ payedamount: e.target.value });
  }
  contractamountHandler(e) {
    this.setState({ contractamount: e.target.value });
  }
  remainamountHandler(e) {
    this.setState({ remainamount: e.target.value });
  }
  paymentdateHandler(e) {
    this.setState({ paymentdate: e.target.value });
  }
  contractidHandler(e) {
    this.setState({ contractid: e.target.value });
  }
  contractbudgetHandler(e) {
    this.setState({ contractbudget: e.target.value });
  }
  paymenttypeidHandler(e) {
    this.setState({ paymenttypeid: e.target.value });
  }

  handleClick = async (e) => {
    try {
      const data = this.state;
      const remainamount = 0;
      if (data.payedamount > data.contractbudget) {
        toast.error("Amount you pay is greater than contract amount");
      } else {
        await Contractpayment.addcontractpayment(
          data.contractpaymentid,
          data.contractid,
          data.payedamount,
          data.contractbudget,
          remainamount,
          data.notes,
          data.paymenttypeid
        );
        toast.success(`payment    has been updated successful:
       contractid; ${data.contractid},
       payedamount: ${data.payedamount},
       contractamount: ${data.contractbudget},
       remainamount: ${remainamount} 
       data.paymenttypeid:${data.paymenttypeid}`);
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
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  };
  render() {
    const paymenttypes = this.state.paymenttypes;
    return (
      <div
        className="modal fade"
        id="contractpaymentModal"
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
                Update Invoice
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
            <div className="row">
              <div className="col">
                {/**-----------------SAP data */}
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3"></div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  {/**--------------------------------------------------------------------------- */}
                  {/**----------------------row1----------------------------------------------------- */}
                  <div className="row">
                    <div className="col">
                      <div className="col-auto">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Amount on Contract
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                          type="hidden"
                          className="form-control"
                          name="contractpaymentid"
                          id="contractpaymentid"
                          value={this.state.contractpaymentid}
                          onChange={(e) => this.contractpaymentidHandler(e)}
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="payedamount"
                          id="payedamount"
                          value={this.state.payedamount}
                          onChange={(e) => this.payedamountHandler(e)}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                       <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Payment type
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <select
                          name="paymenttypeid"
                          id="paymenttypeid"
                          className="form-control"
                          onChange={(e) => this.paymenttypeidHandler(e)}
                        >
                          <option
                              value={this.state.paymenttypeid}
                            > 
        
                             {this.state.paymenttypename}
                            </option>
                          {paymenttypes.map((paymenttypes) => (
                            <option
                              key={paymenttypes.paymenttypeid}
                              value={paymenttypes.paymenttypeid}
                            >
                              {paymenttypes.paymenttypename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br/><br/>
                  {/**---------------------row2------------------------------------------------------ */}
                  <div className="row">
                    <div className="col">
                      <div className="col-auto">
                         <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Addition Note
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <textarea
                          className="textarea"
                          name="notes"
                          id="notes"
                          value={this.state.notes}
                          onChange={(e) =>this.notesHandler(e)
                          }
                          rows="10"
                          cols="50"
                          placeholder="a note related to the payement"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                  </div>
                  {/**----------------------row3----------------------------------------------------- */}
                  <br/><br/><br/><br/>
                  <div className="row">
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Total Amount
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <input
                              type="text"
                              disabled={true}
                              className="form-control"
                              name="contractbudget"
                              id="contractbudget"
                              value={this.state.contractamount}
                              onChange={(e) => this.contractbudgetHandler(e)}
                            />
                      </div>
                    </div>
                  </div>
                  {/**-----------------------row4---------------------------------------------------- */}
                  <div className="row">
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                  </div>
                  {/**------------------------row5--------------------------------------------------- */}
                  <div className="row">
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                    <div className="col">
                      <div className="col-auto"></div>
                    </div>
                  </div>
                  {/**--------------------------------------------------------------------------- */}

                  <div className="mb-3">
                    {/**-------------------------------------------------------------- */}
                    
                    
                  </div>
                  {/**----------------------------------------------------------------- */}
                </Card>
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
                onClick={this.handleClick}
              >
                pay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContractpaymentModal;
