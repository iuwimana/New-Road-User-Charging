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
import {Serviceview}  from "./serviceview";

import * as RoadData from "../../../../services/ContractManagement/RoadRefference/road";
import * as SourceoffundData from "../../../../services/RMFPlanning/sourceoffundService";

const ServiceOrder = ({
  contractorid,
  enddate,
  startdate,
  activitysourceoffundid,
  sourceoffundname,
  maintenancetypeidid,
  maintenancetypename,
  budget,
  rooddistance,
  roodid,
  roodname,
  contractdiscription,
  ontracttypeid,

  contracttypename,
  contractid,
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
  const [serviceorderid, setserviceorderid] = useState(0);
  const [activityname, setactivityname] = useState("");
  const [activityid, setactivityid] = useState(0);
  const [damagedlevel, setdamagedlevel] = useState("");
  const [expensecontractid, setexpensecontractid] = useState(0);
  const [expensetypename, setexpensetypename] = useState("");
  const [expensetypeid, setexpensetypeid] = useState(0);
  const [number, setnumber] = useState(0);
  const [totalbudget, settotalbudget] = useState(0);

  //const [Contracttypeid, setcontracttypeid] = useState(contracttypeid);

  //--------------------------------------------------------------
  const handleShowAddserviceorder = () => {
    setModaladdserviceorderOpen(true);
  };
  //--------------------------------------------------------------
  const handleShowAddContractexpense = () => {
    setModalAddContractexpenseOpen(true);
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
  //--------------------------------------------------------------------

  useEffect(() => {
    const fetchProgram = async () => {
      if (contracttypename === "framework contract") {
        setFramework(true);
      }
    };
    fetchProgram();
  }, []);

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

  //-----------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ServiceOrderData.getserviceorderBycontractId(
        contractid
      );
      setserviceorder(data);
    };
    fetchProgram();
  }, []);
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

  try {
    useEffect(() => {
      const fetchProgram = async () => {
        const { data } = await ExpensesData.getexpensecontractBycontractId(
          contractid
        );
        setexpense(data);
      };
      fetchProgram();
    }, []);
  } catch (ex) {
    toast.error(`problem of roading...........`);
  }
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
  //-----------------------Delete ExpensesData -------------------------
  const handleDeleteexpense = async (expensecontractid) => {
    try {
      await ExpensesData.deleteexpensecontract(expensecontractid);

      toast.success(`expense contract data  has been deleted successful
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

  //----------------------------------------------------------

  const brochure = serviceorder.map((serviceorder, index) => {
    return (
      <>
        <tr key={serviceorder.serviceorderid}>
          <td
            className="button-td"
            onClick={() => handleShowservice(serviceorder.serviceorderid)}
          >
            <DiSqllite isOpen={isOpen} toggle={toggle} />

            <ExpendableButton isOpen={isOpen} toggle={toggle} />
          </td>
          <td>
            <div className="whitespace-nowrap">
              <small>{serviceorder.activityname}</small>
            </div>
          </td>
          <td>
            <small>{serviceorder.activityestimatedbudget}</small>
          </td>
          <td>
            <small>{serviceorder.contractbudget}</small>
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
      </>
    );
  });

  //---------------------------------------------------
  const brochureexpenses = expense.map((expense, index) => {
    return (
      <>
        <tr key={expense.expensecontractid}>
          <td>
            <div className="whitespace-nowrap">
              <small>{expense.expensetypename}</small>
            </div>
          </td>
          <td>
            <small>{expense.measurementname}</small>
          </td>
          <td>
            <small>{expense.number}</small>
          </td>
          <td>
            <small>{expense.totalbudget}</small>
          </td>
          <td className="text-center">
            <ul className="flex items-center justify-center gap-2">
              <div className="row">
                <div className="col">
                  <li>
                    
                      <button
                        type="button"
                        onClick={() =>
                          handleShowUpdateContractexpense(
                            expense.expensecontractid,
                            expense.expensetypename,
                            expense.expensetypeid,
                            expense.number,
                            expense.totalbudget
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
                          handleDeleteexpense(expense.expensecontractid)
                        }
                      >
                        <AiFillDelete />
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
  //-----------------Serviceorderdata----------------------------------

  //------------------Expensesdata---------------------------------

  //contractorid,contractid Contractdiscription Roodid Maintenancetypeidid Budget Activitysourceoffundid Startdate Enddate
  const [Contractorid, setContractorid] = useState(contractorid);
  const [Contractid, setContractid] = useState(contractid);
  const [Contractdiscription, setContractdiscription] =
    useState(contractdiscription);
  const [Roodid, setRoodid] = useState(roodid);
  const [Maintenancetypeid, setMaintenancetypeid] =
    useState(maintenancetypeidid);
  const [Contracttypeid, setContracttypeid] = useState(ontracttypeid);
  const [Budget, setBudget] = useState(budget);
  const [Activitysourceoffundid, setActivitysourceoffundid] = useState(
    activitysourceoffundid
  );
  const [Startdate, setStartdate] = useState(startdate);
  const [Enddate, setEnddate] = useState(enddate);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await ContractData.addcontract(
        contractid,
        Contracttypeid,
        Contractdiscription,
        Roodid,
        Maintenancetypeid,
        Budget,
        Activitysourceoffundid,
        Startdate,
        Enddate,
        contractorid
      );
      toast.success(`contract data  has been updated successful
      contractorid:${contractorid},Contracttypeid:${Contracttypeid},
      contractid:${contractid},
       Contractdiscription:${Contractdiscription} 
       Roodid:${Roodid},
        Maintenancetypeidid:${Maintenancetypeid},
         Budget:${Budget},
          Activitysourceoffundid:${Activitysourceoffundid},
           Startdate:${Startdate},
            Enddate:${Enddate}`);
      //window.location.reload(false);
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
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <Form.Label>Contract discription</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="contractdiscription *"
                      name="contractdiscription"
                      value={Contractdiscription + "," + Contracttypeid}
                      onChange={(e) => setContractdiscription(e.target.value)}
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
                  <Form.Label>Contract type</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="contracttypeid"
                      value={contracttypename}
                      onChange={(e) => setContracttypeid(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}

              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Budget</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="budget *"
                      name="budget"
                      value={Budget}
                      onChange={(e) => setBudget(e.target.value)}
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
      <Tabs
        className=" bg-gradient text-white !outline-none  -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white"
        activeKey={tabKey}
        onSelect={(e) => initTabKey(e)}
      >
        {isframework && (
          <Tab eventKey="Two" title="Service Order">
            <br></br>
            <br></br>
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card className=" shadow border-0">
                  <CardHeader className="bg-transparent ">
                    <div className="text-muted text-center mt-2 mb-3">
                      <h1>
                        <div style={{ textAlign: "center" }}>
                          <h1>RMF Contract Settings- Service Order</h1>
                        </div>
                      </h1>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="btn-wrapper text-center">
                      <div
                        style={{
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Add ServiceOrder
                        <button
                          className="btn btn-secondar"
                          data-toggle="modal"
                          onClick={() => handleShowAddserviceorder()}
                        >
                          <FcPlus />
                        </button>
                      </div>
                    </div>
                    <table
                      style={{
                        width: 1000,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <thead>
                        <tr>
                          <th></th>
                          <th>Activity name</th>

                          <th>Activity budget</th>
                          <th>Budget on contract</th>
                          <th>Damaged level</th>

                          <th className="!text-center">Action</th>
                        </tr>
                      </thead>

                      {serviceorder.map((serviceorder) => (
                        <Serviceview
                          serviceorderid={serviceorder.serviceorderid}
                          activityname={serviceorder.activityname}
                          activityid={serviceorder.activityid}
                          contractid={contractid}
                          activityestimatedbudget={serviceorder.activityestimatedbudget}
                          contractbudget={serviceorder.contractbudget}
                          damagedlevel={serviceorder.damagedlevel}
                        />
                      ))}
                      
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </div>

            <center></center>
            <p></p>
          </Tab>
        )}

        <Tab eventKey="one" title=" Contract Expenses ">
          <br></br>
          <br></br>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card className=" shadow border-0">
                <CardHeader className="bg-transparent ">
                  <div className="text-muted text-center mt-2 mb-3">
                    <h1>
                      <div style={{ textAlign: "center" }}>
                        <h1>RMF Contract Settings- Expenses</h1>
                      </div>
                    </h1>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="btn-wrapper text-center">
                    <div
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Add Expense
                      <button
                        className="btn btn-secondar"
                        data-toggle="modal"
                        onClick={() => handleShowAddContractexpense()}
                      >
                        <FcPlus />
                      </button>
                    </div>
                  </div>
                  <table
                    style={{
                      width: 1000,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Expense Type</th>

                        <th>Measurement</th>
                        <th>Expenses Number</th>
                        <th>Expese Budget</th>

                        <th className="!text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>{brochureexpenses}</tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </div>

          <p></p>
        </Tab>
      </Tabs>
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
                  <small>RMF Planning- ServiceOrders</small>
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
      {/*----------------------------Add contract expenses */}
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modalAddContractexpenseOpen}
        onHide={handleCloseAddContractexpense}
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
                  <small>RMF Planning- Add Contract Expenses</small>
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
            onClick={handleCloseAddContractexpense}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Addcontractexpense contractid={contractid} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddContractexpense}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/*----------------------------Update contract expenses  */}
      <Modal
        dialogClassName="my-newmodal"
        contentclassname="custom-modal"
        show={modalUpdateContractexpenseOpen}
        onHide={handleCloseUpdateContractexpense}
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
                  <small>RMF Planning- Update Contract Expenses</small>
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
            onClick={handleCloseUpdateContractexpense}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <Updatecontractexpense
            contractid={contractid}
            expensecontractid={expensecontractid}
            expensetypename={expensetypename}
            expensetypeid={expensetypeid}
            number={number}
            totalbudget={totalbudget}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddContractexpense}>
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
    </div>
  );
};

export default ServiceOrder;
