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
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import ActivityModel from "../../../rmfplannings/Program/ActivityModel";
import { PatternFormat, NumericFormat } from "react-number-format";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

export const Addserviceorder = ({
 
    contractid,
   
 
}) => {
  //---------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //-------------------------------------------
   const id = contractid;
   const serviceorderid=0;
  //-------------------------
  const [activityId, setActivityId] = useState(0);
  const [activityName, setActivityName] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  //-----------------------------------
  
  //----------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [activityData, setActivitytData] = useState([]);
  const [showActivityadd, setShowActivityadd] = useState(false);
  const [showActivityUpdate, setShowActivityUpdate] = useState(false);
  const [showTargetupdate, setShowTargetupdate] = useState(false);
  const [showTargetadd, setShowTargetadd] = useState(false);
  //----------------------Initialize serviceorder data---------------------------------
    const [Serviceorderid,setserviceorderid] = useState(0);
    const [Activityname,setactivityname]= useState("");
    const [Activityid,setactivityid]= useState(0);
    const [Contractid,setcontractid]= useState(contractid);
    const [Damagedlevel,setdamagedlevel]= useState("");

   

  //--------------------------------------------------------
 
 

  //-----------------------save service order update-------------------------
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();   
      await ServiceOrderData.addserviceorder(
        serviceorderid,
        Activityid,
        Damagedlevel,        
        contractid,
      );
      
      toast.success(`service order data  has been updated successful
      serviceorderid:${serviceorderid},Activityid:${Activityid},
      contractid:${contractid},
       Damagedlevel:${Damagedlevel} 
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

  //------------------------------------fetch Activity
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        
          const { data } = await ActivityData.getactivities();
           setActivitytData(data);

          
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
                  <Form.Label>Activity</Form.Label>
                </div>
                <div className="col">
                 

                   <Form.Group>
                    <Form.Control
                      as="Select"
                      custom
                      name="activityid"
                      value={Activityid}
                      onChange={(e) => setactivityid(e.target.value)}
                    >
                      <option value="">

                      </option>
                      {activityData.map((activityData) => (
                        <option
                          key={activityData.activityid}
                          value={activityData.activityid}
                        >
                          {"ACTIVITY: "+activityData.activityname+", of OUTPUT:"+activityData.outputname}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <br></br>
              
              {/*--------------------------------------------------------------- */}

              {/*--------------------------------------------------------------- */}
              
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>damagedlevel</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="damagedlevel *"
                      name="damagedlevel"
                      value={Damagedlevel}
                      onChange={(e) => setdamagedlevel(e.target.value)}
                      required
                    />
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
