import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as SourceData from "../../../services/RMFPlanning/sourceoffundService";

import {  useState } from "react";

const SourceofFunds = ({ ActivitySourceoffundId,ActivityId,SourceoffundName }) => {
  


  const id = ActivityId;
  const activitySourceoffundId=ActivitySourceoffundId;

  const [sourceoffundName, setSourceoffundName] = useState(SourceoffundName);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await SourceData.addactivitySourceoffund(activitySourceoffundId,id,sourceoffundName );
      toast.success(`stakeHolder data with activitySourceoffundId:${activitySourceoffundId} and ActivityId: ${id} and  ${sourceoffundName}   has been updated successful`);
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
          placeholder="sourceoffundName "
          name="sourceoffundName"
          value={sourceoffundName}
          onChange={(e) => setSourceoffundName(e.target.value)}
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

export default SourceofFunds;
