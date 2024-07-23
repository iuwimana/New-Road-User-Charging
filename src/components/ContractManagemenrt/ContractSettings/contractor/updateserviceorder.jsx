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

export const Updateserviceorder = ({
  serviceorderid,
    activityname,
    activityid,
    contractid,
    damagedlevel,
  TargetId,
  TargetName,
  OutPutName,
  StartQuorter,
  EndQuorter,
  StartQuorterID,
  EndQuorterID,
  index,
}) => {
  //---------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //-------------------------------------------
   const id = contractid;
  //-------------------------
  const [activityId, setActivityId] = useState(0);
  const [activityName, setActivityName] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  //-----------------------------------
  const handleShow = () => setShow(true);

  const handleShowsubprogram = (ActivityId, ActivityName, EstimatedBudget) => {
    setActivityId(ActivityId);
    setActivityName(ActivityName);
    setEstimatedBudget(EstimatedBudget);
    setModalOpen(true);

    toast.info(
      `activityId:${activityId} activityName:${activityName} estimatedBudget:${estimatedBudget} `
    );
  };

  const handleClose = () => setShow(false);
  const handleClosesubprogram = () => setModalOpen(false);
  useEffect(() => {
    handleClose();
    handleClosesubprogram();
  }, [
    TargetId,
    TargetName,
    OutPutName,
    StartQuorter,
    EndQuorter,
    StartQuorterID,
    EndQuorterID,
    index,
  ]);
  //----------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [activityData, setActivitytData] = useState([]);
  const [showActivityadd, setShowActivityadd] = useState(false);
  const [showActivityUpdate, setShowActivityUpdate] = useState(false);
  const [showTargetupdate, setShowTargetupdate] = useState(false);
  const [showTargetadd, setShowTargetadd] = useState(false);
  //----------------------Initialize serviceorder data---------------------------------
    const [Serviceorderid,setserviceorderid] = useState(serviceorderid);
    const [Activityname,setactivityname]= useState(activityname);
    const [Activityid,setactivityid]= useState(activityid);
    const [Contractid,setcontractid]= useState(contractid);
    const [Damagedlevel,setdamagedlevel]= useState(damagedlevel);

   

  //--------------------------------------------------------
 
  const [Serviceorderids, setContractorid] = useState(serviceorderid);
  const [Contractids, setContractid] = useState(contractid);
  const [Contractdiscription, setContractdiscription] =
    useState(activityname);
  const [Roodid, setRoodid] = useState(activityid);
   const [Contracttypeid, setContracttypeid] = useState(activityid);
  const [Budget, setBudget] = useState(damagedlevel);

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
  const [targetId, setTargetId] = useState(TargetId);
  const [targetName, setTargetName] = useState(TargetName);
  const [startQuorter, setStartQuorter] = useState(StartQuorter);
  const [endQuorter, setEndQuorter] = useState(EndQuorter);
  const [startQuorterID, setStartQuorterID] = useState(StartQuorterID);
  const [endQuorterID, setEndQuorterID] = useState(EndQuorterID);
  const [indexes, setIndexes] = useState(index);

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
  const handleShowTargetupdate = (
    index,
    TargetId,
    TargetName,
    StartQuorter,
    EndQuorter,
    StartQuorterId,
    EndQuorterId
  ) => {
    setIndexes(indexes);
    setTargetId(TargetId);
    setTargetName(TargetName);
    setStartQuorter(StartQuorter);
    setEndQuorter(EndQuorter);
    setStartQuorterID(StartQuorterId);
    setEndQuorterID(EndQuorterId);
    setShowTargetupdate(true);
  };
  const handleCloseTargetupdate = () => setShowTargetupdate(false);
  //------------------------------------show and close Add Activities modal
  const handleShowActivityadd = (TargetId) => {
    setTargetId(TargetId);
    setShowActivityadd(true);
  };
  const handleCloseActivityadd = () => setShowActivityadd(false);

  //------------------------------------show and close Update Activities modal
  const handleShowActivityUpdate = (
    ActivityId,
    TargetId,
    ActivityName,
    EstimatedBudget
  ) => {
    setActivityId(ActivityId);
    setTargetId(TargetId);
    setActivityName(ActivityName);
    setEstimatedBudget(EstimatedBudget);
    setShowActivityUpdate(true);
  };
  const handleCloseActivityUpdate = () => setShowActivityUpdate(false);

  //-------------------------------------------------------delete Target
  const deleteTarget = async (TargetId) => {
    try {
      await TargetData.deletetarget(TargetId);
      toast.success(`Target data has been deleted successful`);
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
          "An Error Occured, while saving outPut data Please try again later"
        );
      }
    }
  };
  //-------------------------------------------------------delete Activity
  const deleteActivity = async (ActivityId) => {
    try {
      await ActivityData.deleteactivity(ActivityId);
      toast.success(`Activity ${ActivityId} data has been deleted successful`);
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
          "An Error Occured, while saving outPut data Please try again later"
        );
      }
    }
  };
  //------------------------Display Activity----------------------------------
  const activityDatas = activityData.map((activityData, index) => {
    return (
      <tr key={activityData.activityid}>
        <td></td>
        <td></td>
        <button
          onClick={() =>
            handleShowsubprogram(
              activityData.activityid,
              activityData.activityname,
              activityData.estimatedbudget
            )
          }
          className="btn btn-second"
          data-toggle="modal"
        >
          <td>{activityData.targetname}</td>
          <td>{activityData.activityname}</td>
          <td>
            {"Rwf "}
            {activityData.estimatedbudget.toLocaleString()}
          </td>
        </button>
        <td></td>
        <td></td>
        <td>
          <button
            onClick={() =>
              handleShowActivityUpdate(
                activityData.activityid,
                activityData.targetid,
                activityData.activityname,
                activityData.estimatedbudget
              )
            }
            className="btn btn-second"
            data-toggle="modal"
          >
            Edit
            <AiFillEdit />
          </button>{" "}
          <button
            className="btn btn-second"
            onClick={() => deleteActivity(activityData.activityid)}
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    );
  });

  //----------------------------------------------

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
