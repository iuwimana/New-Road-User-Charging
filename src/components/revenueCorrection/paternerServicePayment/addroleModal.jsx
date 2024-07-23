import React from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
    this.state = {
     data: { SourceofFundId:0, SourceofFundname: "", AccountNumber: "", BankId:0,  Bankname:"", RevenueTypeId:0, RevenueTypename:"", StartDate:"", EndDate:""}
     ,user:{},
     banks: [],
     revenues: [],
      errors: {}
    };
  }
async populateBanks() {
  try{
    const { data: banks } = await bank.getbanks();
    const { data: revenues } = await RevenuType.getrevenuTypes();
    this.setState({ banks,revenues });

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
      
      SourceofFundId: nextProps.SourceofFundId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      BankId: Boolean(nextProps.BankId),
      RevenueTypeId: Boolean(nextProps.RevenueTypeId),
      StartDate: Boolean(nextProps.StartDate),
      EndDate: Boolean(nextProps.EndDate),
      
    });
  }
 schema = {
    SourceofFundId: Joi.number()
                       .required(),
    SourceofFundname: Joi.string()
                         .required()
                         .label("SourceofFundname"),
    AccountNumber: Joi.string()
                      .required()
                      .label("AccountNumber"),
    BankId: Joi.number()
               .required()
               .label("Bank"),
    RevenueTypeId: Joi.number()
                      .required()
                      .label("RevenueType"),
    StartDate: Joi.date(),
    EndDate: Joi.date()
  };
  
 
   handleClick= async(e)=>{
    try {
    const { data } = this.state;
    const SourceofFundId=0
    await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    toast.success(`source of funds data SourceofFundname:  ${data.SourceofFundname} ,AccountNumber: ${data.AccountNumber}, bankID: ${data.BankId} and RevenuTypeid:${data.RevenueTypeId},${data.StartDate},${data.EndDate} has been updated successful`);
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
  
doSubmit = async(e) => {
    //const { user } = this.state;
    try {
    //const SourceofFundId=0
    //const { data } = this.state;
    
    //toast.success(`source of funds data SourceofFundname: ${SourceofFundId} ${item.SourceofFundname} ,AccountNumber: ${item.AccountNumber}, bankID: ${item.BankId} and RevenuTypeid:${item.RevenueTypeId},${item.StartDate},${item.EndDate} has been updated successful`);

       
      //await source.addsource(SourceofFundId,item.SourceofFundname,item.AccountNumber,item.BankId,item.RevenueTypeId,item.StartDate,item.EndDate);
      //toast.success(`role with SourceofFundname: ${item.SourceofFundname} ,AccountNumber: ${item.AccountNumber} has been updated successful`);
      
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
    //const banks=this.state.banks
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
                Add Source of Funds
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
              {this.renderInput("SourceofFundname", "SourceofFundname")}
              {this.renderInput("AccountNumber", "AccountNumber")}
              {this.renderSelect("BankId", "Bank", this.state.banks)}
              {this.renderSelectRev("RevenueTypeId", "RevenueType", this.state.revenues)}
              {this.renderInput("StartDate", "StartDate","date")}
              {this.renderInput("EndDate", "EndDate","date")}

              
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
