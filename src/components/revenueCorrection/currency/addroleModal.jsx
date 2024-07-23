import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import Form from "../../common/form";

import * as CurrencyData from "../../../services/RevenuRessources/currencyServices"
import Currency from './currency';
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: {currencyid:0,currencyname:"",countryname:"",buyrate:0,salerate:0},
      
      currencyid:0,
      currencyname:"",
      countryname:"",
      buyrate:0,
      salerate:0,
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
    };
  }


 async  componentDidMount() {
    const user = auth.getJwt();
    this.setState({ user });
  }
    componentWillReceiveProps(nextProps) {
    this.setState({
      currencyid:nextProps.currencyid,
      currencyname:nextProps.currencyname,
      countryname:nextProps.countryname,
      buyrate:nextProps.buyrate,
      salerate:nextProps.salerate,
     
      
    });
  }
 schema = {
  
    currencyid: Joi.number()
                           .required(),
    currencyname: Joi.string()
                            .required()
                            .label("currencyname"),
    countryname: Joi.string()
                      .required()
                      .label("countryname"),
    buyrate: Joi.number() 
                      .required(),
    salerate: Joi.number()
               .required(),
    
  };
   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const currencyid=0
    
     
       await CurrencyData.addcurrencies(currencyid,data.currencyname,data.countryname,data.buyrate,data.salerate);
        toast.success(`currency with   has been updated successful: `);
      
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
        
        
        toast.error("An Error Occured, while saving currency Please try again later"+ex);
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
                RMF Revenu Collection-Add New Currency
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
              <div className="row">
                <div className="col">
                   {this.renderInput("currencyname", "currency")}

                </div>
                 <div className="col">
                  {this.renderInput("countryname", "country name")}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {this.renderInput("buyrate", "Buying rate")}

                </div>
                 <div className="col">
                  {this.renderInput("salerate", "Selling rate")}
                  
                </div>
              </div>

             
              
              
              
                    

              
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
