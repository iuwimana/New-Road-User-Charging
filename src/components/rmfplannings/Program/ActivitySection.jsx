import React, { useEffect, useState } from "react";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { TableRow } from "./TableRow";
import useOpenController from "./Hooks/useOpenController";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as TargetData from "../../../services/RMFPlanning/targetService";
import * as ActivityData from "../../../services/RMFPlanning/activityServices";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import Target from "./target";
import Activity from "./activities";
import { info } from "./data/info";
import ActivityModel from "./ActivityModel";
//import { PatternFormat, NumericFormat } from "react-number-format";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

export const ActivitySection = ({
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

  //------------------------------------------------
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
        if(!TargetId){
          toast.error(`Loading issues......TargetId:${TargetId}`);
        }else{
          const { data } = await ActivityData.getactivityById(TargetId);
        setActivitytData(data);

        }

        
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
    <tbody>
      <tr key={TargetId}>
        <td className="button-td">
          <DiSqllite isOpen={isOpen} toggle={toggle} />
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>{TargetName}</td>
        <td>{OutPutName}</td>
        <td>{StartQuorter}</td>
        <td>{EndQuorter}</td>
        <td>
          <DropdownButton id="dropdown-basic-button" title="Actions">
            <Dropdown.Item>
              <button
                onClick={() =>
                  handleShowTargetupdate(
                    index,
                    targetId,
                    targetName,
                    startQuorter,
                    endQuorter,
                    startQuorterID,
                    endQuorterID
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
                onClick={() => deleteTarget(targetId)}
              >
                Delete <AiFillDelete />
              </button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                className="btn btn-success"
                data-toggle="modal"
                onClick={() => handleShowActivityadd(targetId)}
              >
                Activities <FcInspection />
              </button>
            </Dropdown.Item>
          </DropdownButton>
        </td>
      </tr>
      {isOpen && (
        <>
          <tr>
            <th></th>
            <th></th>
            <th>TargetName</th>
            <th>ActivityName</th>
            <th>Estimated Budget</th>
            <th></th>
          </tr>
          {activityDatas}
        </>
      )}
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
            TargetId={targetId}
            TargetName={targetName}
            StartQuorter={startQuorter}
            EndQuorter={endQuorter}
            StartQuorterId={startQuorterID}
            EndQuorterId={endQuorterID}
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
          <Activity
            TargetId={targetId}
            ActivityId={0}
            ActivityName={""}
            EstimatedBudget={0}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseActivityadd}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showActivityUpdate} onHide={setShowActivityUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Activities</Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={setShowActivityUpdate}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Activity
            TargetId={targetId}
            ActivityId={activityId}
            ActivityName={activityName}
            EstimatedBudget={estimatedBudget}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setShowActivityUpdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*---------------- Modal source of fund & Stakeholder-----------------------------*/}
      .
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modalOpen}
        onHide={handleClosesubprogram}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-muted text-center mt-2 mb-3">
                <div style={{ textAlign: "center" }}>
                  <small>RMF Planning- Activities</small>
                </div>
              </div>
              <div className="btn-wrapper text-center"></div>
            </Col>
          </Modal.Title>
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
          <ActivityModel
            ActivityId={activityId}
            ActivityName={activityName}
            EstimatedBudget={estimatedBudget}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosesubprogram}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </tbody>
  );
};
