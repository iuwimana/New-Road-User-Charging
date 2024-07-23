import React, { Component } from "react";
//import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import InspectionMenu from "./inspectionmenu";
import Inspection from "./roadinpection";
import auth from "../../../services/authService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
class InspectionIndex extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {
      toast.error("Loading issues......");
    }
  }

  render() {
    const { user } = this.state;
    return (
      <>
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
              <CardHeader className="bg-transparent ">
                <div className="text-muted text-center mt-2 mb-3">
                  <h1>
                    <div style={{ textAlign: "center" }}>
                      <h1>Road Inspection</h1>
                    </div>
                  </h1>
                </div>
                <div className="btn-wrapper text-center"></div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Row>
                  <Col xs={4} sm={3} md={3} lg={3}
                  >
                    <Inspection />
                  </Col>
                  <Col>
                    <InspectionMenu />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </div>
        <Switch>
          <Route
            path="/ContractManagemenrt/inspection/roadinspection"
            component={InspectionMenu}
          />
          <Route
            path="/ContractManagemenrt/inspection/roadinspection"
            component={Inspection}
          />
        </Switch>
      </>
    );
  }
}

export default InspectionIndex;
