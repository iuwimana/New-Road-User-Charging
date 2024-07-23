import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import * as RoadType from "../../../../services/ContractManagement/RoadRefference/roadTypeServices";


class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {roadtypeid:0,roadtypename:""},
      roadtypeid:0,
      roadtypename:"",
      user:{},
      errors: {},
      banks: [],
      paternerStatuses: [],
      roadTypes:[],
    };
  }
  schema = {
    roadtypeid: Joi.number()
                           .required(),
    roadtypename: Joi.string()
                            .required()
                            .label("roadtypename"),
    
    
  };
  async populateBanks() {
    try{
      const { data: banks } = await bank.getbanks();
    const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
    const { data: roadTypes } = await RoadType.getroadtypes();
    this.setState({ banks,paternerStatuses,roadTypes });

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
      
      roadtypeid:nextProps.roadtypeid,
      roadtypename: nextProps.roadtypename,
      
    
      
    });
  }
  

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }
roadtypeidHandler(e) {
  this.setState({ roadtypeid: e.target.value });
}
roadtypenameHandler(e) {
  this.setState({ roadtypename: e.target.value });
}







  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
     

      await RoadType.addroadtype(item.roadtypeid,item.roadtypename );
      toast.success(`Business Road Type    has been updated successful`);
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
    const paternerStatuses = this.state.paternerStatuses;
    const banks = this.state.banks;
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
                Road Type
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
                  type="text"
                  className="form-control"
                  value={this.state.roadtypeid}
                  onChange={(e) => this.roadtypeidHandler(e)}
                  placeholder="roadtypeid"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  road Type name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.roadtypename}
                  onChange={(e) => this.roadtypenameHandler(e)}
                  placeholder="roadtypename"
                />
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
