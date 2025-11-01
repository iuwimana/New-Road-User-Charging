import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Program from '../../../services/RMFPlanning/programServices';

const ViewProgramModal = ({ show, onHide, program }) => {
  if (!program) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>Program Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {program.programname}</p>
        <p><strong>Description:</strong> {program.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ViewProgramModal;
