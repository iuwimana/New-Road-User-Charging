import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as bank from "../../../../services/RevenuRessources/bankservices";

import * as Projectcontractdate from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as contractordate from "../../../../services/ContractManagement/ContractSetting/ContractorService";
import * as sourcedate from "../../../../services/RMFPlanning/sourceoffundService";
import * as ProjectType from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as FiscalYear from "../../../../services/RMFPlanning/fiscalYearService";
import * as Target from "../../../../services/RMFPlanning/targetService";
import * as Road from "../../../../services/ContractManagement/RoadRefference/road";
import * as Maintenance from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";

import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";

const Addprojectcontract = (props) => {
 
  //projectid contracttypeid maintenancetypeidid roodid

  //const fiscalYear=this.state.fiscalYear;
  //const projectType=this.state.projectType;
  //const target=this.state.target;
  // const road=this.state.road;
  // const maintenance=this.state.maintenance;
  //contractordate sourcedate
  //-------------------------------------------------------------------------------

  const [contractor, setcontractor] = useState([]);
  const [source, setsource] = useState([]);

  //-------------------------------------------------------------
  const [contractorname, setcontractorname] = useState("");
  const [contractorid, setcontractorid] = useState(props.contractorid);
 
const [sourceoffundname, setsourceoffundname] = useState("");
const [activitysourceoffundid, setactivitysourceoffundid] = useState(props.activitysourceoffundid);

const [contractdiscription, setcontractdiscription] = useState(props.contractdiscription);
const [budget, setbudget] = useState(props.budget);

const [startdate, setstartdate] = useState(props.startdate);
const [enddate, setenddate] = useState(props.enddate);
const [contractprojectid ,setcontractprojectid] = useState(props.contractprojectid);
  
  //-----------------------------------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await contractordate.getcontractors();
      setcontractor(data);
    };
    fetchProgram();
  }, []);
  //--------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await sourcedate.getactivitySourceoffunds();
      setsource(data);
    };
    fetchProgram();
  }, []);
  //-------------------------
  
    const handlesave = async () => {
    try {
       
      
      toast.success(`
      contractprojectid ${contractprojectid},
      props.projectid ${props.projectid},
      contractid ${contractorid},
      contractorid ${contractorid},
      startdate ${startdate},
      enddate ${enddate}, 
      props.contracttypeid ${props.contracttypeid},
	     
      contractdiscription ${contractdiscription},
      props.roodid ${props.roodid},
      props.maintenancetypeidid ${props.maintenancetypeidid},
      budget ${budget},
      activitysourceoffundid ${activitysourceoffundid}
      `)
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

  }
  //------------------------------------------------------------
  return (
    <>
      {" "}
      <Card className=" shadow border-0">
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
                      Contractor
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <select
                      name="contractorid"
                      id="contractorid"
                      className="form-control"
                      
                      onChange={(e) => setcontractorid(e.target.value)}
                    >
                      <option value={contractorid}>
                        {contractorname}
                      </option>
                      {contractor.map((contractor) => (
                        <option
                          key={contractor.contractorid}
                          value={contractor.contractorid}
                        >
                          {contractor.contractorname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
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
                      Contract Description
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                     <input
                                type="text"
                                className="form-control"
                                name="contractdiscription"
                                id="contractdiscription"
                                value={contractdiscription}
                               onChange={(e) => setcontractdiscription(e.target.value)}
                              />
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
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
                      Source of fund
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <select
                      name="contractorid"
                      id="contractorid"
                      className="form-control"
                      
                      onChange={(e) => setactivitysourceoffundid(e.target.value)}
                    > 
                      <option value={activitysourceoffundid }>
                        {sourceoffundname}
                      </option>
                      {source.map((source) => (
                        <option
                          key={source.activitysourceoffundid}
                          value={source.activitysourceoffundid}
                        >
                          {source.sourceoffundname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
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
                      Contract Budget
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                     <input
                                type="text"
                                className="form-control"
                                name="budget"
                                id="budget "
                                value={budget}
                               onChange={(e) => setbudget(e.target.value)}
                              />
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
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
                      Contract start on
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <input
                                type="date"
                                className="form-control"
                                name="startdate"
                                id="startdate "
                                value={enddate}
                               onChange={(e) => setstartdate(e.target.value)}
                              />
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
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
                      Contract end on
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="col-auto">
                    <input
                                type="date"
                                className="form-control"
                                name="enddate"
                                id="enddate "
                                value={enddate}
                               onChange={(e) => setenddate(e.target.value)}
                              />
                  </div>
                </div>

                {/**----------------------------------------------------------------- */}
              </div>
            </div>
          </div>
        </div>
        
        {/**-------- setstartdate setenddate---------SAP data */}
      </Card>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={handlesave}>
          Save project contract
        </button>
      </div>
    </>
  );
};
export default Addprojectcontract;
