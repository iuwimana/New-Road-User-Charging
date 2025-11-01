import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as ServiceData from "../../../../services/ContractManagement/ContractSetting/servicesService";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        enddate: "",
        startdate: "",
        damagedlevel: "",
        contractdiscription: "",
        sourceoffundname: "",
        contractbudget: 0,
        maintenancetypename: "",
        rooddistance: 0,
        roodname: "",
        serviceorderid: 0,
      },
      enddate: "",
      startdate: "",
      damagedlevel: "",
      contractdiscription: "",
      sourceoffundname: "",
      contractbudget: 0,
      maintenancetypename: "",
      rooddistance: 0,
      roodname: "",
      serviceorderid: 0,
      InstitutionPartenerId: 0,
      InstitutionPartenerName: "",
      PartenerStatusName: "",
      partenerstatusid: 0,
      SourceofFundId: 0,
      SourceofFundname: "",
      AccountNumber: "",
      bankid: 0,
      Bankname: "",
      user: {},
      errors: {},
      banks: [],
      paternerStatuses: [],
      services: [],
    };
  }
  schema = {
    InstitutionPartenerId: Joi.number().required(),
    InstitutionPartenerName: Joi.string()
      .required()
      .label("InstitutionPartenerName"),
    AccountNumber: Joi.string().required().label("AccountNumber"),
    partenerstatusid: Joi.number().required(),
    bankid: Joi.number().required(),
  };
  async populateBanks() {
    try {
      const { data: banks } = await bank.getbanks();
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      this.setState({ banks, paternerStatuses });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }
  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({
      serviceorderid: nextProps.serviceorderid,
      roodname: nextProps.roodname,
      rooddistance: nextProps.rooddistance,
      maintenancetypename: nextProps.maintenancetypename,
      contractbudget: nextProps.contractbudget,
      sourceoffundname: nextProps.sourceoffundname,
      contractdiscription: nextProps.contractdiscription,
      damagedlevel: nextProps.damagedlevel,
      startdate: nextProps.startdate,
      enddate: nextProps.enddate,
    });

    try {
      const { data: services } = await ServiceData.getserviceByserviceorderId(
        nextProps.serviceorderid
      );
      this.setState({ services });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  msgHandler(e) {
    this.setState({ msg: e.target.value });
  }

  PartenerStatusIdHandler(e) {
    this.setState({ partenerstatusid: e.target.value });
  }
  BankIdHandler(e) {
    this.setState({ bankid: e.target.value });
  }
  InstitutionPartenerIdHandler(e) {
    this.setState({ InstitutionPartenerId: e.target.value });
  }
  InstitutionPartenerNameHandler(e) {
    this.setState({ InstitutionPartenerName: e.target.value });
  }

  AccountNumberHandler(e) {
    this.setState({ AccountNumber: e.target.value });
  }

  async handleSave() {
    // const { user } = this.state;

    try {
      const item = this.state;

      await BusinessPaterner.addBusinessPaterner(
        item.InstitutionPartenerId,
        item.InstitutionPartenerName,
        item.PartenerStatusId,
        item.AccountNumber,
        item.BankId
      );
      toast.success(
        `Business Paterner with   has been updated successful:${item.InstitutionPartenerId} , ${item.InstitutionPartenerName}, ${item.PartenerStatusId}, ${item.AccountNumber}, ${item.BankId}  `
      );
      //const { state } = this.props.location;
      //window.location = state ? state.from.pathname : "/security/role";
      //this.props.history.push("/security/role");

      //this.props.saveModalDetails(item);
      //(myString.toLowerCase() === 'true');
      //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
      // const item = this.state;
      //this.props.saveModalDetails(item);
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
          "An Error Occured, while saving role Please try again later"
        );
      }
    }
  }

  render() {
    const paternerStatuses = this.state.paternerStatuses;
    const banks = this.state.banks;
    const services = this.state.services;
    const brochure = services.map((services, index) => {
      return (
        <tr key={services.serviceid}>
          
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
      );
    });

    
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document"style={{ maxWidth: "7700px", width: "100%", height: "100%" }}>
          <div className="modal-content">
            <div className="modal-header">
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2 mb-3">
                  <h1>
                    <div style={{ textAlign: "center" }}>
                      <h1>RMF Contract Management- service list Paterner</h1>
                    </div>
                  </h1>
                </div>
                <div className="btn-wrapper text-center"></div>
              </CardHeader>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
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
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            ></Col>
            <Card className=" shadow border-0">
              
              <CardBody className="px-lg-5 py-lg-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Service name</th>
                      <th>Service discription</th>
                      <th>Service budget</th>
                      <th>Maintenance area</th>
                      <th>measurement</th>
                    </tr>
                  </thead>

                  <tbody>{brochure}</tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Modal;
