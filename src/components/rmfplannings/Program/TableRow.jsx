import React, { useEffect, useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { TableRowOutcome } from "./TableRowOutcome";
import { FaHandPointRight, FaArrowRight } from "react-icons/fa";
import UpdateSubProgramModal from "./UpdateSubProgramModal";
import AddOutComeModal from "./addOutComeModal";
import './modeltablerow.css';
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
import * as SubProgram from "../../../services/RMFPlanning/subProgramService";

export const TableRow = ({
  SubProgramName,
  SubDescription,
  index,
  ProgramId,
}) => {
  const { isOpen, toggle } = useOpenController(false);
  const [outcome, setOutcome] = useState([]);
  //-------------------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //------------------------------------------

  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await Outcome.getoutcomeById(index);
        setOutcome(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error("Loading issues......");
  }
  //------------------------------------
  const replaceModalItem = async (index) => {
    try {
      await SubProgram.deletesubprogram(index);
      toast.success(`Program data has been delete successful`);
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
  //-----------------------------------
  const handleShow = () => setShow(true);
  const handleShowsubprogram = () => setModalOpen(true);
  const handleClose = () => setShow(false);
  const handleClosesubprogram = () => setModalOpen(false);
  useEffect(() => {
    handleClose();
    handleClosesubprogram();
  }, [SubProgramName, SubDescription, index, ProgramId]);
  return (
    <>
      <tr key={index}>
        <td>
          <b>
            <FaHandPointRight /> Subprogram...{index}
          </b>
        </td>
        <td className="button-td">
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>{SubProgramName}</td>
        <td>{SubDescription}</td>
        <td>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            edit <AiFillEdit />
          </button>

          <button
            className="btn btn-second"
            onClick={() => replaceModalItem(index)}
          >
            <AiFillDelete />
          </button>
        </td>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update SubProgram data</Modal.Title>
            
          </Modal.Header>

          <Modal.Body>
            <UpdateSubProgramModal
              SubProgramName={SubProgramName}
              SubDescription={SubDescription}
              index={index}
              ProgramId={ProgramId}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <td>
          <button
            onClick={handleShowsubprogram}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <FcPlus />
          </button>
        </td>
      </tr>
      <Modal show={modalOpen} onHide={handleClosesubprogram}>
        <Modal.Header closeButton>
          <Modal.Title>Add Outcome </Modal.Title>
         
        </Modal.Header>

        <Modal.Body>
          <AddOutComeModal index={index} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosesubprogram}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {isOpen && (
        <>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <big>OutComeName</big>
            </td>
            <td>
              <big>FiscalYear</big>
            </td>
            <td>
              <big>OutcomeDescription</big>
            </td>
            <td>
              <big>Action</big>
            </td>
            <td>AddOutPut</td>
          </tr>

          {outcome.map((outcome) => (
            <TableRowOutcome
              SubProgramId={outcome.subprogramid}
              outcomeName={outcome.outcomename}
              outcomeFiscalYear={outcome.fiscalyear}
              outcomeFiscalYearID={outcome.fiscalyearid}
              outcomeDescription={outcome.outcomedescription}
              index={outcome.outcomeid}
            />
          ))}
        </>
      )}
    </>
  );
};
