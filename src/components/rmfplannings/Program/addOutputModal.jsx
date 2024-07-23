import React, {  useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Output from "../../../services/RMFPlanning/outputService";



const AddOutputModal = ({  index }) => {


  //------------------------------------

  const id = index;
  const OutPutId=0;

  const [outPutName, setOutPutName] = useState("");

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
     await Output.addoutput(OutPutId,id,outPutName);
      toast.success(`outPut data with OutcomeID:${id} and OutPutId: ${OutPutId} and outPutName ${outPutName}  has been updated successful`);
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
          "An Error Occured, while saving outPut data Please try again later"
        );
      }
      
    }
    
  };
   
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
         <Form.Label>outPutName : </Form.Label>
        <Form.Control
          type="text"
          placeholder="outPutName *"
          name="outPutName"
          value={outPutName}
          onChange={(e) => setOutPutName(e.target.value)}
          required
        />
      </Form.Group>
      <br></br><br></br>

      

      
      <Button variant="success" type="submit" block>
        AddNew
      </Button>
       
    </Form>
  );
};

export default AddOutputModal;
