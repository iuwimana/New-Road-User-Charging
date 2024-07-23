import React from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as Product from "../../../services/RevenuRessources/productServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as Businessess from "../../../services/RevenuRessources/businessPaternerServices";
import * as PaternerService from "../../../services/RevenuRessources/paternerServiceServices";

import Form from "../../common/form";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
    this.state = {
     data: { PartenerServiceId : 0,institutionpartenerid:0,InstitutionPartenerName:"",
             revenueproductid:0,RevenueProductname:"", StartDate:"", EndDate:""},
     user:{},
     banks: [],
     revenues: [],
     businesses:[],
     products:[],
      errors: {}
    };
  }
async populateBanks() {
  try{
     const { data: businesses} = await Businessess.getBusinessPaterners();
    
    const { data: products } = await Product.getrevenuproducts();
    this.setState({ businesses,products });
    } catch (ex) {
    toast.error("An Error Occured:" + ex);
  }
    
  }

 async  componentDidMount() {
  try{
     await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });

  } catch (ex) {
    toast.error("An Error Occured:" + ex);
  }
 
  }
    componentWillReceiveProps(nextProps) {
       try{
         this.setState({
      
      SourceofFundId: nextProps.SourceofFundId,
      SourceofFundname: nextProps.SourceofFundname,
      AccountNumber: nextProps.AccountNumber,
      BankId: Boolean(nextProps.BankId),
      RevenueTypeId: Boolean(nextProps.RevenueTypeId),
      StartDate: Boolean(nextProps.StartDate),
      EndDate: Boolean(nextProps.EndDate),
      
    });
    } catch (ex) {
    toast.error("An Error Occured:" + ex);
  }
  }
 schema = {
    PartenerServiceId: Joi.number()
                       .required(),
    institutionpartenerid: Joi.number()
                       .required(),
    InstitutionPartenerName: Joi.string()
                         .required()
                         .label("InstitutionPartenerName"),
    revenueproductid: Joi.number()
                       .required(),
    RevenueProductname: Joi.string()
                      .required()
                      .label("RevenueProductname"),
    StartDate: Joi.date(),
    EndDate: Joi.date()
  };
  
 
   handleClick= async(e)=>{
    try {
const PartenerServiceId=0
    const { data } = this.state;  
    await PaternerService.addPartenerService(PartenerServiceId,data.institutionpartenerid,data.revenueproductid,data.StartDate,data.EndDate);
    toast.success(`InstitutionPartener with InstitutionPartenerID: ${data.InstitutionPartenerId}, InstitutionPartenerName: ${data.InstitutionPartenerName} ,servicer: ${data.RevenueProductId}${data.RevenueProductname} and date ${data.StartDate}${data.EndDate}   has been Added successful`);
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
    const PartenerServiceId=0
    const { data } = this.state;  
    await PaternerService.addPartenerService(PartenerServiceId,data.InstitutionPartenerId,data.RevenueProductId,data.StartDate,data.EndDate);
    toast.success(`InstitutionPartener with InstitutionPartenerID: ${data.InstitutionPartenerId}, InstitutionPartenerName: ${data.InstitutionPartenerName} ,servicer: ${data.RevenueProductId}${data.RevenueProductname} and date ${data.StartDate}${data.EndDate}   has been Added successful`);
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
                Add Business Paterner Service Offer
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
              
              {this.renderSelectBusinessPaterner("institutionpartenerid", "Business Paterner", this.state.businesses)}
              {this.renderSelectRevenuProduct("revenueproductid", "Revenue Product", this.state.products)}
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
