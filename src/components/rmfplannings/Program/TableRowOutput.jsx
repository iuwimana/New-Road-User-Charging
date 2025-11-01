import React, { useEffect, useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaHandPointRight } from "react-icons/fa";

import UpdateOutputModal from "./UpdateOutputModal";
import OutputModal from "./output";
import * as OutputData from "../../../services/RMFPlanning/outputService";
import './Modal.css';

export const TableRowOutput = ({
  OutComeId,
  OutPutName,
  OutComeName,
  FiscalYear,
  index,
}) => {
  const [output, setOutput] = useState([]);
  //-------------------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //------------------------------------------

  //------------------------------------
  const replaceModalItem = async (index) => {
    try {
      await OutputData.deleteoutput(index);
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
  }, [OutComeId, OutPutName, index]);
  //------------------------------------------------------------

  return (
    <>
      <tr key={index} className="output-row">
        <td></td>
        <td></td>
        <td>
          <b>
            <FaHandPointRight /> OutPut....{index}
          </b>
        </td>
        <button
          onClick={handleShowsubprogram}
          className="btn btn-second"
          data-toggle="modal"
        >
          <td colSpan="4">{OutPutName}</td>
        </button>
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
            <Modal.Title>Update OutPut data</Modal.Title>
            
          </Modal.Header>

          <Modal.Body>
            <UpdateOutputModal
              OutComeId={OutComeId}
              OutPutName={OutPutName}
              index={index}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal 
          show={modalOpen}
          onHide={handleClosesubprogram}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <Col
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  width:600
                }}
              >
                <div >
                  <div style={{ textAlign: "center" }}>
                    <small>RMF Planning- Output</small>
                  </div>
                </div>
                <div className="btn-wrapper text-center"></div>
              </Col>
            </Modal.Title>
            
          </Modal.Header>

          <Modal.Body  >
            <OutputModal
              OutComeId={OutComeId}
              OutPutName={OutPutName}
              OutComeName={OutComeName}
              FiscalYear={FiscalYear}
              index={index}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosesubprogram}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>
    </>
  );
};
