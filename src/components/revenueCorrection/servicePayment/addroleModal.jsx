import React from "react";
import * as ServicePayment from "../../../services/RevenuRessources/servicePaymentService";
import Joi from "joi-browser";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as PaymentMode from "../../../services/RevenuRessources/paymentModeservices";
import * as PatServices from "../../../services/RevenuRessources/paternerServiceServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
    this.state = {
     data: { ServicePaymentId:0, partenerserviceid:0,paymentmodeid:0,Value:0},
     ServicePaymentId:0,
      partenerserviceid:0,
      paymentmodeid:0,
      Value:0,
      user:{},
      banks: [],
      paymentModes: [],
      patServices:[],
      errors: {}
    };
  }
async populateBanks() {
  try{
    const { data: banks } = await bank.getbanks();
    const { data: paymentModes } = await PaymentMode.getpaymentModes();
    const { data: patServices } = await PatServices.getpaternerServices();
    this.setState({ banks,paymentModes,patServices });
    

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
      ServicePaymentId: nextProps.ServicePaymentId,
      PartenerServiceId: nextProps.PartenerServiceId,
      InstitutionPartenerId: nextProps.InstitutionPartenerId,
      InstitutionPartenerName:nextProps.InstitutionPartenerName,
      RevenueProductId:nextProps.RevenueProductId,
      RevenueProductname:nextProps.RevenueProductname,
      PaymentModeId:nextProps.PaymentModeId,
      PaymentModename:nextProps.PaymentModename,
      isFixed:nextProps.isFixed,
      PayUnit:nextProps.PayUnit,
      Value:nextProps.Value,
      StartDate:nextProps.StartDate,
      EndDate:nextProps.EndDate,
      
    });
  }
 schema = {
    ServicePaymentId: Joi.number()
                       .required(),
    partenerserviceid: Joi.number()
                       .required(),
    paymentmodeid: Joi.number()
                       .required(),
    Value: Joi.number()
            .required()
    
  };
  
 
   handleClick= async(e)=>{
    try {
    const { data } = this.state;
    const ServicePaymentId=0
    await ServicePayment.addservicepayment(ServicePaymentId,data.partenerserviceid,data.paymentmodeid,data.Value);
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
        
        toast.error("An Error Occured, while saving Service Payment Please try again later" + ex);
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
                Add Business Paterner service Payments
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
              
              {this.renderSelectPaternerService("partenerserviceid", "PartenerService", this.state.patServices)}
              {this.renderSelectPaymentMode("paymentmodeid", "PaymentMode", this.state.paymentModes)}
              {this.renderInput("Value", "Amount to pay Service")}

              
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
