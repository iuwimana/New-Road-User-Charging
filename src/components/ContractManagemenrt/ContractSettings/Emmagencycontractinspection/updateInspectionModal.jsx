import React, { useState } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import { Form, Button } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";

import * as ContractInspection from "../../../../services/contractinpection/contractinspect";

const UpdateInspectionModal = ({ inspectionid,inspectorfullname, observations ,purposeofinspection,contractid}) => {
  const [Contractid, setContractid] = useState(contractid);
  const [Inspectionid, setinspectionid] = useState(inspectionid);
  const [Inspectorfullname, setInspectorfullname] = useState(inspectorfullname);
  const [Purposeofinspection, setpurposeofinspection] = useState(purposeofinspection);
  const [Observations, setobservations] = useState(observations);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await ContractInspection.addemmergencycontractinspection(
        Inspectionid,
        contractid,
        Inspectorfullname,
        Purposeofinspection,
        Observations
      );

      toast.success(`Business Paterner with   has been updated successful:
       serviceorderid; ${contractid},
       inspectorname: ${Inspectorfullname},
       purposeofinspection: ${purposeofinspection},
       observations: ${observations},
       inspectionid: ${inspectionid} `);
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
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  };

  
  return (
    <div>
       <Form >
      <Form.Group>
        <Form.Control
          type="hidden"
          placeholder="inspectionid *"
          name="inspectionid"
          value={inspectionid}
          onChange={(e) => setinspectionid(e.target.value)}
          required
        />
      </Form.Group>
       <Form.Group>
        <Form.Control
          type="hidden"
          placeholder="Contractid *"
          name="Contractid"
          value={Contractid}
          onChange={(e) => setContractid(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleFormControlInput1" className="form-label">
                Inspector Name
              </label>
              <br/>
        <Form.Control
          type="text"
          placeholder="Inspector name *"
          name="inspectorname"
          value={Inspectorfullname}
          onChange={(e) => setInspectorfullname(e.target.value)}
          required
          autoFocus
          enable={true}
        />
      </Form.Group>
      <br/>
      <br/>

      <Form.Group>
        <label htmlFor="exampleFormControlInput1" className="form-label">
                Observation
              </label>
              <br/>
        <Form.Control
          as="textarea"
          placeholder="detailed explanation of contract service"
          rows={3}
          name="observations"
          value={Observations}
          onChange={(e) => setobservations(e.target.value)}
        />
      </Form.Group>
      <br/>
      <br/>
       <Form.Group>
        <label htmlFor="exampleFormControlInput1" className="form-label">
                Purpose of inspection
              </label>
              <br/>
        <Form.Control
          as="textarea"
          placeholder="detailed explanation of purpose of assignment"
          rows={3}
          name="purposeofinspection"
          value={Purposeofinspection}
          onChange={(e) => setpurposeofinspection(e.target.value)}
        />
      </Form.Group>

      
      <Button variant="success" onClick={handleSubmit}>
        Save
      </Button>
       
    </Form>
    </div>
  );
};
export default UpdateInspectionModal;
