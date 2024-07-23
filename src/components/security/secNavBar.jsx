import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, NavLink } from "reactstrap";
import {
  FcBusinessman,
  FcPodiumWithSpeaker,
  FcTodoList,
  FcBiotech,
  FcUnlock,
} from "react-icons/fc";
import "./sec.css";
function Roles() {
  return (
    <div>
      <Col xs="10">
        <Card className=" shadow border-0">
          <CardHeader>
            <small>
              <FcUnlock />
              RUMS-Security
            </small>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5 justify-content-md-left">
            <Row>
              <Col xs="6">
                <NavLink className="nav-item nav-link" to="/security/users">
                  <span className="">
                    <FcBusinessman />
                    {""}Users{" "}
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="6">
                <NavLink className="nav-item nav-link" to="/security/role">
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcPodiumWithSpeaker />
                    Roles
                  </span>
                </NavLink>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/security/securables"
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcTodoList />
                    {""}Securables
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/security/auditTrail"
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcBiotech />
                    Audit Trail
                  </span>
                </NavLink>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}
export default Roles;
