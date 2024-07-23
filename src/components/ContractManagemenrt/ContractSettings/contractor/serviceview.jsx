import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { DiSqllite } from "react-icons/di";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import * as ServiceData from "../../../../services/ContractManagement/ContractSetting/servicesService";

import AddModal from "./addroleModal";
import { toast } from "react-toastify";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import "./Modal.css";
import { Tab, Tabs } from "react-bootstrap";
import * as Program from "../../../../services/RMFPlanning/programServices";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as ContractTypeData from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as MaintenanceTypeData from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ExpensesData from "../../../../services/ContractManagement/ContractSetting/expenseContractService";
import { Addcontractexpense } from "./addcontractexpense";
import { Updatecontractexpense } from "./updatecontractexpense";
import { Addserviceorder } from "./addserviceorder";
import { Updateserviceorder } from "./updateserviceorder";
import { Services } from "./services";

import * as RoadData from "../../../../services/ContractManagement/RoadRefference/road";
import * as SourceoffundData from "../../../../services/RMFPlanning/sourceoffundService";

export const Serviceview = ({
   serviceorderid,
   serviceorderdescription,
   roadname,
  roaddistance,
  budget,
  damagedlevel,

  activityname,
  activityid,
  contractid,
  activityestimatedbudget,
  contractbudget,
  
  
}) => {

  //--------------------------------------------------------------
  const { isOpen, toggle } = useOpenController(false);
  //---------------------------------------------------------------------
  const [isframework, setFramework] = useState(false);
  const [modaladdserviceorderOpen, setModaladdserviceorderOpen] =
    useState(false);
  const [modalupdateserviceorderOpen, setModalupdateserviceorderOpen] =
    useState(false);
  const [modaladdserviceOpen, setmodaladdserviceOpen] = useState(false);
  const [modalAddContractexpenseOpen, setModalAddContractexpenseOpen] =
    useState(false);
  const [modalUpdateContractexpenseOpen, setModalUpdateContractexpenseOpen] =
    useState(false);

  //-----------------------------------------------------------------------------
  const handleCloseaddserviceorder = () => setModaladdserviceorderOpen(false);
  const handleCloseupdateserviceorder = () =>
    setModalupdateserviceorderOpen(false);
  const handleCloseAddContractexpense = () =>
    setModalAddContractexpenseOpen(false);
  const handleCloseUpdateContractexpense = () =>
    setModalUpdateContractexpenseOpen(false);
  const handleCloseaddservice = () => setmodaladdserviceOpen(false);
  useEffect(() => {
    handleCloseaddserviceorder();
    handleCloseupdateserviceorder();
    handleCloseAddContractexpense();
    handleCloseUpdateContractexpense();
  }, []);

  //-------------------------------------------------------------------------------
  const [tabKey, initTabKey] = useState("one");
  const [contracttype, setcontracttype] = useState([]);
  const [services, setservices] = useState([]);
  const [maintenancetype, setmaintenancetype] = useState([]);
  const [road, setroad] = useState([]);
  const [source, setSource] = useState([]);
  const [serviceorder, setserviceorder] = useState([]);
  const [expense, setexpense] = useState([]);
  //-------------------------------------------------------------
  const [Serviceorderid, setserviceorderid] = useState(0);
  const [Activityname, setactivityname] = useState("");
  const [Activityid, setactivityid] = useState(0);
  const [Damagedlevel, setdamagedlevel] = useState("");
  const [expensecontractid, setexpensecontractid] = useState(0);
  const [expensetypename, setexpensetypename] = useState("");
  const [expensetypeid, setexpensetypeid] = useState(0);
  const [number, setnumber] = useState(0);
  const [totalbudget, settotalbudget] = useState(0);

  const [Serviceorderdescription, setserviceorderdescription]= useState("");
  const [Roadname, setroadname]= useState("");
  const [Roaddistance, setroaddistance]= useState("");
  const [Budget, setbudget]= useState(0);

  //const [Contracttypeid, setcontracttypeid] = useState(contracttypeid);

  //--------------------------------------------------------------
  const handleShowAddserviceorder = () => {
    setModaladdserviceorderOpen(true);
  };
  //--------------------------------------------------------------
  const handleShowAddContractexpense = () => {
    setModalAddContractexpenseOpen(true);
  };
  //-----------------------Delete service order update-------------------------
  const handleDelete = async (serviceorderid) => {
    try {
      await ServiceOrderData.deleteserviceorder(serviceorderid);

      toast.success(`service order data  has been deleted successful
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
  //-------------------------------------------------------------
  const handleShowUpdateserviceorder = (
    serviceorderid,
    activityname,
    activityid,
    damagedlevel
  ) => {
    setserviceorderid(serviceorderid);
    setactivityname(activityname);
    setactivityid(activityid);
    setdamagedlevel(damagedlevel);
    setModalupdateserviceorderOpen(true);
  };
  //-------------------------------------------------------------
  const handleShowAddservice = (serviceorderid) => {
    setserviceorderid(serviceorderid);

    setmodaladdserviceOpen(true);
  };
  //------------------------------------------------------------------
  const handleShowservice = (serviceorderid) => {
    setserviceorderid(serviceorderid);
    toast.error(`problem of roading...........${serviceorderid}`);
  };
  //-----------------------------------------------------------------------

  const handleShowUpdateContractexpense = (
    expensecontractid,
    expensetypename,
    expensetypeid,
    number,
    totalbudget
  ) => {
    setexpensecontractid(expensecontractid);
    setexpensetypename(expensetypename);
    setexpensetypeid(expensetypeid);
    setnumber(number);
    settotalbudget(totalbudget);
    setModalUpdateContractexpenseOpen(true);

    //
  };
 

  //-----------------------------------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ContractTypeData.getcontracttypes();
      setcontracttype(data);
    };
    fetchProgram();
  }, []);
  //--------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await MaintenanceTypeData.getmaintenances();
      setmaintenancetype(data);
    };
    fetchProgram();
  }, []);
  //-------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await RoadData.getroads();
      setroad(data);
    };
    fetchProgram();
  }, []);
  //-----------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await SourceoffundData.getactivitySourceoffunds();
      setSource(data);
    };
    fetchProgram();
  }, []);
  //----------------------------------------------------------

  
  //-----------------------------------------------------------------------
  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await ServiceData.getserviceByserviceorderId(
          serviceorderid
        );
        setservices(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(`problem of roading...........`);
  }
  //----------------------------------------------------------

  
//--------------------------------------------------------

  const brochure = serviceorder.map((serviceorder, index) => {
    return (
      <>
        <tr key={serviceorder.serviceorderid}>
         
          <td>
            <div className="whitespace-nowrap">
              <small>{serviceorder.activityname +""+"activity"}</small>
            </div>
          </td>
          <td>
            <small>{serviceorder.activityestimatedbudget}</small>
          </td>
          <td>
            <small>{serviceorder.budget}</small>
          </td>
          <td>
            <small>{serviceorder.damagedlevel}</small>
          </td>
          <td className="text-center">
            <ul className="flex items-center justify-center gap-2">
              <div className="row">
                <div className="col">
                  <li>
                    
                      <button
                        type="button"
                        onClick={() =>
                          handleShowUpdateserviceorder(
                            serviceorder.serviceorderid,
                            serviceorder.activityname,
                            serviceorder.activityid,
                            serviceorder.damagedlevel
                          )
                        }
                      >
                        <AiFillEdit />
                      </button>
                    
                  </li>
                </div>
                <div className="col">
                  <li>
                   
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(serviceorder.serviceorderid)
                        }
                      >
                        <AiFillDelete />
                      </button>
                    
                  </li>
                </div>
                <div className="col">
                  <li>
                   
                      <button
                        type="button"
                        onClick={() =>
                          handleShowAddservice(serviceorder.serviceorderid)
                        }
                      >
                        <FcPlus />
                      </button>
                   
                  </li>
                </div>
              </div>
            </ul>
          </td>
        </tr>

        
      </>
    );
  });


  return (
    
    <>
    <tbody>

      <tr key={serviceorderid}>
          <td
            className="button-td"
          >
            <DiSqllite isOpen={isOpen} toggle={toggle} />

            <ExpendableButton isOpen={isOpen} toggle={toggle} />
          </td>
          <td>
            <div className="whitespace-nowrap">
              <small>{serviceorderdescription}</small>
            </div>
          </td>
          <td>
            <small>{roadname}</small>
          </td>
          <td>
             <small>{roaddistance}</small>
          </td>
          <td>
            
             <small>{budget}</small>
          </td>
          <td>
            
             <small>{damagedlevel}</small>
          </td>
          <td className="text-center">
            <ul className="flex items-center justify-center gap-2">
              <div className="row">
                <div className="col">
                  <li>
                    
                      <button
                        type="button"
                        onClick={() =>
                          handleShowUpdateserviceorder(
                            serviceorder.serviceorderid,
                            serviceorder.activityname,
                            serviceorder.activityid,
                            serviceorder.damagedlevel
                          )
                        }
                      >
                        <AiFillEdit />
                      </button>
                   
                  </li>
                </div>
                <div className="col">
                  <li>
                    
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(serviceorder.serviceorderid)
                        }
                      >
                        <AiFillDelete />
                      </button>
                    
                  </li>
                </div>
                <div className="col">
                  <li>
                    
                      <button
                        type="button"
                        onClick={() =>
                          handleShowAddservice(serviceorder.serviceorderid)
                        }
                      >
                        <FcPlus />Service
                      </button>
                    
                  </li>
                </div>
              </div>
            </ul>
          </td>
        </tr>
        {isOpen && (
          <>
            {services.map((services) => {
              return (
                <>
                  <tr key={services.serviceid}>
                    <td></td>
                    <td>
                      <div className="whitespace-nowrap">
                        <small>{services.servicename}</small>
                      </div>
                    </td>
                    <td>
                      <small>{services.servicediscription}</small>
                    </td>
                    <td>
                      <small>{services.servicebudget}</small>
                    </td>
                    <td>
                      <small>{services.areaofmaintenance}</small>
                    </td>
                    <td>
                      <small>{services.measurementname}</small>
                    </td>
                  </tr>
                </>
              );
            })}
          </>
        )}


    </tbody>
    {/*----------------------------Update Service order */}
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modalupdateserviceorderOpen}
        onHide={handleCloseupdateserviceorder}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-muted text-center mt-2 mb-3">
                <div style={{ textAlign: "center" }}>
                  <small>RMF Planning- ServiceOrder</small>
                </div>
              </div>
              <div className="btn-wrapper text-center"></div>
            </Col>
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseupdateserviceorder}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Updateserviceorder
            serviceorderid={serviceorderid}
            activityname={activityname}
            activityid={activityid}
            contractid={contractid}
            damagedlevel={damagedlevel}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseupdateserviceorder}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*----------------------------Add Service order */}
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modaladdserviceorderOpen}
        onHide={handleCloseaddserviceorder}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-muted text-center mt-2 mb-3">
                <div style={{ textAlign: "center" }}>
                  <small>RMF Planning- Add Service Order</small>
                </div>
              </div>
              <div className="btn-wrapper text-center"></div>
            </Col>
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseaddserviceorder}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Addserviceorder contractid={contractid} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseaddserviceorder}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*----------------------------Add Services  */}
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modaladdserviceOpen}
        onHide={handleCloseaddservice}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-muted text-center mt-2 mb-3">
                <div style={{ textAlign: "center" }}>
                  <small>Add Service</small>
                </div>
              </div>
              <div className="btn-wrapper text-center"></div>
            </Col>
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseaddservice}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Services serviceorderid={serviceorderid} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseaddservice}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
