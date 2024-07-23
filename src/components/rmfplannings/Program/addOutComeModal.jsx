import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Outcome from "../../../services/RMFPlanning/outcomeService";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";



const AddOutComeModal = ({  index }) => {

  const [fiscalYear, setFiscalYear] = useState([]);
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await FiscalYear.getFiscalyears();
      setFiscalYear(data);
    };
    fetchProgram();
  }, []);
 
  //------------------------------------

  const id = index;
  const OutcomeId=0;

  const [outComeName, setOutComeName] = useState("");
  const [fiscalyearid, setFiscalYearID] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
     await Outcome.addoutcome(OutcomeId,id,outComeName,fiscalyearid,description );
      toast.success(`Program data with SubprogramID:${id} and OutcomeID: ${OutcomeId} and FiscalYear ${fiscalyearid} and  ${outComeName} and ${description}  has been updated successful`);
   // window.location.reload(false);
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
         <Form.Label>OutComeName : </Form.Label>
        <Form.Control
          type="text"
          placeholder="OutComeName *"
          name="OutComeName"
          value={outComeName}
          onChange={(e) => setOutComeName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>FiscalYear : </Form.Label>
        <Form.Control
          as="Select"
          custom
          name="fiscalyearid"
          value={fiscalyearid}
          onChange={(e) => setFiscalYearID(e.target.value)}>
            <option>

            </option>
          {fiscalYear.map(fiscalYear => (
          <option key={fiscalYear.fiscalyearid} value={fiscalYear.fiscalyearid}>
            {fiscalYear.fiscalyear}
          </option>
        ))}
       </Form.Control>   
        
      </Form.Group>

      <Form.Group>
        <Form.Label>Outcome Description : </Form.Label>
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
        AddNew
      </Button>
       
    </Form>
  );
};

export default AddOutComeModal;
