import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as IndicatorData from "../../../services/RMFPlanning/indicatorService";

import {  useState } from "react";

const Indicator = ({  index,indicatorID,indicatorname }) => {
  


  const id = index;
  const IndicatorID=indicatorID;

  const [indicatorName, setIndicatorName] = useState(indicatorname);

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      await IndicatorData.addindicator(IndicatorID,id,indicatorName );
      toast.success(`Baseline data with outputID:${id} and BaselineId: ${IndicatorID} and  ${indicatorName}   has been updated successful`);
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
          placeholder="indicatorName "
          name="indicatorName"
          value={indicatorName}
          onChange={(e) => setIndicatorName(e.target.value)}
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

export default Indicator;
