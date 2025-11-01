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
    <tr>
            <th>OutPutName</th>
            <th>outcomename</th>
            <th>outcomeFiscalYear</th>
            

            <th>
              <big>Action</big>
            </th>
          </tr>
      <tr key={index} className="outcome-row">

        <td></td>
        <td>
          <b>
            <FaHandPointRight /> OutCome........{index}
          </b>
        </td>
        <td className="button-td">
          
        </td>
        <td>{outcomeName}</td>
        <td>{outcomeFiscalYear}</td>
        <td>{outcomeDescription}</td>
        <td>
          <button
  onClick={handleShow}
  className="btn btn-warning btn-sm me-1"
  title="Edit Outcome"
>
  <AiFillEdit size={18} />
</button>
          <button
            className="btn btn-second btn-sm me-1"
            onClick={() => replaceModalItem(index)}
            title="Delete Outcome"
          >
            <AiFillDelete size={18} />
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
             title="Add Output"
            data-toggle="modal"
          >
            <FcPlus size={18}/>
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
            <th>OutPutName</th>
            <th>outcomename</th>
            <th>outcomeFiscalYear</th>
            

            <th>
              <big>Action</big>
            </th>
          </tr>
          {output.map((output) => (
          <tr key={output.outputid}>
            <td>{output.outputname}</td>
            <td>{output.outcomename}</td>
            <td>{outcomeFiscalYear}</td>
          </tr>
          ))}

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
