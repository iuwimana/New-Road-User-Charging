import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as ContractorData from "../../../../services/ContractManagement/ContractSetting/ContractorService";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";


class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: { 
        contractid: 0,
        contractdiscription: "",
        contractorname:"",
        budget: 0,
        contractmodeid:0,
        contractorid: 0,
        startdate: "",
        enddate: "",},
      contractid: 0,
      contractdiscription: "",
      contractorname:"",
      budget: 0,
      contractmodeid:0,
      contractorid: 0,
      startdate: "",
      enddate: "",
      user:{},
      errors: {},
      contractors: [],
      banks: [],
      paternerStatuses: [],
    };
  }
  
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
    const { data: contractors } = await ContractorData.getcontractors();
    this.setState({ banks,paternerStatuses,contractors });

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
      
      contractid: nextProps.contractid,
      contractdiscription: nextProps.contractdiscription,
      budget: nextProps.budget,
      contractmodeid: nextProps.contractmodeid,
      contractorid: nextProps.contractorid,
      contractorname:nextProps.contractorname,
      startdate: nextProps.startdate,
      enddate: nextProps.enddate,

      
    });
  }
  

  contractidHandler(e) {
    this.setState({ contractid: e.target.value });
  }
  contractdiscriptionHandler(e) {
    this.setState({ contractdiscription: e.target.value });
  }
  budgetHandler(e) {
    this.setState({ budget: e.target.value });
  }
  contractmodeidHandler(e) {
    this.setState({ contractmodeid: e.target.value });
  }
  contractoridHandler(e) {
    this.setState({ contractorid: e.target.value });
  }
  startdateHandler(e) {
    this.setState({ startdate: e.target.value });
  }
  enddateHandler(e) {
    this.setState({ enddate: e.target.value });
  }






  async handleSave() {
   // const { user } = this.state;
   
    try {
    const data = this.state;
    
      await ContractData.addcontract(
        data.contractid,
        data.contractdiscription,
        data.budget,
        data.contractmodeid,
        data.contractorid,
        data.startdate,
        data.enddate 
      );

      toast.success(`contractor  has been updated successful:
       ${data.contractid},
        ${data.contractdiscription},
        ${data.budget},
        ${data.contractmodeid},
        ${data.contractorid},
        ${data.startdate},
        ${data.enddate} `);
      
    
    //this.props.saveModalDetails(item);
    //(myString.toLowerCase() === 'true');
     //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
   // const item = this.state;
    //this.props.saveModalDetails(item);
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
        
        toast.error("An Error Occured, while saving role Please try again later");
    }
    }
  }

  render() {
    const contractors = this.state.contractors;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{
            maxWidth: "1370px",
            width: "100%",
            height: "100%",
          }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update contractor
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
              <div className="row">
              <div className="col">
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                   
                  </div>
                  <div className="btn-wrapper text-start">
                    {/**------------------------------------------- */}
                        <input
                          type="text"
                          className="form-control"
                          name="contractid"
                          id="contractid"
                          value={this.state.contractid}
                          onChange={(e) => this.contractidHandler(e)}
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="ContractModeid"
                          id="ContractModeid"
                          value={this.state.contractmodeid}
                          onChange={(e) => this.ContractModeidHandler(e)}
                        />
                         {/**------------------------------------------- */}
                    <div className="row">
                      <div className="col">

                         {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contract discription
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contractdiscription"
                                  id="contractdiscription"
                                  value={this.state.contractdiscription}
                                  onChange={(e) =>
                                    this.contractdiscriptionHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}

                      </div>
                      <div className="col">

                         {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  contractor
                                </label>
                              </div>
                            </div>

                            <div className="col">
                              <div className="col-auto">
                                <select
                                  name="contractorid"
                                  id="contractorid"
                                  className="form-control"
                                  onChange={(e) => this.contractoridHandler(e)}
                                >
                                  <option
                                    value={this.state.contractorid}
                                  >
                                    {this.state.contractorname}
                                  </option>
                                  {contractors.map((contractors) => (
                                    <option
                                      key={contractors.contractorid}
                                      value={contractors.contractorid}
                                    >
                                      {contractors.contractorname}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}

                      </div>
                    </div>
                    <div className="row">
                      <div className="col">

                        {/**------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  startdate
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="startdate"
                                  id="startdate"
                                  value={this.state.startdate}
                                  onChange={(e) => this.startdateHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}

                      </div>
                      <div className="col">

                        {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  enddate
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="enddate"
                                  id="enddate"
                                  value={this.state.enddate}
                                  onChange={(e) => this.enddateHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/**------------------------------------------- */}
 
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col">
                      <div className="col-auto">
                        
                      </div>
                    </div>
                      <div className="col">
                       {/**------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  budget
                                </label>
                              </div>
                            </div>

                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="budget"
                                  id="budget"
                                  value={this.state.budget}
                                  onChange={(e) => this.budgetHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        

                        {/**------------------------------------------- */}
                      </div>
                    </div>
                    

                    <br></br>
                  </div>
                </Card>
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
