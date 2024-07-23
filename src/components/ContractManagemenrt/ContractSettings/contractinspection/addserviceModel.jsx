import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as Measurement from "../../../../services/ContractManagement/ContractSetting/measurementService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FcPlus } from "react-icons/fc";
import * as Serviceorderdate from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";
import * as ContractInspection from "../../../../services/contractinpection/contractinspect";
import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import AddinspectioneModal from "./addinspectionmodal";
import UpdateinspectioneModal from "./updateInspectionModal";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
//import "react-responsive-modal/styles.css";
const  AddServiceModal =({serviceorderid,
                          damagedlevel,
                          serviceorderdescription,
                          projectid,
                          contractid,
                          contractdiscription,
                          contractbudget,
                          contractorstartdate,
                          contractorenddat,
                          contractmodeid,
                          contractmode,
                          contractorid,
                          contractorname,
                          islocal,
                          contractoraddress,
                          contractoremail,
                          contractorphonenumber,
                          tinnumber,
                          contactpersonfirstname,
                          contactpersonmiddlename,
                          contactpersonlastname,
                          contactpersonemail,
                          contactpersonphonenumber,
                          maintenancetypeid,
                          maintenancetypename,
                          roadid,
                          roadname,
                          roaddistance,
                          targetid,
                          targetname,
                          startquartid,
                          startquarter,
                          endquarterid,
                          endquarter,
                          fiscalyearid,
                          fiscalyear,
                          projecttypeid,
                          projecttypename,
                          projectdescription,
                          budgetallocatetotheroad,
                          projectstartingdate,
                          projectendingdate,
                          status,
                          projectlength,
                          projectref,
                          measurementname})=>{

  const [openModal,setopenModal]= useState(false)
  const [openupdateModal,setupdateopenModal]= useState(false)
  const [business,setbusiness]= useState([])

  //------------------------------------------------
const [Serviceorderid,setServiceorderid]= useState(serviceorderid)
const [Damagedlevel,setdamagedlevel]=useState(damagedlevel)
const [Serviceorderdescription,setServiceorderdescription ]=useState(serviceorderdescription)
const [Projectid,setprojectid ]=useState(projectid)
const [Contractid,setcontractid ]=useState(contractid)
const [Contractdiscription,setcontractdiscription ]=useState(contractdiscription)
const [Contractbudget,setcontractbudget ]=useState(contractbudget)
const [Contractorstartdate,setcontractorstartdate ]=useState(contractorstartdate)
const [Contractorenddat,setcontractorenddat ]=useState(contractorenddat)
const [Contractmodeid,setcontractmodeid ]=useState(contractmodeid)
const [Contractmode,setcontractmode ]=useState(contractmode)
const [Contractorid,setcontractorid ]=useState(contractorid)
const [Contractorname,setcontractorname ]=useState(contractorname)
const [Islocal,setislocal ]=useState(islocal)
const [Contractoraddress,setcontractoraddress ]=useState(contractoraddress)
const [Contractoremail,setcontractoremail]=useState(contractoremail)
const [Contractorphonenumber,setcontractorphonenumber ]=useState(contractorphonenumber)
const [Tinnumber,settinnumber ]=useState(tinnumber)
const [Contactpersonfirstname,setcontactpersonfirstname ]=useState(contactpersonfirstname)
const [Contactpersonmiddlename,setcontactpersonmiddlename ]=useState(contactpersonmiddlename)
const [Contactpersonlastname,setcontactpersonlastname ]=useState(contactpersonlastname)
const [Contactpersonemail,setcontactpersonemail ]=useState(contactpersonemail)
const [Contactpersonphonenumber,setcontactpersonphonenumber ]=useState(contactpersonphonenumber)
const [Maintenancetypeid,setmaintenancetypeid ]=useState(maintenancetypeid)
const [Maintenancetypename,setmaintenancetypename ]=useState(maintenancetypename)
const [Roadid,setroadid ]=useState(roadid)
const [Roadname,setroadname ]=useState(roadname)
const [Roaddistance,setroaddistance ]=useState(roaddistance)
const [Targetid,settargetid ]=useState(targetid)
const [Targetname,settargetname ]=useState(targetname)
const [Startquartid,setstartquartid ]=useState(startquartid)
const [Startquarter,setstartquarter ]=useState(startquarter)
const [Endquarterid,setendquarterid ]=useState(endquarterid)
const [Endquarter,setendquarter ]=useState(endquarter)
const [Fiscalyearid,setfiscalyearid ]=useState(fiscalyearid)
const [Fiscalyear,setfiscalyear ]=useState(fiscalyear)
const [Projecttypeid,setprojecttypeid ]=useState(projecttypeid)
const [Projecttypename,setprojecttypename ]=useState(projecttypename)
const [Projectdescription,setprojectdescription ]=useState(projectdescription)
const [Budgetallocatetotheroad,setbudgetallocatetotheroad ]=useState(budgetallocatetotheroad)
const [Projectstartingdate,setprojectstartingdate ]=useState(projectstartingdate)
const [Projectendingdate,setprojectendingdate ]=useState(projectendingdate)
const [Status,setstatus ]=useState(status)
const [Projectlength,setprojectlength ]=useState(projectlength)
const [Projectref,setprojectref ]=useState(projectref)
const [Measurementname,setmeasurementname]=useState(measurementname)

  //------------------------------------------------

  const onClickButton = () => setopenModal(true );

  const onCloseModal = () => setopenModal(false );

  const HancdleonClick = () => setupdateopenModal(true );

  const HandleonClose = () => setupdateopenModal(false );


  //-------------------------------------------------------------------------
   useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await ContractInspection.getcontractinspectionByserviceorder(Serviceorderid);
      setbusiness(data);
    };
    fetchProgram();
  }, []);

  //----------------------------------------------------------------------
 
  const  handledelete=async (inspectionid) => {
    try {
      
      await ContractInspection.deletecontractinspection(
        inspectionid
        
      );

      toast.success("you have delete inspection successfull");
       
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
          "An Error Occured,"+ex
        );
      }
    }
  };
  //--------------------------------------------------
  const brochure = business.map((business, index) => {
      return (
        <tr key={business.inspectionid}>
          <td>{business.inspectorname}</td>

          <td>{business.purposeofinspection}</td>
          <td>{business.observations}</td>
          <td>{business.serviceorderdescription}</td>
          <td>{business.damagedlevel}</td>
          <td>{business.inspectiondate}</td>
          <td>
            <button
              className="btn btn-primary"
              
                      data-toggle="modal"
                      onClick={ HancdleonClick }
            >
              <AiFillEdit />
              Update
            </button>
          </td>
          <td>
             <button
              className="btn btn-danger"
              onClick={() => handledelete(business.inspectionid)}
            >
            
              <AiFillDelete />
              Delete
            </button>
          </td>
     
          <Modal  dialogClassName="my-modal" show={openupdateModal} onHide={HandleonClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>UpdateInspection</Modal.Title>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={HandleonClose}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </Modal.Header>

                    <Modal.Body>
                  
                      <UpdateinspectioneModal
                      inspectionid={business.inspectionid}
                      inspectorname={business.inspectorname}
                      observations={business.observations}
                      purposeofinspection={business.purposeofinspection}
                      serviceorderid={business.serviceorderid} />
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>
        </tr>
      );
    });
    return (
     
          <div className="modal-content">
            
            <div className="row">
              <div className="col">
                {/**-----------------SAP data */}
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>SAP Information</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  <div className="mb-3">
                    {/**-------------------------------------------------------------- */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="col-auto">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              target
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="col-auto">
                            <input
                              type="hidden"
                              disabled={true}
                              className="form-control"
                              name="targetname"
                              id="targetname"
                              value={Serviceorderid}
                            />
                            <input
                              type="text"
                              disabled={true}
                              className="form-control"
                              name="targetname"
                              id="targetname"
                              value={Targetname}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**----------------------------------------------------------------- */}
                    {/**---------------------------------------------- */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="col-auto">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              fiscalyear
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="col-auto">
                            <input
                              type="text"
                              disabled={true}
                              className="form-control"
                              name="fiscalyear"
                              id="fiscalyear"
                              value={Fiscalyear}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**----------------------------------------------------------------- */}
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="col-auto">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Quarter
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="col-auto">
                            <input
                              type="text"
                              disabled={true}
                              className="form-control"
                              name="startquarter"
                              id="startquarter"
                              value={
                                Startquarter +
                                " / " +
                                Endquarter
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/**----------------------------------------------------------------- */}
                </Card>
              </div>
              <div className="col">
                {/**-----------------road data */}

                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Road Information</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <div className="col-auto">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Road
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                          <input
                            type="text"
                            disabled={true}
                            className="form-control"
                            name="roadname"
                            id="roadname"
                            value={Roadname}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <div className="col-auto">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Road Length
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                          <input
                            type="text"
                            disabled={true}
                            className="form-control"
                            name="roaddistance"
                            id="roaddistance"
                            value={
                              Roaddistance +
                              " " +
                              Measurementname
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                  <div className="mb-3">
                    <div className="row">
                      <div className="col">
                        <div className="col-auto">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Length to Maintain
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="col-auto">
                          <input
                            type="text"
                            disabled={true}
                            className="form-control"
                            name="projectlength"
                            id="projectlength"
                            value={Projectlength}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/**----------------------------------------------------------------- */}
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/**----------------------++++++++++++++++++++++++++++++project data */}

                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Maintainance details</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  <div className="row">
                    <div className="col">
                      {/*--------------------------------------------------- */}
                      {/**----------------------------------------------------------------- */}
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Maintenance type
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="projectlength"
                                id="projectlength"
                                value={Maintenancetypename}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**------------------------------------------------------------ */}
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="hidden"
                                className="form-control"
                                name="contractorname"
                                id="contractorname"
                                value={Projectid}
                              />
                            </div>
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Contract Type
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="projectlength"
                                id="projectlength"
                                value={Projecttypename}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Work description
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <textarea
                                disabled={true}
                                id="serviceorderdescription"
                                name="serviceorderdescription"
                                value={Serviceorderdescription}
                                rows="4"
                                cols="8"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                budget
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                disabled={true}
                                type="text"
                                className="form-control"
                                name="contractbudget"
                                id="contractbudget"
                                value={Contractbudget}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                startdate
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="contractorstartdate"
                                id="contractorstartdate"
                                value={Contractorstartdate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col"></div>
                    <div className="col">
                      <div className="mb-3">
                        <div className="row">
                          <div className="col">
                            <div className="col-auto">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                enddate
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="col-auto">
                              <input
                                type="text"
                                disabled={true}
                                className="form-control"
                                name="contractorenddat"
                                id="contractorenddat"
                                value={Contractorenddat}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/**----------------------++++++++++++++++++++++++++++++project data */}
                <Card className=" shadow border-0">
                  <div className="text-muted text-right mt-2 mb-3">
                    <h1>
                      <CardHeader className="bg-transparent ">
                        <div style={{ textAlign: "center" }}>
                          <small>
                            <small>
                              {" "}
                              <small>
                                <small>Inspection detail</small>
                              </small>
                            </small>
                          </small>
                        </div>
                      </CardHeader>
                    </h1>
                  </div>
                  <div className="btn-wrapper text-start">
                    <br></br>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-success"
                      data-toggle="modal"
                      onClick={onClickButton}
                    >
                      <FcPlus />
                      AddNew
                    </button>
                  </div>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Inspector Name</th>
                        <th>Inspection Purpose</th>
                        <th>Observation</th>
                        <th>service order description</th>
                        <th>damaged level</th>
                        <th>Inspection Date</th>

                        <th>Evaluate</th>
                      </tr>
                    </thead>
                    <tbody>{brochure}</tbody>
                  </table>
                  
                  <Modal  dialogClassName="my-modal" show={openModal} onHide={onCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Inspection</Modal.Title>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={onCloseModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </Modal.Header>

                    <Modal.Body>
                  
                      <AddinspectioneModal
                      serviceorderid={serviceorderid} />
                    </Modal.Body>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal>

                  <div className="row">
                    <div className="col"></div>
                    <div className="col">
                      {/**----------------------------------------------------------------- */}
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            
          </div>
        
    );
  
  
}
  


export default AddServiceModal;
