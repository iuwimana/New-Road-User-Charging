import React, { Component } from "react";
import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as bank from "../../../services/RevenuRessources/bankservices";
import Form from "../../common/form";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import "./Modal.css";


class Modal extends Form {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: { ProgramId:0,ProgramName:"",Description:""},
      ProgramId:0,
      ProgramName:"",
      Description:"",
      user:{},
      errors: {},
      banks: [],
      revenues: [],
    };
  }
  schema = {
    
    ProgramId: Joi.number()
                       .required(),
    ProgramName: Joi.string()
                         .required()
                         .label("ProgramName"),
    Description: Joi.string()
                         .required()
                         .label("Description"),

    
  };
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: revenues } = await RevenuType.getrevenuTypes();
    this.setState({ banks,revenues });

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
      
      ProgramId:nextProps.ProgramId,
      ProgramName: nextProps.ProgramName,
      Description: nextProps.Description,
      
      
    });
    
  }
  

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

 programHandler(e){
  this.setState({ ProgramName: e.target.value });
 }
ProgramIdHandler(e){
  this.setState({ ProgramId: e.target.value });
 }
DescriptionHandler(e){
  this.setState({ Description: e.target.value });
 }




  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
     

      //await source.addsource(item.SourceofFundId,item.SourceofFundname,item.AccountNumber,item.BankId,item.RevenueTypeId,item.StartDate,item.EndDate);
      //toast.success(`role with SourceofFundname: ${item.SourceofFundname} ,AccountNumber: ${item.AccountNumber}  has been updated successful`);
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
    const ProgramName=this.state.ProgramName
    const ProgramId=this.state.ProgramId
  const brochure = () => {
     

      return (
        <>
        <table>
        <tr >
          <td>SourceofFundname</td>
          <td>AccountNumber</td>
          <td>Bankname</td>
          <td>RevenueTypename</td>
        </tr>
        </table>
        </>
      )
  }

    
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
                Program
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
             <h1>{ProgramId}</h1>
            <form onSubmit={this.handleSubmit}>
              
              {this.renderInput(`${ProgramId}`, "ProgramId")}
              {this.renderInput("ProgramName", "ProgramName")}
              {this.renderArear("Description", "Description")}

              {brochure}

                 
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

export default Modal;
