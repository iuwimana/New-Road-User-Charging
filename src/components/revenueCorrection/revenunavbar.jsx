import React from "react";
import { Link } from "react-router-dom";
import {
  FcFeedIn,
  FcMoneyTransfer,
  FcSalesPerformance,
  FcConferenceCall,
  FcServices,
  FcDebt,
  FcCurrencyExchange,
} from "react-icons/fc";
import { FaPeopleCarry } from "react-icons/fa";
import { Card, CardHeader, CardBody, Row, Col, NavLink } from "reactstrap";

function Revenunavbar() {
  return (
    <div>
      <Col xs="15">
        <Card className=" shadow border-0">
          <CardHeader>
            <span className="">
              <FcFeedIn />
              &nbsp;{""}
              <big>RUMS-Revenu Correction</big>{" "}
            </span>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5 justify-content-md-left">
            <Row>
              <Col xs="6">
                <NavLink
                  className="nav-link-icon"
                  to="/revenu/sourceoffunds"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcSalesPerformance />
                    &nbsp; Source of Funds
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-link-icon"
                  to="/revenu/revenuproduct"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FaPeopleCarry />
                    &nbsp; Revenus Products
                  </span>
                </NavLink>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/revenupayment"
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcMoneyTransfer />
                    &nbsp;Revenus Payment
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="8">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/revenucorrection"
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcFeedIn />
                    &nbsp;Revenus Correction
                  </span>
                </NavLink>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/businesspaterner"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcConferenceCall />
                    &nbsp;Business Partener
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/paternerservice"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcServices />
                    &nbsp;Partener Service
                  </span>
                </NavLink>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs="6">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/servicepayment"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcCurrencyExchange />
                    &nbsp;Service Payment
                  </span>
                </NavLink>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="8">
                <NavLink
                  className="nav-item nav-link"
                  to="/revenu/paternerservicepayment"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">
                    <FcDebt />
                    &nbsp;Paterner Service Payment
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
export default Revenunavbar;
