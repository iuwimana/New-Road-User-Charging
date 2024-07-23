import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as RoadType from "../../../../services/ContractManagement/RoadRefference/roadTypeServices";
import * as Characteristic from "../../../../services/ContractManagement/RoadRefference/roadCharacteristicServices";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";



class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: { roodid:0,roodname:"",rooddistance:0,roodtypeid:0,roodtypename:"",
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
  async populateBanks() {
    try{
      const { data: roadtypes } = await RoadType.getroadtypes();
    const { data: characteristics } = await Characteristic.getcharacteristics();
    const { data: roads } = await Road.getroads();
    this.setState({ roadtypes,characteristics,roads });

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
  
 
  roodidHandler(e) {
    this.setState({ roodid: e.target.value });
  }

  roodnameHandler(e) {
    this.setState({ roodname: e.target.value });
  }

rooddistanceHandler(e) {
    this.setState({ rooddistance: e.target.value });
  }
roodtypeidHandler(e) {
    this.setState({ roodtypeid: e.target.value });
  }
roodtypenameHandler(e) {
    this.setState({ roodtypename: e.target.value });
  }
roadcharacteristicsidHandler(e) {
    this.setState({ roadcharacteristicsid: e.target.value });
  }








  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
     

      await Road.addroad(item.roodid,item.roodname,item.rooddistance,item.roodtypeid,item.roadcharacteristicsid);
        toast.success(`Road setting  has been save successful: `); //const { state } = this.props.location;
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
    const roadtypes = this.state.roadtypes;
    const characteristics = this.state.characteristics;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document" style={{ maxWidth: "870px", width: "100%", height: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Road Data
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
                  value={this.state.roodid }
                  onChange={(e) => this. roodidHandler(e)}
                  placeholder="roodid "
                />
              </div>

              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                  Rood Name
                </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <input
                  type="text"
                  className="form-control"
                  value={this.state.roodname}
                  onChange={(e) => this.roodnameHandler(e)}
                  placeholder="Rood Name"
                />
                  </div>
                </div>
              </div>
              </div>

              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                  Rood Distance
                </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <input
                  type="text"
                  className="form-control"
                  value={this.state.rooddistance}
                  onChange={(e) => this.rooddistanceHandler(e)}
                  placeholder="Rood Distance"
                />
                  </div>
                </div>
              </div>
              </div>

              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                    <label htmlFor="exampleFormControlInput1" >
                   Rood Type
                </label>                    
                   </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <select name="roodtypeid" id="roodtypeid" className="form-control" onChange={(e) => this.roodtypeidHandler(e)}>
                  <option value={this.state.roodtypeid }>{this.state.roodtypename}
                    </option>
                  {roadtypes.map(roadtypes => (
                     <option key={roadtypes.roadtypeid} value={roadtypes.roadtypeid}>
                     {roadtypes.roadtypename}
                    </option>
                    ))}
                    
                    </select>
                  </div>
                </div>
              </div>
              </div>

              <div className="mb-3">
              <div className="row">
                <div className="col">
                  <div className="col-auto">
                    <label htmlFor="exampleFormControlInput1" >
                   road characteristics
                </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <select name="roadcharacteristicsid" id="roadcharacteristicsid" className="form-control" onChange={(e) => this.PartenerStatusIdHandler(e)}>
                  <option value={this.state.roadcharacteristicsid}>{this.state.roadclass+" with number of lames:"+this.state.numberoflames + " shoulder:"+ this.state.shouldername }
                    </option>
                  {characteristics.map(characteristics => (
                     <option key={characteristics.partenerstatusid} value={characteristics.partenerstatusid}>
                     {characteristics.roadclass +" with number of lames:"+characteristics.numberoflames + " shoulder:"+ characteristics.shouldername}
                    </option>
                    ))}
                    
                    </select>
                  </div>
                </div>
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
