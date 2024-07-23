import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Program from "../../../services/RMFPlanning/programServices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import * as auth from "../../../services/authService";
import {  useState } from "react";

const Modal = ({ show, onClose }) => {
    if (!show) {
      return null;
    }
  


  const [ProgramName, setProgramName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    
    try {
        const { data } = this.state;
        const ProgramId=0
        await Program.addprogram(ProgramId,data.ProgramName,data.Description);
        toast.success(`Program  has been saved successful`);
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
            
            toast.error("An Error Occured, while saving Program data Please try again later");
        }
        }
    
  };
   
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="ProgramName *"
          name="ProgramName"
          value={ProgramName}
          onChange={(e) => setProgramName(e.target.value)}
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
        AddNew
      </Button>
      <Button onClick={onClose}>Close</Button>
    </Form>
    </div>
    </div>
  );
};

export default AddProgramModal;
