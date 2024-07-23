import {  useState } from "react";

const addFContractTypeModal = () => {
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
export default addFContractTypeModal;