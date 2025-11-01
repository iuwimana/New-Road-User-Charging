import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Modal.css";
import * as Program from "../../../../services/RMFPlanning/programServices";
import * as ContractorData from "../../../../services/ContractManagement/ContractSetting/ContractorService";


import { useState } from "react";

const EditForm = ({
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
}) => {
  const id = contractorid;

  const [Contractorid, setContractorid] = useState(contractorid);
  const [Contractorname, setContractorname] = useState(contractorname);

  const [Islocal, setIslocal] = useState(islocal);
  const [Contractoraddress, setContractoraddress] = useState(contractoraddress);
  const [Contractoremail, setContractoremail] = useState(contractoremail);
  const [Contractorphonenumber, setContractorphonenumber] = useState(
    contractorphonenumber
  );
  const [Tinnumber, setTinnumber] = useState(tinnumber);
  const [Contactpersonfirstname, setContactpersonfirstname] = useState(
    contactpersonfirstname
  );
  const [Contactpersonmiddlename, setContactpersonmiddlename] = useState(
    contactpersonmiddlename
  );
  const [Contactpersonlastname, setContactpersonlastname] = useState(
    contactpersonlastname
  );
  const [Contactpersonemail, setContactpersonemail] =
    useState(contactpersonemail);
  const [Contactpersonphonenumber, setContactpersonphonenumber] = useState(
    contactpersonphonenumber
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await ContractorData.addcontractor(
        id,
        Contractorname,
        Islocal,
        Contractoraddress,
        Contractoremail,
        Contractorphonenumber,
        Tinnumber,
        Contactpersonfirstname,
        Contactpersonmiddlename,
        Contactpersonlastname,
        Contactpersonemail,
        Contactpersonphonenumber
      );
      toast.success(`Program data  has been updated successful
      Contractorname ${Contractorname}${Contractorname},
        Islocal ${Islocal},
        Contractoraddress ${Contractoraddress},
        Contractoremail ${Contractoremail},
        Contractorphonenumber ${Contractorphonenumber},
        Tinnumber ${Tinnumber},
        Contactpersonfirstname ${Contactpersonfirstname},
        Contactpersonmiddlename ${Contactpersonmiddlename},
        Contactpersonlastname ${Contactpersonlastname},
        Contactpersonemail ${Contactpersonemail},
        Contactpersonphonenumber ${Contactpersonphonenumber}`);
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
          <div className="carsds">
            <div className="row">
              <div className="col">
                <Form.Group>
                  <Form.Control
                    type="hidden"
                    placeholder="Programname *"
                    name="contractorid"
                    value={Contractorid}
                    onChange={(e) => setContractorid(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <br></br>
            {/*--------------------------------------------------------------- */}
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <Form.Label>Contractor name</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="contractorname *"
                      name="contractorname"
                      value={Contractorname}
                      onChange={(e) => setContractorname(e.target.value)}
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
                  <Form.Label>is local</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="checkbox"
                      name="islocal"
                      value={Islocal}
                      onChange={(e) => setIslocal(e.target.checked)}
                      
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Contractor address</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="contractoraddress *"
                      name="contractoraddress"
                      value={Contractoraddress}
                      onChange={(e) => setContractoraddress(e.target.value)}
                      
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Contractor email</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="contractoremail *"
                      name="contractoremail"
                      value={Contractoremail}
                      onChange={(e) => setContractoremail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Contractor phonenumber</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="contractorphonenumber *"
                      name="contractorphonenumber"
                      value={Contractorphonenumber}
                      onChange={(e) => setContractorphonenumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <br></br>
              {/*--------------------------------------------------------------- */}
              <div className="row">
                <div className="mb-3"></div>
                <div className="col">
                  <Form.Label>Tin number</Form.Label>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="tinnumber *"
                      name="tinnumber"
                      value={Tinnumber}
                      onChange={(e) => setTinnumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            {/*--------------------------------------------------------------- */}
          </div>
          {/*--------------------------------------------------------------- */}

          {/*--------------------------------------------------------------- */}
        </div>
        <div className="col">
          <div className="carsds">
            <br></br>
            {/*--------------------------------------------------------------- */}
            <div className="mb-3">
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Contact person firstname</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="contactpersonfirstname *"
                        name="contactpersonfirstname"
                        value={Contactpersonfirstname}
                        onChange={(e) =>
                          setContactpersonfirstname(e.target.value)
                        }
                        
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Contact person middlename</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="contactpersonmiddlename *"
                        name="contactpersonmiddlename"
                        value={Contactpersonmiddlename}
                        onChange={(e) =>
                          setContactpersonmiddlename(e.target.value)
                        }
                        
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Contact person lastname</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="contactpersonlastname *"
                        name="contactpersonlastname"
                        value={Contactpersonlastname}
                        onChange={(e) =>
                          setContactpersonlastname(e.target.value)
                        }
                        
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Contact person email</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="contactpersonemail *"
                        name="contactpersonemail"
                        value={Contactpersonemail}
                        onChange={(e) => setContactpersonemail(e.target.value)}
                        
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              {/*--------------------------------------------------------------- */}
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <Form.Label>Contact person phonenumber</Form.Label>
                  </div>
                  <div className="col">
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="contactpersonphonenumber *"
                        name="contactpersonphonenumber"
                        value={Contactpersonphonenumber}
                        onChange={(e) =>
                          setContactpersonphonenumber(e.target.value)
                        }
                       
                      />
                    </Form.Group>
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
            {/*--------------------------------------------------------------- */}
          </div>
        </div>
      </div>

      <Button variant="success" type="submit" block>
        Update
      </Button>
    </Form>
  );
};

export default EditForm;
