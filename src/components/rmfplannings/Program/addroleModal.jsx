import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Program from "../../../services/RMFPlanning/programServices";
import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import * as auth from "../../../services/authService";
import {  useState } from "react";

const AddProgramModal = ({  index }) => {
  
//---------------------new model 
const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

//-------------------------------

  const id = index;
  const ProgramId=0;

  const [ProgramName, setProgramName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    
    try {
       
        const ProgramId=0
        await Program.addprogram(ProgramId,ProgramName,description);
        toast.success(`Program  has been saved successful `);
        setShowModal(false);
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
    <Form >
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

      
      <Button variant="success" onClick={handleSubmit} >
        AddNew
      </Button>
       
    </Form>
  );
};

export default AddProgramModal;
