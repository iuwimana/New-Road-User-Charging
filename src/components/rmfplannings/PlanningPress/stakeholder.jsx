import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as StakeHolderData from "../../../services/RMFPlanning/stakeholderService";

import {  useState } from "react";

const Stekeholder = ({  StakeHolderId,ActivityId,StakeHolderName }) => {
  


  const id = ActivityId;
  const stakeHolderId=StakeHolderId;

  const [stakeHolderName, setStakeHolderName] = useState(StakeHolderName);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await StakeHolderData.addstakeholder(stakeHolderId,id,stakeHolderName );
      toast.success(`stakeHolder data with stakeHolderId:${stakeHolderId} and ActivityId: ${id} and  ${stakeHolderName}   has been updated successful`);
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
          placeholder="stakeHolderName "
          name="stakeHolderName"
          value={stakeHolderName}
          onChange={(e) => setStakeHolderName(e.target.value)}
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

export default Stekeholder;
