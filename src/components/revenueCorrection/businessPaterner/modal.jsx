import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../services/RevenuRessources/businessPaternerServices";



class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: { InstitutionPartenerId:0,InstitutionPartenerName:"",partenerstatusid:0,AccountNumber:"",bankid:0},
      InstitutionPartenerId:0,
      InstitutionPartenerName:"",
      PartenerStatusName:"",
      partenerstatusid:0,
      SourceofFundId:0,
      SourceofFundname: "",
      AccountNumber: "",
      bankid:0,
      Bankname:"",
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
    };
  }
  schema = {
    InstitutionPartenerId: Joi.number()
                           .required(),
    InstitutionPartenerName: Joi.string()
                            .required()
                            .label("InstitutionPartenerName"),
    AccountNumber: Joi.string()
                      .required()
                      .label("AccountNumber"),
    partenerstatusid: Joi.number()
                      .required(),
    bankid: Joi.number()
               .required(),
    
  };
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
    this.setState({ banks,paternerStatuses });

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
      
      InstitutionPartenerId:nextProps.InstitutionPartenerId,
      InstitutionPartenerName: nextProps.InstitutionPartenerName,
      PartenerStatusId: nextProps.PartenerStatusId,
      PartenerStatusName:nextProps.PartenerStatusName,
      AccountNumber:nextProps.AccountNumber,
      BankId:nextProps.BankId,
      BankName:nextProps.Bankname,
      Bankname:nextProps.Bankname,

      
    });
  }
  

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

PartenerStatusIdHandler(e) {
    this.setState({ partenerstatusid: e.target.value });
  }
BankIdHandler(e) {
    this.setState({ bankid: e.target.value });
  }
InstitutionPartenerIdHandler(e) {
    this.setState({ InstitutionPartenerId: e.target.value });
  }
InstitutionPartenerNameHandler(e) {
    this.setState({ InstitutionPartenerName: e.target.value });
  }

AccountNumberHandler(e){
  this.setState({ AccountNumber: e.target.value });
}






  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
     

      await BusinessPaterner.addBusinessPaterner(item.InstitutionPartenerId,item.InstitutionPartenerName,item.PartenerStatusId,item.AccountNumber,item.BankId );
      toast.success(`Business Paterner with   has been updated successful:${item.InstitutionPartenerId} , ${item.InstitutionPartenerName}, ${item.PartenerStatusId}, ${item.AccountNumber}, ${item.BankId}  `);
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/security/role";
      //this.props.history.push("/security/role");
       
      
    
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
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Institution Paterner
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
                  value={this.state.InstitutionPartenerId}
                  onChange={(e) => this.InstitutionPartenerIdHandler(e)}
                  placeholder="InstitutionPartenerId"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Institution Partener Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.InstitutionPartenerName}
                  onChange={(e) => this.InstitutionPartenerNameHandler(e)}
                  placeholder="InstitutionPartenerName"
                />
              </div>
              
               <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  AcountNumber
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.AccountNumber}
                  onChange={(e) => this.AccountNumberHandler(e)}
                  placeholder="AccountNumber"
                />
              </div>


              <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                   Bank
                </label></div>
                 <div className="col-auto">
                  <select name="BankId" id="BankId" className="form-control" onChange={(e) => this.BankIdHandler(e)}>
                  <option value={this.state.BankId}>{this.state.Bankname}
                    </option>
                  {banks.map(banks => (
                     <option key={banks.bankid} value={banks.bankid}>
                     {banks.bankname}
                    </option>
                    ))}
                    
                    </select>
                </div>
                
              </div>

            

               <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                   PartenerStatus
                </label></div>
                 <div className="col-auto">
                  <select name="PartenerStatusId" id="PartenerStatusId" className="form-control" onChange={(e) => this.PartenerStatusIdHandler(e)}>
                  <option value={this.state.PartenerStatusId}>{this.state.PartenerStatusName}
                    </option>
                  {paternerStatuses.map(paternerStatuses => (
                     <option key={paternerStatuses.partenerstatusid} value={paternerStatuses.partenerstatusid}>
                     {paternerStatuses.partenerstatusname}
                    </option>
                    ))}
                    
                    </select>
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
