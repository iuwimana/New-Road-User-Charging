import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import * as Characteristic from "../../../../services/ContractManagement/RoadRefference/roadCharacteristicServices";
import * as Class from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
import * as Pavet from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
import * as Shoulder from "../../../../services/ContractManagement/RoadRefference/roadClassificationService";
import { Row } from 'reactstrap';



class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {roadcharacteristicsid:0,roadclassificationid:0,shoulderid:0,pavettypeid:0,roadclass:"",numberoflames:0,lamewidth:0,shouldername:"",pavettypename:""},
      roadcharacteristicsid:0,
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
  async populateBanks() {
    try{
      const { data: characteristics } = await Characteristic.getcharacteristics();
    const { data: classes } = await Class.getclassifications();
    const { data: pavettypes } = await Pavet.getpavettypes();
    const { data: shoulders } = await Shoulder.getshoulders();
    this.setState({ characteristics,classes,pavettypes,shoulders });

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
      
      roadcharacteristicsid:nextProps.roadcharacteristicsid,
      roadclassificationid:nextProps.roadclassificationid,
      roadclass: nextProps.roadclass,
      numberoflames: nextProps.numberoflames,
      lamewidth:nextProps.lamewidth,
      shouldername:nextProps.shouldername,
      pavettypename:nextProps.pavettypename,
      shoulderid:nextProps.shoulderid,
      pavettypeid:nextProps.pavettypeid,
      

      

      
    });
  }
   //roadclassificationid shoulderid pavettypeid roadcharacteristicsid roadclass numberoflames lamewidth shouldername pavettypename

  roadclassificationidHandler(e) {
    this.setState({ roadclassificationid: e.target.value });
  }
  roadclassHandler(e) {
    this.setState({ roadclass: e.target.value });
  }

  shoulderidHandler(e) {
    this.setState({ shoulderid: e.target.value });
  }

pavettypeidHandler(e) {
    this.setState({ pavettypeid: e.target.value });
  }
roadcharacteristicsidHandler(e) {
    this.setState({ bankid: e.target.value });
  }
numberoflamesHandler(e) {
    this.setState({ numberoflames: e.target.value });
  }
lamewidthHandler(e) {
    this.setState({ lamewidth: e.target.value });
  }

shouldernameHandler(e){
  this.setState({ shouldername: e.target.value });
}
pavettypenameHandler(e){
  this.setState({ pavettypename: e.target.value });
}






  async handleSave() {
   // const { user } = this.state;
   
    try {
    const item = this.state;
    
      await Characteristic.addcharacteristic(item.roadcharacteristicsid,item.roadclassificationid,item.numberoflames,item.shoulderid,item.pavettypeid,item.lamewidth );
        toast.success(`Road characteristics has been updated successful: `);

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
    const classes = this.state.classes;
    const pavettypes = this.state.pavettypes;
    const shoulders = this.state.shoulders;
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
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="hidden"
                  className="form-control"
                  value={this.state.roadcharacteristicsid}
                  onChange={(e) => this.roadcharacteristicsidHandler(e)}
                  placeholder="Road characteristics"
                />
              </div>
            <div className="mb-3">
            <div className="row">
              <div className="col">
                <div className="col-auto">
                <label htmlFor="exampleFormControlInput1" >
                   Road Classification
                </label></div>
                </div> 
                <div className="col">
                  <div className="col-auto">
                  <select name="roadclassificationid" id="roadclassificationid" className="form-control" onChange={(e) => this.roadclassificationidHandler(e)}>
                  <option value={this.state.roadclassificationid }>{this.state.roadclass}
                    </option>
                  {classes.map(classes => (
                     <option key={classes.roadclassificationid } value={classes.roadclassificationid }>
                     {classes.roadclass}
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
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Number of lames
                </label>
                </div>
                </div> 
                <div className="col">
                  <div className="col-auto">
                  <input
                  type="text"
                  className="form-control"
                  value={this.state.numberoflames}
                  onChange={(e) => this.numberoflamesHandler(e)}
                  placeholder="Number of lames"
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
                   Road shoulder
                </label></div>
                </div> 
                <div className="col">
                  <div className="col-auto">
                  <select name="shoulderid" id="shoulderid" className="form-control" onChange={(e) => this.shoulderidHandler(e)}>
                  <option value={this.state.shoulderid }>{this.state.shouldername }
                    </option>
                  {shoulders.map(shoulders => (
                     <option key={shoulders.shoulderid  } value={shoulders.shoulderid}>
                     {shoulders.shouldername }
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
                   Road pavet type
                </label></div>
                </div> 
                <div className="col">
                  <div className="col-auto">
                  <select name="pavettypeid" id="pavettypeid" className="form-control" onChange={(e) => this.pavettypeidHandler(e)}>
                  <option value={this.state.pavettypeid  }>{this.state.pavettypename}
                    </option>
                  {pavettypes.map(pavettypes => (
                     <option key={pavettypes.pavettypeid  } value={pavettypes.pavettypeid  }>
                     {pavettypes.pavettypename}
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
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Lame width in KM
                </label></div>
                </div> 
                <div className="col">
                  <div className="col-auto">
                    <input
                  type="text"
                  className="form-control"
                  value={this.state.lamewidth}
                  onChange={(e) => this.lamewidthHandler(e)}
                  placeholder="lame width in KM"
                />

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
