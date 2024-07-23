import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../..//common/form";
import * as Characteristic from "../../../../services/ContractManagement/RoadRefference/roadCharacteristicServices";
import * as Class from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
import * as Pavet from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
import * as Shoulder from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: {roadclassificationid:0,shoulderid:0,pavettypeid:0,roadclass:"",numberoflames:0,lamewidth:0,shouldername:"",pavettypename:""},
      roadclassificationid:0,
      shoulderid:0,
      pavettypeid:0,
      roadclass:"",
      numberoflames:0,
      lamewidth:0,
      shouldername:"",
      pavettypename:"",
      
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
      characteristics:[],
      classes:[],
      pavettypes:[],
      shoulders:[],
    };
  }
async populateBanks() {
  try{
    const { data: characteristics } = await Characteristic.getcharacteristics();
    const { data: classes } = await Class.getclassifications();
    const { data: pavettypes } = await Pavet.getpavettypes();
    const { data: shoulders } = await Shoulder.getshoulders();
    this.setState({ characteristics,classes,pavettypes,shoulders });
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
      
      roadcharacteristicsid:nextProps.roadcharacteristicsid,
      roadclassificationid:nextProps.roadclassificationid,
      roadclass: nextProps.roadclass,
      numberoflames: nextProps.numberoflames,
      lamewidth:nextProps.lamewidth,
      shouldername:nextProps.shouldername,
      pavettypename:nextProps.pavettypename,
      shoulderid:nextProps.shoulderid,
      pavettypeid:nextProps.pavettypeid,
      //roadclassificationid shoulderid pavettypeid roadcharacteristicsid roadclass numberoflames lamewidth shouldername pavettypename
    });
  }
 schema = {
    roadcharacteristicsid: Joi.number()
                           .required(),
    roadclassificationid: Joi.number()
                           .required(),
    numberoflames: Joi.number()
                            .required(),
    lamewidth: Joi.number(),
    shoulderid: Joi.number() 
                      .required(),
    pavettypeid: Joi.number()
               .required(),
    
  };
   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const roadcharacteristicsid=0
    //await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    
    
     //roadcharacteristicsid,roadclassificationid,numberoflames,shoulderid,pavettypeid,lamewidth
       await Characteristic.addcharacteristic(roadcharacteristicsid,data.roadclassificationid,data.numberoflames,data.shoulderid,data.pavettypeid,data.lamewidth );
        toast.success(`Road characteristics has been updated successful: `);
      
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
        
        
        toast.error("An Error Occured, while saving Road characteristics Please try again later"+ex);
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
                Road Characteristic
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

              {this.renderSelectroadClassification("roadclassificationid", "Road classification", this.state.classes)}
              {this.renderInput("numberoflames", "Number of lames")}
              {this.renderSelectroadShoulder("shoulderid", "Road shoulder", this.state.shoulders)}
              {this.renderSelectroadpavettype("pavettypeid", "Road pavet type", this.state.pavettypes)}
              {this.renderInput("lamewidth", "Lame width in KM")}
              
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
