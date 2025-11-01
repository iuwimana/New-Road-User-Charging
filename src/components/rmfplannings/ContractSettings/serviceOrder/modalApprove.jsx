import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import * as ServiceData from "../../../../services/ContractManagement/ContractSetting/servicesService";
import * as ServiceOrderData from "../../../../services/ContractManagement/ContractSetting/serviceOrdersService";

import { Card, CardHeader, CardBody, Col } from "reactstrap";
import * as bank from "../../../../services/RevenuRessources/bankservices";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Form} from "react-bootstrap";

class ModalApprove extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      data: {
        serviceorderid: 0,
        rejectionmessage:"",
      },
      serviceorderid: 0,
      rejectionmessage:"",
      user: {},
      errors: {},
      banks: [],
      paternerStatuses: [],
      services: [],
    };
  }
  schema = {
    serviceorderid: Joi.number().required(),
    rejectionmessage: Joi.string()
      .required()
      .label("rejectionmessage"),
   
  };
  
  async componentDidMount() {
    const user = auth.getJwt();
    this.setState({ user });
  }

  async handleSave(e) {
    
     
    try {
      const item = this.state;
      e.preventDefault();   
      await ServiceOrderData.rejectserviceorder(
        item.serviceorderid,item.rejectionmessage
      );
      
      toast.success(`Expense Contract data  has been updated successful
      serviceorderid:${item.serviceorderid}, rejectionmessage:${item.rejectionmessage}`);
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

  async componentWillReceiveProps(nextProps) {
    this.setState({
      serviceorderid: nextProps.serviceorderid,
      
    });
   
    
  }

     
  serviceorderidHandler(e) {
    this.setState({ serviceorderid: e.target.value });
  }

  rejectionmessageHandler(e) {
    this.setState({ rejectionmessage: e.target.value });
  }

  

  render() {
    
   

    return (
      <div
        className="modal fade"
        id="exampleModalapprov"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          role="document"
          style={{ maxWidth: "770px", width: "100%", height: "100%" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2 mb-3">
                  <h1>
                    <div style={{ textAlign: "center" }}>
                      <h1>RMF Contract Management- Approve Service Order</h1>
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
            <div className="flex items-center justify-center"
              
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
                    <Form onSubmit={this.handleSave}>
                      <div className="row">
                        <div className="col">
                          <div >
                            <div className="mb-3">
                              <div className="row">
                                <div className="col">
                                  <Form.Group>
                                    <Form.Control
                                      type="hidden"
                                      placeholder="serviceorderid *"
                                      name="serviceorderid"
                                      value={this.state.serviceorderid}
                                      onChange={(e) => this.serviceorderidHandler(e)}
                                      
                                      required
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                            {/*--------------------------------------------------------------- */}
                            <div className="mb-3">
                              
                                
                                  <Form.Label>Comment</Form.Label>
                                
                               
                                  <Form.Group>
                                    <Form.Control
                                      as="textarea" 
                                      rows={3}
                                      placeholder="Rejection Reason *"
                                      name="rejectionmessage"
                                      value={this.state.rejectionmessage}
                                      onChange={(e) => this.rejectionmessageHandler(e)}
                                                                         
                                      
                                      required
                                    />

                                    
                                  </Form.Group>
                                
                              
                              <br></br>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="success" type="submit" block>
                        Approv
                      </Button>
                    </Form>
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

export default ModalApprove;
