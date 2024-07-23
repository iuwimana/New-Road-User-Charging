import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../../common/form";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices"
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: {serviceorderid:0, serviceorderdescription:"", damagedlevel:"",serviceorderstatus:"",contractid:0, projectid:0},
      
      serviceorderid:0,
      contractid:0, 
      projectid:0,
      serviceorderdescription:"", 
      damagedlevel:"",
      serviceorderstatus:"",
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
    };
  }
async populateBanks() {
  try{
    const { data: banks } = await bank.getbanks();
    const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
    this.setState({ banks,paternerStatuses });
  }catch (ex) {
    toast.error("Loading issues......"+ex);
  }
    
    
  }
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }
  serviceorderstatusHandler(e) {
    this.setState({ serviceorderstatus: e.target.value });
  }
  serviceorderdescriptionHandler(e) {
    this.setState({ serviceorderdescription: e.target.value });
  }
  damagedlevelHandler(e) {
    this.setState({ damagedlevel: e.target.value });
  }
  contractidHandler(e) {
    this.setState({ contractid: e.target.value });
  }
  projectidHandler(e) {
    this.setState({ projectid: e.target.value });
  }

 async  componentDidMount() {
  await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
    componentWillReceiveProps(nextProps) {
    this.setState({
      
      serviceorderid:nextProps.serviceorderid,
      serviceorderdescription: nextProps.serviceorderdescription,
      damagedlevel: nextProps.damagedlevel,
      contractid: nextProps.contractid,
      projectid: nextProps.projectid,
      serviceorderstatus:nextProps.serviceorderstatus,
      
      
    });
  }

   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const serviceorderid=0
    //await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    //serviceorderid serviceorderdescription damagedlevel contractid projectid
    
     
       //await BusinessPaterner.addBusinessPaterner(serviceorderid,data.serviceorderdescription,data.damagedlevel,data.contractid,data.projectid);
        toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${serviceorderid},
       serviceorderdescription: ${data.serviceorderdescription},
       damagedlevel: ${data.damagedlevel},
       contractid: ${data.contractid},
       projectid: ${data.projectid} `);
      
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
        
        
        toast.error("An Error Occured, while saving Bussiness parterner Please try again later"+ex);
    }
    }
  }
   


  render() {
    //const paternerStatuses = this.state.paternerStatuses;
    //const banks = this.state.banks;
    return (
      
      <div  
        className="modal fade"
        id="exampleAddModal"
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
                Add Service Order
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
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                   
                  </div>
                  <div className="btn-wrapper text-start">
                    {/**------------------------------------------- */}
                        <input
                          type="hidden"
                          className="form-control"
                          name="contractmodeid"
                          id="contractmodeid"
                          value={this.state.serviceorderid}
                          onChange={(e) => this.serviceorderidHandler(e)}
                        />
                         {/**------------------------------------------- */}
        
                          {/**------------------------------------------- */}
                        <input
                          type="hidden"
                          className="form-control"
                          name="projectid"
                          id="projectid"
                          value={this.state.projectid}
                          onChange={(e) => this.projectidHandler(e)}
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
                                  Service Order discription
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="serviceorderdescription"
                                  id="serviceorderdescription"
                                  value={this.state.serviceorderdescription}
                                  onChange={(e) =>
                                    this.serviceorderdescriptionHandler(e)
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
                                  Road Demaged Level
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="damagedlevel"
                                  id="damagedlevel"
                                  value={this.state.damagedlevel}
                                  onChange={(e) =>
                                    this.damagedlevelHandler(e)
                                  }
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.handleClick}
              >
                AddNew
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
           
            
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
