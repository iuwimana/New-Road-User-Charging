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
import BaselineModal from "./baseline";
import IndicatorModal from "./indicator";
import { ActivitySection } from "./ActivitySection";
import Target from "./target";
import Activity from "./activities";
import './Modal.css';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { DiSqllite } from "react-icons/di";

const Output = ({ OutComeId, OutPutName, OutComeName, FiscalYear, index }) => {
  //----------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  //---------------------------------------
  const [tabKey, initTabKey] = useState("one");
  const [show, setShow] = useState(false);
  const [showIndicatoradd, setShowIndicatoradd] = useState(false);
  const [showIndicatorupdate, setShowIndicatorupdate] = useState(false);
  const [showTargetadd, setShowTargetadd] = useState(false);
  const [showActivityadd, setShowActivityadd] = useState(false);
  const [showTargetupdate, setShowTargetupdate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //-----------------------------------

  const [baseline, setBaseline] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [activityData, setActivitytData] = useState([]);
  const [baselineID, setBaselineID] = useState(0);
  const [baselinename, setBaselinename] = useState("");
  const [indicatorID, setIndicatorID] = useState(0);
  const [indicatorname, setindicatorname] = useState("");
  const [targetID, setTargetID] = useState(0);
  const [targetName, setTargetName] = useState("");
  const [startQuorter, setStartQuorter] = useState("");
  const [endQuorter, setEndQuorter] = useState("");
  const [startQuorterId, setStartQuorterId] = useState(0);
  const [endQuorterId, setEndQuorterId] = useState(0);

  //------------------------------------show and close add baseline modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //------------------------------------show and close update baseline modal
  const handleShowsubprogram = (BaselineId, BaselineName) => {
    setBaselineID(BaselineId);
    setBaselinename(BaselineName);
    setModalOpen(true);
  };
  const handleClosesubprogram = () => setModalOpen(false);
  //------------------------------------show and close Add Indicator modal
  const handleShowIndicatoradd = () => setShowIndicatoradd(true);
  const handleCloseIndicatoradd = () => setShowIndicatoradd(false);

  //------------------------------------show and close update baseline modal
  const handleShowIndicatorupdate = (IndicatorId, IndicatorName) => {
    setIndicatorID(IndicatorId);
    setindicatorname(IndicatorName);
    setShowIndicatorupdate(true);
  };
  const handleCloseIndicatorupdate = () => setShowIndicatorupdate(false);

  //------------------------------------show and close Add Target modal
  const handleShowTargetadd = () => setShowTargetadd(true);
  const handleCloseTargetadd = () => setShowTargetadd(false);

  //------------------------------------show and close Add Activities modal
  const handleShowActivityadd = (TargetId) => {
    setTargetID(TargetId);
    setShowActivityadd(true);
  };
  const handleCloseActivityadd = () => setShowActivityadd(false);

  //------------------------------------show and close update Target modal
  const handleShowTargetupdate = (
    TargetId,
    TargetName,
    StartQuorter,
    EndQuorter,
    StartQuorterId,
    EndQuorterId
  ) => {
    setTargetID(TargetId);
    setTargetName(TargetName);
    setStartQuorter(StartQuorter);
    setEndQuorter(EndQuorter);
    setStartQuorterId(StartQuorterId);
    setEndQuorterId(EndQuorterId);
    setShowTargetupdate(true);
  };
  const handleCloseTargetupdate = () => setShowTargetupdate(false);

  //-----------------------------------------------------------------
  useEffect(() => {
    handleClose();
    handleClosesubprogram();
  }, [OutComeId, OutPutName, OutComeName, FiscalYear, index]);
  //------------------------------------ fetch baseline

  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await BaselineData.getbaselineById(index);
      setBaseline(data);
    };
    fetchProgram();
  }, []);
  //------------------------------------fetch Indicator
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await IndicatorData.getindicatorById(index);
      setIndicatorData(data);
    };
    fetchProgram();
  }, []);
  //------------------------------------fetch Target
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await TargetData.gettargetById(index);
      setTargetData(data);
    };
    fetchProgram();
  }, []);

  //------------------------------------
  const replaceModalItem = (BaselineId) => {
    setBaselineID(BaselineId);
  };
  //--------------------------------------
  const id = index;
  const OutcomeId = OutComeId;

  const [outPutName, setOutPutName] = useState(OutPutName);
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
  //-------------------------------------------------------delete Indicator
  const deleteIndicator = async (IndicatorId) => {
    try {
      await IndicatorData.deleteindicator(IndicatorId);
      toast.success(`Indicator data has been deleted successful`);
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
  //----------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await OutputData.addoutput(id, OutcomeId, outPutName);
      toast.success(
        `outPut data with OutcomeID:${OutcomeId} and OutPutId: ${id} and outPutName ${outPutName}  has been updated successful`
      );
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
  //------------------------Display Baseline
  const baselines = baseline.map((baseline, index) => {
    return (
      <tr key={baseline.baselineid}>
        <td>{baseline.baselinename}</td>
        <td>{baseline.outputname}</td>
        <td>
          <button
            onClick={() =>
              handleShowsubprogram(baseline.baselineid, baseline.baselinename)
            }
            className="btn btn-second"
            data-toggle="modal"
          >
            Edit
            <AiFillEdit />
          </button>{" "}
          <button
            className="btn btn-second"
            onClick={() => deleteItem(baseline.baselineid)}
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    );
  });
  //------------------------Display Indicator----------------------------------
  const indicators = indicatorData.map((indicatorData, index) => {
    return (
      <div className="contents">
      <tr key={indicatorData.indicatorid}>
        <td>{indicatorData.indicatorname}</td>
        <td>{indicatorData.outputname}</td>
        <td>
          <button
            onClick={() =>
              handleShowIndicatorupdate(
                indicatorData.indicatorid,
                indicatorData.indicatorname
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
            onClick={() => deleteIndicator(indicatorData.indicatorid)}
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
      </div>
    );
  });

  //------------------------Display Target----------------------------------
  const targets = targetData.map((targetData, index) => {
    return (
      <tr key={targetData.TargetId}>
        <td className="button-td">
          <DiSqllite isOpen={isOpen} toggle={toggle} />
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>{targetData.targetname}</td>
        <td>{targetData.outputname}</td>
        <td>{targetData.startquorter}</td>
        <td>{targetData.endquorter}</td>
        <td>
          <DropdownButton id="dropdown-basic-button" title="Actions">
            <Dropdown.Item>
              <button
                onClick={() =>
                  handleShowTargetupdate(
                    targetData.targetid,
                    targetData.targetname,
                    targetData.startquorter,
                    targetData.endquorter,
                    targetData.startquorterid,
                    targetData.endquorterid
                  )
                }
                className="btn btn-primary"
                data-toggle="modal"
              >
                Edit
                <AiFillEdit />{" "}
              </button>{" "}
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                className="btn btn-danger"
                onClick={() => deleteTarget(targetData.targetid)}
              >
                Delete <AiFillDelete />
              </button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                className="btn btn-success"
                data-toggle="modal"
                onClick={() => handleShowActivityadd(targetData.targetid)}
              >
                Activities <FcInspection />
              </button>
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
    );
  });
  //-------------------------------------------------------------------- html render
  return (
    <>
    
    
      <Form  >
        
          <Form.Group>
            <div className="row">
              <div className="col">OutCome Name :</div>
              <div className="col" >
                <Form.Control className="cols" type="text" value={OutComeName} />
              </div>
            </div>
          </Form.Group>
          <br></br>

          <Form.Group>
            <div className="row">
              <div className="col">Fiscal Year :</div>
              <div className="col">
                <Form.Control type="email" value={FiscalYear} />
              </div>
            </div>
          </Form.Group>
          <br></br>
          <Form.Group>
            <div className="row">
              <div className="col">Output Name :</div>
              <div className="col">
                <Form.Control type="text" value={outPutName} />
              </div>
            </div>
          </Form.Group>
       
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Tabs  activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
          <Tab eventKey="one" title="Baseline">
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
              <p>Baseline</p>
              <div className="table-responsive mb-5">
                
              
              <table className="my-table">
                <thead>
                  <tr>
                    <th>BaselineName</th>
                    <th>OutPutName</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{baselines}</tbody>
              </table>
              </div>
            </center>
            <p></p>
          </Tab>
          <Tab eventKey="two" title="Indicators">
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
              <p>Indicator</p>
              <div className="table-responsive mb-5">
              <table className="my-table">
                <thead>
                  <tr>
                    <th>IndicatorName</th>
                    <th>OutPutName</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{indicators}</tbody>
              </table>
              </div>
            </center>
            <p></p>
          </Tab>
          <Tab eventKey="three" title=" Targets/ Milestones ">
            <br></br>
            

            <button
              onClick={handleShowTargetadd}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              AddNew
              <FcPlus />
            </button>
            <center>
              <p> Targets/ Milestones </p>
              <div className="table-responsive mb-5">
              <table className="my-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TargetName</th>
                    <th>OutPutName</th>
                    <th>StartingPeriod</th>
                    <th>EndiingPeriod</th>

                    <th>Action</th>
                  </tr>
                </thead>
                {targetData.map((targetData) => (
                  <ActivitySection
              TargetId={targetData.targetid}
              TargetName={targetData.targetname}
              OutPutName={targetData.outputname}
              StartQuorter={targetData.startquorter}
              EndQuorter={targetData.endquorter}
              StartQuorterID={targetData.startquorterid}
              EndQuorterID={targetData.endquorterid}
              index={index}
              
            />
                ))}
              </table>
              </div>
            </center>
            <p></p>
          </Tab>
        </Tabs>
      </div>
      {/*----------------Beseline Modal-----------------------------*/}.
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Baseline</Modal.Title>
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
          <BaselineModal index={index} baselineID={0} baselinename={""} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modalOpen} onHide={handleClosesubprogram}>
        <Modal.Header closeButton>
          <Modal.Title>Update Baseline </Modal.Title>
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
          <BaselineModal
            index={index}
            baselineID={baselineID}
            baselinename={baselinename}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosesubprogram}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*----------------Indicator Modal-----------------------------*/}.
      <Modal show={showIndicatoradd} onHide={handleCloseIndicatoradd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Indicator</Modal.Title>
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
          <IndicatorModal index={index} indicatorID={0} indicatorname={""} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIndicatoradd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showIndicatorupdate} onHide={handleCloseIndicatorupdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Indicator </Modal.Title>
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
          <IndicatorModal
            index={index}
            indicatorID={indicatorID}
            indicatorname={indicatorname}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIndicatorupdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*----------------Target Modal-----------------------------*/}.
      <Modal show={showTargetadd} onHide={handleCloseTargetadd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Target</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseTargetadd}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Target
            index={index}
            TargetId={0}
            TargetName={""}
            StartQuorter={""}
            EndQuorter={""}
            StartQuorterId={0}
            EndQuorterId={0}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTargetadd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTargetupdate} onHide={handleCloseTargetupdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Target </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseTargetupdate}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Target
            index={index}
            TargetId={targetID}
            TargetName={targetName}
            StartQuorter={startQuorter}
            EndQuorter={endQuorter}
            StartQuorterId={startQuorterId}
            EndQuorterId={endQuorterId}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTargetupdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*----------------Activity Modal-----------------------------*/}.
      <Modal show={showActivityadd} onHide={handleCloseActivityadd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activities</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseActivityadd}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Activity TargetId={targetID} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActivityadd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default Output;
