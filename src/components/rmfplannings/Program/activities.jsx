import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as ActivityData from "../../../services/RMFPlanning/activityServices";

import {  useState } from "react";

const Activities = ({ TargetId,ActivityId,ActivityName,EstimatedBudget }) => {
  


  const id = TargetId;
  
  const [activityId, setActivityId] = useState(ActivityId);
  const [activityName, setActivityName] = useState(ActivityName);
  const [estimatedBudget, setEstimatedBudget] = useState(EstimatedBudget);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await ActivityData.addactivity(activityId,id,activityName,estimatedBudget );
      toast.success(`Activity data with TargetID:${id} and ActivityId: ${activityId} and  ${activityName} and ${estimatedBudget}  has been updated successful`);
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
          "An Error Occured, while saving Activity data Please try again later"
        );
      }
      
    }
    
  };
   
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
         <Form.Label />
            ActivityName:
        <Form.Control
          type="text"
          placeholder="activityName "
          name="activityName"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          required
        />
      </Form.Group>
      <br></br>
      <Form.Group>
         <Form.Label />
            EstimatedBudget:
        <Form.Control
          type="text"
          placeholder="estimatedBudget"
          name="estimatedBudget"
          value={estimatedBudget}
          onChange={(e) => setEstimatedBudget(e.target.value)}
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

export default Activities;
