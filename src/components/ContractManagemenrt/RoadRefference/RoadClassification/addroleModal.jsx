import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../../common/form";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices"
import * as Classification from "../../../../services/ContractManagement/RoadRefference/roadClassificationService"
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);
    
   this.state = {
      data: { roadclass:"",roadclassificationid:0 },
       roadclass:"",
       roadclassificationid:0,
      
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
      classifications:[],
    };
  }
async populateBanks() {
  try{
    const { data: banks } = await bank.getbanks();
    const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
    const { data: classifications } = await Classification.getclassifications;
    this.setState({ banks,paternerStatuses,classifications });
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
      
      roadclassificationid:nextProps.roadclassificationid,
      roadclass: nextProps.roadclass,
      
      
    });
  }
 schema = { 
    roadclassificationid: Joi.number()
                           .required(),
    roadclass: Joi.string()
                            .required()
                            .label("roadclass"),
   
    
  };
   


   handleClick= async(e)=>{
   try {
    const { data } = this.state;
    const roadclassificationid=0
    //await source.addsource(SourceofFundId,data.SourceofFundname,data.AccountNumber,data.BankId,data.RevenueTypeId,data.StartDate,data.EndDate);
    //roadclass roadclassificationid
    
     
       await Classification.addclassification(roadclassificationid,data.roadclass );
        toast.success(`road classiffication with   has been updated successful: `);
      
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
                Road Classification
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

              {this.renderInput("roadclass", "road classification")}
              

              
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
