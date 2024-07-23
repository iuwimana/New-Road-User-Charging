import React, { Component } from "react";

import Joi from "joi-browser";
import * as ContractorData from "../../../../services/ContractManagement/ContractSetting/ContractorService";

import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../../common/form";

class AddroleModal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: {
        contractorid: 0,
        contractorname: "",
        islocal: false,
        contractoraddress: "",
        contractoremail: "",
        contractorphonenumber: "",
        tinnumber: "",
        contactpersonfirstname: "",
        contactpersonmiddlename: "",
        contactpersonlastname: "",
        contactpersonemail: "",
        contactpersonphonenumber: "",
      },
      contractorid: 0,
      contractorname: " ",
      islocal: false,
      contractoraddress: " ",
      contractoremail: " ",
      contractorphonenumber: " ",
      tinnumber: " ",
      contactpersonfirstname: " ",
      contactpersonmiddlename: " ",
      contactpersonlastname: " ",
      contactpersonemail: " ",
      contactpersonphonenumber: " ",
      user: {},
      contractors: [],
      revenues: [],
      errors: {},
    };
  }
  contactpersonphonenumberHandler(e) {
    this.setState({ contactpersonphonenumber: e.target.value });
  }
  contactpersonemailHandler(e) {
    this.setState({ contactpersonemail: e.target.value });
  }
  contactpersonlastnameHandler(e) {
    this.setState({ contactpersonlastname: e.target.value });
  }
  contactpersonmiddlenameHandler(e) {
    this.setState({ contactpersonmiddlename: e.target.value });
  }
  contactpersonfirstnameHandler(e) {
    this.setState({ contactpersonfirstname: e.target.value });
  }
  islocalHandler(e) {
    this.setState({ islocal: e.target.checked });
  }
  tinnumberHandler(e) {
    this.setState({ tinnumber: e.target.value });
  }
  contractorphonenumberHandler(e) {
    this.setState({ contractorphonenumber: e.target.value });
  }
  contractoremailHandler(e) {
    this.setState({ contractoremail: e.target.value });
  }
  contractoraddressHandler(e) {
    this.setState({ contractoraddress: e.target.value });
  }
  contractornameHandler(e) {
    this.setState({ contractorname: e.target.value });
  }

  async populateBanks() {
    try {
      const { data: contractors } = await ContractorData.getcontractors();
      this.setState({ contractors });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      contractorid: nextProps.contractorid,
      contractorname: nextProps.contractorname,
      islocal: nextProps.islocal,
      contractoraddress: nextProps.contractoraddress,
      contractoremail: nextProps.contractoremail,
      contractorphonenumber: nextProps.contractorphonenumber,
      tinnumber: nextProps.tinnumber,
      contactpersonfirstname: nextProps.contactpersonfirstname,
      contactpersonmiddlename: nextProps.contactpersonmiddlename,
      contactpersonlastname: nextProps.contactpersonlastname,
      contactpersonemail: nextProps.contactpersonemail,
      contactpersonphonenumber: nextProps.contactpersonphonenumber,
    });
  }
  schema = {
    contractorid: Joi.number().required(),
    contractorname: Joi.string().required().label("contractorname"),
    contractoraddress: Joi.string().required().label("contractoraddress"),
    contractoremail: Joi.string().required().email(),
    contractorphonenumber: Joi.string()
      .required()
      .label("contractorphonenumber"),
    tinnumber: Joi.string().required().label("tinnumber"),
    contactpersonfirstname: Joi.string()
      .required()
      .label("contactpersonfirstname"),
    contactpersonmiddlename: Joi.string()
      .required()
      .label("contactpersonmiddlename"),
    contactpersonlastname: Joi.string()
      .required()
      .label("contactpersonlastname"),
    contactpersonemail: Joi.string().required().label("contactpersonemail"),
    contactpersonphonenumber: Joi.string()
      .required()
      .label("contactpersonphonenumber"),
  };

  async handleSave() {
    try {
      const data = this.state;
      const contractorid = 0;

      await ContractorData.addcontractor(
        contractorid,
        this.state.contractorname,
        this.state.islocal,
        this.state.contractoraddress,
        this.state.contractoremail,
        this.state.contractorphonenumber,
        this.state.tinnumber,
        this.state.contactpersonfirstname,
        this.state.contactpersonmiddlename,
        this.state.contactpersonlastname,
        this.state.contactpersonemail,
        this.state.contactpersonphonenumber
      );
      toast.success(`Contractor  has been saved successful
       contractorname:${data.contractorname},
       islocal:${data.islocal},
      contractoraddress:${data.contractoraddress},
      contractoremail ${data.contractoremail},
     contractorphonenumber ${data.contractorphonenumber},
     tinnumber ${data.tinnumber},
      contactpersonfirstname ${data.contactpersonfirstname},
      contactpersonmiddlename${data.contactpersonmiddlename},
      contactpersonlastname ${data.contactpersonlastname},
      contactpersonemail${data.contactpersonemail},
     contactpersonphonenumber ${data.contactpersonphonenumber}`);
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

  render() {
    //const banks=this.state.banks
    return (
      <div
        className="modal fade"
        id="exampleAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{
            maxWidth: "1370px",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Contractor
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <br />
            <div className="text-muted text-center mt-2 mb-3">
              <div
                style={{
                  alignItems: "right",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <form onSubmit={this.handleSubmit}>
                  <div className="btn-wrapper text-right">
                    <br></br>
                  </div>
                  <div className="row">
                    <div className="btn-wrapper text-right">
                      <br></br>
                    </div>
                    <div className="col">
                      <div className="btn-wrapper text-right">
                        <br></br>
                      </div>
                      <div className="carsds">
                        <div className="text-muted text-right mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "right" }}>
                              <small>Contractor details</small>
                            </div>
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
                                  contractor name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contractorname"
                                  id="contractorname"
                                  value={this.state.contractorname}
                                  onChange={(e) =>
                                    this.contractornameHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contractor address
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contractoraddress"
                                  id="contractoraddress"
                                  value={this.state.contractoraddress}
                                  onChange={(e) =>
                                    this.contractoraddressHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contractor email
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contractoremail"
                                  id="contractoremail"
                                  value={this.state.contractoremail}
                                  onChange={(e) =>
                                    this.contractoremailHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contractor phonenumber
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contractorphonenumber"
                                  id="contractorphonenumber"
                                  value={this.state.contractorphonenumber}
                                  onChange={(e) =>
                                    this.contractorphonenumberHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}

                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Tin number
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="tinnumber"
                                  id="tinnumber"
                                  value={this.state.tinnumber}
                                  onChange={(e) => this.tinnumberHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  is local
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="checkbox"
                                  className="form-control"
                                  name="islocal"
                                  id="islocal"
                                  value={this.state.islocal}
                                  onChange={(e) => this.islocalHandler(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                      </div>
                    </div>
                    <div className="col">
                      <div className="btn-wrapper text-center">
                        <br></br>
                      </div>
                      <div className="carsds">
                        <div className="text-muted text-center mt-2 mb-3">
                          <h1>
                            <div style={{ textAlign: "center" }}>
                              <small>Contact Person Details</small>
                            </div>
                          </h1>
                        </div>
                        <div className="btn-wrapper text-center">
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
                                  Contact person first name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactpersonfirstname"
                                  id="contactpersonfirstname"
                                  value={this.state.contactpersonfirstname}
                                  onChange={(e) =>
                                    this.contactpersonfirstnameHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contact person middle name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactpersonmiddlename"
                                  id="contactpersonmiddlename"
                                  value={this.state.contactpersonmiddlename}
                                  onChange={(e) =>
                                    this.contactpersonmiddlenameHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contact person last name
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactpersonlastname"
                                  id="contactpersonlastname"
                                  value={this.state.contactpersonlastname}
                                  onChange={(e) =>
                                    this.contactpersonlastnameHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contact person email
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactpersonemail"
                                  id="contactpersonemail"
                                  value={this.state.contactpersonemail}
                                  onChange={(e) =>
                                    this.contactpersonemailHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Contact person phonenumber
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="col-auto">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="contactpersonphonenumber"
                                  id="contactpersonphonenumber"
                                  value={this.state.contactpersonphonenumber}
                                  onChange={(e) =>
                                    this.contactpersonphonenumberHandler(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/**-------------------------------------------- */}
                        <div className="mb-3">
                          <div className="row">
                            <div className="col">
                              <div className="col-auto">
                                <br></br>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-wrapper text-center">
                    <br></br>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => {
                        this.handleSave();
                      }}
                    >
                      AddNew
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
