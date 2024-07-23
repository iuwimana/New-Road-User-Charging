import React, { useEffect, useState } from "react";
import { Form} from "react-bootstrap";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
//import { TableRow } from "./TableRow";
import useOpenController from "./Hooks/useOpenController";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as TargetData from "../../../../services/RMFPlanning/targetService";
import * as ActivityData from "../../../../services/RMFPlanning/activityServices";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import Target from "../../../rmfplannings/Program/target";
import Activity from "../../../rmfplannings/Program/activities";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";
import * as ServiceData from "../../../../services/ContractManagement/ContractSetting/servicesService";

import ActivityModel from "../../../rmfplannings/Program/ActivityModel";
import { PatternFormat, NumericFormat } from "react-number-format";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

export const Services = ({
 
    serviceorderid,
   
 
}) => {
  //---------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //-------------------------------------------
   const id = serviceorderid;
   const serviceid=0;
   
  //-------------------------
  const [Servicename, setservicename] = useState(0);
  const [Discription, setdiscription] = useState("");
  const [Measurementid, setmeasurementid] = useState(0);
  const [Servicebudget, setservicebudget] = useState(0);
  const [Areaofmaintenance, setareaofmaintenance] = useState(0);
  //-----------------------------------
  
  //----------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [measurement, setmeasurement] = useState([]);
  const [showActivityadd, setShowActivityadd] = useState(false);
  const [showActivityUpdate, setShowActivityUpdate] = useState(false);
  const [showTargetupdate, setShowTargetupdate] = useState(false);
  const [showTargetadd, setShowTargetadd] = useState(false);
  //----------------------Initialize serviceorder data---------------------------------
    const [Serviceorderid,setserviceorderid] = useState(0);
    const [Activityname,setactivityname]= useState("");
    const [Activityid,setactivityid]= useState(0);
    const [Damagedlevel,setdamagedlevel]= useState("");

   

  //--------------------------------------------------------
 
 

  //-----------------------save service order update-------------------------
  const handleSubmit = async (e) => {
    try {
     e.preventDefault();   
      await ServiceData.addservice(
        serviceid,
        id,
        Servicename,        
        Discription,
        Measurementid,
        Servicebudget,
        Areaofmaintenance
      );
      
      toast.success(`service order data  has been updated successful
      serviceorderid:${id},serviceid:${serviceid},
      Servicename:${Servicename},
       Discription:${Discription},Measurementid:${Measurementid} ,Servicebudget:${Servicebudget} ,Areaofmaintenance:${Areaofmaintenance}  
      `);
      window.location.reload(false);
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
        toast.error(
          "An Error Occured, while saving Program data Please try again later"
        );
      }
    }
  };
  //----------------------------------------------



  //-------------------------------handle target show
  const handleShowTargetadd = () => setShowTargetadd(true);
  const handleCloseTargetadd = () => setShowTargetadd(false);

  //------------------------------------fetch Measurement
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        
          const { data } = await Measurement.getmeasurements();
           setmeasurement(data);

          
      } catch (ex) {
        toast.error("Loading issues......");
      }
    };
    fetchProgram();
  }, []);
  //------------------------------------show and close update Target modal
 
  
   
  return (
   
    <Form onSubmit={handleSubmit}>
    <div className="row">
        <div className="col">
          <div className="cards">
            <div className="mb-3">
              <div className="row">
                
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="hidden"
                      placeholder="serviceorderid *"
                      name="serviceorderid"
                      value={Serviceorderid}
                      onChange={(e) => setserviceorderid(e.target.value)}
                      required
                    />
                      
                  </Form.Group>
                </div>
              </div>
            </div>
            {/*--------------------------------------------------------------- */}
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <Form.Label>Service name</Form.Label>
                </div>
                <div className="col">
                 

                   <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Servicename *"
                      name="servicename"
                      value={Servicename}
                      onChange={(e) => setservicename(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
               <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="col">
                  <Form.Label>Service Description</Form.Label>
                </div>
                <div className="col">
                 

                   <Form.Group>
                    
                    <Form.Control
                      as="textarea" 
                      placeholder="Discription *"
                      rows={3}
                      name="discription"
                      value={Discription}
                      onChange={(e) => setdiscription(e.target.value)}
                      required
                    />
                   
                  </Form.Group>
                </div>
              </div>
               <br></br>
               {/*--------------------------------------------------------------- */}
               

              <div className="row">
                <div className="col">
                  <Form.Label>Service Budget</Form.Label>
                </div>
                <div className="col">
                 

                   <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Servicebudget *"
                      name="servicebudget"
                      value={Servicebudget}
                      onChange={(e) => setservicebudget(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              
              {/*--------------------------------------------------------------- */}

              {/*--------------------------------------------------------------- */}
              
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Area of Maintainence size</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="area"
                      placeholder="Areaofmaintenance *"
                      name="areaofmaintenance"
                      value={Areaofmaintenance}
                      onChange={(e) => setareaofmaintenance(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
            
            {/*--------------------------------------------------------------- */}
              
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Measurement Unit</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                      <Form.Control
                        as="Select"
                        custom
                        name="measurementid"
                        value={Measurementid}
                        onChange={(e) => setmeasurementid(e.target.value)}
                      >
                        <option value="">

                      </option>
                        {measurement.map((measurement) => (
                          <option
                            key={measurement.measurementid}
                            value={measurement.measurementid}
                          >
                            {measurement.measurementname}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                </div>
              </div>
              <br></br>
            </div> 
    
            {/*--------------------------------------------------------------- */}
          </div>
          {/*--------------------------------------------------------------- */}

          {/*--------------------------------------------------------------- */}
        </div>
      </div>
      <Button variant="success" type="submit" block>
        Save
      </Button>
      </Form>
   
  );
};
