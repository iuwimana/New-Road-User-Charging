import React, { useEffect, useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";

import { FcPlus } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";

import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { TableRowOutput } from "./TableRowOutput";
import UpdateOutcomeModal from "./UpdateOutcomeModal";
import AddoutPutModal from "./addOutputModal";
import './modeltablerow.css';
import * as Output from "../../../services/RMFPlanning/outputService";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";

export const TableRowOutcome = ({
  SubProgramId,
  outcomeName,
  outcomeFiscalYear,
  outcomeFiscalYearID,
  outcomeDescription,
  index,
}) => {
  const { isOpen, toggle } = useOpenController(false);
  const [output, setOutput] = useState([]);
  //-------------------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await Output.getoutputById(index);
        setOutput(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error("Loading issues......");
  }
  //------------------------------------
  const replaceModalItem = async (index) => {
    try {
      await Outcome.deleteoutcome(index);
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
  }, [
    outcomeName,
    outcomeFiscalYear,
    outcomeFiscalYearID,
    outcomeDescription,
    index,
  ]);
  //------------------------------------------------------------
  return (
    <>
      <tr key={index}>
        <td></td>
        <td>
          <b>
            <FaHandPointRight /> OutCome........{index}
          </b>
        </td>
        <td className="button-td">
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>{outcomeName}</td>
        <td>{outcomeFiscalYear}</td>
        <td>{outcomeDescription}</td>
        <td>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            edit
            <AiFillEdit />
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
            <Modal.Title>Update Outcome data</Modal.Title>
           
          </Modal.Header>

          <Modal.Body>
            <UpdateOutcomeModal
              SubProgramId={SubProgramId}
              outcomeName={outcomeName}
              outcomeFiscalYear={outcomeFiscalYear}
              outcomeFiscalYearID={outcomeFiscalYearID}
              outcomeDescription={outcomeDescription}
              index={index}
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
          <Modal.Title>Add Output </Modal.Title>
          
        </Modal.Header>

        <Modal.Body>
          <AddoutPutModal index={index} />
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
            <td colSpan="4">
              <big>OutPutName</big>
            </td>

            <td>
              <big>Action</big>
            </td>
          </tr>

          {output.map((output) => (
            <TableRowOutput
              OutComeId={output.outcomeid}
              OutPutName={output.outputname}
              OutComeName={output.outcomename}
              FiscalYear={outcomeFiscalYear}
              index={output.outputid}
            />
          ))}
        </>
      )}
    </>
  );
};
