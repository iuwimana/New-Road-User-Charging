import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../services/authService";
import * as RejectMSGData from "../../../services/common/rejectionmessageservice";
import * as ContractData from "../../../services/ContractManagement/ContractSetting/contractservice";
import { updateInspectionPlan } from "../../../services/ContractManagement/ContractSetting/inspectionplanServices";


const Rejectionmsg = ({ isOpen, toggle,plan, refresh,contractId }) => {
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      toast.info(`...${JSON.stringify(contractId)}`)
      {/**
        {"inspectionplanid":9,"serviceorderid":42,"startfrom_location":"Kigali City","endat_location":"Musanze Districtsss","expectedoutput":"Bridge structural inspection report","inspectiondate":"2025-09-05T22:00:00.000Z","status":"planned with Activities","created_at":"2025-09-07T07:30:26.535Z","updated_at":"2025-09-07T07:30:26.535Z"}
        
        */}
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const Rejectionmessageid = 0;
      const Rejectedby = user?.username || "unknown";
      const Rejectionlevel = "Inspection plan";
      const itemrejectedon = "Inspection plan on Contract";

      // Save rejection message
      const contractid=contractId;
      await RejectMSGData.addrejectionmessage(
        Rejectionmessageid,
        rejectionMessage,
        Rejectedby,
        Rejectionlevel,
        itemrejectedon
      );

      const status= 'planned'; // 👈 override the old status
            
      
            await updateInspectionPlan(
                  plan.inspectionplanid,
                  contractid,
                  plan.startfrom_location,
                  plan.endat_location,
                  plan.expectedoutput,
                  plan.inspectiondate,
                  status
            
                  
                );
            refresh();
            toggle();
      

      toast.success("Rejection has been initiated successfully");
      refresh?.();
      toggle();
    } catch (ex) {
      if (ex.response?.status === 400 || ex.response?.status === 409) {
        toast.error("Error: " + ex.response.data);
      } else {
        toast.error("An error occurred while saving rejection. Please try again later.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Reject Inspection plan on Service order #{contractId}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSave}>
          <FormGroup>
            <Label>Rejection Reason</Label>
            <Input
              type="textarea"
              rows={3}
              value={rejectionMessage}
              onChange={(e) => setRejectionMessage(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleSave}>Reject</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Rejectionmsg;
