import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Modal.css";
import * as Program from "../../../../services/RMFPlanning/programServices";
import * as ContractData from "../../../../services/ContractManagement/ContractSetting/contractservice";
import * as ContractTypeData from "../../../../services/ContractManagement/ContractSetting/contractTypeService";
import * as MaintenanceTypeData from "../../../../services/ContractManagement/ContractSetting/maintenanceTypeService";
import * as RoadData from "../../../../services/ContractManagement/RoadRefference/road";
import * as SourceoffundData from "../../../../services/RMFPlanning/sourceoffundService";

const UpdateContract = ({
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
  contracttypeid,
  contracttypename,
  contractid,
}) => {
  //-----------------------------------------------------------------------------
  const [contracttype, setcontracttype] = useState([]);
  const [maintenancetype, setmaintenancetype] = useState([]);
  const [road, setroad] = useState([]);
  const [source, setSource] = useState([]);

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

  //---------------------------------------------------
  

  //contractorid,contractid Contractdiscription Roodid Maintenancetypeidid Budget Activitysourceoffundid Startdate Enddate
  const [Contractorid, setContractorid] = useState(contractorid);
  const [Contractid, setContractid] = useState(contractid);
  const [Contractdiscription, setContractdiscription] = useState(contractdiscription);
  const [Roodid, setRoodid] = useState(roodid);
  const [Maintenancetypeid, setMaintenancetypeid] = useState(maintenancetypeidid);
  const [Contracttypeid, setContracttypeid] = useState(contracttypeid);
  const [Budget, setBudget] = useState(budget);
  const [Activitysourceoffundid, setActivitysourceoffundid] = useState(activitysourceoffundid);
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

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <div className="cards">
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
                      value={Contractdiscription}
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
                      as="Select"
                      custom
                      name="contracttypeid"
                      value={Contracttypeid}
                      onChange={(e) => setContracttypeid(e.target.value)}
                    >
                      <option value="">{contracttypename}</option>
                      {contracttype.map((contracttype) => (
                        <option
                          key={contracttype.contracttypeid}
                          value={contracttype.contracttypeid}
                        >
                          {contracttype.contracttypename}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>road to Maintein </Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      as="Select"
                      custom
                      name="roodid"
                      value={Roodid}
                      onChange={(e) => setRoodid(e.target.value)}
                    >
                      <option value="">{roodname}</option>
                      {road.map((road) => (
                        <option key={road.roodid} value={road.roodid}>
                          {road.roodname}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <br></br>
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
        <div className="col">
          <div className="cards">
            <br></br>
            {/*--------------------------------------------------------------- */}
            <div className="mb-3">
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Type of Maintenance</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        as="Select"
                        custom
                        name="maintenancetypeid"
                        value={Maintenancetypeid}
                        onChange={(e) => setMaintenancetypeid(e.target.value)}
                      >
                        <option value="">{maintenancetypename}</option>
                        {maintenancetype.map((maintenancetype) => (
                          <option
                            key={maintenancetype.maintenancetypeid}
                            value={maintenancetype.maintenancetypeid}
                          >
                            {maintenancetype.maintenancetypename}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Activity source of fund</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        as="Select"
                        custom
                        name="activitysourceoffundid"
                        value={Activitysourceoffundid}
                        onChange={(e) =>
                          setActivitysourceoffundid(e.target.value)
                        }
                      >
                        <option value="">{sourceoffundname}</option>
                        {source.map((source) => (
                          <option
                            key={source.activitysourceoffundid}
                            value={source.activitysourceoffundid}
                          >
                            {source.sourceoffundname +
                              "..." +
                              source.activityname}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>startdate</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group controlId="startdate">
                      <Form.Control
                        type="date"
                        name="startdate"
                        value={Startdate}
                        onChange={(e) => setStartdate(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>enddate</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group controlId="enddate">
                      <Form.Control
                        type="date"
                        name="enddate"
                        value={Enddate}
                        onChange={(e) => setEnddate(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
            </div>
            {/*--------------------------------------------------------------- */}
          </div>
        </div>
      </div>

      <Button variant="success" type="submit" block>
        Save
      </Button>
    </Form>
  );
};

export default UpdateContract;
