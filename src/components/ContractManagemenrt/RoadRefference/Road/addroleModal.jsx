import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../../common/form";
import * as RoadType from "../../../../services/ContractManagement/RoadRefference/roadTypeServices";
import * as Characteristic from "../../../../services/ContractManagement/RoadRefference/roadCharacteristicServices";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: {roodid:0,roodname:"",rooddistance:0,roodtypeid:0,roodtypename:"",
             roadclass:"",roadcharacteristicsid:0,numberoflames:0,lamewidth:0,
            shouldername:"",pavettypename:"" },
        
      roodid:0,
      roodname:"",
      rooddistance:0,
      roodtypeid:0,
      roodtypename:"",
      roadclass:"",
      roadcharacteristicsid:0,
      numberoflames:0,
      lamewidth:0,
      shouldername:"",
      pavettypename:"",
      user:{},
      errors: {},
      roadtypes: [],
      characteristics: [],
      roads: [],
    };
  }
async populateBanks() {
  try{
    const { data: roadtypes } = await RoadType.getroadtypes();
    const { data: characteristics } = await Characteristic.getcharacteristics();
    const { data: roads } = await Road.getroads();
    this.setState({ roadtypes,characteristics,roads });
  }catch (ex) {
    toast.error("Loading issues......"+ex);
  }
    
    
  }

 async  componentDidMount() {
  await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
    componentWillReceiveProps(nextProps) {
    this.setState({
          
                           
                         
      roodid:nextProps.roodid,
      roodname: nextProps.roodname,
      rooddistance: nextProps.rooddistance,
      roodtypeid:nextProps.roodtypeid,
      roodtypename:nextProps.roodtypename,
      roadclass:nextProps.roadclass,
      roadcharacteristicsid:nextProps.roadcharacteristicsid,

      numberoflames:nextProps.numberoflames,
      lamewidth:nextProps.lamewidth,
      shouldername:nextProps.shouldername,
      pavettypename:nextProps.pavettypename,
      
    });
  }
 schema = {
    roodid: Joi.number()
                           .required(),
    roodname: Joi.string()
                            .required()
                            .label("roodname"),
    rooddistance: Joi.number(),
                      
    roodtypeid: Joi.number() 
                      .required(),
    roadcharacteristicsid: Joi.number()
               .required(),
    
  };
   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const RoodId=0
    //await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    
    //RoodId,RoodName,RoodDistance,RoodTypeId,roadcharacteristicsid
     
       await Road.addroad(RoodId,data.roodname,data.rooddistance,data.roodtypeid,data.roadcharacteristicsid);
        toast.success(`Road setting  has been save successful: `);
      
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
                Road Registration
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
              {this.renderInput("roodname", "Rood Name")}
              {this.renderInput("rooddistance", "Rood Distance")}
              {this.renderSelectroadType("roodtypeid", "Rood Type", this.state.roadtypes)}
              {this.renderSelectroadCharacteristic("roadcharacteristicsid", "road characteristics", this.state.characteristics)}
                     

              
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
