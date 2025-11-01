// Create this new component - OutputModalWrapper.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Output from "./Output"; // Adjust the import path as needed

const OutputModalWrapper = ({ show, handleClose, output }) => {
  if (!output) return null;

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Output Details: {output.outputname}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Output
          OutComeId={output.outcomeid} // Make sure these props match what your Output component expects
          OutPutName={output.outputname}
          OutComeName={output.outcomename}
          FiscalYear={output.fiscalyear}
          index={output.outputid} // This seems to be the ID used in your Output component
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OutputModalWrapper;