import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FcPlus, FcInspection } from "react-icons/fc";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tab, Tabs } from "react-bootstrap";
import * as OutputData from "../../../services/RMFPlanning/outputService";
import * as BaselineData from "../../../services/RMFPlanning/baselineServices";
import * as IndicatorData from "../../../services/RMFPlanning/indicatorService";
import * as TargetData from "../../../services/RMFPlanning/targetService";
import * as ActivityData from "../../../services/RMFPlanning/activityServices";
import * as SourceData from "../../../services/RMFPlanning/sourceoffundService";
import * as StakeholderData from "../../../services/RMFPlanning/stakeholderService";
import SourceofFund from "./sourceofFunds";
import StakeholderModal from "./stakeholder";
import {ActivitySection} from "./ActivitySection";
import Target from "./target";
import Activity from "./activities";
import "./Modal.css";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { DiSqllite } from "react-icons/di";

const ActivityModel = ({ ActivityId,ActivityName,EstimatedBudget }) => {
 //----------------------------------------declare sourcroffunds state
  const [source, setSource] = useState([]);
  //----------------------------------------declare stakeholder
  const [stakeholder, setStakeholder] = useState([]);
  
  //----------------------------------------

  const [tabKey, initTabKey] = useState("one");

  const [activityId, setActivityId] = useState(ActivityId);
  const [activityName, setActivityName] = useState(ActivityName);
  const [estimatedBudget, setEstimatedBudget] = useState(EstimatedBudget);
  
  const [activitySourceoffundId, setActivitySourceoffundId] = useState(0);
  const [sourceoffundName, setSourceoffundName] = useState("");

  const [stakeHolderId, setStakeHolderId] = useState(0);
  const [stakeHolderName, setStakeHolderName] = useState("");
  
  //---------------------------------------declare modal source of funds Add state
  const [show, setShow] = useState(false);
  //-----------------------------open and close source of funds Add modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
    //---------------------------------------declare modal source of funds Update state
  const [modalOpen, setModalOpen] = useState(false);
  //-----------------------------open and close source of funds Add modal
  

   const handleShowsubprogram = (ActivitySourceoffundId,SourceoffundName) => {
    setActivitySourceoffundId(ActivitySourceoffundId);
    setSourceoffundName(SourceoffundName);
    setModalOpen(true);
  };
  const handleClosesubprogram = () => setModalOpen(false);

  //-------------------------------------------Declare stakeholder modal Add state
  const [showIndicatoradd, setShowIndicatoradd] = useState(false);
  //------------------------------------show and close Add Indicator modal
  const handleShowIndicatoradd = () => setShowIndicatoradd(true);
  const handleCloseIndicatoradd = () => setShowIndicatoradd(false);
   //-------------------------------------------Declare stakeholder modal Update state
  const [showIndicatorupdate, setShowIndicatorupdate] = useState(false);

    //------------------------------------show and close update Stakeholder modal
  const handleShowIndicatorupdate = (StakeHolderId,StakeHolderName) => {
    setStakeHolderId(StakeHolderId);
    setStakeHolderName(StakeHolderName);
     
    setShowIndicatorupdate(true);
  };
  const handleCloseIndicatorupdate = () => setShowIndicatorupdate(false);
  
  //-----------------------------------fetch source of fund data
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data } = await SourceData.getactivitySourceoffundById(ActivityId);
        setSource(data);
      } catch (ex) {
        toast.error("Loading issues......");
      }
    };
    fetchProgram();
  }, []);
  
   //-----------------------------------fetch stekeholder data
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data } = await StakeholderData.getstakeholderById(ActivityId);
        setStakeholder(data);
      } catch (ex) {
        toast.error("Loading issues......");
      }
    };
    fetchProgram();
  }, []);


  
  //------------------------------------show and close add baseline modal
  
  //------------------------------------show and close update baseline modal
  
  
  //------------------------------------show and close Add Indicator modal
  
  //------------------------------------show and close update baseline modal
  

  //------------------------------------show and close Add Target modal
 

  //------------------------------------show and close Add Activities modal
  

  //------------------------------------show and close update Target modal


  //-----------------------------------------------------------------
  
  //------------------------------------ fetch baseline

 
  //------------------------------------fetch Indicator
 
  //------------------------------------fetch Target
  

  //------------------------------------
  
  //--------------------------------------
 
  //-------------------------------------------------------delete baseline
  const deleteItem = async (BaselineId) => {
    try {
      await BaselineData.deletebaseline(BaselineId);
      toast.success(`outPut data has been deleted successful`);
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
  //-------------------------------------------------------delete SourceofFunds
  const deleteSourceofFund = async (ActivitySourceoffundId) => {
    try {
      await SourceData.deleteactivitySourceoffund(ActivitySourceoffundId);
      toast.success(`source of fund data has been deleted successful`);
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
  //-------------------------------------------------------delete Stakeholder
  const deleteStakeholder = async (StakeHolderId) => {
    try {
      await StakeholderData.deletestakeholder(StakeHolderId);
      toast.success(`StakeHolder data has been deleted successful`);
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
  //----------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //await OutputData.addoutput(id, OutcomeId, outPutName);
      toast.success(
        `outPut data with OutcomeID: and OutPutId: and outPutName   has been updated successful`
      );
      //window.location.reload(false);
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
 
  //------------------------Display Source of funds----------------------------------
  const sources = source.map((source, index) => {
    return (
      <tr key={source.activitysourceoffundid}>
        <td>{source.sourceoffundname}</td>
        <td>{source.activityname}</td>
        <td>{source.estimatedbudget}</td>
        <td>{source.startingquarter}</td>
        <td>{source.endingquarter}</td>
        <td>{source.targetname}</td>
        <td>{source.outputname}</td>
        <td>
          
          <button
            onClick={() =>
              handleShowsubprogram(
                source.activitysourceoffundid,
                source.sourceoffundname
               
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
            onClick={() => deleteSourceofFund(source.activitysourceoffundid)}
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    );
  });

  
   //------------------------Display Stakeholder----------------------------------
  const stakeholders = stakeholder.map((stakeholder, index) => {
    return (
      <tr key={stakeholder.stakeholderid}>
        <td>{stakeholder.stakeHoldername}</td>
        <td>{stakeholder.activityname}</td>
        <td>{stakeholder.estimatedbudget}</td>
        <td>{stakeholder.startingquarter}</td>
        <td>{stakeholder.endingquarter}</td>
        <td>{stakeholder.targetname}</td>
        <td>{stakeholder.outputname}</td>
        <td>
          
          <button
            onClick={() =>
              handleShowIndicatorupdate(
                stakeholder.stakeholderid,
               stakeholder.stakeholdername
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
            onClick={() => deleteStakeholder(stakeholder.stakeholderid)}
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    );
  });
  //-------------------------------------------------------------------- html render
  return (
    <>
      <Form>
        <div className="container">
          <Form.Group> 
            <div className="row">
              <div className="col">ActivityName :</div>
              <div className="col">
                <Form.Control type="text" value={activityName} />
              </div>
            </div>
          </Form.Group>
          <br></br>

          <Form.Group>
            <div className="row">
              <div className="col">estimatedBudget:</div>
              <div className="col">
                <Form.Control type="text" value={estimatedBudget} />
              </div>
            </div>
          </Form.Group>
          
        </div>
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
          
          <Tab eventKey="one" title="source of Funds">
            <br></br>
            <br></br>

            <button
              onClick={handleShow}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              AddNew
              <FcPlus />
            </button>
            <center>
              <p>Source of Funds</p>
              <table className="table">
                <thead>
                  <tr>
                           
                    <th>SourceoffundName</th>
                    <th>ActivityName</th>
                    <th>EstimatedBudget</th>
                    <th>StartingQuarter</th>
                    <th>EndingQuarter</th>
                    <th>TargetName</th>
                    <th>OutPutName</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{sources}</tbody>
              </table>
            </center>
            <p></p>
          </Tab>
          <Tab eventKey="two" title="Stakeholder">
            <br></br>
            <br></br>

            <button
            onClick={handleShowIndicatoradd}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              AddNew
              <FcPlus />
            </button>

            <center>
              <p>Source of Funds</p>
              <table className="table">
                <thead>
                  <tr>
                           
                    <th>StakeholderName</th>
                    <th>ActivityName</th>
                    <th>EstimatedBudget</th>
                    <th>StartingQuarter</th>
                    <th>EndingQuarter</th>
                    <th>TargetName</th>
                    <th>OutPutName</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{stakeholders}</tbody>
              </table>
            </center>
            
            <p></p>
          </Tab>
        </Tabs>
      </div>
      
      {/*----------------source of funds Modal-----------------------------*/}.
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add source of fund</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <SourceofFund
          ActivitySourceoffundId={0} 
          ActivityId={ActivityId}
          SourceoffundName={""} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalOpen} onHide={handleClosesubprogram}>
        <Modal.Header closeButton>
          <Modal.Title>Update source of fund </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleClosesubprogram}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          
          <SourceofFund
          ActivitySourceoffundId={activitySourceoffundId} 
          ActivityId={ActivityId}
          SourceoffundName={sourceoffundName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosesubprogram}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*----------------Stakeholder Modal-----------------------------*/}.
      <Modal show={showIndicatoradd} onHide={handleCloseIndicatoradd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stakeholder</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseIndicatoradd}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <StakeholderModal        
           StakeHolderId={0} ActivityId={ActivityId} StakeHolderName={""} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIndicatoradd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showIndicatorupdate} onHide={handleCloseIndicatorupdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stakeholder </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseIndicatorupdate}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          
          <StakeholderModal        
           StakeHolderId={stakeHolderId} 
           ActivityId={ActivityId} 
           StakeHolderName={stakeHolderName}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIndicatorupdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActivityModel;
