import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";
import * as PaternerStatuses from "../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../services/RevenuRessources/businessPaternerServices"
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: { InstitutionPartenerId:0, InstitutionPartenerName: "", AccountNumber: "", BankId:0,  Bankname:"", PartenerStatusId:0, PartenerStatusName:""},
      
      InstitutionPartenerId:0,
      InstitutionPartenerName:"",
      PartenerStatusName:"",
      PartenerStatusId:0,
      SourceofFundId:0,
      SourceofFundname: "",
      AccountNumber: "",
      BankId:0,
      Bankname:"",
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
    toast.error("Loading issues......");
  }
    
    
  }

 async  componentDidMount() {
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
      BankName:nextProps.BankName,
      
    });
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
    PartenerStatusId: Joi.number()
                      .required(),
    BankId: Joi.number()
               .required(),
    
  };
   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const InstitutionPartenerId=0
    //await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    
    
     
       await BusinessPaterner.addBusinessPaterner(InstitutionPartenerId,data.InstitutionPartenerName,data.PartenerStatusId,data.AccountNumber,data.BankId );
        toast.success(`Business Paterner with   has been updated successful: `);
      
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

            <form onSubmit={this.handleSubmit}>

              {this.renderInput("InstitutionPartenerName", "InstitutionPartenerName")}
              {this.renderInput("AccountNumber", "AccountNumber")}
              {this.renderSelect("BankId", "Bank", this.state.banks)}
              {this.renderselectPartenerStatus("PartenerStatusId", "PartenerStatus", this.state.paternerStatuses)}
                     

              
              <div className="modal-footer">
              <button 
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
                onClick={this.handleClick}
              >AddNew</button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button >
              
              </div>
             </form> 
           
            
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
