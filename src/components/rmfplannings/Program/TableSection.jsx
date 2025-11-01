import React, { useEffect, useState } from "react";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { TableRow } from "./TableRow";
import useOpenController from "./Hooks/useOpenController";
import * as SubProgram from "../../../services/RMFPlanning/subProgramService";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as Program from "../../../services/RMFPlanning/programServices";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
//import Modal from "./modal";
import EditForm from "./EditForm";
import AddSubProgramModal from "./addSubProgramModal";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import './model.css';

export const TableSection = ({ programname, description, index }) => {
  const { isOpen, toggle } = useOpenController(false);
  const [subProgram, setSubProgram] = useState([]);
  const [requiredItem, setrequiredItem] = useState([]);

  //-------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await SubProgram.getsubprogramById(index);
      setSubProgram(data);
    };
    fetchProgram();
  }, []);
  const replaceModalItem = async (index) => {
    try {
      await Program.deleteprogram(index);
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
  //---------------------------------------------------
  const handleShow = () => setShow(true);
  const handleShowsubprogram = () => setModalOpen(true);
  const handleClose = () => setShow(false);
  const handleClosesubprogram = () => setModalOpen(false);
  useEffect(() => {
    handleClose();
    handleClosesubprogram();
  }, [programname, description, index]);
  return (
    <tbody>
      <tr key={index}>
        <td className="button-td">
          <DiSqllite isOpen={isOpen} toggle={toggle} />
          <ExpendableButton isOpen={isOpen} toggle={toggle} />
        </td>
        <td>
          <b>PROGRAM :</b>
          <small>
            
            {programname}
            <button
              onClick={handleShow}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              <AiFillEdit />
            </button>
            <button
              className="btn btn-second"
              onClick={() => replaceModalItem(index)}
            >
              <AiFillDelete />
            </button>
          </small>
          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Program data</Modal.Title>
             
            </Modal.Header>

            <Modal.Body>
              <EditForm
                index={index}
                programname={programname}
                description={description}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </td>
        <td></td>
        <td></td>
        <td>
          Add Subprogram
          <button
            onClick={handleShowsubprogram}
            className="btn text-warning btn-act"
            data-toggle="addsubprogrammodal"
          >
            <FcPlus />
          </button>
        </td>

        <Modal show={modalOpen} onHide={handleClosesubprogram} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add SubProgram </Modal.Title>
            
          </Modal.Header>

          <Modal.Body>
            <AddSubProgramModal index={index} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosesubprogram}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>

      {isOpen && (
        <>
          <tr>
            <td>
              <big></big>
            </td>
            <td></td>
            <td>
              <big>SubprogramName</big>
            </td>
            <td>
              <big>SubprogramDiscription</big>
            </td>
            <td>
              <big>Action</big>
            </td>
            <td>AddOutCome</td>
          </tr>

          {subProgram.map((subProgram) => (
            <TableRow
              SubProgramName={subProgram.subprogramname}
              SubDescription={subProgram.subprogramdescription}
              index={subProgram.subprogramid}
              ProgramId={subProgram.programid}
            />
          ))}
        </>
      )}
    </tbody>
  );
};
