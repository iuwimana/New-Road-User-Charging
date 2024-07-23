import React, { Component } from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import * as Product from "../../../services/RevenuRessources/productServices";
import * as Businessess from "../../../services/RevenuRessources/businessPaternerServices";
import * as PaternerService from "../../../services/RevenuRessources/paternerServiceServices";



class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: { PartenerServiceId : 0,institutionpartenerid:0,InstitutionPartenerName:"",
             revenueproductid:0,RevenueProductname:"", StartDate:"", EndDate:""},
      PartenerServiceId:0,
      institutionpartenerid: 0,
      InstitutionPartenerName: "",
      revenueproductid:0,
      RevenueProductname:"",
      StartDate:"",
      EndDate:"",
      user:{},
      errors: {},
      banks: [],
      businesses:[],
      revenues: [],
      products: [],
    };
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
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: businesses} = await Businessess.getBusinessPaterners();
    
    const { data: products } = await Product.getrevenuproducts();
    this.setState({ banks,products,businesses });

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
      
      PartenerServiceId:nextProps.PartenerServiceId,
      institutionpartenerid: nextProps.InstitutionPartenerId,
      InstitutionPartenerName: nextProps.InstitutionPartenerName,
      revenueproductid:nextProps.RevenueProductId,
      RevenueProductname:nextProps.RevenueProductname,
      StartDate:nextProps.StartDate,
      EndDate:nextProps.EndDate,
      

     
      
    });
  }
  

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }



RevenueProductIdHandler(e) {
    this.setState({ 
            revenueproductid: e.target.value
       });
  }
  RevenueProductIdHandler(e) {
    this.setState({ 
      RevenueProductId: e.target.value
       });
  }

InstitutionPartenerIdHandler(e) {
    this.setState({ 
      institutionpartenerid: e.target.value,
      InstitutionPartenerId: e.target.value
      });
  }

startDateHandler(e) {
    
    this.setState({ StartDate: e.target.value });
  }
endDateHandler(e) {
    
    this.setState({ EndDate: e.target.value });
  }





  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
     

      await PaternerService.addPartenerService(item.PartenerServiceId,item.institutionpartenerid,item.revenueproductid,item.StartDate,item.EndDate);
      toast.success(`InstitutionPartener with InstitutionPartenerID: ${item.institutionpartenerid}, InstitutionPartenerName: ${item.InstitutionPartenerName} ,servicer: ${item.revenueproductid}${item.RevenueProductname} and date ${item.StartDate}${item.EndDate}   has been updated successful`);
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
    const products = this.state.products;
    const businesses = this.state.businesses;
    
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
                Business Paterner Service Offer
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
                  type="hidden"
                  className="form-control"
                  value={this.state.PartenerServiceId}
                  onChange={(e) => this.PartenerServiceIdHandler(e)}
                  placeholder="PartenerServiceId"
                />
              </div>
              
              <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  InstitutionPartener
                </label></div>
                 <div className="col-auto">


                  <select name="institutionpartenerid" id="institutionpartenerid" className="form-control" onChange={(e) => this.InstitutionPartenerIdHandler(e)}>
                  <option value={this.state.institutionpartenerid}>{this.state.InstitutionPartenerName}
                    </option>
                  {businesses.map(businesses => (
                     <option key={businesses.institutionpartenerid} value={businesses.institutionpartenerid}>
                     {businesses.institutionpartenername}
                    </option> 
                    ))}
                    
                    </select>
                </div>
                
              </div>
               <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  RevenueProduct
                </label></div>
                 <div className="col-auto">



                  <select name="RevenueProductId" id="RevenueProductId" className="form-control" onChange={(e) => this.RevenueProductIdHandler(e)}>
                  <option value={this.state.RevenueProductId}>{this.state.RevenueProductname}
                    </option>
                  {products.map(products => (
                     <option key={products.revenueproductid} value={products.revenueproductid}>
                     {products.revenueproductname}
                    </option>
                    ))}
                    
                    </select>
                </div>
                
              </div>
               <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  StartDate
                </label></div>
                 <div className="col-auto">
                <input
                  name="StartDate"
                  type="date"
                  className="form-control"
                  value={this.state.StartDate}
                  checked={this.state.StartDate.value}
                  onChange={(e) => this.startDateHandler(e)}
                  
                />
                </div>
                
              </div>
               <div className="mb-3">
                 <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                  EndDate
                </label></div>
                 <div className="col-auto">
                <input
                  name="EndDate"
                  type="date"
                  className="form-control"
                  value={this.state.EndDate}
                  checked={this.state.EndDate.value}
                  onChange={(e) => this.endDateHandler(e)}
                  
                />
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
