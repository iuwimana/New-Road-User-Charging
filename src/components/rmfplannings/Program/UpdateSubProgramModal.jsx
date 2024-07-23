import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as SubProgram from "../../../services/RMFPlanning/subProgramService";

import {  useState } from "react";

const UpdateSubProgramModal = ({ SubProgramName, SubDescription, index,ProgramId}) => {
  


  const id = ProgramId;
  const SubProgramId=index;

  const [subProgramName, setSubProgramName] = useState(SubProgramName);
  const [description, setDescription] = useState(SubDescription);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
     await SubProgram.addsubprogram(SubProgramId,id,subProgramName,description );
      toast.success(`Program data with programID:${id} and subprogramID: ${SubProgramId} and  ${subProgramName} and ${description}  has been updated successful`);
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
   
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="SubProgramName *"
          name="SubProgramName"
          value={subProgramName}
          onChange={(e) => setSubProgramName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          as="textarea"
          placeholder="Description"
          rows={3}
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      
      <Button variant="success" type="submit" block>
        Update
      </Button>
       
    </Form>
  );
};

export default UpdateSubProgramModal;
