import React from "react";
import * as Source from "../../../services/RevenuRessources/sourceofFundsServices";
import * as Product from "../../../services/RevenuRessources/productServices";
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
     data: {RevenueProductId:0,RevenueProductname:"",sourceoffundid:0 },
     user:{},
     sources: [],
     banks: [],
     revenues: [],
     products: [],
      errors: {}
    };
  }
async populateBanks() {
  try{
    const { data: banks } = await bank.getbanks();
    const { data: revenues } = await RevenuType.getrevenuTypes();
    const { data: sources } = await Source.getSource();
    this.setState({ banks,revenues,sources });

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
      revenueproductid: nextProps.revenueproductid,
      RevenueProductname: nextProps.revenueproductname,
      SourceofFundId: nextProps.sourceoffundid,
      SourceofFundname: nextProps.sourceoffundname,
      
      
    });
  }
 schema = {
   revenueproductid: Joi.number()
                       .required(),
    RevenueProductname: Joi.string()
                         .required()
                         .label("RevenueProductname"),
    sourceoffundid: Joi.number()
                       .required(),
    sourceoffundname: Joi.string()
                         .required()
                         .label("SourceofFundname"),
    accountnumber: Joi.string()
                      .required()
                      .label("AccountNumber"),
    bankid: Joi.number()
               .required()
               .label("Bank"),
    revenuetypeid: Joi.number()
                      .required()
                      .label("RevenueType"),
    startdate: Joi.date(),
    enddate: Joi.date()
  };
  
 
   handleClick= async(e)=>{
    try {
    const { data } = this.state;
    const RevenueProductId=0
    await Product.addRevenueProduct(RevenueProductId,data.RevenueProductname,data.sourceoffundid);
    toast.success(`Revenue Product data RevenueProductname:  ${data.RevenueProductname}  has been updated successful`);
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
        
        toast.error("An Error Occured, while saving RevenueProduct Please try again later");
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
                Add Collection
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
              {this.renderInput("RevenueProductname", "Collection")}
              
              {this.renderSelectsource("sourceoffundid", "Source of Fund", this.state.sources)}

              
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
