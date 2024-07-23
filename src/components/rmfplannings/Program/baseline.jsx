import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as BaselineData from "../../../services/RMFPlanning/baselineService";

import {  useState } from "react";

const AddSubProgramModal = ({  index,baselineID,baselinename }) => {
  


  const id = index;
  const BaselineId=baselineID;

  const [baselineName, setBaselineName] = useState(baselinename);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await BaselineData.addbaseline(BaselineId,id,baselineName );
      toast.success(`Baseline data with outputID:${id} and BaselineId: ${BaselineId} and  ${baselineName}   has been updated successful`);
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
          placeholder="BaselineName "
          name="BaselineName"
          value={baselineName}
          onChange={(e) => setBaselineName(e.target.value)}
          required
        />
      </Form.Group>

      <br></br>
      <br></br>

      
      <Button variant="success" type="submit" block>
        AddNew
      </Button>
       
    </Form>
  );
};

export default AddSubProgramModal;
