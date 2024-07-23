import React, { useEffect, useState } from "react";
import { Form} from "react-bootstrap";
import { ExpendableButton } from "./ExpendableButton";
import { FcPlus, FcSynchronize } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
//import { TableRow } from "./TableRow";
import useOpenController from "./Hooks/useOpenController";
import { BiSubdirectoryRight } from "react-icons/bi";
import * as ExpeseType from "../../../../services/ContractManagement/ContractSetting/expenseTypeService";
import * as ExpenseContract from "../../../../services/ContractManagement/ContractSetting/expenseContractService";

import * as ActivityData from "../../../../services/RMFPlanning/activityServices";
import { DiSqllite } from "react-icons/di";
import { FaHandPointRight } from "react-icons/fa";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import Target from "../../../rmfplannings/Program/target";
import Activity from "../../../rmfplannings/Program/activities";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import ActivityModel from "../../../rmfplannings/Program/ActivityModel";
import { PatternFormat, NumericFormat } from "react-number-format";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";


export const Addcontractexpense = (props) => {
  //---------------------------------------------
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //-------------------------------------------
   const id = props.projectid;
   const expensecontractid=0;
  //-------------------------
 
  
  //----------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  const [activityData, setActivitytData] = useState([]);
  const [expenseType, setexpenseType] = useState([]);
  const [showActivityadd, setShowActivityadd] = useState(false);
  const [showActivityUpdate, setShowActivityUpdate] = useState(false);
  const [showTargetupdate, setShowTargetupdate] = useState(false);
  const [showTargetadd, setShowTargetadd] = useState(false);
  //----------------------Initialize serviceorder data---------------------------------
    const [Expensecontractid,setexpensecontractid] = useState(0);
    const [Contractid,setcontractid]= useState(props.projectid);
    const [Expensetypename,setexpensetypename]= useState("");
    const [Expensetypeid,setexpensetypeid]= useState(0);    
    const [Number,setnumber]= useState(0);
    const [Totalbudget,settotalbudget]= useState(0);

   //------------------------------------fetch Activity
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        
          const { data } = await ExpeseType.getexpensetypes();
           setexpenseType(data);

          
      } catch (ex) {
        toast.error("Loading issues......");
      }
    };
    fetchProgram();
  }, []);

  //--------------------------------------------------------
 
 

  //-----------------------save service order update-------------------------
  const handleSubmit = async (e) => {
    
     
    try {
      e.preventDefault();   
      await ExpenseContract.addexpensecontract(
        expensecontractid,
        id,
        Expensetypeid,        
        Number,
        Totalbudget
      );
      
      toast.success(`Expense Contract data  has been updated successful
      expensecontractid:${expensecontractid},Expensetypeid:${Expensetypeid},
      contractid:${id},
       Number:${Number}  Totalbudget:${Totalbudget} 
      `);
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
  //----------------------------------------------



  //-------------------------------handle target show
  const handleShowTargetadd = () => setShowTargetadd(true);
  const handleCloseTargetadd = () => setShowTargetadd(false);

  //------------------------------------fetch Activity
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        
          const { data } = await ActivityData.getactivities();
           setActivitytData(data);

          
      } catch (ex) {
        toast.error("Loading issues......");
      }
    };
    fetchProgram();
  }, []);
  //------------------------------------show and close update Target modal
 

  

  return (
    <Form onSubmit={handleSubmit}>
    <div className="row">
        <div className="col">
          <div className="cards">
            <div className="mb-3">
              <div className="row">
                
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="hidden"
                      placeholder="Expensecontractid *"
                      name="expensecontractid"
                      value={Expensecontractid}
                      onChange={(e) => setexpensecontractid(e.target.value)}
                      required
                    />
                      
                  </Form.Group>
                </div>
              </div>
            </div>
            {/*--------------------------------------------------------------- */}
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <Form.Label>Expense type</Form.Label>
                </div>
                <div className="col">
                 

                   <Form.Group>
                    <Form.Control
                      as="Select"
                      custom
                      name="expensetypeid"
                      value={Expensetypeid}
                      onChange={(e) => setexpensetypeid(e.target.value)}
                    >
                      <option value="">

                      </option>
                      {expenseType.map((expenseType) => (
                        <option
                          key={expenseType.expensetypeid}
                          value={expenseType.expensetypeid}
                        >
                          {expenseType.expensetypename}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <br></br>
              
              {/*--------------------------------------------------------------- */}

              {/*--------------------------------------------------------------- */}
              
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Expense Size or Number</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Number *"
                      name="number"
                      value={Number}
                      onChange={(e) => setnumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
               {/*--------------------------------------------------------------- */}
              
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Expense Total budget</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Totalbudget *"
                      name="totalbudget"
                      value={Totalbudget}
                      onChange={(e) => settotalbudget(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
            </div> 
            
    
            {/*--------------------------------------------------------------- */}
          </div>
          {/*--------------------------------------------------------------- */}

          {/*--------------------------------------------------------------- */}
        </div>
      </div>
      <Button variant="success" type="submit" block>
        Save
      </Button>
      </Form>
   
  );
};
